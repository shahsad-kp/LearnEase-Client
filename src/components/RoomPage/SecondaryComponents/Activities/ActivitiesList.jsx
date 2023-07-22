import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {activityContext} from "../../../../service/sockets/ActivitySocket.jsx";
import {getAllActivities} from "../../../../service/api/activities.js";
import {setActivities} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {ProgressBar} from "../../../UtilityComponents/ProgressBar/ProgressBar.jsx";
import {IoListOutline} from "react-icons/io5";
import {CreateActivityModal} from "./CreateActivityModal.jsx";
import {ActivityModal} from "./ActivityModal.jsx";

export const ActivitiesList = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user);
    const dispatcher = useDispatch();
    const activitiesRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [activity, setActivity] = useState(null);
    const [activityModalOpen, setActivityModalOpen] = useState(false);
    const {addResponseToServer} = useContext(activityContext)

    useEffect(() => {
        if (classRoom) {
            if (classRoom.activities === undefined) {
                getAllActivities({roomId: classRoom.id}).then(data => {
                    dispatcher(setActivities(data));
                })
            }
        }
    }, [classRoom, dispatcher]);

    const {activities, isLecturer, noOfStudents} = useMemo(
        () => {
            if (!(classRoom && classRoom.activities)) {
                return {activities: [], noOfStudents: 0, isLecturer: false};
            }
            let activities = classRoom.activities.map(activity => {
                const correctResponses = activity.responses.filter(response => response.isCorrect);
                const userResponse = activity.responses.find(response => response.userId === user.id);
                const responses = activity.responses.map(response => {
                    const user = classRoom.students.find(student => student.id === response.userId);
                    const name = user.name;
                    let option = activity.options.find(option => option.id === response.optionId)
                    option = option.option
                    return {
                        isCorrect: response.isCorrect,
                        name,
                        response: option
                    }
                })
                return {
                    id: activity.id,
                    question: activity.question,
                    totalResponses: activity.responses,
                    totalCorrectResponses: correctResponses.length,
                    options: activity.options,
                    response: userResponse,
                    responses,
                }
            })
            return {
                activities,
                isLecturer: classRoom.lecturer.id === user.id,
                noOfStudents: classRoom.students.length
            };
        },
        [classRoom, user]
    );

    useEffect(() => {
        if (activitiesRef.current) activitiesRef.current.scrollTop = activitiesRef.current.scrollHeight;
    }, [activities]);

    const changeResponse = (optionId, activityId) => {
        addResponseToServer({optionId, activityId})
    }

    if (!activities) return <div/>;
    return (
        <>
            <div className={'md:p-3 gap-2 bg-primary dark:bg-dark-primary h-full flex flex-col rounded-sm w-full'}>
                <div className={'overflow-y-scroll w-full gap-2 flex flex-col h-full'}>
                    {
                        activities.map((activity) => {
                            return (
                                <div
                                    key={activity.id}
                                    className={'p-2 bg-secondary dark:bg-dark-secondary rounded flex flex-col gap-2 w-full'}
                                    onClick={() => {
                                        if (!isLecturer) return;
                                        setActivity(activity);
                                        setActivityModalOpen(true);
                                    }}
                                >
                                    <h5 className={'font-bold text-[11px]'}>{activity.question}</h5>
                                    {isLecturer
                                        ? <ul style={{listStyle: "disc"}} className={'px-3'}>
                                            <li className={'text-[11px] text-black dark:text-white'}>Total
                                                Response: {activity.totalResponses.length}</li>
                                            <li className={'text-[11px] text-black dark:text-white'}>Total Right
                                                Answers: {activity.totalCorrectResponses}</li>
                                        </ul>
                                        : <form className={'flex flex-col gap-1'}>
                                            {
                                                activity.options.map((option, index) => {
                                                        let className;
                                                        if (
                                                            activity.response &&
                                                            activity.response.optionId === option.id
                                                        ) {
                                                            if (activity.response.isCorrect) {
                                                                className = 'text-green-500'
                                                            } else {
                                                                className = 'text-red-500'
                                                            }
                                                        }
                                                        return (
                                                            <li
                                                                key={index}
                                                                className={'text-[11px] flex flex-row'}>
                                                                <input
                                                                    value={option}
                                                                    type={'radio'}
                                                                    name={`activity-${activity.id}`}
                                                                    className={'mr-2'}
                                                                    onChange={() => changeResponse(
                                                                        option.id,
                                                                        activity.id
                                                                    )}
                                                                    checked={
                                                                        activity.response &&
                                                                        activity.response.optionId === option.id
                                                                    }
                                                                    disabled={activity.response}
                                                                />
                                                                <p className={className}>{option.option}</p>
                                                            </li>
                                                        )
                                                    }
                                                )
                                            }
                                        </form>
                                    }
                                    {
                                        isLecturer && <ProgressBar
                                            color={'#FCBD02'}
                                            current={activity.totalResponses}
                                            max={noOfStudents}
                                        />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {isLecturer && <button
                    className={'w-full p-2 h-10 bg-accent-color-one dark:bg-dark-accent-color-one rounded justify-center items-center flex gap-2'}
                    type={'submit'}
                    onClick={() => {
                        setShowModal(isLecturer);
                    }}
                >
                    <IoListOutline className={'text-black dark:text-white'}/>
                    <span className={'text-black dark:text-white'}>New Quiz</span>
                </button>}
            </div>
            {
                showModal &&
                <CreateActivityModal
                    closeFunction={() => setShowModal(false)}
                />
            }
            {
                activityModalOpen &&
                <ActivityModal
                    activity={activity}
                    closeFunction={() => setActivityModalOpen(false)}
                />
            }
        </>
    )
}