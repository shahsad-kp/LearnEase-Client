import {GrFormClose} from "react-icons/gr";

// eslint-disable-next-line react/prop-types
export const Modal = ({children, closeFunction, classNames, ...extra}) => {
    return (
        <div className={'fixed w-screen h-screen flex justify-center items-center z-[999] top-0 left-0'}
             style={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
            <div {...extra} className={'relative w-full m-2 md:m-0 md:max-w-[50%] ' + classNames}>
                <div className={'absolute top-0 right-0 p-2'}>
                    <GrFormClose className={'cursor-pointer'} onClick={closeFunction}/>
                </div>
                <div className={'pt-4'}>
                    {children}
                </div>
            </div>
        </div>
    )
}