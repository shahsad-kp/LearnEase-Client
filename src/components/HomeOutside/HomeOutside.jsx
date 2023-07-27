import {useNavigate} from "react-router-dom";
import {bannerPageButtonClass} from "../styles.js";
import {useCallback, useContext, useMemo} from "react";
import LogoBannerDark from "../../assets/logo/dark-logo-banner.png";
import LogoBanner from "../../assets/logo/logo-banner.png";
import {themeCtx} from "../../store/themeCtx.jsx";

export const HomeOutside = () => {
    const navigator = useNavigate();
    const {colorTheme} = useContext(themeCtx);

    const getLogo = useCallback((theme) => {
        if (theme === 'dark') {
            return LogoBannerDark;
        } else {
            return LogoBanner;
        }
    }, []);
    const logo = useMemo(() => getLogo(colorTheme), [colorTheme, getLogo]);

    return (
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-16 p-2 md:p-8'}>
            <div className={'w-3/4'}>
                <img src={logo} className={'object-cover'} alt={'Logo'}/>
            </div>
            <p className={'text-center font-semibold italic text-black dark:text-white'}>Welcome to Our Virtual Classroom! Experience seamless
                online learning with our innovative platform. Connect, engage, and excel with interactive tools,
                rich resources, and a supportive community of passionate learners.</p>
            <button className={bannerPageButtonClass}
                    onClick={() => {
                        navigator('/login/')
                    }}>
                Get Started
            </button>
        </section>

    )
}