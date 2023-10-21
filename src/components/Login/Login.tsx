"use client";

import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Typography, TextField, FormControl, OutlinedInput, 
        InputLabel, InputAdornment, IconButton, Box, Button 
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClipLoaderSpinner from "@/UI/Spinner/ClipLoader";
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext/AuthContext";

interface LoginPageProps {
    onFormChange: (formType: string) => void,
}

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      },
    margin: 0
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

export default function Login({ onFormChange }: LoginPageProps) {

    const router = useRouter(); 
    const authContext = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const userAuthenticationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // get user inputs
        const formData = new FormData(event.currentTarget);
        const userEmail =  formData.get('email') as string;
        const userPassword =  formData.get('password') as string;

        // send user authentication request
        authContext.sendUserAuthenticationRequest(userEmail, userPassword);
    }

    const LoadingContent = <ClipLoaderSpinner />;

    return (
            <motion.div
                className="container"
                variants={container}
                initial="hidden"
                animate="visible"
            >
               <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(event) => userAuthenticationHandler(event)}>
                <motion.div className="item" variants={item}>
                    <TextField id="outlined-basic" label="Email" name="email" variant="outlined" sx={{ margin: "1rem 0", width: "100%"}} required/>
                </motion.div>
                <motion.div className="item" variants={item}>
                <FormControl sx={{ margin: "1rem 0", width: "100%" }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                        name="password"
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
                        label="Password"
                    />
                </FormControl>
                </motion.div>
                <Box sx={{ padding: ".3rem", display: "flex", justifyContent: "space-between"}}>
                    <motion.div className="item" variants={item}>
                        <Typography>Forgot password ? </Typography>
                    </motion.div>
                    <motion.div className="item" variants={item}>
                        <Link href="/resetpassword" underline="none">
                            Reset 
                        </Link>
                    </motion.div>
                </Box>
                <motion.div className="item" variants={item}>
                <Button variant="outlined" sx={{ margin: "1rem 0" , width: "100%"}} type="submit" disabled={authContext.sendingRequest}>
                    {authContext.sendingRequest ? LoadingContent : "Login"}
                </Button>
                </motion.div>
                <motion.div className="item" variants={item}>
                <Typography sx={{ padding: "1rem 2rem"}}>
                    Don&apos;t have account ?  <Button variant="text" onClick={() => onFormChange("register")}>Sign up</Button>
                </Typography>
                </motion.div>
                </form>
            </motion.div>
    );
}