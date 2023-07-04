import {createContext, useRef} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const whiteboardCtx = createContext('');

// eslint-disable-next-line react/prop-types
function WhiteboardDataProvider({children}) {
    const whiteboardData = useRef(null)
    return <whiteboardCtx.Provider value={whiteboardData}>
        {children}
    </whiteboardCtx.Provider>
}

export default WhiteboardDataProvider;
