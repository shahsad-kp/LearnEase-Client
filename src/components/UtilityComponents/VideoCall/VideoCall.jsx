import {useContext, useEffect, useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {videoCallContext} from "../../../store/VideoCallProvider.jsx";

// eslint-disable-next-line react/prop-types
export const VideoCall = ({name, width, height, isLecturer, userId, className = ''}) => {
    const user = useSelector(state => state.auth.user);
    const videoRef = useRef(null);
    const {videoConnections, localStream} = useContext(videoCallContext)

    const isSelf = useMemo(() => user.id === userId, [user, userId]);

    useEffect(() => {
        if (isSelf){
            if (!localStream.current) return;
            console.log('localStream', localStream.current)
            videoRef.current.srcObject = localStream.current;
        } else {
            if (!videoConnections.current) return;
            const connection = videoConnections.current.find(connection => connection.userId === userId);
            if (connection){
                console.log('connection', connection)
                videoRef.current.srcObject = connection.remoteStream;
            }
        }
    }, [isSelf, localStream, userId, videoConnections]);

    return (
        <div
            className={`h-full bg-cover bg-center rounded relative w-[${width}] h-[${height}] ${className}`}
        >
            <video
                className={`relative object-cover object-center rounded w-[${width}] h-[${height}]`}
                muted={isSelf}
                ref={videoRef}
                style={{height: '100%', width: '100%'}}
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