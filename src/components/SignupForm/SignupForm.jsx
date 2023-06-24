import {Link, useNavigate} from "react-router-dom";
import {bannerPageButtonClass, bannerPageInputClass} from "../styles.js";
import LogoBanner from '../../assets/logo/logo-banner.png'
import {Fragment, useState} from "react";
import {InputField, PasswordField} from "../";
import {ProgressBar} from "../";
import {registerUser} from "../../api/user.js";


export const SignupForm = () => {
    const passwordErrors = [
        "Must be at least 8 characters long.",
        "Must contain at least one uppercase letter.",
        "Must contain at least one lowercase letter.",
        "Must contain at least one number."
    ]

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [error, setError] = useState({});
    const navigator = useNavigate();

    const [passwordFocus, setPasswordFocus] = useState(false);

    const validateName = (value) => {
        if (value.trim() === '') {
            setError(prev => ({...prev, name: 'Name can\'t be empty..'}));
            return false;
        } else {
            setError(prev => ({...prev, name: ''}));
            return true;
        }
    }

    const validateEmail = (value) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        if (regex.test(value)) {
            setError(prev => ({...prev, email: ''}));
            return true;
        } else if (value.trim() === '') {
            setError(prev => ({...prev, email: 'Email can\'t be empty..'}));
            return false;
        } else {
            setError(prev => ({...prev, email: 'Email is not valid..'}))
            return false;
        }
    }

    const validatePassword = (value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const errors = [];
        if (regex.test(value)) {
            setError(prev => ({...prev, password: ''}));
            return true;
        }
        if (value.length < 8) {
            errors.push(passwordErrors[0]);
        }
        if (!/[A-Z]/.test(value)) {
            errors.push(passwordErrors[1]);
        }
        if (!/[a-z]/.test(value)) {
            errors.push(passwordErrors[2]);
        }
        if (!/\d/.test(value)) {
            errors.push(passwordErrors[3]);
        }
        setError(prev => ({...prev, password: errors}));
        return false;
    }

    const validateRepeatPassword = (value) => {
        if (value !== values.password) {
            setError(prev => ({...prev, repeatPassword: 'Passwords don\'t match..'}));
            return false;
        } else {
            setError(prev => ({...prev, repeatPassword: ''}));
            return true;
        }
    }

    const updateName = (event) => {
        validateName(event.target.value);
        setValues(prev => ({...prev, name: event.target.value}));
    }

    const updateEmail = (event) => {
        validateEmail(event.target.value);
        setValues(prev => ({...prev, email: event.target.value}));
    }

    const updatePassword = (event) => {
        validatePassword(event.target.value);
        setValues(prev => ({...prev, password: event.target.value}));
    }

    const updateRepeatPassword = (event) => {
        validateRepeatPassword(event.target.value);
        setValues(prev => ({...prev, repeatPassword: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!(validateName(values.name) &&
            validateEmail(values.email) &&
            validatePassword(values.password) &&
            validateRepeatPassword(values.repeatPassword))){
            return;
        }

        registerUser({name: values.name, email: values.email, password: values.password}).then(() => {
            navigator('/', {replace: true})
        }).catch(e => {
            if (e.response.status === 401) {
                setError(prev => ({...prev, password: e.response.data.detail}));
            }
            else if (e.response.status === 400){
                if (e.response.data.password){
                    setError(prev => ({...prev, password: e.response.data.password}))
                }
                if (e.response.data.email){
                    setError(prev => ({...prev, email: e.response.data.email}))
                }
                if (e.response.data.name){
                    setError(prevState => ({...prevState, name: e.response.data.name}))
                }
            }
            else{
                console.log(e)
                setError(prevState => ({...prevState, password: 'Unknown error occurred...'}))
            }
        })
    }

    
    return (
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-2.5 p-2 md:p-8'}>
            <div className={'w-3/4'}>
                <img src={LogoBanner} className={'object-cover'} alt={'Logo'}/>
            </div>
            <h3 className={'font-semibold'}>Register now</h3>
            <form className={'flex flex-col items-center gap-2.5 w-3/4'} onSubmit={handleSubmit}>
                <InputField type={'text'}
                            className={bannerPageInputClass}
                            placeholder={'Name'}
                            value={values.name}
                            onChange={updateName}/>
                {error.name && <ul>
                    <li className={'text-dangerColor font-serif text-xs'}>{error.name}</li>
                </ul>}
                <InputField type={'email'}
                            className={bannerPageInputClass}
                            placeholder={'Email'}
                            value={values.email}
                            onChange={updateEmail}/>
                {error.email && <ul>
                    <li className={'text-dangerColor font-serif text-xs'}>{error.email}</li>
                </ul>}
                <PasswordField placeholder={'Password'}
                               value={values.password}
                               onFocus={() => {
                                   setPasswordFocus(true);
                               }}
                               onBlur={() => setPasswordFocus(false)}
                               onChange={updatePassword}/>
                {
                    (passwordFocus && (error.password && error.password.length > 0) && values.password !== '') && <Fragment>
                        <ProgressBar current={4 - error.password.length} max={4}/>
                    </Fragment>
                }
                {
                    (error.password && error.password.length > 0) && <ul style={{listStyleType: 'none', padding: 0}}>
                        {
                            error.password.map((error, index) => {
                                    return <li key={index} className={'text-dangerColor font-serif text-xs'}>{error}</li>
                                }
                            )
                        }
                    </ul>
                }
                <PasswordField placeholder={'Repeat Password'}
                               value={values.repeatPassword}
                               onChange={updateRepeatPassword}/>
                {error.repeatPassword && <ul>
                    <li className={'text-dangerColor font-serif text-xs'}>{error.repeatPassword}</li>
                </ul>}

                <button
                    className={bannerPageButtonClass}
                >Signup
                </button>
                <Link className={' italic'} to={'/login/'}>Already have account? Click here</Link>
            </form>
        </section>
    )
}