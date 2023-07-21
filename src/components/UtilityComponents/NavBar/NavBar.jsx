import LogoSmall from '../../../assets/logo/logo-smaller.png'
import {NavBarDropDown} from "../../";
import {NavLink, useParams} from "react-router-dom";
import {BsPersonVideo} from "react-icons/bs";
import {TfiBlackboard} from "react-icons/tfi";
import {IoBookOutline} from "react-icons/io5";

// eslint-disable-next-line react/prop-types
export const NavBar = ({navLinks}) => {
    const {roomId} = useParams()

    return (
        <nav className="flex flex-row h-14 justify-between bg-white shadow">
            <div className={'m-3 h-7 w-7'}>
                <img src={LogoSmall} alt={'Logo'} className={'object-contain h-full'}/>
            </div>
            {
                navLinks &&
                <div className={'h-full flex flex-row gap-6 md:gap-3'}>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/room/`}
                        className={`flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]`}
                    >
                        <span className={'hidden md:block'}>Classroom</span>
                        <BsPersonVideo className={'md:hidden'}/>
                    </NavLink>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/whiteboard/`}
                        className={`flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]`}
                    >
                        <span className={'hidden md:block'}>Whiteboard</span>
                        <TfiBlackboard className={'md:hidden'}/>
                    </NavLink>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/topics/`}
                        className={'flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]'}
                    >
                        <span className={'hidden md:block'}>Topics</span>
                        <IoBookOutline className={'md:hidden'}/>
                    </NavLink>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/grade/`}
                        className={'flex flex-row items-center font-semibold text-gray-500 border-2 border-[#ffffff00]'}
                    >
                        <span className={'hidden md:block'}>Grade</span>
                        <TfiBlackboard className={'md:hidden'}/>
                    </NavLink>
                </div>}
            <NavBarDropDown/>
        </nav>
    )
}
