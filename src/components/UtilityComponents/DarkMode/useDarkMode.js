import {useCallback, useEffect, useState} from "react";

export default function useDarkSide() {
    const [colorTheme, _setTheme] = useState(
        localStorage.getItem('theme') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark': 'light'
    );

    const setTheme = useCallback((theme) => {
        const root = window.document.documentElement;
        root.classList.remove(theme==='dark' ? 'light': 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
        _setTheme(theme)
    }, [])

    useEffect(() => {
        const changeColorScheme = () => {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const newColorScheme = isDark ? 'light' : 'dark';
            setTheme(newColorScheme)
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
            'change',
            changeColorScheme
        );

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener(
                'change',
                changeColorScheme
            );
        }
    }, [setTheme])

    return [colorTheme, setTheme]
}