"use client";

import { createContext, useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface IDrawer {
    top: boolean | undefined,
    left: boolean | undefined,
    bottom: boolean | undefined,
    right: boolean | undefined
};

interface IThemeContext {
    appThemeMode: string,
    drawerState: IDrawer,
    toggleDrawer: (anchor: Anchor, open: boolean | undefined) => void
    setAppThemeMode: () => void,
}

const ThemeContext = createContext<IThemeContext>({
    appThemeMode: "",
    drawerState: {
        top: false,
        left: false,
        bottom: false,
        right: false,
    },
    toggleDrawer: () => {},
    setAppThemeMode: () => {},
});

interface Props {
    children?: React.ReactNode | undefined;
}

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
    const [appThemeMode, setAppThemeMode] = useState<string>("");
    const [drawerState, setDrawerState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    
    const toggleDrawerHandler = (anchor: Anchor, open: boolean | undefined) => {
        setDrawerState({ ...drawerState, [anchor]: open });
    };
    
    const AppThemeModeHandler = () => {
        if(appThemeMode == "light") {
            setAppThemeMode("dark");
            setCookie("THEME_MODE", "dark");
        }
        else {
            setAppThemeMode("light");
            setCookie("THEME_MODE", "light");
        }
    }

    useEffect(() => {
        let mode: any = getCookie("THEME_MODE");
        if(mode == undefined) mode = "light";
        setAppThemeMode(mode);
    }, [])

    return (
        <ThemeContext.Provider value={{ 
                appThemeMode: appThemeMode,
                drawerState: drawerState,
                toggleDrawer: toggleDrawerHandler,
                setAppThemeMode: AppThemeModeHandler
            }}>
                {""}
                {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;