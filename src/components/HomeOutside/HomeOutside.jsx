import {useNavigate} from "react-router-dom";

export const HomeOutside = () => {
    const navigator = useNavigate();

    return (
        <>
            <div className={'w-3/4'}>
                <img src={'/images/logo/logo-banner.png'} className={'object-cover'} alt={'Logo'}/>
            </div>
            <p className={'text-center font-semibold italic'}>Welcome to Our Virtual Classroom! Experience seamless
                online learning with our innovative platform. Connect, engage, and excel with interactive tools,
                rich resources, and a supportive community of passionate learners.</p>
            <button className={'bg-logo-green px-5 py-2.5 rounded-md accent-white font-bold text-white'}
                    onClick={() => {
                        navigator('/login')
                    }}>
                Get Started
            </button>
        </>
    )
}