'use client';
import { useContext, ChangeEvent, useRef } from 'react';
import { Drawer, LinearProgress, Box, Typography, Avatar, Divider } from "@mui/material";
import Response from '../Response/Response';
import QueryContext from '@/context/QueryContext/QueryContext';
import SendIcon from '@mui/icons-material/Send';
import Toast from '../Toast/Toast';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import ThemeContext from '@/context/ThemeContext/ThemeContext';
import { getUserAuthenticationToken } from '../UpdateForm/UpdateForm';
import useSpeechRecognition from '@/hooks/useSpeechRecognitionHook';
import PageLoaderSpinner from '../Spinner/PageLoaderSpinner';

export default function Dialog() {
  
  const queryContext = useContext(QueryContext);
  const themeContext = useContext(ThemeContext);
  
  const { 
    isListening,
    startListening,
    hasRecognitionSupport } = useSpeechRecognition();

  const speechRecognitionHandler = () => {
      queryContext.toggleDialogDrawer("bottom", true);
      if(hasRecognitionSupport)
          startListening();
  }

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    queryContext.setPromptHandler(event.target.value);
  };

  const sendChatQueryHandler = () => {
    const token: any = getUserAuthenticationToken();
    if(token == undefined || token == null) 
        throw new Error("oops something went wrong 😢");
    if(queryContext.prompt) 
      queryContext.sendChatQueryRequestToServer(token); // send prompt request
  };

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key == "Enter" && event.shiftKey) {
      event.preventDefault();
      return;
    }
    else if(event.key == 'Enter' && queryContext.prompt) {
        event.preventDefault();
        sendChatQueryHandler();
    }
  }

  return (
    <>
      <Drawer
        anchor="bottom"
        open={queryContext.dialogDrawerState["bottom"]}
      >
       {!hasRecognitionSupport &&
        <Box sx={{ height: "300px", padding: "1rem", display: "flex", flexDirection: "column", alignItemms: "center", margin: "auto" }}>
        <Typography>Oops 🥲 it seems like your browser does not support this feature</Typography>
        <Typography>Upgrade to a latest browser to use this feature</Typography>
        </Box>}
        {(hasRecognitionSupport && isListening) && 
            <Box
              sx={{
                height: "300px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Note the typo fix here
                margin: "auto"
              }}
            >
              <Typography>Listening ....</Typography>
                 <Avatar
                    sx={{
                      p: "10px",
                      cursor: "pointer",
                      bgcolor: themeContext.appThemeMode === "light" ? "#ECE2F5" : "#100B1B",
                      margin: "2rem .5rem",
                      border: ".5px solid red",
                    }}
                  >
                    <MicIcon
                      sx={{
                        animation: 'ripple 1.2s infinite ease-in-out',
                        "&:hover": { opacity: ".5" },
                          '@keyframes ripple': {
                          '0%': {
                            transform: 'scale(.8)',
                            opacity: 1,
                          },
                          '100%': {
                            transform: 'scale(.9)',
                            opacity: .5,
                          },
                          borderRadius: "50%",
                          height: "auto",
                          width: "auto",
                        },
                        fontSize: "2rem",
                        color: "red",
                      }}
                    />
                  </Avatar>
            </Box>
          }
      </Drawer>
      <Box sx={{ position:"relative", minHeight:'100vh' }}>
       {queryContext.isOpen && <Toast status={queryContext.responseStatus} message={queryContext.responseMessage} />}
        {queryContext.sendingRequest && <Box sx={{ padding: "1rem" }}>
          <PageLoaderSpinner width={30} height={30} /> 
        </Box>}
        <Response />
        <Box sx={{  display: "flex", alignItems: "center", justifyContent: 'center', flexDirection: "column", 
        margin: { lg: '.5rem', sm: '0', md: '0', xs: '0'} , padding: ".5rem 1rem",
        background: (themeContext.appThemeMode == "light") ? "#fff" : "#03001C", width: { lg: "70%", md: "95%", xs: "95%", sm: "95%" },
        position: 'fixed', top: { lg: '88vh', sm: '89vh', xs: '89vh', md: '87vh' }, zIndex: '100' }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", 
          width: { lg: "94%", md: "95%", xs: "95%", sm: "95%" } }}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: "2rem",
              background: (themeContext.appThemeMode == "light") ? "#fff" : "#131314",
              width: {lg: "100%", md: "91%", xs: "91%", sm: "91%"}, border: "1px solid #E6B8FF", zIndex: '100' }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, color:(themeContext.appThemeMode == "light") ? "#131314" : "#fff" }}
                      placeholder="Enter prompt"
                      value={queryContext.prompt}
                      onChange={handleInputChange}
                      maxRows={4}
                      onKeyDown={handleKeyEvent}
                    />
                    <IconButton type="button" sx={{ p: '10px', color: (themeContext.appThemeMode == "light") ? "#03001C" : "#fff" }} 
                    disabled={queryContext.sendingRequest}>
                      <SendIcon  onClick={sendChatQueryHandler} />
                    </IconButton>
              </Paper>
              <Avatar sx={{ "&:hover": { opacity: '.5' }, p: '10px', cursor: "pointer", textAlign: "center",
              bgcolor: (themeContext.appThemeMode == "light") ? "#ECE2F5" : "#100B1B", margin: "0 .5rem" }}
              onClick={speechRecognitionHandler}>
                <MicIcon sx={{ fontSize: "1.4rem", color: (themeContext.appThemeMode == "light") ? "#5B0888" : "#fff" }} 
                />
              </Avatar>
          </Box> 
        </Box>
      </Box>
    </>
  )
}
