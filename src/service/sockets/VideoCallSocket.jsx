import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
import {wsBaseUrl} from "../api/socket.js";
import {refreshToken} from "../api/apiConfiguration.js";
import {classRoomSocketContext} from "./ClassRoomSocket.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const videoCallContext = createContext({})

// eslint-disable-next-line react/prop-types
const VideoCallSocket = ({children, accessToken, roomId, setAccessToken}) => {
    const localStream = useRef(null);
    const [gotLocalStream, setGotLocalStream] = useState(false);
    const isCalling = useRef(false);
    const connections = useRef(new Map());
    const [connectedUsers, setConnectedUsers] = useState(new Set());
    const {changeSettings} = useContext(classRoomSocketContext);
    let videoCallSocket;

    const endPoint = useMemo(
        () => {
            return `${wsBaseUrl}video_call/${roomId}/?token=${accessToken}`;
        },
        [roomId, accessToken]
    );

    useEffect(
        () => {
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
                for (const userConnections in connections.current) {
                    userConnections.connection.stop();
                }
                if (gotLocalStream) {
                    localStream.current.getTracks().forEach(track => {
                        track.stop();
                    })
                }
            }
        },
        [gotLocalStream, localStream]
    );

    const createConnection = useCallback(
        (userId) => {
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
                    setConnectedUsers((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(userId);
                        return newSet;
                    })
                } else if (connection.connectionState === 'disconnected') {
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
        },
        [gotLocalStream, videoCallSocket]
    );

    const onMessage = useCallback(
        (message) => {
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
        },
        [connections, createConnection, videoCallSocket]
    );

    videoCallSocket = useWebSocket(
        endPoint,
        {
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
            "shouldReconnect": (event) => {
                if (event.code === 4001) {
                    refreshToken().then(token => {
                        setAccessToken(token);
                    })
                }
                return true;
            },
            "reconnectAttempts": 10,
            "onMessage": onMessage
        }
    );

    const toggleMic = useCallback(
        (video, state) => {
            changeSettings({
                audio: state,
                video
            })
            if (gotLocalStream) {
                localStream.current.getAudioTracks().forEach(track => {
                    if (track.kind === 'audio'){
                        console.log(track)
                        track.enabled = state;
                    }
                })
            }
            for (const userConnection of connections.current.values()) {
                userConnection.connection.getSenders().forEach(sender => {
                    if (sender.track.kind === 'audio') {
                        sender.track.enabled = state;
                    }
                })
            }
        },
        [changeSettings, gotLocalStream]
    );

    const toggleCamera = useCallback(
        (state, audio) => {
            changeSettings({
                audio,
                "video": state
            })

            if (gotLocalStream) {
                localStream.current.getVideoTracks().forEach(track => {
                    if (track.kind === 'video'){
                        track.enabled = state;
                    }
                })
            }
            for (const userConnection of connections.current.values()) {
                userConnection.connection.getSenders().forEach(sender => {
                    if (sender.track.kind === 'video') {
                        sender.track.enabled = state;
                    }
                })
            }
        },
        [changeSettings, gotLocalStream]
    );

    const data = useMemo(
        () => ({
            localStream,
            "videoConnections": connections,
            connectedUsers,
            gotLocalStream,
            toggleMic,
            toggleCamera
        }),
        [connectedUsers, gotLocalStream, toggleCamera, toggleMic]
    );

    return (
        <videoCallContext.Provider value={data}>
            {children}
        </videoCallContext.Provider>
    )
}

export default VideoCallSocket;
