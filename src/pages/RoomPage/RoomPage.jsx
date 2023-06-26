import {ClassRoomBody, NavBar} from "../../components/";
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {
    addParticipant,
    joinClassRoom,
    leaveClassRoom,
    removeParticipant
} from "../../redux/classRoomSlice/classRoomSlice.js";
import {getClassRoomData} from "../../api/classRoom.js";
import connectWebSocket from "../../api/socket.js";


export const RoomPage = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const dispatcher = useDispatch()
    const socketConnection = useRef();
    const {roomId} = useParams();

    useEffect(() => {
        socketConnection.current = connectWebSocket(
            `classroom/${roomId}/`,
            {
                onOpen: () => {
                    console.log('connected');
                },
                onMessage: (e) => {
                    const data = JSON.parse(e.data);
                    if (data.type === 'join_student') {
                        const student = data.student;
                        dispatcher(addParticipant(student));
                    } else if (data.type === 'leave_student') {
                        const student_id = data.student_id;
                        dispatcher(removeParticipant(student_id));
                    } else {
                        console.log(data);
                    }
                },
                onClose: () => {
                    console.log('disconnected');
                },
                onError: (e) => {
                    console.log(e);
                }
            }
        );
        return () => {
            if (socketConnection.current) {
                socketConnection.current.close();
            }
        }
    }, []);

    useEffect(() => {
        if (!(classRoom && (classRoom.id === roomId))) {
            getClassRoomData({roomId}).then((classRoom) => {
                dispatcher(joinClassRoom(classRoom));
            }).catch((error) => {
                console.log(error);
            })
        }
        if (classRoom) document.title = classRoom.title;
        return () => {
            dispatcher(leaveClassRoom())
        }

    }, []);

    return (
        <section className={'h-screen w-screen flex flex-col bg-primary'}>
            <NavBar navLinks={true}/>
            <ClassRoomBody>
                <Outlet/>
            </ClassRoomBody>
        </section>
    )
}