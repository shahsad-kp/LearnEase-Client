import {Fragment} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage, LoginPage, RoomPage, SignupPage} from "./pages/";
import {Tooltip} from "react-tooltip";
import {useSelector} from "react-redux";
import {VideoCallsPage} from "./components/RoomPage/MainComponents/VideoCallsPage/VideoCallsPage.jsx";
import {WhiteboardPage} from "./components/RoomPage/MainComponents/WhiteboardPage/WhiteboardPage.jsx";
import {TopicsPage} from "./components/RoomPage/MainComponents/TopicsPage/TopicsPage.jsx";
import {GradesPage} from "./components/RoomPage/MainComponents/GradesPage/GradesPage.jsx";

function App() {
    const user = useSelector(state => state.auth.user)

    return (
        <Fragment>
            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
                <Route path={'/login/'} element={<LoginPage/>}/>
                <Route path={'/register/'} element={<SignupPage/>}/>
                <Route path={'/:roomId'} element={user? <RoomPage/> : <Navigate to={'/login/'}/>}>
                    <Route index path={'room/'} element={<VideoCallsPage/>}/>
                    <Route path={'whiteboard/'} element={<WhiteboardPage/>}/>
                    <Route path={'topics/'} element={<TopicsPage/>}/>
                    <Route path={'grade/'} element={<GradesPage/>}/>
                </Route>
            </Routes>

            <Tooltip id={'tooltip'} className={'rounded-lg'}/>
        </Fragment>
    )
}

export default App
