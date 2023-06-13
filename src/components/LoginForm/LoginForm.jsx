import {Link} from "react-router-dom";
import {bannerPageButtonClass} from "../styles.js";
import LogoBanner from '../../assets/logo/logo-banner.png'
import {useState} from "react";
import {InputField, PasswordField} from "../";

export const LoginForm = () => {
    const [password, setPassword] = useState('');
    return (
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-2.5 p-2 md:p-8'}>
            <div className={'w-3/4'}>
                <img src={LogoBanner} className={'object-cover'} alt={'Logo'}/>
            </div>
            <h3 className={'font-semibold'}>Login to your Account</h3>
            <form className={'flex flex-col items-center gap-2.5 w-3/4'}>
                <InputField type={'email'} placeholder={'Email'}/>
                <PasswordField value={password} onChange={(event) => setPassword(event.target.value)} placeholder={'Password'}/>
                <button
                    className={bannerPageButtonClass}
                >Login</button>
                <Link className={'italic'} to={'/register/'}>New here? Click here</Link>
            </form>
        </section>
    )
}