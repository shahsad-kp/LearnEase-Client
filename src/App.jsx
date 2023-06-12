import {Fragment} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.jsx";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
            </Routes>
        </Fragment>
    )
}

export default App
