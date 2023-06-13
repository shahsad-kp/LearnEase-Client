import {useNavigate} from "react-router-dom";
import {bannerPageButtonClass, bannerPageInputClass} from "../styles.js";

export const LoginForm = () => {
    const navigator = useNavigate();

    return (
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-2.5 p-8'}>
            <div className={'w-3/4'}>
                <img src={'/images/logo/logo-banner.png'} className={'object-cover'} alt={'Logo'}/>
            </div>
            <h3>Login to your Account</h3>
            <form className={'flex flex-col items-center gap-2.5 w-2/4'}>
                <input type={'text'} className={bannerPageInputClass} placeholder={'Username'}/>
                <input type={'password'} className={bannerPageInputClass} placeholder={'Password'}/>
                <button
                    className={bannerPageButtonClass}
                >Login</button>
                <span className={'cursor-pointer'} onClick={() => navigator('/register/')}>New here? Click here</span>
            </form>
        </section>
    )
}