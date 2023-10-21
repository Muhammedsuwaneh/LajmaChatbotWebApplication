"use client";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ComponentProps {
  status: string | null,
  message: string | null
}

export default function Toast({ status, message }: ComponentProps) {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let content: any = "";

  if(status == "success") {
    content =
       <>
         <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
         anchorOrigin={{ vertical:"top", horizontal:"right" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
        </Snackbar>
       </>;
  }
  else if(status == "error") {
    content = <>
     <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} 
     anchorOrigin={{ vertical:"top", horizontal:"right" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
        </Alert>
      </Snackbar>
    </>;
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {content}
    </Stack>
  );
}
