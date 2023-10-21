"use client";

import React  from 'react';
import { Box, Stack, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QueryContext from '@/context/QueryContext/QueryContext';
import ThemeContext from '@/context/ThemeContext/ThemeContext';
import SearchBar from '../Search/Search';

interface Props {
    children: React.ReactNode,
    onNewChat: () => void
};

const ChatHistoryContent  : React.FC<Props>  = ({ children, onNewChat }) => {
  const queryContext = React.useContext(QueryContext);
  const themeContext = React.useContext(ThemeContext);

  return (
    <Box>
        <SearchBar />
            <Box>
            <Stack sx={{ height: "67vh" }}>
            {children}
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
                <Button variant="outlined" startIcon={<AddCircleIcon 
                sx={{ color: (themeContext.appThemeMode == "light") ? "#5B0888" : "#fff" }} />} 
                onClick={onNewChat} 
                sx={{ border:(themeContext.appThemeMode == "light") ? "3px solid #5B0888" : "3px solid #fff", color:(themeContext.appThemeMode == "light") ? "#5B0888" : "#fff",
                borderRadius: "5rem", width: "50%", alignSelf: "center"
                }}
                disabled={queryContext.fetchingChatHistory}>
                    New chat
                </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default ChatHistoryContent;