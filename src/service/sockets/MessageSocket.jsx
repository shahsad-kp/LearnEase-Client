import {createContext, useCallback, useMemo} from "react";
import {wsBaseUrl} from "../api/socket.js";
import {useDispatch} from "react-redux";
import {addMessage} from "../../redux/classRoomSlice/classRoomSlice.js";
import useWebSocket from "react-use-websocket";
import {refreshToken} from "../api/apiConfiguration.js";

// eslint-disable-next-line react-refresh/only-export-components
export const messageSocketContext = createContext({})

// eslint-disable-next-line react/prop-types
const MessageSocket = ({children, roomId, accessToken, setAccessToken}) => {
    const endPoint = useMemo(() => {
        return `${wsBaseUrl}messages/${roomId}/?token=${accessToken}`
    }, [roomId, accessToken]);

    const dispatch = useDispatch();

    const onOpen = useCallback(() => {
        console.log('connected to message');
    }, []);

    const onMessage = useCallback((e) => {
        const data = JSON.parse(e.data);
        if (data.message) {
            const message = data.message;
            dispatch(addMessage(message));
        }
    }, [dispatch]);

    const onError = useCallback((e) => {
        console.log('error', e);
    }, []);

    const onClose = useCallback(() => {
        console.log('disconnected from messsage');
    }, []);

    const socket = useWebSocket(
        endPoint,
        {
            onOpen,
            onMessage,
            onError,
            onClose,
            shouldReconnect: (event) => {
                if (event.code === 4001) {
                    refreshToken().then(token => {
                        setAccessToken(token);
                    })
                }
                return true;
            },
            reconnectAttempts: 10
        },
        true
    )

    const sendMessageToServer = useCallback(({message}) => {
        console.log(message)
        const data = {
            type: 'chat_message',
            message
        }
        socket.sendJsonMessage(data);
    }, [socket])

    const data = useMemo(() => {
        return {sendMessageToServer}
    }, [sendMessageToServer]);

    return (
        <messageSocketContext.Provider value={data}>
            {children}
        </messageSocketContext.Provider>
    )
}

export default MessageSocket;