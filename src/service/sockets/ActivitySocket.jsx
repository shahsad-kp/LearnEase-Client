import {createContext, useCallback, useMemo} from "react";
import {wsBaseUrl} from "../api/socket.js";
import {useDispatch} from "react-redux";
import {addActivity, addResponse} from "../../redux/classRoomSlice/classRoomSlice.js";
import useWebSocket from "react-use-websocket";
import {refreshToken} from "../api/apiConfiguration.js";

// eslint-disable-next-line react-refresh/only-export-components
export const activityContext = createContext({})

// eslint-disable-next-line react/prop-types
const ActivitySocket = ({children, roomId, accessToken, setAccessToken}) => {
    const endPoint = useMemo(() => {
        return `${wsBaseUrl}activities/${roomId}/?token=${accessToken}`
    }, [roomId, accessToken]);

    const dispatch = useDispatch();

    const onOpen = useCallback(() => {
        console.log('connected to activities');
    }, []);

    const onMessage = useCallback((e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'new_activity') {
            dispatch(addActivity(data.activity))
        } else if (data.type === 'new_response') {
            console.log(data.response)
            dispatch(addResponse(data.response))
        }
    }, [dispatch]);

    const onError = useCallback((e) => {
        console.log('error', e)
    }, []);

    const onClose = useCallback(() => {
        console.log('disconnected from activities');
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

    const sendNewActivityToServer = useCallback((activityData) => {
        const data = {
            type: 'new_activity',
            activity: activityData
        }
        socket.sendJsonMessage(data)
    }, [socket])

    const addResponseToServer = useCallback(({optionId, activityId}) => {
        const data = {
            type: 'new_response',
            data: {
                activityId,
                optionId
            }
        }
        console.log(data, 'sending data')
        socket.sendJsonMessage(data)
    }, [socket])

    const data = useMemo(() => {
        return {
            sendNewActivityToServer,
            addResponseToServer
        }
    }, [sendNewActivityToServer, addResponseToServer])

    return (
        <activityContext.Provider value={data}>
            {children}
        </activityContext.Provider>
    )
}


export default ActivitySocket;