"use client";

import { createContext, useState } from "react";
import axios from "axios";
import { updateUserInfoRequest } from "@/app/api/user";
import emailValidator from "email-validator";
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";

const { v4: uuidv4 } = require('uuid');
export interface IUserInfo {
    id: number,
    username: string,
    email: string,
    password: string,
    avatar: string,
    dateJoined: string
}

interface IUserContext {
    sendingRequest: boolean,
    responseStatus: string | null,
    responseMessage: string | null,
    user: IUserInfo | null,
    isOpen: boolean,
    resetPasswordHandler: (token: string, password: string) => Promise<void>,
    updateUserRequest: (token: string, updatedUser: IUserInfo) => Promise<void>,
    deleteUserRequest: (token: string) => Promise<void>,
}

const UserContext = createContext<IUserContext>({
    sendingRequest: false,
    responseStatus: null,
    responseMessage: null,
    user: null,
    isOpen: false,
    resetPasswordHandler: async () => {},
    updateUserRequest: async () => {},
    deleteUserRequest: async () => {},
});

interface Props {
    children?: React.ReactNode | undefined;
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {

    const cookie_name = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const avatar_name = process.env.NEXT_PUBLIC_AVATAR_NAME;
    const defaultErrorMessage = 'oops something went wrong 😢';
    const [sendingRequest, setSendingRequest] = useState<boolean>(false);
    const [responseStatus, setResponseStatus] = useState<string | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [user, setUser] = useState<IUserInfo | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getOptions = (token: string) => {
        const options = 
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
        setSendingRequest(false);
        setResponseStatus("success");
        setIsOpen(true);
        setResponseMessage(message);
    };

    const resetPasswordHandler = async (token: string, password: string) => {
        
        setSendingRequest(true);

        const url = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL;
        const options = getOptions(token);
        if(url) {
            axios.put(url, { password: password }, options)
                .then(res => {
                    successFeedback("password reset was successfully");
                    redirect("/");
                })
                .catch(error => {
                    if(error.code == "ERR_NETWORK") errorFeedback("Check your connection and try again");
                    else {
                        errorFeedback('oops something went wrong 😢. ' + error);  
                    }

                    console.log(error)
                 });
        }
        else errorFeedback("oops ! something went wrong 🥲");
};


    const deleteUserRequestHandler = async (token: string): Promise<void> => {     
        setSendingRequest(true);
        setResponseStatus(null);

        if(cookie_name != undefined && token != undefined) {
            const url = process.env.NEXT_PUBLIC_API_DELETE_USER_URL;
            const options = getOptions(token);

            // get user from server 
            if(url != undefined && url != null) {

                axios.delete(url, options)
                .then(response => {
                    const { responseObject, message } = response.data;
                    if(responseObject != null && response != undefined && responseObject != -1) {
                        successFeedback("account deleted");
                        const cookie_name = process.env.NEXT_PUBLIC_COOKIE_NAME;
                        if(cookie_name != undefined) {
                          deleteCookie(cookie_name);
                        }
                        redirect("/");
                    }
                    else {
                        errorFeedback(message);
                    }
                })
                .catch(error => {
                    if(error.code != "ERR_NETWORK") errorFeedback(error.message);
                    else {
                        const { message } = error.response.data;
                        errorFeedback(message? message : defaultErrorMessage);  
                    }
                });
            }
            else errorFeedback(defaultErrorMessage);
        }
        else errorFeedback(defaultErrorMessage);
    }; 

    const updateUserRequestHandler = async (token: string, updatedUser: IUserInfo): Promise<void> => {

        setSendingRequest(true);
        setResponseStatus(null);

        if(cookie_name != undefined && token != undefined) {
            // validate email
            const emailIsValid = emailValidator.validate(updatedUser.email);

            if(emailIsValid == false) {
                errorFeedback("Email is invalid");
                return;
            }

            // get user from server 
            if(updatedUser != null) {

                const response = await updateUserInfoRequest(token, updatedUser);
                if(response == null) {
                    errorFeedback(defaultErrorMessage);
                    return;
                }
                else {
                    successFeedback("account info updated 😊");
                    if(avatar_name != undefined)
                    setCookie(avatar_name, response.avatar);
                }
            }
            else errorFeedback(defaultErrorMessage);
        }
        else errorFeedback(defaultErrorMessage);
    }; 
    
    return (
        <UserContext.Provider value={{ 
                sendingRequest: sendingRequest, 
                responseStatus: responseStatus,
                responseMessage: responseMessage,
                user: user,
                isOpen: isOpen,
                resetPasswordHandler: resetPasswordHandler,
                updateUserRequest: updateUserRequestHandler,
                deleteUserRequest: deleteUserRequestHandler
            }}>
                {""}
                {children}
        </UserContext.Provider>
    );
};

export default UserContext;