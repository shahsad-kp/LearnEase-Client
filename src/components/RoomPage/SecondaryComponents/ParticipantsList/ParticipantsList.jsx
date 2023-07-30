import {useSelector} from "react-redux";
import {Skeleton} from "@mui/material";

export const ParticipantsList = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom)

    if (!classRoom) {
        return (<>
            <div className={'flex flex-col gap-2'}>
                <div className={'font-semibold text-black dark:text-white'}>Lecturer</div>
                <hr width={'100%'} className={'h-0.5 bg-[#838383]'}/>
                <div className={'flex flex-col gap-1 items-center w-full'}>
                    <div className={'flex flex-row gap-2 items-center w-full'}>
                        <Skeleton variant="circular" width={40} height={40}/>
                        <div className={'flex flex-col gap-1 w-full'}>
                            <Skeleton width="60%"/>
                            <Skeleton width="30%"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col gap-2'}>
                <div className={'font-semibold text-black dark:text-white'}>Students</div>
                <hr width={'100%'} className={'h-0.5 bg-[#838383]'}/>
                <div className={'flex flex-col gap-1 items-center w-full overflow-y-auto'}>
                    <div className={'flex flex-row gap-2 items-center w-full'}>
                        <Skeleton variant="circular" width={40} height={40}/>
                        <div className={'flex flex-col gap-1 w-full'}>
                            <Skeleton width="60%"/>
                            <Skeleton width="30%"/>
                        </div>
                    </div>
                    <div className={'flex flex-row gap-2 items-center w-full'}>
                        <Skeleton variant="circular" width={40} height={40}/>
                        <div className={'flex flex-col gap-1 w-full'}>
                            <Skeleton width="60%"/>
                            <Skeleton width="30%"/>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }

    return (<>
        <div className={'flex flex-col gap-2'}>
            <div className={'font-semibold text-black dark:text-white'}>Lecturer</div>
            <hr width={'100%'} className={'h-0.5 bg-[#838383]'}/>
            <div className={'flex flex-col gap-1 items-center w-full'}>
                <div className={'flex flex-row gap-2 items-center w-full'}>
                    <div
                        className={'h-[40px] w-[40px] rounded-full'}
                    >
                        <img
                            src={classRoom.lecturer.profilePicture}
                            alt={'Lecturer Profile Image'}
                            className={'object-contain rounded-full'}
                        />
                    </div>
                    <div className={'flex flex-col justify-between w-full'}>
                        <span className={'font-semibold text-black dark:text-white'}>{classRoom.lecturer.name}</span>
                        <span className={'font-thin text-black dark:text-white'}>{classRoom.lecturer.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={'flex flex-col gap-2'}>
            <div className={'font-semibold text-black dark:text-white'}>Students</div>
            <hr width={'100%'} className={'h-0.5 bg-[#838383]'}/>
            <div className={'flex flex-col gap-1 items-center w-full overflow-y-auto'}>
                {classRoom.students.map(student => (
                    <div
                        key={student.id}
                        className={'flex flex-row gap-2 items-center w-full'}
                    >
                        <div
                            className={'h-[40px] w-[40px] rounded-full'}
                        >
                            <img
                                src={student.profilePicture}
                                alt={'Lecturer Profile Image'}
                                className={'object-contain rounded-full'}
                            />
                        </div>
                        <div className={'flex flex-col justify-between w-full'}>
                            <span className={'font-semibold text-black dark:text-white'}>{student.name}</span>
                            <span className={'font-thin text-black dark:text-white'}>{student.isActive ? 'Active' : 'Inactive'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}