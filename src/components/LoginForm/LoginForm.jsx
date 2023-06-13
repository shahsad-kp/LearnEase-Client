import {useNavigate} from "react-router-dom";
import {bannerPageButtonClass, bannerPageInputClass} from "../styles.js";
import LogoBanner from '../../assets/logo/logo-banner.png'
import {useState} from "react";
import {PasswordField} from "../UtilityComponents/InputFields/PasswordField.jsx";

export const LoginForm = () => {
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    return (
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-2.5 p-8'}>
            <div className={'w-3/4'}>
                <img src={LogoBanner} className={'object-cover'} alt={'Logo'}/>
            </div>
            <h3 className={'font-semibold'}>Login to your Account</h3>
            <form className={'flex flex-col items-center gap-2.5 w-3/4'}>
                <input type={'email'} className={bannerPageInputClass} placeholder={'Email'}/>
                <PasswordField value={password} onChange={(event) => setPassword(event.target.value)} placeholder={'Password'}/>
                <button
                    className={bannerPageButtonClass}
                >Login</button>
                <span className={'cursor-pointer italic'} onClick={() => navigator('/register/')}>New here? Click here</span>
            </form>
        </section>
    )
}