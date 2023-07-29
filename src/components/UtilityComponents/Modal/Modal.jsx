import {GrFormClose} from "react-icons/gr";
import {useEffect} from "react";

// eslint-disable-next-line react/prop-types
export const Modal = ({children, closeFunction, classNames, ...extra}) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('#modal')) {
                closeFunction();
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);
        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeFunction]);
    
    return (
        <div className={'fixed w-screen h-screen flex justify-center items-center z-[999] top-0 left-0'}
             style={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
            <div id={'modal'} {...extra} className={'relative w-full m-2 md:m-0 md:max-w-[50%] ' + classNames}>
                <div className={'absolute top-0 right-0 p-2 '}>
                    <GrFormClose color={'white'} className={'cursor-pointer'} onClick={closeFunction}/>
                </div>
                <div className={'pt-4'}>
                    {children}
                </div>
            </div>
        </div>
    )
}