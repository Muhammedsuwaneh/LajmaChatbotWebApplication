'use client';

import React from 'react'
import Dialog from '@/UI/Dialog/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import QueryContext from '@/context/QueryContext/QueryContext';
import ThemeContext from '@/context/ThemeContext/ThemeContext';
import { motion } from "framer-motion";
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

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

export default function Chat() {

  const queryContext = React.useContext(QueryContext);
  const themeContext = React.useContext(ThemeContext);
  let content: any = "";

  if(queryContext.chatPageContent == "welcome") {
    content =   
        <Box sx={{ minHeight: "100vh", position: "relative", padding: "1rem" }}>
            <motion.div
              className="container"
              variants={container}
              initial="hidden"
              animate="visible">
                <Box sx={{ display: "flex", justifyContent: "space-between", border: (themeContext.appThemeMode == "light") ? "1px solid #5B0888": "",
                      background: (themeContext.appThemeMode == "light") ? "#fff": "#041F34", padding: '2rem',
                      borderRadius: "1rem", color: (themeContext.appThemeMode == "light") ? "#000": "#fff" }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: { lg: "1.2rem", sm: "1rem", xs: "1rem", md: "1.3rem", }}}>Hello  I&apos;m Laj&apos;ma</Typography>
                        <Typography sx={{ paddingTop: ".7rem"}}>How can I be of assistance ?</Typography>
                      </Box>               
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Image
                            src="/smile.gif" alt="hello" 
                            style={{ borderRadius:"50%" }}
                            width={70}
                            height={70} 
                            />
                      </Box>
                    </Box>
              </motion.div>
              <motion.div
                className="container"
                variants={container}
                initial="hidden"
                animate="visible">
                  <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "2rem", 
                        margin: "1rem 0",
                        border: (themeContext.appThemeMode == "light") ? "1px solid #5B0888": "",
                        background: (themeContext.appThemeMode == "light") ? "#fff": "#041F34", 
                        borderRadius: "1rem",
                        position: 'relative'
                    }}
                    >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>   
                        <Avatar sx={{ bgcolor:  (themeContext.appThemeMode == "light") ? "#ECE2F5" : "#03001C" }}>
                          <LightbulbIcon sx={{ fontSize: "1.1rem", cursor: "pointer", color: (themeContext.appThemeMode == "light") ? "#5B0888" : "#fff" }} />
                        </Avatar>          
                      <Typography sx={{ textAlign: "right"}}></Typography>  
                    </Box>
                    <Typography sx={{ paddingTop: '2rem' }}>
                      Lajma: Your Inspired AI Chat Companion.
                      Lajma is more than just a chatbot; it&apos;s an AI-powered marvel inspired by the genius of OpenAI&apos;s ChatGPT and the enchanting allure of Google Bard. 
                      Designed to elevate your conversational experience to new heights, Lajma draws inspiration from the very best to bring you a cutting-edge chatbot application.
                      With Lajma, you can explore the limitless possibilities of natural language understanding and generation. It leverages the power of OpenAI&apos;s API to access the incredible GPT-3.5 Turbo Model, 
                      ensuring that every interaction is not just informative but also genuinely insightful.
                      Discover the future of chatbots, explore the depths of human-AI interaction, and let Lajma redefine the way you connect with technology. Welcome to the future of chat, welcome to Lajma!  
                    </Typography>     
                </Box>
                <Avatar sx={{
                    p: "10px",
                    cursor: "pointer",
                    bgcolor: themeContext.appThemeMode === "light" ? "#ECE2F5" : "#301E67",
                    border: themeContext.appThemeMode === "light" ? ".5px solid #5B0888" : ".5px solid #301E67",
                    position: "fixed",
                    top: "80vh",
                    right: "1.7rem",
                    display: { lg: "none", md: "flex", sm: "flex", xs: "flex"}
                  }}
                  onClick={() => queryContext.newChat()}
                  >
                    <AddIcon sx={{ fontSize: "1.4rem", color: (themeContext.appThemeMode == "light") ? "#5B0888" : "#fff" }} />
                </Avatar>
              </motion.div>
        </Box>
  }
  else if(queryContext.chatPageContent == "new") {
    content = <Dialog />;
  }

  return (
    <Box sx={{ width: { lg: "75%", sm: "100%", xs: "100%", md: "100%"}, boxShadow: "2px 2px 3px #eee", 
        marginLeft: { lg: "27%", sm: "0", xs: "0", md: "0"}, background: (themeContext.appThemeMode == "light") ? "#fff": "#03001C", 
        color: (themeContext.appThemeMode == "light") ? "#000": "#fff" }}>
        {content}
    </Box>  
  )
}

// display: { lg: "block", md: "none", sm: "none", xs: "none"}