import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useRef} from "react";
import {addResponse, setActivities} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {IoSendOutline} from "react-icons/io5";
import {ProgressBar} from "../../../UtilityComponents/ProgressBar/ProgressBar.jsx";

export const SideBarActivity = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const dispatcher = useDispatch();
    const activitiesRef = useRef(null);

    useEffect(() => {
        if (classRoom) {
            if (classRoom.activities === null) {
                // TODO: take messages from server

                const activities = [
                    {
                        id: 1,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 3,
                        totalCorrectResponses: 1,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'HTML',
                    },
                    {
                        id: 2,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 4,
                        totalCorrectResponses: 2,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'HTML',
                    },
                    {
                        id: 3,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 10,
                        totalCorrectResponses: 5,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'Python',
                    },
                    {
                        id: 4,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 15,
                        totalCorrectResponses: 10,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'Java',
                    },
                    {
                        id: 5,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 20,
                        totalCorrectResponses: 15,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'C++',
                    },
                    {
                        id: 6,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 21,
                        totalCorrectResponses: 16,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'C++',
                    },
                    {
                        id: 7,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 18,
                        totalCorrectResponses: 13,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'Python',
                    },
                    {
                        id: 8,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 14,
                        totalCorrectResponses: 9,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'Python',
                    },
                    {
                        id: 9,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 22,
                        totalCorrectResponses: 17,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: 'Python',
                    },
                    {
                        id: 10,
                        title: 'Which of the following is NOT a programming language?',
                        options: ['Python', 'Java', 'C++', 'HTML'],
                        correctAnswer: 'HTML',
                        totalResponses: 2,
                        totalCorrectResponses: 1,
                        responses: [
                            {
                                "id": 1,
                                "name": "Emma Smith",
                                "response": 'Python',
                                "isCorrect": false
                            },
                            {
                                "id": 2,
                                "name": "John Doe",
                                "response": 'Java',
                                "isCorrect": false
                            },
                            {
                                "id": 3,
                                "name": "Jane Doe",
                                "response": 'C++',
                                "isCorrect": false
                            },
                            {
                                "id": 4,
                                "name": "John Doe",
                                "response": 'HTML',
                                "isCorrect": true
                            },
                        ],
                        response: undefined,
                    }

                ]
                dispatcher(setActivities(activities));
            }
        }
    }, [classRoom, dispatcher]);

    const takeActivities = useCallback(() => {
        if (!classRoom) {
            return {activities: [], userData: {}, noOfStudents: 0};
        }
        let userData, activities = classRoom.activities;
        if (classRoom.isLecturer) {
            userData = {
                id: classRoom.lecturer.id,
                name: classRoom.lecturer.name,
                profilePicture: classRoom.lecturer.profilePicture,
            }
        } else {
            for (let student of classRoom.students) {
                if (student.isSelf) {
                    userData = {
                        id: student.id,
                        name: student.name,
                        profilePicture: student.profilePicture,
                    }
                    break;
                }
            }
        }
        return {activities, userData, isLecturer: classRoom.isLecturer, noOfStudents: classRoom.students.length};
    }, [classRoom])

    const {activities, userData, isLecturer, noOfStudents} = takeActivities();

    useEffect(() => {
        if (activitiesRef.current) activitiesRef.current.scrollTop = activitiesRef.current.scrollHeight;
    }, [activities]);

    const changeResponse = (response, activityId) => {
        // TODO change response
        const responseData = {
            userData,
            response,
            isSelf: true,
            activityId,
            id: Math.random()
        }
        dispatcher(addResponse(responseData));
    }

    if (!activities) return <div/>;

    return (
        <div className={'gap-4 p-2 flex flex-col h-full bg-secondary rounded'}>
            <div className={'p-3 gap-2 bg-primary h-full flex flex-col rounded-sm w-full'}>
                <div className={'overflow-y-scroll w-full gap-2 flex flex-col h-full'}>
                    {
                        activities.map((activity) => {
                            return (
                                <div
                                    key={activity.id}
                                    className={'p-2 bg-secondary rounded flex flex-col gap-2'}
                                >
                                    <h5 className={'font-bold text-[11px]'}>{activity.title}</h5>
                                    {isLecturer
                                        ? <ul style={{listStyle: "disc"}} className={'px-3'}>
                                            <li className={'text-[11px]'}>Total
                                                Response: {activity.totalResponses}</li>
                                            <li className={'text-[11px]'}>Total Right
                                                Answers: {activity.totalCorrectResponses}</li>
                                        </ul>
                                        : <form className={'flex flex-col gap-1'}>
                                            {
                                                activity.options.map((option, index) => {
                                                        let className;
                                                        if (activity.response && activity.response === option) {
                                                            if (option === activity.correctAnswer) {
                                                                className = 'text-green-500'
                                                            } else {
                                                                className = 'text-red-500'
                                                            }
                                                        } else if (activity.response && option === activity.correctAnswer) {
                                                            className = 'text-green-500'
                                                        }
                                                        return (
                                                            <li key={index}
                                                                className={'text-[11px] flex flex-row'}>
                                                                <input
                                                                    value={option}
                                                                    type={'radio'}
                                                                    name={`activity-${activity.id}`}
                                                                    className={'mr-2'}
                                                                    onChange={(e) => changeResponse(e.target.value, activity.id)}
                                                                    checked={activity.response === option}
                                                                    disabled={activity.response}
                                                                />
                                                                <p className={className}>{option}</p>
                                                            </li>
                                                        )
                                                    }
                                                )
                                            }
                                        </form>
                                    }
                                    {
                                        isLecturer && <ProgressBar color={'#FCBD02'} current={activity.totalResponses}
                                                                   max={noOfStudents}/>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {isLecturer && <button
                    className={'w-full p-3 h-min bg-accent-color-one rounded justify-center items-center flex'}
                    type={'submit'}
                    onClick={console.log}
                >
                    <IoSendOutline/>
                </button>}
            </div>
        </div>
    )
}