"use client";

import { Box, Typography, Button } from "@mui/material";

interface ErrorPageProps {
    error: Error,
    reset: () => {}
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    console.log("error - " + error.message)
    return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", margin: "auto" }}>
        <Typography sx={{ padding: ".7rem", fontSize: "1.5rem"}}>Server Error 🥲</Typography>
            <Typography sx={{ padding: ".7rem"}}>{(error.message == "auth error") ? 
            "You do not have priviledges to access this page." : "An unexpected server error occured"}</Typography>
            {(error.message == "auth error") ? <Button href="/" variant="outlined">Sign In</Button> 
            : <Button onClick={reset} variant="outlined">Refresh</Button> }
    </Box>
    );
}