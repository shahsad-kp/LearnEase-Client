import {createContext, useCallback, useEffect, useMemo, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const videoCallContext = createContext(null)

// eslint-disable-next-line react/prop-types
const VideoCallProvider = ({children}) => {
    const localStream = useRef(null);
    const [gotLocalStream, setGotLocalStream] = useState(false);
    const isCalling = useRef(false);
    const connections = useRef(new Map());
    const [connectedUsers, setConnectedUsers] = useState(new Set());
    const {roomId} = useParams()
    const loggedInUser = useSelector(state => state.auth.user);

    const endPoint = useMemo(() => {
        return `ws://localhost:8000/ws/video_call/${roomId}/${loggedInUser.id}/`;
    }, [roomId, loggedInUser]);

    let videoCallSocket;

    useEffect(() => {
        if (!localStream.current) {
            navigator.mediaDevices.getUserMedia({
                "video": true,
                "audio": true
            }).then(stream => {
                connections.current.forEach((userConnection) => {
                    stream.getTracks().forEach(track => {
                        userConnection.connection.addTrack(track, stream);
                    })
                })
                localStream.current = stream;
                setGotLocalStream(true);
            }).catch(err => {
                console.log(err);
            })
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            for (const userConnections in connections.current){
                userConnections.connection.stop();
            }
            if (gotLocalStream) {
                localStream.current.getTracks().forEach(track => {
                    track.stop();
                })
            }
        }
    }, [gotLocalStream, localStream]);

    const createConnection = useCallback((userId) => {
        const remoteStream = new MediaStream();
        const connection = new RTCPeerConnection({
            "iceServers": [
                {
                    "urls": 'stun:stun.l.google.com:19302'
                }
            ]
        });
        connection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('sending ice candidate')
                videoCallSocket.sendMessage(JSON.stringify({
                    "type": 'ice-candidate',
                    "userId": userId,
                    "candidate": event.candidate
                }))
            }
        }
        connection.ontrack = (event) => {
            remoteStream.addTrack(event.track);
        }
        connection.onconnectionstatechange = () => {
            console.log('connection state changed', connection.connectionState)
            if (connection.connectionState === 'connected') {
                console.log('rtc connected')
                setConnectedUsers((prev) => {
                    const newSet = new Set(prev);
                    newSet.add(userId);
                    return newSet;
                })
            } else if (connection.connectionState === 'disconnected') {
                console.log('rtc disconnected')
                setConnectedUsers((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(userId);
                    return newSet;
                })
            }
        }
        if (gotLocalStream) {
            localStream.current.getTracks().forEach(track => {
                connection.addTrack(track, localStream.current);
            })
        }
        return {
            "connection": connection,
            "remoteStream": remoteStream
        }
    }, [gotLocalStream, videoCallSocket]);

    const onMessage = useCallback((message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'request-connection') {
            const userId = data.userId;
            const {connection, remoteStream} = createConnection(userId);
            connection.createOffer()
                .then(offer => {
                    connection.setLocalDescription(offer).then(() => {
                        videoCallSocket.sendMessage(JSON.stringify({
                            "type": 'offer',
                            "userId": userId,
                            "offer": offer
                        }))
                        connections.current.set(userId, {
                            "userId": userId,
                            "connection": connection,
                            "remoteStream": remoteStream
                        })
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (data.type === 'offer') {
            const userId = data.userId;

            const {connection, remoteStream} = createConnection(userId);
            connection.setRemoteDescription(new RTCSessionDescription(data.offer))
                .then(() => {
                    connection.createAnswer()
                        .then(answer => {
                            connection.setLocalDescription(answer).then(() => {
                                videoCallSocket.sendMessage(JSON.stringify({
                                    "type": 'answer',
                                    "userId": userId,
                                    "answer": answer
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
            connections.current.set(userId, {
                "userId": userId,
                "connection": connection,
                "remoteStream": remoteStream
            })
        } else if (data.type === 'answer') {
            const userId = data.userId;
            let userConnection = connections.current.get(userId);
            if (userConnection === undefined) {
                return;
            }
            userConnection.connection.setRemoteDescription(new RTCSessionDescription(data.answer))
                .catch(err => {
                    console.log(err);
                })
            connections.current.set(userId, userConnection)

        } else if (data.type === 'ice-candidate') {
            const userId = data.userId;
            let userConnection = connections.current.get(userId);
            if (userConnection === undefined) {
                return;
            }
            userConnection.connection.addIceCandidate(new RTCIceCandidate(data.candidate))
                .catch(err => {
                    console.log(err);
                })
            connections.current.set(userId, userConnection)
        }
    }, [connections, createConnection, videoCallSocket]);

    videoCallSocket = useWebSocket(endPoint, {
        "onOpen": () => {
            if (!isCalling.current) {
                videoCallSocket.sendMessage(JSON.stringify({
                    "type": 'join',
                }))
                isCalling.current = true;
            }
        },
        "onClose": () => {
            isCalling.current = false;
        },
        "shouldReconnect": () => true,
        "onMessage": onMessage
    });

    return (
        <videoCallContext.Provider value={{localStream, "videoConnections": connections, connectedUsers, gotLocalStream}}>
            {children}
        </videoCallContext.Provider>
    )
}

export default VideoCallProvider;
