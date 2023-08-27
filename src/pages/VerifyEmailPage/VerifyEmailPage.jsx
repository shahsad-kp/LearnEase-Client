import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {verifyEmail} from "../../service/api/user.js";
import BannerImage from "../../assets/banner-images/verify-email.png"

export const VerifyEmailPage = () => {
    const {token} = useParams();
    const [status, setStatus] = useState("error");

    useEffect(() => {
        verifyEmail(token).then(() => {
            setStatus("success");
        }).catch(() => {
            setStatus("error");
        });
    }, [token]);

    return (
        <div className={'min-h-[100vh] min-w-[100vw] h-fit w-fit flex justify-center items-center bg-primary'}>
            <div className={'h-fit w-fit min-h-screen min-w-screen sm:min-w-fit sm:min-h-fit flex flex-col gap-3 p-3 bg-secondary shadow rounded'}>
                <div>
                    <img alt={'banner'} src={BannerImage}/>
                    {status === "loading" && <h1 className={'text-center text-2xl font-bold text-primary'}>Verifying Email...</h1>}
                    {status === "success" && <h1 className={'text-center text-2xl font-bold text-primary'}>Email Verified Successfully</h1>}
                    {status === "error" && <h1 className={'text-center text-2xl font-bold text-primary'}>Invalid token</h1>}
                </div>
            </div>
        </div>
    )
}