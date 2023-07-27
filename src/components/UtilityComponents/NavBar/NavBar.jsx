import {NavBarDropDown} from "../../";
import {NavLink, useParams} from "react-router-dom";
import {BsPersonVideo} from "react-icons/bs";
import {TfiBlackboard} from "react-icons/tfi";
import {IoBookOutline} from "react-icons/io5";
import {useCallback, useContext, useMemo} from "react";
import {themeCtx} from "../../../store/themeCtx.jsx";
import LogoSmallDark from "../../../assets/logo/dark-logo-smaller.png";
import LogoSmall from "../../../assets/logo/logo-smaller.png";

// eslint-disable-next-line react/prop-types
export const NavBar = ({navLinks}) => {
    const {roomId} = useParams();
    const {colorTheme} = useContext(themeCtx);

    const getLogo = useCallback((theme) => {
        if (theme === 'dark') {
            return LogoSmallDark;
        } else {
            return LogoSmall;
        }
    }, []);
    const logo = useMemo(() => getLogo(colorTheme), [colorTheme, getLogo]);

    return (
        <nav className="flex flex-row h-14 justify-between bg-secondary dark:bg-dark-secondary shadow">
            <div className={'m-3 h-7 w-7'}>
                <img src={logo} alt={'Logo'} className={'object-contain h-full'}/>
            </div>
            {
                navLinks &&
                <div className={'h-full flex flex-row gap-6 md:gap-3'}>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/room/`}
                        className={({isActive}) => {
                            return `flex flex-row items-center font-semibold ${isActive ? 'border-logo-yellow dark:border-dark-logo-yellow border-b-2 text-black dark:text-white' : 'border-0 text-gray-500'}`
                        }}
                    >
                        <span className={'hidden md:block'}>Classroom</span>
                        <BsPersonVideo className={'md:hidden'}/>
                    </NavLink>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/whiteboard/`}
                        className={({isActive}) => {
                            return `flex flex-row items-center font-semibold ${isActive ? 'border-logo-yellow dark:border-dark-logo-yellow border-b-2 text-black dark:text-white' : 'border-0 text-gray-500'}`
                        }}
                    >
                        <span className={'hidden md:block'}>Whiteboard</span>
                        <TfiBlackboard className={'md:hidden'}/>
                    </NavLink>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/topics/`}
                        className={({isActive}) => {
                            return `flex flex-row items-center font-semibold ${isActive ? 'border-logo-yellow dark:border-dark-logo-yellow border-b-2 text-black dark:text-white' : 'border-0 text-gray-500'}`
                        }}
                    >
                        <span className={'hidden md:block'}>Topics</span>
                        <IoBookOutline className={'md:hidden'}/>
                    </NavLink>
                    <NavLink
                        replace={true}
                        to={`/${roomId}/grade/`}
                        className={({isActive}) => {
                            return `flex flex-row items-center font-semibold ${isActive ? 'border-logo-yellow dark:border-dark-logo-yellow border-b-2 text-black dark:text-white' : 'border-0 text-gray-500'}`
                        }}
                    >
                        <span className={'hidden md:block'}>Grade</span>
                        <TfiBlackboard className={'md:hidden'}/>
                    </NavLink>
                </div>}
            <NavBarDropDown/>
        </nav>
    )
}
