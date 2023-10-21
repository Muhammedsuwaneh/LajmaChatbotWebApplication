"use client";

import { Box } from "@mui/material";
import { SyncLoader } from "react-spinners";

const style = {
  width: "100%", 
  display: "flex",
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center"
};

export default function SyncLoaderSpinner() {
  return (
     <Box sx={style}>
        <SyncLoader color="#36d7b7" />
     </Box>
  )
}