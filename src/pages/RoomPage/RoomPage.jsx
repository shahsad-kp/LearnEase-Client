import {ClassRoomBody, NavBar} from "../../components/";
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {
    joinClassRoom,
    leaveClassRoom
} from "../../redux/classRoomSlice/classRoomSlice.js";
import {getClassRoomData} from "../../api/classRoom.js";
import {connectAllSockets, disconnectAllSockets} from "../../api/socket.js";
import {whiteboardCtx} from "../../store/whiteboardData.jsx";


export const RoomPage = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const dispatcher = useDispatch()
    const {roomId} = useParams();
    const whiteboardData = useContext(whiteboardCtx);

    useEffect(() => {
        connectAllSockets({roomId})
        return () => {
            disconnectAllSockets()
        }
    }, [roomId]);

    useEffect(() => {
        if (!(classRoom && (classRoom.id === roomId))) {
            getClassRoomData({roomId}).then((classRoom) => {
                dispatcher(joinClassRoom(classRoom));
            }).catch((error) => {
                console.log(error)
            })
        }
        if (classRoom) document.title = classRoom.title;
        return () => {
            dispatcher(leaveClassRoom())
            whiteboardData.current = null;
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