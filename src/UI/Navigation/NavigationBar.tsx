"use client";

import * as React from 'react';
import { useRouter } from "next/navigation"; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import ThemeContext from '@/context/ThemeContext/ThemeContext';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import HistoryIcon from '@mui/icons-material/History';
import AuthContext from '@/context/AuthContext/AuthContext';
import Logout from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Logo from '../Logo/Logo';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { motion } from "framer-motion";
import { getCookie } from 'cookies-next';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

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

function NavigationBar() {
  const themeContext = React.useContext(ThemeContext);
  const authContext = React.useContext(AuthContext);
  const [avatar, setAvatar] = React.useState<string | undefined>("");

  type Anchor = 'top' | 'left' | 'bottom' | 'right';
    
  const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
  const toggleDrawer = (anchor: Anchor, open: boolean) => setState({ ...state, [anchor]: open });

  const logoutHandler = () => {
    toggleDrawer("right", false);
    // // delete cookie and redirect to login page
    const cookie_name = process.env.NEXT_PUBLIC_COOKIE_NAME;
    if(cookie_name != undefined) {
      authContext.logoutRequest(cookie_name);
    }
  };

  React.useEffect(() => {
    const name: any = process.env.NEXT_PUBLIC_AVATAR_NAME;
    setAvatar(getCookie(name));
  }, []);

  return (
    <>
     <Drawer
        anchor="right"
        open={state["right"]}
        onClose={() => toggleDrawer("right", false)}
      >
        <Box
            sx={{ padding: "1rem", width: "250px", background: (themeContext.appThemeMode == "light") ? "#E5E8E8": "#1F1148", height: "100vh" }}
            role="presentation"
        >
        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible">
          <List>
              <motion.div className="item" variants={item}>
                <Box sx={{ padding: "1rem"}}>
                  <Logo />
                </Box>
                <Divider  sx={{ background: "#03001C"}} />
              </motion.div>
              <motion.div className="item" variants={item}>
                <ListItem disablePadding sx={{ margin: ".6rem 0"}}
                onClick={() => toggleDrawer("right", false)} component="a" href="/user/chat">
                  <ListItemButton>
                    <ListItemIcon>
                      <ChatIcon fontSize="small" sx={{ color: (themeContext.appThemeMode == "light") ? "#5B0888": "#fff" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Chat" sx={{ color: (themeContext.appThemeMode == "light") ? "#5B0888": "#fff" }} />
                  </ListItemButton>
                </ListItem>
              </motion.div>
              <motion.div className="item" variants={item}>
                <ListItem disablePadding component="a" href="/user/profile" onClick={() => toggleDrawer("right", false)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" sx={{ color: (themeContext.appThemeMode == "light") ? "#5B0888": "#fff" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ color: (themeContext.appThemeMode == "light") ? "#5B0888": "#fff" }} />
                  </ListItemButton>
                </ListItem>
              </motion.div>
              <motion.div className="item" variants={item}>
                <ListItem sx={{ margin:"60vh 1rem 0 1rem", textAlign: "center" }} onClick={logoutHandler}>
                  <Button variant="outlined" startIcon={<Logout sx={{ color: (themeContext.appThemeMode == "light") ? "#FF0000" : "#fff" }} />} 
                    sx={{ border: "2px solid red", color: (themeContext.appThemeMode == "light") ? "#FF0000" : "#fff", width: '70%', 
                    background: (themeContext.appThemeMode == "light") ? "" : "#FF0000",
                    borderRadius: "3rem", alignSelf: "center"
                    }}>
                      Logout
                    </Button>
                </ListItem>
            </motion.div>
          </List>
        </motion.div>
      </Box>
    </Drawer>
    <AppBar sx={{ position: "sticky", top: '0', left: '0' }}>
      <Container maxWidth="xl" sx={{ background: (themeContext.appThemeMode == "light") ? "#F2F4F4": "#1F1148" }}>
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1, display: { lg: 'none', md: 'none', sm: 'flex', xs: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => toggleDrawer("right", true)}
              color="inherit"
            >
              <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                    <Avatar alt={avatar} src={avatar}  
                    sx={{ border: (themeContext.appThemeMode == "light") ? "2px solid #333" : "2px solid #fff" }} />
              </StyledBadge>
            </IconButton>
          </Box>
          <Logo />
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: 'flex', margin: '0 1rem' }}> 
              <IconButton>
                  <HistoryIcon sx={{ display: { lg: 'none', md: "block", sm: "block", xs: "block" }, fontSize: "2rem", cursor: "pointer", 
                    color: (themeContext.appThemeMode == "light") ? "#5B0888": "#fff" }} 
                    onClick={() => themeContext.toggleDrawer("left", true)}/>
                </IconButton>
              <Tooltip title="Open">
                <IconButton onClick={() => toggleDrawer("right", true)} sx={{  display: { lg: 'block', md: "none", sm: "none", xs: "none" }}}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    >
                      <Avatar alt={avatar} src={avatar} 
                      sx={{ border: (themeContext.appThemeMode == "light") ? "2px solid #333" : "2px solid #fff" }} />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <IconButton onClick={() => themeContext.setAppThemeMode()} color="inherit">
                {themeContext.appThemeMode === 'light' ? <WbSunnyOutlinedIcon sx={{ color: "#5B0888"}} /> : <WbSunnyIcon sx={{ color: "#fff"}} />}
              </IconButton>  
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default NavigationBar;