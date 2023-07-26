import {RxAvatar} from "react-icons/rx";
import {FiLogOut} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {logout} from "../../../redux/authSlice/authSlice.js";
import {useNavigate} from "react-router-dom";
import {imageBaseURL} from "../../../service/api/apiConfiguration.js";
import {UpdateProfileModal} from "../UpdateProfileModal/UpdateProfileModal.jsx";
import useDarkSide from "../DarkMode/useDarkMode.js";
import {DarkModeSwitch} from "react-toggle-dark-mode";

export const NavBarDropDown = () => {
    const user = useSelector(state => state.auth.user)
    const [drop, setDrop] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [updateProfile, setUpdateProfile] = useState(false);

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout())
        navigator('/');
    }

    const dropDownItemsClasses = classNames(
        'text-sm',
        'font-semibold',
        'p-2.5',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-700',
        'flex',
        'flex-row',
        'gap-1.5',
        'items-center',
        'text-dark',
        'dark:text-white'
    )

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('#drop-down')) {
                setDrop(false);
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const [colorTheme, setTheme] = useDarkSide();

    const isDarkMode = useMemo(() => {
        return colorTheme === 'dark';
    }, [colorTheme])

    const toggleTheme = useCallback((checked) => {
        if (checked === undefined){
            setTheme(!colorTheme)
        }
        else{
            setTheme(checked ? 'dark' : 'light')
        }
    }, [colorTheme, setTheme]);

    return (
        <>
            <div
                className={'flex m-3 flex-row items-center gap-5 h-7 w-7 relative'}
                id={'drop-down'}
            >
                <div
                    className={'h-full border-accent-color-one dark:border-dark-accent-color-one profile-picture cursor-pointer'}
                    onClick={() => setDrop(state => !state)}
                >
                    <img src={user ? `${imageBaseURL}${user.profilePicture}` : ''} alt={'Profile'}
                         className={'object-cover h-full rounded-full border-accent-color-one dark:border-dark-accent-color-one'}/>
                </div>
                {drop &&
                    <div
                        className={`navbar-dropdown z-50 fixed md:absolute top-14 right-0 bg-secondary dark:bg-dark-secondary shadow rounded 
                    flex flex-col w-screen md:w-fit min-w-[350px]`}
                        id={'second-component'}
                    >
                        <div className={'flex flex-row w-min justify-center gap-2.5 border border-primary dark:border-dark-primary shadow p-2.5 rounded m-2.5'}>
                            <div style={{width: '40px', height: '40px'}}>
                                <img src={user ? `${imageBaseURL}${user.profilePicture}` : ''} alt={'Profile'}
                                     className={'object-cover rounded h-full w-full border-accent-color-one dark:border-dark-accent-color-one'}/>
                            </div>
                            <div className={'w-max'}>
                                <p className={'text-sm font-thin text-dark dark:text-white'}>Logined as</p>
                                <p className={'text-sm font-semibold text-dark dark:text-white'}>{user ? user.name : 'User'}</p>
                            </div>
                        </div>
                        <ul className={'w-full flex flex-col'}>
                            <li
                                className={dropDownItemsClasses}
                                onClick={() => setUpdateProfile(prev => !prev)}
                            >
                                <RxAvatar/>Update Profile
                            </li>
                            <li
                                className={dropDownItemsClasses}
                                onClick={toggleTheme}
                            >
                                <DarkModeSwitch
                                    checked={isDarkMode}
                                    onChange={toggleTheme}
                                    size={15}
                                />Change Theme
                            </li>
                            <li
                                className={dropDownItemsClasses + ' text-danger-color dark:text-dark-danger-color'}
                                onClick={handleLogout}
                            >
                                <FiLogOut/>Logout
                            </li>
                        </ul>
                    </div>
                }
            </div>
            {updateProfile && <UpdateProfileModal closeFunction={() => setUpdateProfile(false)}/>}
        </>
    )
}