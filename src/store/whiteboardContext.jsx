import {createContext, useRef, useState} from "react";

export const WhiteboardContext = createContext(null)


// eslint-disable-next-line react/prop-types
function Context({children}) {
    const context = useRef(null);
    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedTool, setSelectedTool] = useState('pencil');
    
    return (
        <WhiteboardContext.Provider value={{context, selectedColor, setSelectedColor, selectedTool, setSelectedTool}}>
            {children}
        </WhiteboardContext.Provider>
    )
}

export default Context;