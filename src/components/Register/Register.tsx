"use client";

import { useState, useContext } from "react";
import { Typography, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, Box, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClipLoaderSpinner from "@/UI/Spinner/ClipLoader";
import Avatars from "@/UI/Avatars/Avatar";
import AuthContext from "@/context/AuthContext/AuthContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface RegisterPageProps {
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

export default function Register({ onFormChange }: RegisterPageProps) {

    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [selectedAvatar, setSelectedAvatar] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const userRegisterationRequestHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // get form data
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const avatar : string = selectedAvatar;

        // send request
        authContext.sendUserRegisterationRequest(username, email, password, avatar);
    };

    const LoadingContent = <ClipLoaderSpinner />;

    const setAvatarHandler = (avatar: string) => {
        setSelectedAvatar(avatar);
        console.log(selectedAvatar);
    }

    return (
        <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible">
            <form style={{ display: "flex", flexDirection: "column", overflow: "hidden" }} onSubmit={(event) => userRegisterationRequestHandler(event)}>
                <motion.div className="item" variants={item}>
                    <TextField id="username" name="username" label="Username" variant="outlined" sx={{ margin: "1rem 0" ,width: "100%"}} required/>
                </motion.div>
                <motion.div className="item" variants={item}>
                    <TextField id="email" type="email" name="email" label="Email" variant="outlined" sx={{ margin: "1rem 0", width: "100%"}} required/>
                </motion.div>
                <motion.div className="item" variants={item}>
                <FormControl sx={{ margin: "1rem 0", width: "100%" }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
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
                <Box>
                    <motion.div className="item" variants={item}>
                    <InputLabel htmlFor="outlined-adornment-password">Select Avatar:</InputLabel>
                    </motion.div>
                    <Avatars onAvatarSelected={setAvatarHandler} numberOfItems={5} />
                </Box>
                <motion.div className="item" variants={item}>
                <Button variant="outlined" sx={{ margin: "1rem 0", width: "100%"}} type="submit" disabled={authContext.sendingRequest}>
                    {authContext.sendingRequest ? LoadingContent : "Sign up"}
                </Button>
                </motion.div>
            </form>
            <motion.div className="item" variants={item}>
            <Typography sx={{ padding: ".5rem 2rem"}}>
                Already have an account ?  <Button variant="text" onClick={() => onFormChange("register")}>Sign in</Button>
            </Typography>
            </motion.div>
        </motion.div>
    );
}