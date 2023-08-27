import {Fragment} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage, LoginPage, RoomPage, SignupPage, VerifyEmailPage} from "./pages/";
import {Tooltip} from "react-tooltip";
import {VideoCallsPage} from "./components/RoomPage/MainComponents/VideoCallsPage/VideoCallsPage.jsx";
import {WhiteboardPage} from "./components/RoomPage/MainComponents/WhiteboardPage/WhiteboardPage.jsx";
import {TopicsPage} from "./components/RoomPage/MainComponents/TopicsPage/TopicsPage.jsx";
import {GradesPage} from "./components/RoomPage/MainComponents/GradesPage/GradesPage.jsx";
import {ProtectedRoute} from "./components/UtilityComponents/ProtectedRoute/ProtectedRoute.jsx";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
                <Route path={'/login/'} element={<LoginPage/>}/>
                <Route path={'/register/'} element={<SignupPage/>}/>
                <Route path={'/:roomId'} element={<ProtectedRoute><RoomPage/></ProtectedRoute>}>
                    <Route index path={'room/'} element={<VideoCallsPage/>}/>
                    <Route path={'whiteboard/'} element={<WhiteboardPage/>}/>
                    <Route path={'topics/'} element={<TopicsPage/>}/>
                    <Route path={'grade/'} element={<GradesPage/>}/>
                </Route>
                <Route path={'/verify/:token/'} element={<ProtectedRoute><VerifyEmailPage/></ProtectedRoute>}/>
            </Routes>
            <Tooltip id={'tooltip'} className={'rounded-lg'}/>
        </Fragment>
    )
}

export default App
