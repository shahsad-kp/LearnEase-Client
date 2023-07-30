import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getAllActivities} from "../../../../service/api/activities.js";
import {setActivities} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {ProgressBar} from "../../../UtilityComponents/ProgressBar/ProgressBar.jsx";

export const GradesPage = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const dispatcher = useDispatch();

    useEffect(() => {
        if (classRoom) {
            if (classRoom.activities === undefined) {
                getAllActivities({roomId: classRoom.id}).then(data => {
                    dispatcher(setActivities(data));
                })
            }
        }
    }, [classRoom, dispatcher]);

    const grades = useMemo(() => {
        if (!(classRoom && classRoom.activities !== undefined)) return [];
        const totalActivities = classRoom.activities.length;
        const grades = classRoom.students.map(
            student => {
                let passedActivities = 0;
                for (const activity of classRoom.activities) {
                    for (const response of activity.responses) {
                        if (response.userId === student.id) {
                            if (response.isCorrect) {
                                passedActivities++;
                            }
                        }
                    }
                }
                return {
                    id: student.id,
                    name: student.name,
                    profilePicture: student.profilePicture,
                    totalActivities,
                    passedActivities,
                    totalPoints: Math.round((50 / totalActivities * passedActivities))
                }
            }
        );
        grades.sort((nodeA, nodeB) => nodeA.totalPoints - nodeB.totalPoints);
        grades.reverse()
        return grades;
    }, [classRoom])


    return (
        <div className={'w-full flex h-full flex-col md:flex-row gap-2'}>
            <div
                className={'hidden w-full h-full md:flex md:flex-1 bg-secondary dark:bg-dark-secondary rounded shadow p-3 gap-2 flex-col items-center'}>
                <div className={'font-semibold text-black dark:text-white'}>Leaderboard</div>
                <hr className={'w-full'}/>
                <div className={'h-full w-full overflow-y-auto flex flex-col gap-2'}>
                    {
                        grades.map((grade, index) => (
                            <div
                                key={grade.id}
                                className={'flex flex-row gap-2 items-center'}
                            >
                                <span className={'font-semibold'}>#{index+1}</span>
                                <img
                                    src={grade.profilePicture}
                                    alt={''}
                                    className={'object-cover w-8 h-8 rounded-full'}
                                />
                                <h2 className={'font-medium text-black dark:text-white'}>{grade.name}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={'w-full h-full flex-[4] overflow-x-auto'}>
                <div className={'w-full h-full grid grid-rows-2 md:grid-cols-2 gap-2'}>
                    {
                        grades.map(grade => (
                            <div
                                key={grade.id}
                                className={'bg-secondary dark:bg-dark-secondary rounded min-w-[33.33%] md:min-w-0 md:w-full gap-1 w-fit p-3 shadow flex flex-col md:h-min'}
                            >
                                <div className={'flex flex-row w-fit gap-2'}>
                                    <img
                                        src={grade.profilePicture}
                                        alt={''}
                                        className={'object-cover w-8 h-8 rounded-full'}
                                    />
                                    <h2 className={'font-semibold text-black dark:text-white'}>{grade.name}</h2>
                                </div>
                                <hr className={'w-full'}/>
                                <div className={'flex flex-col gap-0.5 items-center w-full text-black dark:text-white'}>
                                    <span>Total Activities attended: {grade.totalActivities}</span>
                                    <span>Passed Activities: {grade.passedActivities}</span>
                                    <span>Total Points: {grade.totalPoints}/50</span>
                                </div>
                                <ProgressBar
                                    color={'#FCBD02'}
                                    current={grade.totalPoints}
                                    max={50}
                                    className={'hidden md:block'}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}