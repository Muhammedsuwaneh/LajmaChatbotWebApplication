"use client";

import { createContext, useState } from "react";
import axios from "axios";
import emailValidator from "email-validator";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";

const { v4: uuidv4 } = require('uuid');

interface IAuthContext {
    sendingRequest: boolean,
    responseStatus: string | null,
    responseMessage: string | null,
    isOpen: boolean,
    logoutRequest: (cookie_name: string) => void,
    sendUserRegisterationRequest: (username: string, email: string, password: string, avatar: string) => Promise<void>,
    sendUserAuthenticationRequest: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<IAuthContext>({
    sendingRequest: false,
    responseStatus: null,
    responseMessage: null,
    isOpen: false,
    logoutRequest: () => {},
    sendUserRegisterationRequest: async () => {},
    sendUserAuthenticationRequest: async () => {},
});

interface Props {
    children?: React.ReactNode | undefined;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {

    const router = useRouter();
    const cookie_name = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const avatar_name = process.env.NEXT_PUBLIC_AVATAR_NAME;
    const [sendingRequest, setSendingRequest] = useState<boolean>(false);
    const [responseStatus, setResponseStatus] = useState<string | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getOptions = () => {
        const options = 
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json',
            },
        };

        return options;
    };

    const errorFeedback = (message: string) => {
        setSendingRequest(false);
        setResponseStatus("error");
        setIsOpen(true);
        setResponseMessage(message);
    }

    const successFeedback = (message: string) => {
        setIsOpen(true);
        setResponseStatus("success");
        setResponseMessage(message);
    };

    const logoutRequest = (cookie_name: string) => {
        setSendingRequest(false);
        successFeedback("Logged out");
        deleteCookie(cookie_name);
        router.push("/");
    };

    const userRegisterationRequestHandler = async (username: string, email: string, password: string, avatar: string): Promise<void> => {
        setSendingRequest(true);
        setResponseStatus(null);
        // validate email
        const emailIsValid = emailValidator.validate(email);

        if(emailIsValid == true) {
            // send request
            const data = { username: username, email: email, password: password, avatar: avatar,
                dateJoined: new Date().toLocaleDateString() };
            const options = getOptions();
            const url = process.env.NEXT_PUBLIC_API_USER_REG_URL;

            if(url != undefined && cookie_name != undefined && avatar_name != undefined) {
                axios.post(url, data, options)
                .then(response => {
                    // get data and save to cookie
                    const { message, token, responseObject } = response.data;
                    const { avatar } = responseObject;
                    setCookie(cookie_name, token);
                    setCookie(avatar_name, avatar);
                    // feedback
                    successFeedback(message);
                    // redirect to "domain/user/chat"
                    router.push("/user/chat");
                })
                .catch(error => {
                    if(error.code == "ERR_NETWORK") errorFeedback("Check your connection and try again");
                    else {
                        const { message } = error.response.data;
                        errorFeedback('oops something went wrong 😢. ' + message);  
                    }
                })
            }
        } 
        else errorFeedback("Please enter a valid email");
    };

    const userAuthenticationRequestHandler = async (email: string, password: string): Promise<void> => {
        setSendingRequest(true);
        setResponseStatus(null);
        // send request
        const data = { email: email, password: password };
        const options = getOptions();
        const url = process.env.NEXT_PUBLIC_API_USER_LOGIN_URL;

        if(url != undefined && cookie_name != undefined && avatar_name != undefined) {
            axios.post(url, data, options)
            .then(response => {
                // get data and save to cookie
                const { message, token, responseObject } = response.data;
                const { avatar } = responseObject;

                setCookie(cookie_name, token);           
                setCookie(avatar_name, avatar);         
                // feedback
                successFeedback(message);
                // redirect to "domain/user/chat"
                router.push("/user/chat");
            })
            .catch(error => {
                if(error.code == "ERR_NETWORK") errorFeedback(error.message);
                else {
                    const { message } = error.response.data;
                    errorFeedback(message? message : 'oops something went wrong 😢');  
                }
            })
        }
        else errorFeedback(`oops something went wrong`);
    };

    return (
        <AuthContext.Provider value={{ 
                sendingRequest: sendingRequest, 
                responseStatus: responseStatus,
                responseMessage: responseMessage,
                logoutRequest: logoutRequest,
                isOpen: isOpen,
                sendUserAuthenticationRequest: userAuthenticationRequestHandler,
                sendUserRegisterationRequest: userRegisterationRequestHandler
            }}>
                {""}
                {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;