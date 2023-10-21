"use client";

import React from 'react';
import { Box } from "@mui/material";
import Image from 'next/image';

const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    animation: "rotate 2s linear infinite",
    "@keyframes rotate": {
        "0%": {
          transform: "rotate(0deg)"
        },
        "100%": {
          transform: "rotate(360deg)"
        }
    }
};

interface Props {
    width: number,
    height: number,
}

export default function PageLoaderSpinner({ width, height }: Props) {
  return (
    <Box sx={{ ...styles, width: `${width+5}`, height: `${height+5}` }}>
        <Image src="/favicon.png" width={width} height={height} alt="" />
    </Box>
  )
}
