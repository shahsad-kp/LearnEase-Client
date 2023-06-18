import {useSelector} from "react-redux";
import {useMemo} from "react";

export const SideBarParticipants = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);

    const [lecturer, students] = useMemo(() => {
        if (!classRoom) {
            return [{}, []]
        } else {
            return [classRoom.lecturer, classRoom.students];
        }
    }, [classRoom]);


    return (
        <div className={'gap-4 p-3 flex flex-col h-full'}>
            <div className={'gap-2 h-min flex flex-col'}>
                <h2 className={'font-semibold border-b-2'}>Lecturer</h2>
                <div className={'flex flex-row gap-2.5 items-center'}>
                    <img
                        src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                        alt={''}
                        className={'object-cover w-10 h-10 rounded-full'}/>
                    <span className={'font-semibold'}>{lecturer.name}</span>
                </div>
            </div>
            <div className={'gap-2 flex flex-col h-[calc(100%-89px)] w-full'}>
                <h2 className={'font-semibold border-b-2'}>Students <span>({students.length})</span></h2>
                <div className={'overflow-y-scroll'}>
                    <ul className={'h-min gap-2 flex flex-col'}>
                        {students.map((student, index) => {
                            return <li
                                className={'flex flex-row justify-between items-center'}
                                key={index}
                            >
                                <div className={'flex flex-row gap-2.5 items-center'}>
                                    <img
                                        src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                        alt={''}
                                        className={'object-cover w-10 h-10 rounded-full'}
                                    />
                                    <span className={'font-semibold break'}>{student.name}</span>
                                </div>
                                <div>
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}