import {NavBar} from "../../components/";
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {joinClassRoom, leaveClassRoom} from "../../redux/classRoomSlice/classRoomSlice.js";
import {getClassRoomData} from "../../service/api/classRoom.js";
import {whiteboardCtx} from "../../store/whiteboardData.jsx";
import {SocketsProvider} from "../../service/sockets/SocketsProvider.jsx";
import {ClassRoomBody} from "../../components/RoomPage/RoomBody/RoomBody.jsx";


export const RoomPage = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user);
    const dispatcher = useDispatch()
    const {roomId} = useParams();
    const whiteboardData = useContext(whiteboardCtx)

    useEffect(() => {
        if (!(classRoom && (classRoom.id === roomId))) {
            getClassRoomData({roomId}).then((classRoom) => {
                if (classRoom){
                    if (classRoom.lecturer.id === user.id){
                        classRoom.lecturer.isActive = true;
                    }
                    else {
                        classRoom.students = classRoom.students.map(student => {
                            if (student.id === user.id){
                                student.isActive = true;
                            }
                            return student;
                        })
                    }
                }
                dispatcher(joinClassRoom(classRoom));
            }).catch((error) => {
                console.log(error)
            })
        }
        if (classRoom) document.title = classRoom.title;
        return () => {
            dispatcher(leaveClassRoom())
            whiteboardData.current = null;
            document.title = 'LearnEase';
        }

    }, []);


    return (
        <SocketsProvider>
            <section className={'h-screen w-screen flex flex-col bg-primary dark:bg-dark-primary'}>
                <NavBar navLinks={true}/>
                <ClassRoomBody>
                    <Outlet/>
                </ClassRoomBody>
            </section>
        </SocketsProvider>
    )
}