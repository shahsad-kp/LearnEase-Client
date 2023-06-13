import {useNavigate} from "react-router-dom";
import {bannerPageButtonClass, bannerPageInputClass} from "../styles.js";
import LogoBanner from '../../assets/logo/logo-banner.png'
import {useState} from "react";
import {InputField} from "../UtilityComponents/InputFields/InputField.jsx";
import {PasswordField} from "../UtilityComponents/InputFields/PasswordField.jsx";


export const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigator = useNavigate()
    return (
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-2.5 p-8'}>
            <div className={'w-3/4'}>
                <img src={LogoBanner} className={'object-cover'} alt={'Logo'}/>
            </div>
            <h3 className={'font-semibold'}>Register now</h3>
            <form className={'flex flex-col items-center gap-2.5 w-3/4'}>
                <InputField type={'text'} className={bannerPageInputClass} placeholder={'Name'} value={name}
                            onChange={(event) => setName(event.target.value)}/>
                <InputField type={'email'} className={bannerPageInputClass} placeholder={'Email'} value={email}
                            onChange={(event) => setEmail(event.target.value)}/>

                <PasswordField placeholder={'Password'}
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}/>
                <PasswordField placeholder={'Repeat Password'}
                               value={repeatPassword}
                               onChange={(event) => setRepeatPassword(event.target.value)}/>
                <button
                    className={bannerPageButtonClass}
                >Signup
                </button>
                <span className={'cursor-pointer italic'} onClick={() => navigator('/login/')}>Already have account? Click here</span>
            </form>
        </section>
    )
}