import {RxAvatar} from "react-icons/rx";
import {FiLogOut, FiSettings} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {logout} from "../../../redux/authSlice/authSlice.js";
import {useNavigate} from "react-router-dom";

export const NavBarDropDown = () => {
    const user = useSelector(state => state.auth.user)
    const [drop, setDrop] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();

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
        'flex',
        'flex-row',
        'gap-1.5',
        'items-center'
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


    return (
        <div
            className={'flex flex-row items-center gap-5 h-full relative'}
            id={'drop-down'}
        >
            <div
                className={'h-full border-accent-color-one profile-picture cursor-pointer'}
                onClick={() => setDrop(state => !state)}
            >
                <img src={user.profilePicture} alt={'Profile'}
                     className={'object-cover h-full rounded border-accent-color-one'}/>
            </div>
            {drop &&
                <div
                    className={'navbar-dropdown fixed md:absolute top-14 right-0 bg-white shadow rounded flex flex-col w-screen md:w-fit min-w-[350px]'}
                    id={'second-component'}
                >
                    <div className={'flex flex-row w-min justify-center gap-2.5 border p-2.5 rounded m-2.5'}>
                        <div style={{width: '40px', height: '40px'}}>
                            <img src={user.profilePicture} alt={'Profile'}
                                 className={'object-cover rounded h-full w-full border-accent-color-one'}/>
                        </div>
                        <div className={'w-max'}>
                            <p className={'text-sm font-thin'}>Logined as</p>
                            <p className={'text-sm font-semibold'}>{user.name}</p>
                        </div>
                    </div>
                    <ul className={'w-full flex flex-col'}>
                        <li
                            className={dropDownItemsClasses}
                        >
                            <RxAvatar/> Update Profile
                        </li>
                        <li
                            className={dropDownItemsClasses}
                        >
                            <FiSettings/>Settings
                        </li>
                        <li
                            className={dropDownItemsClasses + ' text-dangerColor'}
                            onClick={handleLogout}
                        >
                            <FiLogOut/>Logout
                        </li>
                    </ul>
                </div>
            }
        </div>

    )
}