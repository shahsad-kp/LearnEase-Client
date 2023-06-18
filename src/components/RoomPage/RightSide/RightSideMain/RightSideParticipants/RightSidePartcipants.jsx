import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";
import {useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {VideoCall} from "../../../../";

export const RightSideParticipants = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom)
    const [pageNumber, setPageNumber] = useState(0);

    const studentsPages = useMemo(() => {
        if (!classRoom) return [];
        const pages = [];
        let page = []
        let row = [];
        const students = classRoom.students;
        for (const student of students) {
            row.push(student);
            if (row.length === 3){
                page.push(row);
                row = [];
                if (page.length === 3){
                    pages.push(page);
                    page = [];
                }
            }
        }
        if (row.length) page.push(row);
        if (page.length) pages.push(page);
        return pages;
    }, [classRoom]);

    const page = useMemo(() => {
        if (!studentsPages.length) return [];
        return studentsPages[pageNumber];
    }, [studentsPages, pageNumber]);

    return (
        <div className={'flex flex-col bg-secondary gap-1.5 shadow rounded p-2 w-full h-full'}>
            <div className={'flex-1 max-h-full rounded'}>
                <div className={'max-h-full h-full flex flex-col gap-1.5'}>
                    {page.map((row, index) => (
                        <div key={index} className={'flex flex-row h-1/3 gap-1.5'}>
                            {row.map((student, index) => (
                                <div key={index} className={'flex flex-col w-1/3 gap-1.5 rounded'}>
                                    <VideoCall isLecturer={false} name={student.name} isSelf={student.isSelf}/>
                                </div>
                            ))}
                        </div>
                    ))}
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
                    className={'w-5 h-5 cursor-pointer ' + (pageNumber !== (studentsPages.length - 1) ? ' fill-logo-green' : ' fill-gray-400')}
                    onClick={() => {
                        setPageNumber(value => {
                            if (value !== (studentsPages.length - 1)) return value + 1;
                            return value;
                        });
                    }}
                />
            </div>
        </div>
    )
}