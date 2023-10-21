'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from "framer-motion";

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

export default function Footer() {
  return (
    <motion.div
    className="container"
    variants={container}
    initial="hidden"
    animate="visible"
      >
      <motion.div className="item" variants={item}>
        <Box sx={{ alignItems: "center", backgroundColor: '#fff', display: "flex", justifyContent: "space-between"}}>
          <Typography sx={{ fontSize: "1rem", margin: ".7rem 1rem" }}>
            Copyright &copy; 2023  
          </Typography>
          <Button href="/support" variant='outlined' sx={{ margin: ".7rem 1rem" }}>Support</Button>
        </Box>
      </motion.div>
    </motion.div>
  );
}