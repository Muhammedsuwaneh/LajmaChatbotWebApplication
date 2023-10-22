"use client";
import { useContext, useState } from 'react';
import ThemeContext from '@/context/ThemeContext/ThemeContext';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const themeContext = useContext(ThemeContext);
  
  return (
    <Box>
      <a href="/">
        {(themeContext.appThemeMode == "light") ? 
        <Image
          src="/LightModeLogo.png"
          alt=""
          width={70}
          height={40}
          style={{ cursor: "pointer" }}
          />  : 
          <Image
          src="/DarkModeLogo.png"
          alt=""
          width={70}
          height={40}
          style={{ cursor: "pointer" }}
          /> 
        }
      </a>
    </Box>
  );
};
