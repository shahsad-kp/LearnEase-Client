import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import {BsCameraVideo, BsCameraVideoOff} from "react-icons/bs";
import {IoMicOffOutline, IoMicOutline} from "react-icons/io5";
import {changeAudioPermission, changeVideoPermission} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {imageBaseURL} from "../../../../api/apiConfiguration.js";

export const SideBarParticipants = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user);
    const dispatcher = useDispatch()

    const [lecturer, students, isLecturer] = useMemo(() => {
        if (!classRoom) {
            return [{}, [], false]
        } else {
            return [classRoom.lecturer, classRoom.students, classRoom.lecturer.id === user.id]
        }
    }, [classRoom, user]);

    const handleAudioButton = (userId, value) => {
        if (!isLecturer) return;
        // TODO : send to
        dispatcher(changeAudioPermission({userId, value}))
    }

    const handleVideoButton = (userId, value) => {
        if (!isLecturer) return;
        // TODO : send to server
        dispatcher(changeVideoPermission({userId, value}))
    }

    return (
        <div className={'gap-4 p-3 flex flex-col h-full'}>
            <div className={'gap-2 h-min flex flex-col'}>
                <h2 className={'font-semibold border-b-2'}>Lecturer</h2>
                <div className={'flex flex-row gap-2 items-center'}>
                    {
                        isLecturer && <>
                            <button
                                className={'rounded p-1 bg-primary'}>
                                {
                                    lecturer.settings.video.enabled ? <BsCameraVideo/> : <BsCameraVideoOff/>
                                }
                            </button>
                            <button
                                className={'rounded p-1 bg-primary'}>
                                {
                                    lecturer.settings.audio.enabled ? <IoMicOutline/> : <IoMicOffOutline/>
                                }
                            </button>
                            {/*<button*/}
                            {/*    className={'rounded p-1 bg-primary'}>*/}
                            {/*    {*/}
                            {/*            lecturer.settings.screenShare ? <LuScreenShare/> : <LuScreenShareOff/>*/}
                            {/*    }*/}
                            {/*</button>*/}
                        </>
                    }

                    <img
                        src={`${imageBaseURL}${lecturer.profilePicture}`}
                        alt={''}
                        className={'object-cover w-8 h-8 rounded-full'}/>
                    <span className={'font-normal'}>{lecturer.name}</span>
                </div>
            </div>
            <div className={'gap-2 flex flex-col h-[calc(100%-89px)] w-full'}>
                <h2 className={'font-semibold border-b-2'}>Students <span>({students.length})</span></h2>
                <div className={'overflow-y-scroll'}>
                    <ul className={'h-min gap-2 flex flex-col'}>
                        {students.map((student, index) => {
                            return <li
                                className={'flex flex-row gap-2 items-center'}
                                key={index}
                            >
                                {
                                    isLecturer && <>
                                        <button
                                            className={'rounded p-1' + (student.settings.video.permission ? ' bg-primary' : ' bg-dangerColor')}
                                            onClick={() => handleVideoButton(student.id, !student.settings.video.permission)}
                                        >
                                            {
                                                student.settings.video.permission ?
                                                    (student.settings.video.enabled ? <BsCameraVideo/> :
                                                        <BsCameraVideoOff/>) :
                                                    <BsCameraVideoOff/>
                                            }
                                        </button>
                                        <button
                                            className={'rounded p-1' + (student.settings.audio.permission ? ' bg-primary' : ' bg-dangerColor')}
                                            onClick={() => handleAudioButton(student.id, !student.settings.audio.permission)}
                                        >
                                            {
                                                student.settings.audio.permission ?
                                                    (student.settings.audio.enabled ? <IoMicOutline/> :
                                                        <IoMicOffOutline/>) :
                                                    <IoMicOffOutline/>
                                            }
                                        </button>
                                        {/*<button*/}
                                        {/*    className={'rounded p-1' + (student.settings.screenShare.permission ? ' bg-primary' : ' bg-dangerColor')}>*/}
                                        {/*    {*/}
                                        {/*        student.settings.screenShare.permission ?*/}
                                        {/*            (student.settings.screenShare.enabled ? <LuScreenShare/> : <LuScreenShareOff/>) :*/}
                                        {/*            <LuScreenShareOff/>*/}
                                        {/*    }*/}
                                        {/*</button>*/}
                                    </>
                                }
                                <img
                                    src={`${imageBaseURL}${student.profilePicture}`}
                                    alt={''}
                                    className={'object-cover w-8 h-8 rounded-full'}
                                />
                                <span className={'font-normal'}>{student.name}</span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}