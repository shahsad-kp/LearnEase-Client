import {IoMicOffOutline, IoMicOutline, IoStopCircleOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineHandRaised} from "react-icons/hi2";
import {LuScreenShare, LuScreenShareOff} from "react-icons/lu";
import {useCallback, useState} from "react";
import {MdLogout} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {BsCameraVideo, BsCameraVideoOff, BsCast} from "react-icons/bs";
import {IoMdRadioButtonOn} from "react-icons/io";
import {
    changeAudioSetting,
    changeScreenShareSetting,
    changeVideoSetting
} from "../../../../redux/classRoomSlice/classRoomSlice.js";

export const RightToolbar = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const [recording, setRecording] = useState(false);
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    const takeUserData = useCallback(() => {
        if (!classRoom) {
            return {userSettings: null, userData: null, isLecturer: null};
        }
        let userSettings = null;
        let userData;
        if (classRoom.isLecturer) {
            userSettings = {
                audio: {
                    permission: true,
                    enabled: classRoom.lecturer.settings.audio,
                },
                video: {
                    permission: true,
                    enabled: classRoom.lecturer.settings.video,
                },
                whiteBoard: {
                    permission: true,
                    enabled: classRoom.lecturer.settings.whiteBoard,
                },
                screenShare: {
                    permission: true,
                    enabled: classRoom.lecturer.settings.screenShare,
                }
            }
            userData = {
                id: classRoom.lecturer.id,
                name: classRoom.lecturer.name,
                profilePicture: classRoom.lecturer.profilePicture,
            }
        } else {
            for (let student of classRoom.students) {
                if (student.isSelf) {
                    userSettings = student.settings
                    userData = {
                        id: student.id,
                        name: student.name,
                        profilePicture: student.profilePicture,
                    }
                    break;
                }
            }
        }
        return {userSettings, userData, isLecturer: classRoom.isLecturer};
    }, [classRoom])

    const {userSettings, userData, isLecturer} = takeUserData();

    let audioControl;
    let videoControl;
    let screenShareControl;

    if (userSettings !== null) {
        if (userSettings.audio.permission && userSettings.audio.enabled) {
            audioControl = {
                icon: <IoMicOffOutline className={'w-12 h-full'}/>,
                status: true,
                permission: true,
            }
        } else {
            if (userSettings.audio.permission) {
                audioControl = {
                    icon: <IoMicOutline className={'w-12 h-full'}/>,
                    status: false,
                    permission: true,
                }
            } else {
                audioControl = {
                    icon: <IoMicOffOutline className={'w-12 h-full'} color={'white'}/>,
                    status: false,
                    permission: false,
                }
            }
        }

        if (userSettings.video.permission && userSettings.video.enabled) {
            videoControl = {
                icon: <BsCameraVideoOff className={'w-12 h-full'}/>,
                status: true,
                permission: true,
            }
        } else {
            if (userSettings.video.permission) {
                videoControl = {
                    icon: <BsCameraVideo className={'w-12 h-full'}/>,
                    status: false,
                    permission: true,
                }
            } else {
                videoControl = {
                    icon: <BsCameraVideoOff className={'w-12 h-full'} color={'white'}/>,
                    status: false,
                    permission: false,
                }
            }
        }

        if (userSettings.screenShare.permission && userSettings.screenShare.enabled) {
            screenShareControl = {
                icon: <LuScreenShareOff className={'w-12 h-full'}/>,
                status: true,
                permission: true,
            }
        } else {
            if (userSettings.screenShare.permission) {
                screenShareControl = {
                    icon: <LuScreenShare className={'w-12 h-full'}/>,
                    status: false,
                    permission: true,
                }
            } else {
                screenShareControl = {
                    icon: <LuScreenShareOff className={'w-12 h-full'} color={'white'}/>,
                    status: false,
                    permission: false,
                }
            }
        }
    }

    const controlMic = (status) => {
        // TODO: control mic
        if (!userSettings.audio.permission){
            return;
        }
        dispatcher(changeAudioSetting({
            userId: userData.id,
            value: !status,
            isLecturer: isLecturer
        }))
    }

    const controlVideo = (status) => {
        // TODO: control video
        if (!userSettings.video.permission){
            return;
        }
        dispatcher(changeVideoSetting({
            userId: userData.id,
            value: !status,
            isLecturer: isLecturer
        }))
    }

    const controlScreenShare = (status) => {
        // TODO: control screen share
        if (!userSettings.screenShare.permission){
            return;
        }
        dispatcher(changeScreenShareSetting({
            userId: userData.id,
            value: !status,
            isLecturer: isLecturer
        }))
    }

    const recordVideo = () => {
        // TODO: record video
        setRecording(!recording)
    }

    const raiseHand = () => {
        // TODO: raise hand
    }

    const leaveClass = () => {
        // TODO: leave class
        navigator('/');
    }

    if (!userSettings) {
        return <div></div>
    }

    return (
        <div className={'bg-secondary p-2 h-min shadow rounded-md flex flex-row justify-between'}>
            <div className={'flex flex-row gap-2.5'}>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (audioControl.permission ? (audioControl.status ? ' !bg-accent-color-one' : '') : ' !bg-red-400')}
                        onClick={() => controlMic(audioControl.status)}
                    >
                        {audioControl.icon}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}
                    >{audioControl.permission ? (audioControl.status ? "Mute" : "Unmute") : "Restricted"}</span>
                </div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (videoControl.permission ? (videoControl.status ? ' !bg-accent-color-one' : '') : ' !bg-red-300')}
                        onClick={() => controlVideo(videoControl.status)}
                    >
                        {videoControl.icon}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{videoControl.permission ? (videoControl.status ? "Video Off" : "Video On") : "Restricted"}</span>
                </div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (recording ? ' !bg-accent-color-one' : '')}
                        onClick={() => recordVideo()}
                    >
                        {recording ? <IoStopCircleOutline className={'w-12 h-full'} color={'#df073d'}/> :
                            <IoMdRadioButtonOn className={'w-12 h-full'}/>}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{recording ? "Stop" : "Record"}</span>
                </div>
            </div>
            <div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (screenShareControl.permission ? (screenShareControl.status ? ' !bg-accent-color-one' : '') : ' !bg-red-300')}
                        onClick={() => controlScreenShare(screenShareControl.status)}
                    >
                        <BsCast className={'w-12 h-full'}/>
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{screenShareControl.permission ? (screenShareControl.status ? "Stop Sharing" : "Screen Share") : "Restricted"}</span>
                </div>
            </div>
            <div className={'justify-between flex flex-row gap-2.5'}>
                {!isLecturer && <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + ' active:bg-accent-color-one'}
                        onClick={() => raiseHand()}
                    >
                        <HiOutlineHandRaised className={'w-12 h-full'}/>
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>Raise Hand</span>
                </div>}
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-dangerColor rounded active:bg-red-400'}
                        onClick={() => leaveClass()}
                    >
                        <MdLogout className={'w-12 h-full'} color={'white'}/>
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{isLecturer ? 'End Class' : 'Leave Class'}
                    </span>
                </div>
            </div>
        </div>
    )
}