import {Fragment} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage, LoginPage, SignupPage} from "./pages/";
import PrivateRoute from "./utils/PrivateRouter.jsx";
import {Tooltip} from "react-tooltip";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
                <Route path={'/login/'} element={<LoginPage/>} />
                <Route path={'/register/'} element={<SignupPage/>} />
            </Routes>
            <Tooltip id={'tooltip'} className={'rounded-lg'}/>
        </Fragment>
    )
}

export default App
