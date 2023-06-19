import LogoSmall from '../../../assets/logo/logo-smaller.png'
import {NavBarDropDown} from "../../";
import {NavLink, useParams} from "react-router-dom";

export const NavBar = () => {
    const {roomId} = useParams()

    return (
        <nav className="flex flex-row h-14 justify-between bg-white shadow">
            <div className={'m-3 h-7 w-7'}>
                <img src={LogoSmall} alt={'Logo'} className={'object-contain h-full'}/>
            </div>
            <div className={'h-full flex flex-row gap-3'}>
                <NavLink replace={true} to={`/${roomId}/room/`} className={'flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]'}>Classroom</NavLink>
                <NavLink replace={true} to={`/${roomId}/whiteboard/`} className={'flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]'}>WhiteBoard</NavLink>
                <NavLink replace={true} to={`/${roomId}/topics/`} className={'flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]'}>Topics</NavLink>
                <NavLink replace={true} to={`/${roomId}/grade/`} className={'flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]'}>Grade</NavLink>
            </div>
            <NavBarDropDown/>
        </nav>
    )
}
