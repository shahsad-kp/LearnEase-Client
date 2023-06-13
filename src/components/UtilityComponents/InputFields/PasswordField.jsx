import {bannerPageInputClass} from "../../styles.js";
import {useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

export const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(true);
    }
    const toggleHidePassword = (event) => {
        event.preventDefault();
        setShowPassword(false);
    }
    return (
        <div className={bannerPageInputClass} style={{padding: 0, display: "flex", flexDirection: "row"}}>
            <input {...props} type={showPassword ? 'text' : 'password'}
                   className={'w-full h-full focus:outline-0 bg-primary p-3 rounded-md'}/>
            <button onClick={(event) => event.preventDefault()} onMouseDown={toggleShowPassword} onMouseUp={toggleHidePassword} style={{paddingRight: ".75rem", outline: 'none'}}>
                {showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
            </button>
        </div>
    )
}