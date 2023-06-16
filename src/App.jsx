import {Fragment} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage, LoginPage, RoomPage, SignupPage} from "./pages/";
import {Tooltip} from "react-tooltip";

function App() {

    return (
        <Fragment>
            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
                <Route path={'/login/'} element={<LoginPage/>}/>
                <Route path={'/register/'} element={<SignupPage/>}/>
                <Route path={'/:id/'} element={<RoomPage/>}>
                    <Route path={''} element={<Navigate to={'room/'}/>}/>
                    <Route path={'room/'} element={<RoomPage/>}/>
                </Route>
            </Routes>

            <Tooltip id={'tooltip'} className={'rounded-lg'}/>
        </Fragment>
    )
}

export default App
