import {Modal} from "../Modal/Modal.jsx";
import {InputField} from "../InputFields/InputField.jsx";
import {useCallback, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {imageBaseURL} from "../../../service/api/apiConfiguration.js";
import {homePageButton} from "../../styles.js";
import {updateUserApi} from "../../../service/api/user.js";

// eslint-disable-next-line react/prop-types
export const UpdateProfileModal = ({closeFunction}) => {
    const user = useSelector(state => state.auth.user);
    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        profilePicture: null,
        // otp: ''
    })
    // const [otpSend, setOtpSend] = useState(true);
    // const otpId = useRef(null);
    const [error, setError] = useState({});

    const profilePictureInput = useRef();

    const validateName = useCallback((value) => {
        if (value.trim() === '') {
            setError(prev => ({...prev, name: 'Name can\'t be empty..'}));
            return false;
        } else {
            setError(prev => ({...prev, name: ''}));
            return true;
        }
    }, [setError])

    const validateEmail = useCallback((value) => {
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
    }, [])

    // const validateOtp = useCallback((value) => {
    //     const regex = /^[0-9]{6}$/;
    //     const regexMoreSix = /^[0-9]{7,}$/;
    //
    //     if (regex.test(value)) {
    //         setError(prev => ({...prev, otp: ''}));
    //         return true;
    //     } else if (regexMoreSix.test(value)) {
    //         return true
    //     } else {
    //         setError(prev => ({...prev, otp: 'OTP must be six digit..'}));
    //         return false;
    //     }
    // }, [])

    const updateName = useCallback((event) => {
        validateName(event.target.value);
        setValues(prev => ({...prev, name: event.target.value}));
    }, [validateName])

    const updateEmail = useCallback((event) => {
        validateEmail(event.target.value);
        setValues(prev => ({...prev, email: event.target.value}));
    }, [validateEmail])

    // const updateOTP = useCallback((event) => {
    //     const regexMoreSix = /^[0-9]{7,}$/;
    //     validateOtp(event.target.value);
    //     console.log(event.target.value)
    //     if (!regexMoreSix.test(event.target.value)) {
    //         console.log('passed')
    //         setValues(prevState => ({...prevState, otp: event.target.value}))
    //     }
    // }, [validateOtp])

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        if (!(validateName(values.name) &&
            validateEmail(values.email))) {
            return;
        }

        // if (!((values.email !== user.email) && (validateOtp(values.otp)))){
        //     return;
        // }
        //
        // let data = {...values, otpId: otpId.current};
        const formData = new FormData()
        formData.append('name', values.name);
        formData.append('email', values.email);
        if (values.profilePicture){
            formData.append('profilePicture', values.profilePicture)
        }
        updateUserApi(formData).then(closeFunction)
    }, [closeFunction, validateEmail, validateName, values])

    return (
        <Modal closeFunction={closeFunction} classNames={'bg-white rounded !w-[20rem] w-xs p-4'}>
            <div className={'flex flex-col gap-2.5 w-full'}>
                <div className={'bg-red rounded-full object-fill w-24'}>
                    <img
                        className={'rounded-full cursor-pointer'}
                        src={
                            values.profilePicture ?
                                URL.createObjectURL(values.profilePicture) :
                                (imageBaseURL + user.profilePicture)
                        }
                        onClick={() => {
                            profilePictureInput.current.click();
                        }}
                        alt={'profile picture'}
                    />
                    <input
                        type={"file"}
                        onChange={event => setValues(prev => ({
                            ...prev,
                            profilePicture: event.target.files[0]
                        }))}
                        className={'hidden'}
                        ref={profilePictureInput}
                    />
                </div>
                <InputField
                    placeholder={'Fullname'}
                    onChange={updateName}
                    value={values.name}
                    classNames={'w-full'}
                />
                {error.name && <ul>
                    <li className={'text-dangerColor font-serif text-xs'}>{error.name}</li>
                </ul>}
                <InputField
                    placeholder={'Email'}
                    onChange={updateEmail}
                    value={values.email}
                    type={'email'}
                    // disabled={otpSend}
                    classNames={'w-full'}
                />
                {error.email && <ul>
                    <li className={'text-dangerColor font-serif text-xs'}>{error.email}</li>
                </ul>}
                {/*{otpSend && <>*/}
                {/*    <InputField*/}
                {/*        placeholder={'OTP'}*/}
                {/*        onChange={updateOTP}*/}
                {/*        type={"number"}*/}
                {/*        value={values.otp}*/}
                {/*        classNames={'w-full'}*/}
                {/*    />*/}
                {/*    {error.otp && <ul>*/}
                {/*        <li className={'text-dangerColor font-serif text-xs'}>{error.otp}</li>*/}
                {/*    </ul>}*/}
                {/*</>}*/}
                <button
                    className={homePageButton + ' !w-full'}
                    onClick={handleSubmit}
                >
                    Update Profile
                    {/*{*/}
                    {/*    (!otpSend && (values.email !== user.email && values.email !== '')) ?*/}
                    {/*        "Send OTP" :*/}
                    {/*        "Update Profile"*/}
                    {/*}*/}
                </button>
            </div>
        </Modal>
    )
}