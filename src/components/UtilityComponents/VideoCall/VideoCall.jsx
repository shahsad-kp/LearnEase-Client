import {useContext, useEffect, useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {videoCallContext} from "../../../store/VideoCallProvider.jsx";
import ConnectionAnimation from '../../../assets/loading-images/connecting.mp4';

// eslint-disable-next-line react/prop-types
export const VideoCall = ({name, width, height, isLecturer, userId, className = ''}) => {
    const user = useSelector(state => state.auth.user);
    const videoRef = useRef(null);
    const {videoConnections, localStream, connectedUsers, gotLocalStream} = useContext(videoCallContext);

    const connected = useMemo(() => connectedUsers.has(userId), [connectedUsers, userId]);
    const isSelf = useMemo(() => user.id === userId, [user, userId]);
    console.log(connected)
    useEffect(() => {
        if (isSelf) {
            if (!gotLocalStream) return;
            videoRef.current.srcObject = localStream.current
        } else {
            if (connected) {
                videoRef.current.srcObject = videoConnections.current.get(userId).remoteStream;
            }
        }
    }, [connected, gotLocalStream, isSelf, localStream, userId, videoConnections]);

    return (
        <div
            className={`h-full bg-cover bg-center rounded relative w-[${width}] h-[${height}] ${className}`}
        >
            {
                (!connected && !isSelf) ? (
                    <video
                        key={`loading-${userId}`}
                        className={`relative object-cover object-center rounded w-[${width}] h-[${height}]`}
                        style={{height: '100%', width: '100%'}}
                        autoPlay={true}
                        src={ConnectionAnimation}
                        loop={true}
                    />
                ) :
                    <video
                        key={`video-${userId}`}
                        className={`relative object-cover object-center rounded w-[${width}] h-[${height}]`}
                        muted={isSelf}
                        ref={videoRef}
                        style={{height: '100%', width: '100%'}}
                        autoPlay={true}
                        loop={true}
                    />
            }
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