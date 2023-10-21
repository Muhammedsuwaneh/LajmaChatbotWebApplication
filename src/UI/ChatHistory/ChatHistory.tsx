"use client";
import React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThemeContext from '@/context/ThemeContext/ThemeContext';
import QueryContext from '@/context/QueryContext/QueryContext';
import ClipLoaderSpinner from '../Spinner/ClipLoader';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Drawer from '@mui/material/Drawer';
import ChatHistoryContent from './ChatHistoryContent';
import styles from "./ChatHistory.module.css";
import { motion } from "framer-motion";

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

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function ChatHistory({ token }: { token: string | undefined | null }) {

  const themeContext = React.useContext(ThemeContext);
  const queryContext = React.useContext(QueryContext);
  let content: any = "";

  const [open, setOpen] = React.useState(false);

  const [selectedQueryHistoryId, setSelectedQueryHistoryId] = React.useState<string | null>("");
  const handleOpen = (id: string | null) => {
    setOpen(true);
    setSelectedQueryHistoryId(id);
  }
  const handleClose = () => setOpen(false);

  const displayHistoryHandler = (id: string | null) => {
    themeContext.toggleDrawer("left", false);
    setSelectedQueryHistoryId(id);
    queryContext.changeChatPageContent(id);
  };

  const newChatHandlerWithToggle = () => {
    themeContext.toggleDrawer("left", false);
    queryContext.newChat();
  };
  
  const deleteHistoryHandler = () => {
    handleClose();
    queryContext.deleteChatHistory(selectedQueryHistoryId);
  }

  const selectHistoryItemBackgroundColor = (id: string | null) => {
    if(id == selectedQueryHistoryId && themeContext.appThemeMode == "dark") 
      return "#3C1164";
    else if(id == selectedQueryHistoryId && themeContext.appThemeMode == "light")
      return "#CCCCFF";
    return themeContext.appThemeMode == "light" ? "#fff" : "#03001C";
  }

  if(queryContext.fetchingChatHistory == true) {
    content=  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography margin=".7rem 0">Fetching Chat History</Typography>
        <ClipLoaderSpinner />
    </Box> 
  }
  else if(queryContext.chatHistory !== null && queryContext.chatHistory?.length > 0 && queryContext.fetchingChatHistory == false) {
    content =  
      <motion.div
      className="container"
      variants={container}
      initial="hidden"
      animate="visible">
        <List className={styles.chat__history} sx={{ height: "65vh", width: "100%",
          overflowY: (queryContext.chatHistory.length > 7) ? "scroll" : "unset", padding: "5px", marginTop: "5px" }}>
          {queryContext.chatHistory.map((chat) => {
            return (
              <motion.div className="item" variants={item} key={chat.id}>
                <ListItem
                    sx={{ background: selectHistoryItemBackgroundColor(chat.id),
                    margin: "10px 0", borderRadius: "50px", transition: "opacity .5s ease", "&:hover": { opacity: ".7" }}}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon sx={{ color: "red", transition: "opacity .5s ease", "&:hover": { opacity: ".5" }}}
                        onClick={() => handleOpen(chat.id)} />
                      </IconButton>
                    }
                  >
                    <ListItemText onClick={() => displayHistoryHandler(chat.id)} 
                      sx={{ color: (themeContext.appThemeMode == "light") ? "#1976D2" : "#fff", cursor: "pointer", '&:hover': 
                      { opacity: '.8' }, fontWeight: (themeContext.appThemeMode == "light") ? "bold" : "light" }}
                      primary={chat.title}
                    />
                  </ListItem>
              </motion.div>
            )})}
        </List>
      </motion.div>;
  }
  else {
    content = 
    <Box sx={{ height: "50vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
         <Typography>No chat history</Typography>
    </Box>;
  }

  return (
    <>
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
            <Typography id="modal-modal-title" variant="h6" component="h6">
              Deleted chat history cannot be reverted. Do you want to proceed ?
            </Typography>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
                <Button variant="text" sx={{ color:"red", marginRight:".5rem" }} onClick={() => deleteHistoryHandler()}>Yes</Button>
                <Button variant="text" sx={{ color:"blue" }}  onClick={() => handleClose()}>Cancel</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Stack sx={{ alignItems: 'center', display: { lg: 'block', md: 'none', sm: 'none', xs: 'none'}, position: 'fixed', top: '60px', left: '0',
        width: { lg: "25%", md: '80%', sm: '80%', xs: '80%'}, padding: "1rem", 
        background: (themeContext.appThemeMode == "light") ? "#EAEDED": "#100337",
        color: (themeContext.appThemeMode == "light") ? "#000": "#fff", zIndex: "100" }}>
        <ChatHistoryContent onNewChat={() => queryContext.newChat()}>{content}</ChatHistoryContent>
      </Stack>
      <Drawer anchor="left" sx={{ padding: '1rem' }} open={themeContext?.drawerState["left"]} onClose={() => themeContext.toggleDrawer("left", false)}>
        <Box sx={{ background: (themeContext.appThemeMode == "light") ? "#E3E3E3": "#100337", padding: "1rem", height: "100vh", width: "300px" }}>
            <ChatHistoryContent onNewChat={newChatHandlerWithToggle}>{content}</ChatHistoryContent>
        </Box>
      </Drawer>
    </>
  )
}


