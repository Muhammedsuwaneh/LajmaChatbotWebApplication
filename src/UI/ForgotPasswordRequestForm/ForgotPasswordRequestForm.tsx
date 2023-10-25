"use client";

import React from 'react';
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import Logo from '../Logo/Logo';
import AuthContext from '@/context/AuthContext/AuthContext';
import Toast from '../Toast/Toast';
import ClipLoaderSpinner from '../Spinner/ClipLoader';

export default function ForgotPasswordRequestForm() {

  const [email, setEmail] = React.useState<string>("");
  let authContext = React.useContext(AuthContext);

  const passwordResetRequestHandler = () => {
    authContext.forgotpasswordHandler(email);
  };

  const LoadingContent = <ClipLoaderSpinner />;

  return (
    <>
      {authContext.isOpen && <Toast status={authContext.responseStatus} message={authContext.responseMessage} />}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "auto", 
        background: "#07BCCD", height: "100vh"}}>
          <Box sx={{ position: "fixed", top: "2rem", left: "2rem" }}>
            <Logo />
          </Box>
          <Box sx={{ padding: "2rem", background: "#fff", display: "flex", flexDirection: "column", width: {
            lg: "300px", md: "290px", xs: "280px", sm: "280px"
          }, borderRadius: "1rem", margin: ".5rem" }}>
          <Typography textAlign="center" fontSize="1.3rem">Reset Password</Typography>
          <TextField variant='outlined' sx={{ margin:"1rem 0"}} label="Email" 
          onChange={(event) => setEmail(event.target.value)} required/>
          <Button onClick={passwordResetRequestHandler} variant="outlined" disabled={authContext.sendingRequest}>
          {authContext.sendingRequest ? LoadingContent : "Send reset link"}
          </Button>
          <Typography textAlign="center" margin="1rem 0">Remember your password ? <Link href="/">Sign in</Link></Typography>
      </Box>
    </Box>
    </>
  )
}
