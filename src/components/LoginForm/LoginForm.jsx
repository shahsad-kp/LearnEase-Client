import {Link, useNavigate} from "react-router-dom";
import {bannerPageButtonClass} from "../styles.js";
import LogoBanner from '../../assets/logo/logo-banner.png'
import {useCallback, useContext, useMemo, useState} from "react";
import {InputField, PasswordField} from "../";
import {loginUser} from "../../service/api/user.js";
import LogoBannerDark from "../../assets/logo/dark-logo-banner.png";
import {themeCtx} from "../../store/themeCtx.jsx";

export const LoginForm = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [logging, setLogging] = useState(false);
    const {colorTheme} = useContext(themeCtx);

    const getLogo = useCallback((theme) => {
        if (theme === 'dark') {
            return LogoBannerDark;
        } else {
            return LogoBanner;
        }
    }, []);
    const logo = useMemo(() => getLogo(colorTheme), [colorTheme, getLogo]);

    const navigator = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!(validateEmail(values.email) && validatePassword(values.password))) {
            return
        }

        setLogging(true);
        loginUser({email: values.email, password: values.password}).then(() => {
            navigator('/', {replace: true})
        }).catch(e => {
            if (e.response.status === 401) {
                setErrors(prev => ({...prev, password: e.response.data.detail}));
            }
            else if (e.response.status === 400){
                if (e.response.data.password){
                    setErrors(prev => ({...prev, password: e.response.data.password}))
                }
                if (e.response.data.email){
                    setErrors(prev => ({...prev, email: e.response.data.email}))
                }
            }
            else{
                console.log(e)
                setErrors(prevState => ({...prevState, password: 'Unknown error occurred...'}))
            }
        }).finally(() => {
            setLogging(false);
        });
    }

    const validateEmail = (value) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        if (regex.test(value)) {
            setErrors(prev => ({...prev, email: ''}));
            return true;
        } else if (value.trim() === '') {
            setErrors(prev => ({...prev, email: 'Email can\'t be empty..'}));
            return false;
        } else {
            setErrors(prev => ({...prev, email: 'Email is not valid..'}));
            return false;
        }
    }

    const validatePassword = (value) => {
        if (value.trim() === '') {
            setErrors(prev => ({...prev, password: 'Password can\'t be empty..'}));
            return false;
        } else {
            setErrors(prev => ({...prev, password: ''}));
            return true;
        }
    }

    const updateEmail = (event) => {
        validateEmail(event.target.value);
        setValues(prev => ({...prev, email: event.target.value}));
    }

    const updatePassword = (event) => {
        validatePassword(event.target.value);
        setValues(prev => ({...prev, password: event.target.value}));
    }

    return (
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-2.5 p-2 md:p-8'}>
            <div className={'w-3/4'}>
                <img src={logo} className={'object-cover'} alt={'Logo'}/>
            </div>
            <h3 className={'font-semibold text-black dark:text-white'}>Login to your Account</h3>
            <form className={'flex flex-col items-center gap-2.5 w-3/4'}>
                <InputField type={'email'} placeholder={'Email'} value={values.email}
                            onChange={updateEmail}/>
                {errors.email && <ul>
                    <li className={'text-danger-color dark:text-dark-danger-color font-serif text-xs'}>{errors.email}</li>
                </ul>}
                <PasswordField value={values.password} onChange={updatePassword}
                               placeholder={'Password'}/>
                {errors.password && <ul>
                    <li className={'text-danger-color dark:text-dark-danger-color font-serif text-xs'}>{errors.password}</li>
                </ul>}
                <button
                    className={bannerPageButtonClass + (logging ? ' cursor-not-allowed' : '')}
                    onClick={logging ? null : handleSubmit}
                >
                    {logging ? 'Logging in...' : 'Login'}
                </button>
                <Link className={'italic text-black dark:text-white'} to={'/register/'}>New here? Click here</Link>
            </form>
        </section>
    )
}