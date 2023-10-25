"use client";

import React from 'react';
import { Typography, FormControl, OutlinedInput, 
  InputLabel, InputAdornment, IconButton, Box, Button, Link } from "@mui/material";
import Logo from '../Logo/Logo';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserContext from '@/context/UserContext/UserContext';
import Toast from '../Toast/Toast';
import ClipLoaderSpinner from '../Spinner/ClipLoader';

export default function ResetPasswordForm({ token }: { token: string }) {

  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>("");
  let userContext = React.useContext(UserContext);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };

  const passwordResetRequestHandler = () => {
    // validate inputs
    if(newPassword !== confirmNewPassword) alert("Password did not match");
    else userContext.resetPasswordHandler(token, confirmNewPassword);
  };

  const LoadingContent = <ClipLoaderSpinner />;

  return (
    <>
      {userContext.isOpen && <Toast status={userContext.responseStatus} message={userContext.responseMessage} />}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "auto", 
        background: "#07BCCD", height: "100vh"}}>
      <Box sx={{ position: "fixed", top: "2rem", left: "2rem" }}>
        <Logo />
      </Box>
      <Box sx={{ padding: "2rem", background: "#fff", display: "flex", flexDirection: "column", width: {
        lg: "300px", md: "290px", xs: "280px", sm: "280px"
      }, borderRadius: "1rem", margin: ".5rem" }}>
        <FormControl sx={{ margin: "1rem 0", width: "100%" }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={(event) => setNewPassword(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="New Password"
                    />
          </FormControl>
          <FormControl sx={{ margin: "1rem 0", width: "100%" }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                    <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={(event) => setConfirmNewPassword(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm New Password"
                    />
          </FormControl>
          <Button onClick={passwordResetRequestHandler} variant="outlined" disabled={userContext.sendingRequest}>
          {userContext.sendingRequest ? LoadingContent : "Send reset link"}
          </Button>
          <Typography textAlign="center" margin="1rem 0">Remember your password ? <Link href="/">Sign in</Link></Typography>
        </Box>
      </Box>
    </>
  )
}
