"use client";

import { ReactElement, useState, useContext } from "react";

import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "@/UI/Footer/Footer";
import Toast from "@/UI/Toast/Toast";
import AuthContext from "@/context/AuthContext/AuthContext";
import { Box } from "@mui/material";
import Image from "next/image";

const backgroundImage = "https://images.unsplash.com/photo-1586011876158-197fd32f15e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80";

const PageBackground = {
    background: `url(${backgroundImage}) no-repeat center center/cover`,
};

export default function Main() {

    const authContext = useContext(AuthContext);
    const [content, setContent] = useState<ReactElement>(() => (
        <Login onFormChange={() => changeFormContentHandler("register")} />
      ));

    const changeFormContentHandler = (formType: string) => {
        if(formType == "register") setContent(<Register onFormChange={() => changeFormContentHandler("login")}/>);
        else setContent(<Login onFormChange={() => changeFormContentHandler("register")} />);
    };

    return (
        <Box>
            {authContext.isOpen && <Toast status={authContext.responseStatus} message={authContext.responseMessage} />}
            <Box sx={{ display: { lg: "flex", md: "column", xs: "column", sm: "column" }}}>
                <Box sx={{...PageBackground, width: { lg: "70%", md: "100%", xs: "100%", sm: "100%"}, height: { lg: "100vh", md: "50vh", xs: "50vh", sm: "50vh"}}}></Box>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", 
                    alignItems: { lg: "start", md: "center", xs: "center", sm: "center"},
                        padding: { lg: "1rem", md: "1rem", xs: "1rem", sm: "1rem"}, margin: { lg: "1rem auto", md: "1rem 0", sm: "1rem 0", xs: "1rem 0" }}}>
                    <Image
                        src="/LightModeLogo.png"
                        alt=""
                        width={90}
                        height={40}
                        style={{ cursor: "pointer" }}
                        />  
                    {content}
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}