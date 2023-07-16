import ClassRoomSocket from "./ClassRoomSocket.jsx";
import {useParams} from "react-router-dom";
import VideoCallSocket from "./VideoCallSocket.jsx";
import {useState} from "react";
import WhiteboardSocket from "./WhiteboardSocket.jsx";
import DocumentSocket from "./DocumentSocket.jsx";
import MessageSocket from "../api/MessageSocket.jsx";
import ActivitySocket from "./ActivitySocket.jsx";

// eslint-disable-next-line react/prop-types
export const SocketsProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const {roomId} = useParams();
    return (
        <ClassRoomSocket roomId={roomId} accessToken={accessToken} setAccessToken={setAccessToken}>
            <DocumentSocket roomId={roomId} accessToken={accessToken} setAccessToken={setAccessToken}>
                <MessageSocket roomId={roomId} accessToken={accessToken} setAccessToken={setAccessToken}>
                    <VideoCallSocket roomId={roomId} accessToken={accessToken} setAccessToken={setAccessToken}>
                        <ActivitySocket roomId={roomId} accessToken={accessToken} setAccessToken={setAccessToken}>
                            <WhiteboardSocket roomId={roomId} accessToken={accessToken} setAccessToken={setAccessToken}>
                                {children}
                            </WhiteboardSocket>
                        </ActivitySocket>
                    </VideoCallSocket>
                </MessageSocket>
            </DocumentSocket>
        </ClassRoomSocket>
    )
}