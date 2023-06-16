import LogoSmall from '../../../assets/logo/logo-smaller.png'
import {NavBarDropDown} from "../../";

export const NavBar = () => {
    return (
        <nav className="flex flex-row h-14 justify-between p-3 bg-white shadow">
            <div className={'h-full'}>
                <img src={LogoSmall} alt={'Logo'} className={'object-contain h-full'}/>
            </div>
            <NavBarDropDown/>
        </nav>
    )
}
