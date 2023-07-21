import {useState} from "react";
import {IoMdArrowDropdownCircle, IoMdArrowDropupCircle} from "react-icons/io";
import {VideoControllerControlBar} from "../../GeneralComponents/VideoControllerControlBar/VideoControllerControlBar.jsx";
import {ComponentsController} from "../../GeneralComponents/ComponentsController/ComponentsController.jsx";

// eslint-disable-next-line react/prop-types
export const SmallScreenBottomBar = ({selected, setSelected}) => {
    const [secondBar, setSecondBar] = useState(false);
    return (
        <div className={'bg-secondary flex flex-col gap-2 p-2 rounded-t shadow'}>
            <div className={`${secondBar ? 'flex' : 'hidden'} flex-row gap-3 justify-center`}>
                <VideoControllerControlBar/>
            </div>
            <div className={'flex flex-row gap-3 justify-center'}>
                <div
                    className={`rounded-full p-2`}
                    onClick={() => setSecondBar(!secondBar)}
                >
                    {!secondBar
                        ? <IoMdArrowDropupCircle className={'text-gray-500'}/>
                        : <IoMdArrowDropdownCircle className={'text-black'}/>}
                </div>
                <ComponentsController selected={selected} setSelected={setSelected}/>
            </div>
        </div>
    )
}