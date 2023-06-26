import {IoMicOffOutline, IoMicOutline, IoStopCircleOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineHandRaised} from "react-icons/hi2";
import {useMemo, useRef, useState} from "react";
import {MdLogout} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {BsCameraVideo, BsCameraVideoOff, BsCast} from "react-icons/bs";
import {IoMdRadioButtonOn} from "react-icons/io";
import {
    changeAudioSetting,
    changeScreenShareSetting,
    changeVideoSetting
} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {useReactMediaRecorder} from "react-media-recorder";

export const RightToolbar = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user)
    const navigator = useNavigate();
    const dispatcher = useDispatch();
    const [screenShareControl, setScreenShareControl] = useState();
    const {
        status: recordingStatus,
        startRecording,
        stopRecording,
        mediaBlobUrl
    } = useReactMediaRecorder({screen: true});

    const {userSettings, userData, isLecturer} = useMemo(
        () => {
            if (!classRoom) {
                return {userSettings: null, userData: null, isLecturer: null};
            }
            let userSettings = null;
            let userData;
            if (classRoom.lecturer.id === user.id) {
                userSettings = classRoom.lecturer.settings
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
        },
        [classRoom]
    );

    let audioControl;
    let videoControl;

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
    }

    const controlMic = (status) => {
        // TODO: control mic
        if (!userSettings.audio.permission) {
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
        if (!userSettings.video.permission) {
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
        if (!userSettings.video.permission) {
            return;
        }
        setScreenShareControl(!status);
    }

    const recordVideo = () => {
        if (recordingStatus === 'recording') {
            stopRecording();
            downloadRecording();
        } else {
            startRecording();
        }
    }

    const raiseHand = () => {
        // TODO: raise hand
    }

    const leaveClass = () => {
        // TODO: leave class
        navigator('/');
    }

    if (!userSettings) return <div></div>;

    const downloadRecording = () => {
        const pathName = `LearnEase_${document.title}.mp4`;
        try {
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                // for IE
                window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
            } else {
                // for Chrome
                console.log(mediaBlobUrl);
                const link = document.createElement("a");
                link.href = mediaBlobUrl;
                link.download = pathName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (recordingStatus === 'recording' ? ' !bg-accent-color-one' : '')}
                        onClick={() => recordVideo()}
                    >
                        {recordingStatus === 'recording' ?
                            <IoStopCircleOutline className={'w-12 h-full'} color={'#df073d'}/> :
                            <IoMdRadioButtonOn className={'w-12 h-full'}/>}
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{recordingStatus === 'recording' ? "Stop" : "Record"}</span>
                </div>
            </div>
            <div>
                <div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'}>
                    <button
                        className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (videoControl.permission ? (screenShareControl ? ' !bg-accent-color-one' : '') : ' !bg-red-300')}
                        onClick={() => controlScreenShare(screenShareControl)}
                    >
                        <BsCast className={'w-12 h-full'}/>
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{videoControl.permission ? (screenShareControl ? "Stop Sharing" : "Screen Share") : "Restricted"}
                    </span>
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
                        <MdLogout className={'w-12 h-full xl:fill-white fill-dangerColor'} color={'white'}/>
                    </button>
                    <span
                        className={'w-full font-medium text-[10px] text-center'}>{isLecturer ? 'End Class' : 'Leave Class'}
                    </span>
                </div>
            </div>
        </div>
    )
}