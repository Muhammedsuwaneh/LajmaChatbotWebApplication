"use client";

import React, { useState, useContext } from "react";
import UserContext, { IUserInfo } from "@/context/UserContext/UserContext";
import Toast from "@/UI/Toast/Toast";
import { Box, Stack, Typography, Button, Avatar } from "@mui/material";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import UpdateForm, { getUserAuthenticationToken } from "@/UI/UpdateForm/UpdateForm";
import DateRangeIcon from '@mui/icons-material/DateRange';
import ThemeContext from "@/context/ThemeContext/ThemeContext";
import { motion } from "framer-motion";

interface Props {
  user: IUserInfo
};

const style = {
  position: 'absolute' as 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid red',
  boxShadow: 24,
  p: 4,
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

export default function Profile({ user }: Props) {

  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteAccountHandler = () => {
    const token = getUserAuthenticationToken();
    if(token != null && token != undefined)
      userContext.deleteUserRequest(token);
  }

  return (
    <Box sx={{ padding: { lg: "1rem", md: "1rem", sm: "1rem", xs: "1rem" }}}>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h5">
               ⚠️ You won&apos;t be able to recover your account and chat history.
               Do you wish to proceed ?
            </Typography>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
                <Button variant="text" sx={{ color:"red", marginRight:".5rem" }} onClick={() => deleteAccountHandler()}>Yes</Button>
                <Button variant="text" sx={{ color:"blue" }}  onClick={() => handleClose()}>Cancel</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {userContext.isOpen && <Toast status={userContext.responseStatus} message={userContext.responseMessage} /> } 
      <Box sx={{ margin: 'auto', width: { lg: "60%", md: '70%', sm: "100%", xs: "100%", minHeight: "60vh", 
      padding: "2rem 0" }}}>
      <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible">
          <Box sx={{ background: (themeContext.appThemeMode == "light") ? "#fff" : "#041F34", 
          padding: "2rem 0", margin: "1rem 0", borderRadius: ".5rem", display: "flex", 
          boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)",
          flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
                <UpdateForm user={user} />
          </Box>
        </motion.div>
        <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible">
          <Box sx={{ background: (themeContext.appThemeMode == "light") ? "#fff" : "#041F34", display: "flex", flexDirection: { lg: "row", md: "row", sm: "column", xs: "column"}, 
          justifyContent: "space-between", alignItems: "center", borderRadius: "1rem", boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)",
            textAlign: "right", padding: "1rem" }}>
              <Box sx={{ display: "flex", alignItems: "center", margin: { lg: "0", md: "0", xs: "1rem 0", sm: "1rem 0"} }}>
                <Avatar sx={{ bgcolor:  (themeContext.appThemeMode == "light") ? "#ECE2F5" : "#03001C" }}>
                        <DateRangeIcon sx={{ fontSize: "1.1rem", cursor: "pointer", color: (themeContext.appThemeMode == "light") ? "#5B0888" : "#fff" }} />
                  </Avatar>     
                  <Typography sx={{ margin: ".5rem", color: (themeContext.appThemeMode == "light") ? "#000" : "#fff"}}>Joined: {user.dateJoined.split(" ")[0]}</Typography>
              </Box>
              <Button variant="outlined" onClick={() => handleOpen()} sx={{ color: '#E50815', borderRadius: ".5rem", border: '1px solid #E50815'}}>
                  Delete Account
              </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  )
}