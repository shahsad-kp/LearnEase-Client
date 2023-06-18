import {Fragment} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage, LoginPage, RoomPage, SignupPage} from "./pages/";
import {Tooltip} from "react-tooltip";
import {useSelector} from "react-redux";
import {RightSideParticipants} from "./components/";

function App() {
    const user = useSelector(state => state.auth.user)

    return (
        <Fragment>
            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
                <Route path={'/login/'} element={<LoginPage/>}/>
                <Route path={'/register/'} element={<SignupPage/>}/>
                <Route path={':roomId'} element={user? <RoomPage/> : <Navigate to={'/login/'}/>}>
                    <Route index path={'room/'} element={<RightSideParticipants/>}/>
                </Route>
            </Routes>

            <Tooltip id={'tooltip'} className={'rounded-lg'}/>
        </Fragment>
    )
}

export default App
