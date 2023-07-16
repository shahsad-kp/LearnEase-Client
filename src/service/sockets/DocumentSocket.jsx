import {createContext, useCallback, useMemo} from "react";
import store from "../../redux/store.js";
import {addDocument} from "../../redux/classRoomSlice/classRoomSlice.js";
import {wsBaseUrl} from "../api/socket.js";
import useWebSocket from "react-use-websocket";
import {refreshToken} from "../api/apiConfiguration.js";

// eslint-disable-next-line react-refresh/only-export-components
export const documentSocketContext = createContext({});

// eslint-disable-next-line react/prop-types
const DocumentSocket = ({children, roomId, accessToken, setAccessToken}) => {
    const endPoint = useMemo(() => {
        return `${wsBaseUrl}documents/${roomId}/?token=${accessToken}`
    }, [roomId, accessToken]);

    const onOpen = () => {
        console.log('connected to document');
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.document) {
            const document = data.document;

            store.dispatch(addDocument(document));
        }
    };
    const onError = (e) => {
        console.log('error', e);
    }
    const onClose = () => {
        console.log('disconnected from room');
    }

    const socket = useWebSocket(
        endPoint,
        {
            onOpen,
            onClose,
            onMessage,
            onError,
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

    const sendDocumentToServer = useCallback(({document}) => {
        const data = {
            type: 'send_document',
            document
        }
        socket.sendJsonMessage(data);
    }, [socket])

    const data = useMemo(() => {
        return {sendDocumentToServer}
    }, [sendDocumentToServer])

    return (
        <documentSocketContext.Provider value={data}>
            {children}
        </documentSocketContext.Provider>
    )
}

export default DocumentSocket