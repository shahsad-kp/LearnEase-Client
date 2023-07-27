import {LazyImage} from "../UtilityComponents/LazyImage/LazyImage.jsx";
import {DarkModeSwitch} from "react-toggle-dark-mode";
import {useContext, useMemo} from "react";
import {themeCtx} from "../../store/themeCtx.jsx";

// eslint-disable-next-line react/prop-types
export const BannerPage = ({children, bigBanner, smallBanner, reverse}) => {
    const {colorTheme, setTheme} = useContext(themeCtx);

    const isDarkMode = useMemo(() => {
        return colorTheme === 'dark';
    }, [colorTheme]);

    return (<div
        className={
            `bg-secondary dark:bg-dark-secondary relative flex justify-center align-middle h-screen${reverse ? ' flex-row-reverse' : ' flex-row'}`
        }>
        <section className={'hidden md:flex w-2/4 justify-center'}>
            <LazyImage className={'object-contain w-3/4'} bigSrc={bigBanner} smallSrc={smallBanner} alt={'Banner'}/>
        </section>
        {children}
        <DarkModeSwitch
            checked={isDarkMode}
            onChange={checked => setTheme(checked ? 'dark' : 'light')}
            size={15}
            className={'absolute right-10 top-10'}
        />
    </div>)
}