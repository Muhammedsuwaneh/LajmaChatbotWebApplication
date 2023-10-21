'use client';

import React from 'react';
import { ErrorOutlineOutlinedIcon } from "../components/MaterialUI/Material-UI-Icons";
import { Box, Typography, Button } from "../components/MaterialUI/Material-UI";

const Container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
};

const Heading = {
  marginTop: ".7rem",
  marginBottom: ".7rem",
};

const Icon = {
  fontSize: "3rem",
  color: "#1984DB",
};

const Text = {
  marginTop: ".7rem",
  textAlign: 'center',
};

export default function NotFound() {
  return (
    <Box sx={Container}>
      <ErrorOutlineOutlinedIcon sx={Icon}/>
      <Typography variant="h4" sx={Heading}>
          There was problem.
      </Typography>
      <Typography variant="body1" sx={Text}>
        We&apos;re sorry, the page you requested could not be found.
      </Typography>
      <Button variant="outlined" href="/" sx={{ margin:"1rem 0" }}>Go Back</Button>
    </Box>
  );
}
