import {IoMicOffOutline, IoMicOutline} from "react-icons/io5";
import {useSelector} from "react-redux";
import {HiOutlineHandRaised, HiOutlineVideoCameraSlash} from "react-icons/hi2";
import {HiOutlineVideoCamera} from "react-icons/hi";
import {LuScreenShare, LuScreenShareOff} from "react-icons/lu";
import {useCallback, useState} from "react";
import {VscRecord} from "react-icons/vsc";
import {MdLogout} from "react-icons/md";

export const RightBarToolbar = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const [recording, setRecording] = useState(false);

    const takeUserData = useCallback(() => {
        if (!classRoom) {
            return {userSettings: null, userData: null, isLecturer: null};
        }
        let userSettings = null;
        let userData;
        if (classRoom.isLecture) {
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
            for (let student in classRoom.students) {
                if (student.isSelf) {
                    userSettings = student.settings
                    userData = {
                        id: student.id,
                        name: student.name,
                        profilePicture: student.profilePicture,
                    }
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
        }
        else {
            if (userSettings.audio.permission) {
                audioControl = {
                    icon: <IoMicOutline className={'w-12 h-full'}/>,
                    status: false,
                    permission: true,
                }
            } else {
                audioControl = {
                    icon: <IoMicOffOutline className={'w-12 h-full'}/>,
                    status: false,
                    permission: false,
                }
            }
        }

        if (userSettings.video.permission && userSettings.video.enabled) {
            videoControl = {
                icon: <HiOutlineVideoCameraSlash className={'w-12 h-full'}/>,
                status: true,
                permission: true,
            }
        }
        else {
            if (userSettings.video.permission) {
                videoControl = {
                    icon: <HiOutlineVideoCamera className={'w-12 h-full'}/>,
                    status: false,
                    permission: true,
                }
            } else {
                videoControl = {
                    icon: <HiOutlineVideoCameraSlash className={'w-12 h-full'}/>,
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
        }
        else {
            if (userSettings.screenShare.permission) {
                screenShareControl = {
                    icon: <LuScreenShare className={'w-12 h-full'}/>,
                    status: false,
                    permission: true,
                }
            } else {
                screenShareControl = {
                    icon: <LuScreenShareOff className={'w-12 h-full'}/>,
                    status: false,
                    permission: false,
                }
            }
        }
    }

    let shareScreenIcon;
    if (!screenShareControl) {
        shareScreenIcon = <LuScreenShareOff className={'w-12 h-full'}/>
    } else {
        if (screenShareControl.permission) {
            if (screenShareControl.status) {
                shareScreenIcon = <LuScreenShareOff className={'w-12 h-full'}/>
            } else {
                shareScreenIcon = <LuScreenShare className={'w-12 h-full'}/>
            }
        } else {
            shareScreenIcon = <LuScreenShareOff className={'w-12 h-full'}/>
        }
    }

    const controlMic = (status) => {
        // TODO: control mic
    }

    const controlVideo = (status) => {
        // TODO: control video
    }

    const controlScreenShare = (status) => {
        // TODO: control screen share
    }

    const recordVideo = () => {
        // TODO: record video
    }

    const raiseHand = () => {
        // TODO: raise hand
    }

    const leaveClass = () => {
        // TODO: leave class
    }

    if (!userSettings) {
        return <div></div>
    }

    return (
        <div className={'bg-secondary p-2 h-min shadow rounded-md flex flex-row justify-between'}>
            <div className={'flex flex-row gap-2.5'}>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (audioControl.permission ? (audioControl.status ? ' !bg-accent-color-one' : '') : ' !bg-gray-600')}
                        onClick={() => controlMic(audioControl.status)}
                    >
                        {audioControl.icon}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}
                    >{audioControl.permission ? (audioControl.status ? "Mute" : "Unmute") : "Muted"}</span>
                </div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (videoControl.permission ? (videoControl.status ? ' !bg-accent-color-one' : '') : ' !bg-gray-600')}
                        onClick={() => controlVideo(videoControl.status)}
                    >
                        {videoControl.icon}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{videoControl.permission ? (videoControl.status ? "Video Off" : "Video On") : "Video Off"}</span>
                </div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (recording ? ' !bg-accent-color-one' : '')}
                        onClick={() => recordVideo()}
                    >
                        {recording ? <VscRecord className={'w-12 h-full'} fill={'red'}/> :
                            <VscRecord className={'w-12 h-full'}/>}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{recording ? "Stop" : "Record"}</span>
                </div>
            </div>
            <div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (screenShareControl.permission ? (screenShareControl.status ? ' !bg-accent-color-one' : '') : ' !bg-gray-600')}
                        onClick={() => controlScreenShare(screenShareControl.status)}
                    >
                        {shareScreenIcon}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{screenShareControl.permission ? (screenShareControl.status ? "Stop Sharing" : "Screen Share") : "Disabled"}</span>
                </div>
            </div>
            <div className={'justify-between flex flex-row gap-2.5'}>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' +  ' active:bg-accent-color-one'}
                        onClick={() => raiseHand()}
                    >
                        <HiOutlineHandRaised className={'w-12 h-full'}/>
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>Raise Hand</span>
                </div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-dangerColor rounded active:bg-red-500'}
                        onClick={() => leaveClass()}
                    >
                        <MdLogout className={'w-12 h-full'}/>
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>Raise Hand</span>
                </div>
            </div>
        </div>
    )
}