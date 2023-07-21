import {IoMicOffOutline, IoMicOutline} from "react-icons/io5";
import {BsCameraVideo, BsCameraVideoOff, BsCast} from "react-icons/bs";
import {HiOutlineHandRaised} from "react-icons/hi2";
import {MdLogout} from "react-icons/md";
import {useCallback, useContext, useMemo} from "react";
import {videoCallContext} from "../../../../service/sockets/VideoCallSocket.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const VideoControllerControlBar = () => {
    const {toggleMic, toggleCamera} = useContext(videoCallContext);
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    
    const userSettings= useMemo(
        () => {
            if (!classRoom) {
                return null;
            }
            let userSettings = null;
            if (classRoom.lecturer.id === user.id) {
                userSettings = classRoom.lecturer.settings
            } else {
                for (let student of classRoom.students) {
                    if (student.id === user.id) {
                        userSettings = student.settings
                        break;
                    }
                }
            }
            return userSettings;
        },
        [classRoom, user]
    );

    const videoSetting = useMemo(
        () => userSettings?.video,
        [userSettings]
    );
    const audioSetting = useMemo(
        () => userSettings?.audio,
        [userSettings]
    );
    
    const leaveClass = useCallback(
        () => navigate('/'),
        [navigate]
    )

    if (!userSettings) {
        return null;
    }
    
	return (
		<>
			<div className={'flex flex-row gap-3'}>
				<button
                    className={`rounded-full p-2 active:text-secondary active:bg-accent-color-one ${
                        audioSetting.permission ? (
                            audioSetting.enabled ? 
                                'text-black' : 
                                'text-gray-500'
                            )
                            : 'text-dangerColor'
                    }`}
                    onClick={() => {
                        if (!audioSetting.permission){
                            return;
                        }
                        toggleMic(
                            videoSetting.enabled,
                            !audioSetting.enabled,
                        );
                    }}
                >
                    {
                        audioSetting.permission ? (
                            audioSetting.enabled ?
                                <IoMicOutline/> :
                                <IoMicOffOutline/>
                            )
                            : <IoMicOffOutline/>
                    }
                </button>
				<button
                    className={`rounded-full p-2 active:text-secondary active:bg-accent-color-one ${
                        videoSetting.permission ? (
                            videoSetting.enabled ? 
                                'text-black' : 
                                'text-gray-500'
                            )
                            : 'text-dangerColor'
                    }`}
                    onClick={() => {
                        if (!videoSetting.permission){
                            return;
                        }
                        toggleCamera(
                            !videoSetting.enabled,
                            audioSetting.enabled
                        );
                    }}
                >
                    {
                        videoSetting.permission ? (
                            videoSetting.enabled ?
                                <BsCameraVideo/> :
                                <BsCameraVideoOff/>
                            )
                            : <BsCameraVideoOff/>
                    }
                </button>
			</div>
			<div className={'flex flex-row gap-3'}>
				<button
                    className={`rounded-full p-2 active:text-secondary active:bg-accent-color-one`}
                >
                    <BsCast/>
                </button>
			</div>
			<div className={'flex flex-row gap-3'}>
				<button
                    className={`rounded-full p-2 text-gray-500 active:text-secondary active:bg-accent-color-one`}
                >
                    <HiOutlineHandRaised/>
                </button>
				<button
                    className={`rounded-full p-2 text-dangerColor active:text-secondary active:bg-dangerColor`}
                    onClick={leaveClass}
                >
                    <MdLogout/>
                </button>
			</div>
		</>
	)
}