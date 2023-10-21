"use client";

import React, { useState, useContext } from 'react';
import { Drawer, InputBase, Avatar, Box, Button, TextField, FormControl, 
    OutlinedInput, InputLabel, InputAdornment, IconButton, Input, Typography, Divider } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LinearProgress from '@mui/material/LinearProgress';
import UserContext, { IUserInfo } from '@/context/UserContext/UserContext';
import { getCookie } from "cookies-next";
import ThemeContext from '@/context/ThemeContext/ThemeContext';
import Avatars from '../Avatars/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from "framer-motion";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export const getUserAuthenticationToken = () : any => {

    const cookie_name = process.env.NEXT_PUBLIC_COOKIE_NAME; 
    if(cookie_name == undefined || cookie_name == null) return undefined;
    
    const token = getCookie(cookie_name);  
    return token;
    
};

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

export default function UpdateForm({ user }: {user: IUserInfo}) {
 
    const userContext = useContext(UserContext);
    const themeContext = useContext(ThemeContext);
    const [username, setUsername] = useState<string>(user.username);
    const [email, setEmail] = useState<string>(user.email);
    const [password, setPassword] = useState<string>(user.password);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>(user.avatar);

    type Anchor = 'top' | 'left' | 'bottom' | 'right';
    
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
    const toggleDrawer = (anchor: Anchor, open: boolean) => setState({ ...state, [anchor]: open });
    let tempSelectedAvatar = "";
    const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const setAvatarHandler = (_avatar: string) => {
        tempSelectedAvatar = _avatar;
        console.log(tempSelectedAvatar);
    }

    const confirmSelectedAvatar = () => {
        if(tempSelectedAvatar != "" && tempSelectedAvatar != undefined && 
        tempSelectedAvatar != null) {
            setAvatar(tempSelectedAvatar);
        }
        toggleDrawer("right", false);
    };

    const userInfoUpdateHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userInfo: IUserInfo = {
            id: user.id,
            username: username,
            email: email,
            avatar: avatar,
            password: password,
            dateJoined: user.dateJoined
        };
        
        const token: any = getUserAuthenticationToken();
        if(token == undefined || token == null) throw new Error("oops something went wrong 😢");
        // send user info update request
        userContext.updateUserRequest(token, userInfo);
    }

    return (
        <>
            <Drawer
                anchor="right"
                open={state["right"]}
                onClose={() => toggleDrawer("right", false)}
            >
               <Box sx={{ padding: "1rem", height: "100vh", background: (themeContext.appThemeMode == "light") ? "#fff" : "#100337" }}>
                    <Typography sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff"}}>Select Avatar</Typography>
                    <Divider />
                    <Avatars onAvatarSelected={setAvatarHandler} numberOfItems={20} />
                    <Button variant="outlined" onClick={confirmSelectedAvatar} 
                    sx={{ borderRadius: ".5rem", color: "#fff", background: "#22B3E0"}}>Confirm</Button>
               </Box>
            </Drawer>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ position: "relative", display: "flex", alignItems: "center", margin: "auto" }}>
                    <motion.div className="item" variants={item}>
                    <Avatar alt={avatar} src={avatar} sx={{ alignSelf: "center", color: "#C9C9C9", width: '6rem', height: '6rem', margin: ".3rem 0", position: "relative" }}>
                    </Avatar>
                    </motion.div>
                    <motion.div className="container" variants={container} initial="hidden" animate="visible">
                    <EditIcon sx={{ position: "absolute", bottom: "0", right: "0", padding: ".5rem", fontSize: "1rem", cursor: "pointer",
                        background: (themeContext.appThemeMode == "light") ? "#0D1117" : "#fff", color: (themeContext.appThemeMode == "light") ? "#fff" : "#0D1117" , 
                        borderRadius: "50%", "&:hover": { opacity: ".7" } }} onClick={() => toggleDrawer("right", true)}/>
                   </motion.div>
                </Box>
                <form onSubmit={(event) => userInfoUpdateHandler(event)}>
                    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 2rem", marginTop: "2rem" }}>
                        <motion.div className="item" variants={item}>
                            <FormControl sx={{ margin: "1rem 0", width: '30ch',
                                color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }} 
                                variant="standard" required>
                            <InputLabel htmlFor="standard-adornment-email" 
                                sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff"}}>Username</InputLabel>
                                <Input
                                    id="standard-adornment-username"
                                    type="username"
                                    value={username}
                                    startAdornment={
                                        <InputAdornment position="start">
                                          <PersonOutlineIcon sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }} />
                                        </InputAdornment>
                                    }
                                    sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff",borderBottom: ".5px solid #85C1E9" }}
                                    onChange={(event) => setUsername(event.target.value)}
                            />
                            </FormControl>
                        </motion.div>
                        <motion.div className="item" variants={item}>
                            <FormControl sx={{ margin: "1rem 0", width: '30ch', color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }} 
                            variant="standard" required>
                            <InputLabel htmlFor="standard-adornment-email" 
                                sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }}>Email</InputLabel>
                                <Input
                                    startAdornment={
                                        <InputAdornment position="start">
                                        <AlternateEmailIcon  sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }} />
                                        </InputAdornment>
                                    }
                                    id="outlined-adornment-email"
                                    type="email"
                                    value={email}
                                    sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff", borderBottom: ".5px solid #85C1E9" }}
                                    onChange={(event) => setEmail(event.target.value)}
                            />
                            </FormControl>
                        </motion.div>
                        <motion.div className="item" variants={item}>
                            <FormControl sx={{  margin: "1rem 0", width: '30ch', color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }} 
                            variant="standard" required>
                                <InputLabel htmlFor="outlined-adornment-password" 
                                sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }}>Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff", borderBottom: ".5px solid #85C1E9" }}
                                    onChange={(event) => setPassword(event.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ color: (themeContext.appThemeMode == "light") ? "#000" : "#fff" }}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </motion.div>
                    </Box>
                    <Box sx={{ display: "flex", margin: "2rem 0 0 3rem", alignItems: 'left'}}>
                        <motion.div className="item" variants={item}>
                            <Button variant="outlined" sx={{ color: '#E50815', borderRadius: ".5rem", border: '1px solid #E50815'}}>
                                Discard
                            </Button>
                        </motion.div>
                        <motion.div className="item" variants={item}>
                            <Button type='submit' variant="contained" sx={{ margin: "0 1rem", borderRadius: ".5rem", background: "#22B3E0"}}>
                                Save
                            </Button>
                        </motion.div>
                    </Box>
                    <Box margin="2rem">
                    {userContext.sendingRequest && <LinearProgress sx={{ width: "7rem" }} /> }
                    </Box>
                </form>
            </Box> 
        </>
    )
}