import {LazyImage} from "../UtilityComponents/LazyImage/LazyImage.jsx";
import {DarkModeSwitch} from "react-toggle-dark-mode";
import useDarkSide from "../UtilityComponents/DarkMode/useDarkMode.js";
import {useCallback, useMemo} from "react";

// eslint-disable-next-line react/prop-types
export const BannerPage = ({children, bigBanner, smallBanner, reverse}) => {
    const [colorTheme, setTheme] = useDarkSide();

    const isDarkMode = useMemo(() => {
        return colorTheme === 'dark';
    }, [colorTheme])

    const toggleTheme = useCallback((checked) => {
        if (checked === undefined) {
            setTheme(!colorTheme)
        } else {
            setTheme(checked ? 'dark' : 'light')
        }
    }, [colorTheme, setTheme]);


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
            onChange={toggleTheme}
            size={15}
            className={'absolute right-10 top-10'}
        />
    </div>)
}