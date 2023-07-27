import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';

import WhiteboardDataProvider from "./store/whiteboardData.jsx";
import {persistor, store} from './redux/store';
import ThemeProvider from "./store/themeCtx.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <WhiteboardDataProvider>
                        <ThemeProvider>
                            <App/>
                        </ThemeProvider>
                    </WhiteboardDataProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
