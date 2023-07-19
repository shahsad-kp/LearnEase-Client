import {useContext, useEffect, useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {videoCallContext} from "../../../service/sockets/VideoCallSocket.jsx";
import ConnectionAnimation from '../../../assets/loading-images/connecting.gif';

// eslint-disable-next-line react/prop-types
export const VideoCall = ({name, width, height, isLecturer, userId, className = '', settings}) => {
    const user = useSelector(state => state.auth.user);
    const videoRef = useRef(null);
    const {videoConnections, localStream, connectedUsers, gotLocalStream} = useContext(videoCallContext);

    const connected = useMemo(() => connectedUsers.has(userId), [connectedUsers, userId]);
    const isSelf = useMemo(() => user.id === userId, [user, userId]);
    const videoAttached = useRef(false);
    const mediaStream = useRef(null);

    const videoStatus = useMemo(() => {
        if (!settings) {
            videoAttached.current = false;
            return false
        }
        // eslint-disable-next-line react/prop-types
        else if (!settings.video.permission) {
            videoAttached.current = false;
            return false
        }
        // eslint-disable-next-line react/prop-types
        else if (!settings.video.enabled) {
            videoAttached.current = false;
            return false
        } else {
            return true
        }
        // eslint-disable-next-line react/prop-types
    }, [settings]);

    const display = useMemo(() => {
        if (!connected && !isSelf) {
            videoAttached.current = false;
            return <img
                key={`loading-${userId}`}
                className={`absolute object-cover object-center rounded w-[${width}] h-[${height}]`}
                style={{height: '100%', width: '100%'}}
                src={ConnectionAnimation}
                alt={''}
            />
        }
        if (!videoStatus){
            videoAttached.current = false;
            return <div
                key={`video-${userId}`}
                className={`absolute bg-black object-center rounded w-[${width}] h-[${height}]`}
                style={{height: '100%', width: '100%'}}
            >
                <span>Camera Off</span>
            </div>
        }
        else if (isSelf){
            return <video
                key={`video-${userId}`}
                className={`absolute object-cover object-center rounded w-[${width}] h-[${height}]`}
                muted={isSelf}
                ref={videoRef}
                style={{height: '100%', width: '100%'}}
                autoPlay={true}
                loop={true}
            />
        }

        else{
            return <video
                key={`video-${userId}`}
                className={`absolute object-cover object-center rounded w-[${width}] h-[${height}]`}
                muted={isSelf}
                ref={videoRef}
                style={{height: '100%', width: '100%'}}
                autoPlay={true}
                loop={true}
            />
        }
    }, [videoStatus, connected, height, isSelf, userId, width])

    useEffect(() => {
        if (videoStatus && !videoAttached.current) {
            if (!videoRef.current) {
                return;
            }
            else if (isSelf && gotLocalStream){
                videoRef.current.srcObject = localStream.current;
                videoAttached.current = true;
            }
            else if (connected) {
                console.log(videoConnections)
                mediaStream.current = videoConnections.current.get(userId).remoteStream;
                videoRef.current.srcObject = mediaStream.current;
                videoAttached.current = true;
            }
        }
    }, [videoStatus, connected, gotLocalStream, isSelf, localStream, userId, videoConnections]);

    return (
        <div
            className={`h-full bg-cover bg-center rounded relative w-[${width}] h-[${height}] ${className}`}
        >
            {display}
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