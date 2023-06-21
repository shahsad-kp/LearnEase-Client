import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store.js";
import WhiteboardContext from "./store/whiteboardContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <WhiteboardContext>
                <App/>
            </WhiteboardContext>
        </Provider>
    </BrowserRouter>
</React.StrictMode>,)
