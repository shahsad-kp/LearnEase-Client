import {createContext, useCallback, useEffect, useMemo, useState} from "react";

export const themeCtx = createContext({});

// eslint-disable-next-line react/prop-types
function ThemeProvider({children}) {
    const [colorTheme, _setTheme] = useState('light');

    const setTheme = useCallback((theme) => {
        _setTheme(prevState => {
            const root = window.document.documentElement;
            root.classList.remove(prevState);
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
            return theme
        })
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        const theme = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
        _setTheme(theme)
    }, []);

    useEffect(() => {
        const changeColorScheme = () => {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const newColorScheme = isDark ? 'light' : 'dark';
            setTheme(newColorScheme)
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', changeColorScheme);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', changeColorScheme);
        }
    }, [setTheme])

    const data = useMemo(() => ({
        colorTheme,
        setTheme
    }), [colorTheme, setTheme]);

    return <themeCtx.Provider value={data}>
        {children}
    </themeCtx.Provider>
}

export default ThemeProvider;
