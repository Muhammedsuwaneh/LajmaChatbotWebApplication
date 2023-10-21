"use client";

import React from 'react';
import NavigationBar from '@/UI/Navigation/NavigationBar';
import Box from "@mui/material/Box";

import { QueryContextProvider } from '@/context/QueryContext/QueryContext';
import ThemeContext from "@/context/ThemeContext/ThemeContext";

interface Props {
    children: React.ReactNode;
};

const AccountLayout : React.FC<Props> = ({ children }) => {
  const themeContext = React.useContext(ThemeContext);
  return (
    <>
          <NavigationBar />
          <QueryContextProvider>
            <Box sx={{ background: (themeContext.appThemeMode == "light") ? "#eee": "#0D1117" }}>
              {children}
            </Box>
          </QueryContextProvider>
    </>
  )
}

export default  AccountLayout;