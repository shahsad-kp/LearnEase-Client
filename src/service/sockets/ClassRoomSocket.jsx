import {createContext, useCallback, useMemo} from "react";
import useWebSocket from "react-use-websocket";
import {wsBaseUrl} from "../api/socket.js";
import {
    addParticipant,
    changeParticipantSettings,
    removeParticipant
} from "../../redux/classRoomSlice/classRoomSlice.js";
import {useDispatch} from "react-redux";
import {refreshToken} from "../api/apiConfiguration.js";

// eslint-disable-next-line react-refresh/only-export-components
export const classRoomSocketContext = createContext({})

// eslint-disable-next-line react/prop-types
const ClassRoomSocket = ({children, roomId, accessToken, setAccessToken}) => {
    const endPoint = useMemo(() => {
        return `${wsBaseUrl}classroom/${roomId}/?token=${accessToken}`
    }, [roomId, accessToken]);

    const dispatch = useDispatch();

    const onOpen = useCallback(() => {
        console.log('connected to room');
    }, []);

    const onMessage = useCallback((e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'join_student') {
            const student = data.student;
            dispatch(addParticipant(student));
        } else if (data.type === 'leave_student') {
            const student_id = data.student_id;
            dispatch(removeParticipant(student_id));
        } else if (data.type === 'change_settings') {
            const userId = data.user_id;
            const settings = data.settings
            dispatch(changeParticipantSettings({userId, settings}));
        }
    }, [dispatch]);

    const onError = useCallback((e) => {
        console.log('error', e)
    }, []);

    const onClose = useCallback(() => {
        console.log('Disconnected from class room')
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

    const changeSettings = useCallback(({audio, video}) => {
        const data = {
            type: 'change_settings',
            audio,
            video
        }
        socket.sendJsonMessage(data);
    }, [socket]);

    const changePermission = useCallback(({userId, permission}) => {
        const data = {
            type: 'change_permission',
            user_id: userId,
            permission
        }
        socket.sendJsonMessage(data);
    }, [socket]);

    const data = useMemo(() => {
        return {
            changeSettings,
            changePermission,
        }
    }, [changePermission, changeSettings]);

    return (
        <classRoomSocketContext.Provider value={data}>
            {children}
        </classRoomSocketContext.Provider>
    )
}

export default ClassRoomSocket;