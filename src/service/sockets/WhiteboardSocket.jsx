import {createContext, useCallback, useMemo} from "react";
import {wsBaseUrl} from "../api/socket.js";
import {useDispatch} from "react-redux";
import {addLine} from "../../redux/whiteboardSlice/whiteboardSlice.js";
import useWebSocket from "react-use-websocket";
import {refreshToken} from "../api/apiConfiguration.js";

// eslint-disable-next-line react-refresh/only-export-components
export const whiteboardContext = createContext({})

// eslint-disable-next-line react/prop-types
const WhiteboardSocket = ({children, roomId, accessToken, setAccessToken}) => {
    const endPoint = useMemo(() => {
        return `${wsBaseUrl}whiteboard/${roomId}/?token=${accessToken}`
    }, [roomId, accessToken]);

    const dispatch = useDispatch();

    const onOpen = useCallback(() => {
        console.log('connected to whiteboard');
    }, []);

    const onMessage = useCallback((e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'line') {
            const {line} = data;
            dispatch(addLine(line));
        } else if (data.type === 'clear_data') {
            const line = {clear: true}
            dispatch(addLine(line));
        }
    }, [dispatch]);

    const onError = useCallback((e) => {
        console.log('error on whiteboard', e);
    }, []);

    const onClose = useCallback((e) => {
        console.log('disconnected from whiteboard');
    }, [])

    const socket = useWebSocket(
        endPoint,
        {
            onOpen,
            onError,
            onMessage,
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
        }
    )

    const sendWhiteboardToServer = useCallback((new_data) => {
        const data = {
            type: 'new_data',
            data: new_data
        }
        socket.sendJsonMessage(data);
    }, [socket]);
    
    const sendClearToServer = useCallback(() => {
        const data = {
            type: 'clear_data'
        }
        socket.sendJsonMessage(data);
    }, [socket]);

    const sendLineToServer = useCallback((line) => {
        const data = {
            type: 'new_line',
            line
        }
        socket.sendJsonMessage(data);
    }, [socket]);

    const data = useMemo(() => {
        return {
            sendWhiteboardToServer,
            sendClearToServer,
            sendLineToServer
        }
    }, [sendClearToServer, sendLineToServer, sendWhiteboardToServer]);

    return (<whiteboardContext.Provider value={data}>
        {children}
    </whiteboardContext.Provider>)
}

export default WhiteboardSocket;