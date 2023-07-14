import {useSelector} from "react-redux";
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";
import {VideoCall} from "../../../../UtilityComponents/VideoCall/VideoCall.jsx";
import {useMemo, useRef, useState} from "react";

export const RightSmallVideos = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom)
    const [pageNumber, setPageNumber] = useState(0);
    const videos = useRef(null);
    const students = useMemo(() => {
        if (!classRoom) return [];
        return classRoom.students.filter(student => !student.isSelf);
    }, [classRoom]);

    const scrollDown = () => {
        if (videos.current) {
            videos.current.scrollTop = videos.current.scrollTop + videos.current.offsetHeight;
        }
    };

    const scrollTop = () => {
        if (videos.current) {
            videos.current.scrollTop = videos.current.scrollTop - videos.current.offsetHeight;
        }
    };

    return (
        students.length > 0 &&
        <div className={'flex flex-col bg-secondary gap-1.5 shadow rounded p-2 w-min h-full'}>
            <div className={'w-full h-full overflow-y-scroll'} ref={videos}>
                <div className={'flex flex-col gap-1.5 h-min w-full'}>
                    {
                        classRoom.students.map((student, index) => {
                            return <VideoCall
                                key={index}
                                className={'!w-[250px] !h-[150px]'}
                                name={student.name}
                                userId={student.id}
                                isLecturer={false}
                                height={'150px'}
                                width={'250px'}
                            />
                        })
                    }
                </div>
            </div>
            <div className={'flex flex-row justify-start gap-1.5'}>
                <BsArrowLeftCircle
                    className={` w-5 h-5 cursor-pointer ${pageNumber !== 0 ? ' fill-logo-green' : ' fill-gray-400'}`}
                    onClick={scrollTop}
                />
                <BsArrowRightCircle
                    className={`w-5 h-5 cursor-pointer ${pageNumber !== 5 ? ' fill-logo-green' : ' fill-gray-400'}`}
                    onClick={scrollDown}
                />
            </div>
        </div>
    )
}