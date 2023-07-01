import {ProgressBar, RightSmallVideos} from "../../../../";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {imageBaseURL} from "../../../../../api/apiConfiguration.js";

export const RightSideGrades = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const grades = useMemo(() => {
        if (!classRoom) return [];
        const grades = classRoom.students.map(
            student => ({
                id: student.id,
                name: student.name,
                profilePicture: student.profilePicture,
                totalActivities: (student.grades ? student.grades.totalActivities : 10),
                passedActivities: (student.grades ? student.grades.passedActivities : 5),
                totalPoints: (student.grades ? student.grades.totalPoints : 25)
            })
        );
        grades.sort((nodeA, nodeB) => nodeA.totalPoints - nodeB.totalPoints);
        grades.reverse()
        return grades;
    }, [classRoom])

    

    return (
        <div className={'flex-1 w-full h-[calc(100vh-173px)]'}>
            <div className={'flex flex-row-reverse w-[inherit] h-[inherit] gap-1.5'}>
                <RightSmallVideos/>
                <div className={'flex flex-1 flex-row gap-2.5'}>
                    <div
                        className={'p-2 w-1/3 flex flex-col bg-secondary rounded shadow gap-2 h-full'}>
                        <div className={'flex flex-col gap-1 items-center'}>
                            <h2 className={'font-semibold'}>Leaderboard</h2>
                            <hr className={'w-full'}/>
                        </div>
                        <div className={'h-full overflow-y-auto'}>
                            {
                                grades.map((student) => (
                                    <div key={student.id} className={'flex flex-row gap-2.5 items-center'}>
                                        <div className={'flex flex-row gap-1.5 items-center'}>
                                            <div className={'w-8 h-8 rounded-full bg-primary'}>
                                                <img
                                                    src={imageBaseURL + student.profilePicture}
                                                    alt={student.name} className={'w-full h-full rounded-full'}/>
                                            </div>
                                            <div className={'flex flex-col gap-0.5'}>
                                                <h3 className={'font-semibold'}>{student.name}</h3>
                                                <h4 className={'text-xs text-gray-400'}>{student.totalPoints} points</h4>
                                            </div>
                                        </div>
                                        <div className={'flex flex-col gap-0.5'}>
                                            <h4 className={'text-xs text-gray-400'}>{student.passedActivities}/{student.totalActivities} activities</h4>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className={'grid w-full gap-2.5 h-full overflow-y-auto'} style={{gridTemplateColumns: '1fr 1fr'}}>
                        {
                            grades.map(grade => (
                                <div
                                    key={grade.id}
                                    className={'p-2 w-full bg-secondary h-min flex gap-1 flex-col items-center rounded shadow'}>
                                    <div className={'w-full flex-col gap-2 flex items-center'}>
                                        <div className={'flex flex-row gap-2'}>
                                            <img
                                                src={imageBaseURL + grade.profilePicture}
                                                alt={''}
                                                className={'object-cover w-8 h-8 rounded-full'}
                                            />
                                            <h2 className={'font-semibold'}>{grade.name}</h2>
                                        </div>
                                        <hr className={'w-full'}/>
                                    </div>
                                    <div className={'flex flex-col gap-1 items-center w-full'}>
                                        <span>Total Activities attended: {grade.totalActivities}</span>
                                        <span>Passed Activities: {grade.passedActivities}</span>
                                        <span>Total Points: {grade.totalPoints}</span>
                                    </div>
                                    <ProgressBar
                                        color={'#FCBD02'}
                                        current={grade.totalPoints}
                                        max={50}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}