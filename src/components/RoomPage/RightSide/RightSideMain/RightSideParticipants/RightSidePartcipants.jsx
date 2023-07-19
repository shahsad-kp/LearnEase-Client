import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";
import {useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {VideoCall} from "../../../../UtilityComponents/VideoCall/VideoCall.jsx";

export const RightSideParticipants = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom)
    const [pageNumber, setPageNumber] = useState(0);

    // const studentsPages = useMemo(() => {
    //     if (!classRoom) return [];
    //     const pages = [];
    //     let page = []
    //     let row = [];
    //     for (const student of classRoom.students) {
    //         row.push(student);
    //         if (row.length === 3) {
    //             page.push(row);
    //             row = [];
    //             if (page.length === 3) {
    //                 pages.push(page);
    //                 page = [];
    //             }
    //         }
    //     }
    //     if (row.length) page.push(row);
    //     if (page.length) pages.push(page);
    //     return pages;
    // }, [classRoom]);

    // const page = useMemo(() => {
    //     if (!studentsPages.length) return [];
    //     return studentsPages[pageNumber];
    // }, [studentsPages, pageNumber]);

    const videoCalls = useMemo(() => {
        if (!classRoom) return [];
        return classRoom.students.filter(student => student.isActive)
    }, [classRoom]);

    return (
        <div className={'flex flex-col bg-secondary gap-1.5 shadow rounded p-2 w-full h-[calc(100vh-173px)]'}>
            <div className={'h-full rounded'}>
                <div 
                    className={'max-h-full h-full grid gap-1.5'}
                    style={{
                        gridTemplateRows: 'repeat(3, 1fr)',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                    }}
                >
                    {
                        videoCalls.map((student, index) => (
                            <div key={index} className={'flex flex-col rounded'}>
                                <VideoCall
                                    isLecturer={false}
                                    name={student.name}
                                    userId={student.id}
                                    settings={student.settings}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={'flex flex-row justify-start gap-1.5'}>
                <BsArrowLeftCircle
                    className={' w-5 h-5 cursor-pointer ' + (pageNumber !== 0 ? ' fill-logo-green' : ' fill-gray-400')}
                    onClick={() => {
                        setPageNumber(value => {
                            if (value !== 0) return value - 1;
                            return value;
                        });
                    }}
                />
                <BsArrowRightCircle
                    className={`w-5 h-5 cursor-pointer 
                    ${pageNumber !== (0) ? ' fill-logo-green' : ' fill-gray-400'}`}
                    onClick={() => {
                        setPageNumber(value => {
                            if (value !== (1)) return value + 1;
                            return value;
                        });
                    }}
                />
            </div>
        </div>
    )
}