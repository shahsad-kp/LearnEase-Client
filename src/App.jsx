import {Fragment} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage, LoginPage} from "./pages/";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
                <Route path={'/login/'} element={<LoginPage/>} />
            </Routes>
        </Fragment>
    )
}

export default App
