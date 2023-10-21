import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { motion } from "framer-motion";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Typography from '@mui/material/Typography';
import QueryContext from '@/context/QueryContext/QueryContext';
import { IResponse } from '../../context/QueryContext/QueryContext';
import Toast from '../Toast/Toast';
import ThemeContext, { ThemeContextProvider } from '@/context/ThemeContext/ThemeContext';
import styles from "./Response.module.css";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Image from 'next/image';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

export default function Response() {
  const queryContext = useContext(QueryContext);
  const themeContext = useContext(ThemeContext);
  const [readingText, setReadingText] = useState<boolean>(false);
  const [currentSelectedResponseId, setCurrentSelectedResponseId] = useState<string>();
  const copyToClipboardHandler = (response: string | null) => {
    if(response != null) queryContext.copyToClipboard(response);
  }

  const responseTextToSpeechHandler = (response: string | null, id: string | null) => {
      if(response != null && id != null) {
        setCurrentSelectedResponseId(id);
        // read speech aloud
        const synth = window.speechSynthesis;
        if(readingText == false) {
          setReadingText(true);
          const utterance = new SpeechSynthesisUtterance(response);
          synth.speak(utterance);

          utterance.onend = function(event) {
              setReadingText(false);
          };      
        }
        else {
            // stop speech
            synth.cancel();
            setReadingText(false);
        }
      }
  }

  const getColor = (id: string) => {
    if(readingText && currentSelectedResponseId == id) return "#1FACB6";
    else if(themeContext.appThemeMode == "light") return "#5B0888";
    return "#fff";
  }

  return (
    <Box className={styles.response_list} sx={{ padding: { lg: "1rem .5rem", md: "1rem", xs: "0 1.4rem", sm: "1rem" },
    height: { lg: '75vh', sm: '78vh', md: '', xs: '80vh'}, overflowY: 'scroll' }}>
      {queryContext.isOpen && <Toast status={queryContext.responseStatus} message={queryContext.responseMessage} />}
      {queryContext.responses.map((response: IResponse) => {
          return (
            <motion.div
              className="container"
              variants={container}
              initial="hidden"
              animate="visible"
              key={response.id} 
            >
              <Box sx={{ margin: "1rem auto", display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Box sx={{ background: (themeContext.appThemeMode == "light") ? "#EAEDED" : "#3C1164", height: 'auto', 
                padding: { lg: "1.7rem", md: "1rem", sm: "1rem", xs: "1rem"}, marginBottom: "1.3rem", 
                width: { lg: "93%", md: "100%", sm: "100%", xs: "100%"}, 
                borderRadius: '30px' }}>
                  <Typography sx={{ textAlign: "left"}}>{response.query}</Typography>
                </Box>
                <Box sx={{ height: 'auto', padding: { lg: "1.7rem", md: "1rem", sm: "1rem", xs: "1rem"},  background: (themeContext.appThemeMode == "light") ? "#FAF4FF" : "#041F34", position: "relative", 
                borderRadius: '30px', width: { lg: "93%", md: "100%", sm: "100%", xs: "100%", 
                boxShadow: (themeContext.appThemeMode == "light") ? "1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)" : 
                "1px 1px 1px #03001C"}}}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor:  (themeContext.appThemeMode == "light") ? "#EAEDED" : "#03001C", margin: "0 .5rem",
                    transition: "opacity .5s ease", "&:hover": { opacity: ".7" } }}>
                        <Image src="/favicon.png" width={20} height={20} alt="" />
                    </Avatar>
                    <Box sx={{ display: "flex" }}>
                      <Avatar sx={{ bgcolor:  (themeContext.appThemeMode == "light") ? "#EAEDED" : "#03001C", margin: "0 .5rem",
                       transition: "opacity .5s ease", "&:hover": { opacity: ".7" }}}>
                        <ContentPasteIcon sx={{ fontSize: "1.1rem", cursor: "pointer", color: (themeContext.appThemeMode == "light") ? "#5B0888" : "#fff" }} 
                        onClick={() => copyToClipboardHandler(response.response)}/>
                      </Avatar>
                      <Avatar sx={{ bgcolor:  (themeContext.appThemeMode == "light") ? "#EAEDED" : "#03001C", 
                      transition: "opacity .5s ease", "&:hover": { opacity: ".7" }}}>
                        <VolumeUpIcon sx={{ fontSize: "1.1rem", cursor: "pointer", 
                        color: getColor(response.id) }} 
                        onClick={() => responseTextToSpeechHandler(response.response, response.id)}/>
                      </Avatar>
                    </Box>
                  </Box>
                  <Typography sx={{ paddingTop: "2rem" }}>{response.response}</Typography>
                </Box>
              </Box>
            </motion.div>
          );
        })}
    </Box>
  );
}
