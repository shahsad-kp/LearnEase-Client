import {createContext, useCallback, useEffect, useMemo, useRef} from "react";
import useWebSocket from "react-use-websocket";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

export const videoCallContext = createContext(null)

// eslint-disable-next-line react/prop-types
const VideoCallProvider = ({children}) => {
    const localStream = useRef(null);
    const connectedUsers = useRef([]);
    const isCalling = useRef(false);
    const connections = useRef([]);
    const {roomId} = useParams()
    const loggedInUser = useSelector(state => state.auth.user);

    const endPoint = useMemo(() => {
        return `ws://localhost:8000/ws/video_call/${roomId}/${loggedInUser.id}/`;
    }, [roomId, loggedInUser]);

    let videoCallSocket;

    useEffect(() => {
        if (localStream.current) {
            return;
        }
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            localStream.current = stream;
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const createConnection = useCallback((userId) => {
        const remoteStream = new MediaStream();
        const connection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        });
        connection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('sending ice candidate to ', userId)
                videoCallSocket.sendMessage(JSON.stringify({
                    type: 'ice-candidate',
                    userId: userId,
                    candidate: event.candidate
                }))
            }
        }
        connection.ontrack = (event) => {
            remoteStream.addTrack(event.track);
        }
        connection.onconnectionstatechange = () => {
            if (connection.connectionState === 'connected') {
                console.log("connected to", userId)
                connectedUsers.current.push(userId);
            } else if (connection.connectionState === 'disconnected') {
                connectedUsers.current = connectedUsers.current.filter(id => id !== userId);
            }
        }
        localStream.current.getTracks().forEach(track => {
            connection.addTrack(track, localStream.current);
        })
        return {
            connection: connection,
            remoteStream: remoteStream
        }
    }, [videoCallSocket]);

    const onMessage = useCallback((message) => {
        const data = JSON.parse(message.data);
        console.log('new message', data)
        if (data.type === 'request-connection') {
            const userId = data.userId;
            console.log("requesting connection from", userId)
            const {connection, remoteStream} = createConnection(userId);
            connection.createOffer()
                .then(offer => {
                    connection.setLocalDescription(offer).then(() => {
                        videoCallSocket.sendMessage(JSON.stringify({
                            type: 'offer',
                            userId: userId,
                            offer: offer
                        }))
                        connections.current.push({
                            userId: userId,
                            connection: connection,
                            remoteStream: remoteStream
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (data.type === 'offer') {
            const userId = data.userId;
            console.log("received offer from", userId)
            const {connection, remoteStream} = createConnection(userId);
            connection.setRemoteDescription(new RTCSessionDescription(data.offer))
                .then(() => {
                    connection.createAnswer()
                        .then(answer => {
                            connection.setLocalDescription(answer).then(() => {
                                videoCallSocket.sendMessage(JSON.stringify({
                                    type: 'answer',
                                    userId: userId,
                                    answer: answer
                                }))
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
            connections.current.push({
                userId: userId,
                connection: connection,
                remoteStream: remoteStream
            });
        } else if (data.type === 'answer') {
            const userId = data.userId;
            console.log("received answer from", userId)
            let userConnection = connections.current.find(connection => connection.userId === userId);
            if (!userConnection) {
                return;
            }
            userConnection.connection.setRemoteDescription(new RTCSessionDescription(data.answer))
                .catch(err => {
                    console.log(err);
                })
            connections.current = connections.current.map(connection => {
                if (connection.userId === userId){
                    return userConnection;
                }
                return connection;
            })
        } else if (data.type === 'ice-candidate') {
            const userId = data.userId;
            let userConnection = connections.current.find(connection => connection.userId === userId);
            if (!userConnection) {
                return;
            }
            userConnection.connection.addIceCandidate(new RTCIceCandidate(data.candidate))
                .catch(err => {
                    console.log(err);
                })
            connections.current = connections.current.map(connection => {
                if (connection.userId === userId) {
                    return userConnection
                }
                return connection;
            })
        }
    }, [createConnection, videoCallSocket]);

    videoCallSocket = useWebSocket(endPoint, {
        onOpen: () => {
            console.log("connected to video call socket");
            if (!isCalling.current) {
                videoCallSocket.sendMessage(JSON.stringify({
                    type: 'join',
                }))
                console.log("joined video call")
                isCalling.current = true;
            }
        },
        onClose: () => {
            console.log("disconnected from video call socket");
            isCalling.current = false;
        },
        shouldReconnect: () => true,
        onMessage: onMessage
    });

    return (
        <videoCallContext.Provider value={{localStream, videoConnections: connections}}>
            {children}
        </videoCallContext.Provider>
    )
}

export default VideoCallProvider;
