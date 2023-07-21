import {useCallback, useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {VideoCall} from "../../../UtilityComponents/VideoCall/VideoCall.jsx";
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";

export const VideoCallsPage = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom)
    const videoRef = useRef(null)

    const activeStudents = useMemo(() => {
        if (!classRoom) return [];
        return classRoom.students.filter(student => student.isActive)
    }, [classRoom]);

    const scrollVideo = useCallback((direction) => {
        if (direction === 'right') {
            videoRef.current.scrollTo({
                left: videoRef.current.scrollWidth + 385,
                behavior: 'smooth'
            });
        } else {
            videoRef.current.scrollTo({
                left: videoRef.current.scrollWidth - 385,
                behavior: 'smooth'
            });
        }
    }, [])

    if (!classRoom) return <div></div>

    return (
        <div
            className={'h-full w-full flex flex-col gap-2 p-2 bg-secondary shadow rounded'}
        >
            <div
                className={'flex-1 w-full overflow-x-auto overflow-y-hidden rounded-sm md:overflow-y-auto md:overflow-x-hidden'}
                ref={videoRef}
            >
                <div className={'w-min h-full flex flex-row md:grid md:h-min md:w-full md:grid-cols-3 gap-2'}>
                    <div
                        key={`video-call-full-${classRoom.lecturer.id}`}
                        className={'md:hidden w-[300px] md:w-full h-full md:h-[240px] rounded-sm'}
                    >
                        <VideoCall
                            isLecturer={true}
                            name={classRoom.lecturer.name}
                            userId={classRoom.lecturer.id}
                            settings={classRoom.lecturer.settings}
                        />
                    </div>
                    {activeStudents.map(student => (
                        <div
                            key={`video-call-full-${student.id}`}
                            className={'w-[300px] md:w-full h-full md:h-[240px] rounded-sm'}
                        >
                            <VideoCall
                                isLecturer={false}
                                name={student.name}
                                userId={student.id}
                                settings={student.settings}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={'flex flex-row justify-start gap-1.5'}>
                <button
                    className={'p-0.5 rounded-full'}
                    onClick={() => scrollVideo('left')}
                >
                    <BsArrowLeftCircle
                        className={'w-5 h-5 cursor-pointer fill-logo-green'}
                    />
                </button>
                <button
                    className={'p-0.5 rounded-full'}
                    onClick={() => scrollVideo('right')}
                >
                    <BsArrowRightCircle
                        className={`w-5 h-5 cursor-pointer fill-logo-green`}
                    />
                </button>
            </div>
        </div>
    )
}