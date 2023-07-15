import {useContext, useEffect, useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {videoCallContext} from "../../../store/VideoCallProvider.jsx";

// eslint-disable-next-line react/prop-types
export const VideoCall = ({name, width, height, isLecturer, userId, className = ''}) => {
    const user = useSelector(state => state.auth.user);
    const videoRef = useRef(null);
    const {videoConnections, localStream, connectedUsers} = useContext(videoCallContext)
    const mediaRef = useRef(new MediaStream());

    const isSelf = useMemo(() => user.id === userId, [user, userId]);

    useEffect(() => {
        if (isSelf){
            if (!localStream.current) return;
            videoRef.current.srcObject = localStream.current;
        } else {
            if (connectedUsers.has(userId)){
                videoRef.current.srcObject = videoConnections.current.get(userId).remoteStream;
            }
        }
    }, [connectedUsers, isSelf, localStream, userId, videoConnections]);

    return (
        <div
            className={`h-full bg-cover bg-center rounded relative w-[${width}] h-[${height}] ${className}`}
        >
            <video
                className={`relative object-cover object-center rounded w-[${width}] h-[${height}]`}
                muted={isSelf}
                ref={videoRef}
                style={{height: '100%', width: '100%'}}
                autoPlay={true}
            />
            <div className={'absolute left-0 top-0 flex flex-row text-sm'}>
                <div className={'rounded-tl bg-logo-yellow px-2 font-semibold'}>
                    {isLecturer ? 'Lecturer' : 'Student'}
                </div>
                <div className={'rounded-br px-2 ' + (!isSelf ? ' bg-accent-color-one' : ` bg-dangerColor`)}>
                    {isSelf ? 'You' : name}
                </div>
            </div>
        </div>
    )
}