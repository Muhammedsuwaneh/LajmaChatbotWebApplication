"use client";

import React from 'react';
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import Logo from '../Logo/Logo';
export default function ResetPasswordRequestForm() {

  const [email, setEmail] = React.useState<string>("");

  const passwordResetRequestHandler = () => {
    // get token
    // send request
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "auto", 
    background: "#07BCCD", height: "100vh"}}>
      <Box sx={{ position: "fixed", top: "2rem", left: "2rem" }}>
        <Logo />
      </Box>
      <Box sx={{ padding: "2rem", background: "#fff", display: "flex", flexDirection: "column", width: {
        lg: "300px", md: "290px", xs: "290px", sm: "290px"
      }, borderRadius: "1rem" }}>
        <Typography textAlign="center" fontSize="1.3rem">Reset Password</Typography>
        <TextField variant='outlined' sx={{ margin:"1rem 0"}} label="Email" 
        onChange={(event) => setEmail(event.target.value)} required/>
        <Button onClick={passwordResetRequestHandler} variant="outlined">Send Password Reset</Button>
        <Typography textAlign="center" margin="1rem 0">Remember your password ? <Link href="/">Sign in</Link></Typography>
      </Box>
    </Box>
  )
}
