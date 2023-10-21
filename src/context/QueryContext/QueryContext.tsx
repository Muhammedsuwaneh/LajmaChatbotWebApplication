"use client";

import { createContext, useState, useEffect } from "react";
import { sendQueryRequest, getChatHistoryRequest, deleteQueryHistoryRequest } from "@/app/api/chat";
import { getUserAuthenticationToken } from "@/UI/UpdateForm/UpdateForm";

const { v4: uuidv4 } = require('uuid');

export interface IResponse {
    id: string,
    query: string | null,
    response: string | null
}

export interface IChat {
    queryId: string | null,
    query: string | null,
    historyId: string | null
};

export interface IChatHistory {
    id: string | null,
    title: string | null,
    userId: string | null,
    chats: Array<IResponse> | null
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface IDrawer {
    top: boolean | undefined,
    left: boolean | undefined,
    bottom: boolean | undefined,
    right: boolean | undefined
};

interface IQueryContext {
    dialogDrawerState: IDrawer,
    prompt: string,
    toggleDialogDrawer: (anchor: Anchor, open: boolean | undefined) => void
    sendingRequest: boolean,
    responseStatus: string | null,
    responseMessage: string | null,
    responses: Array<IResponse>,
    chatPageContent: string,
    fetchingChatHistory: boolean,
    isOpen: boolean,
    sendingDeleteRequest: boolean,
    chatHistory: Array<IChatHistory>,
    setPromptHandler : (text: string) => void,
    changeChatPageContent: (id: string | null) => void,
    newChat: () => void,
    copyToClipboard: (text: string | null) => void,
    sendChatQueryRequestToServer: (token: string) =>  Promise<void>,
    searchQuery: (query: string) => void,
    setSpeechText: (text: string) => void,
    deleteChatHistory: (queryId: string | null) => Promise<void>
}

const QueryContext = createContext<IQueryContext>({
    dialogDrawerState: {
        top: false,
        left: false,
        bottom: false,
        right: false,
    },
    prompt: "",
    isOpen: false,
    sendingRequest: false,
    responseStatus: null,
    responseMessage: null,
    responses: [],
    chatPageContent: "welcome",
    chatHistory: [],
    fetchingChatHistory: false,
    sendingDeleteRequest: false,
    setSpeechText: () => {},
    setPromptHandler: () => {},
    copyToClipboard: () => {},
    changeChatPageContent: () => {},
    newChat: () => {},
    sendChatQueryRequestToServer: async () => {},
    searchQuery: () => {},
    toggleDialogDrawer: () => {},
    deleteChatHistory: async () => {}
});

interface Props {
    children?: React.ReactNode | undefined;
}


export const QueryContextProvider: React.FC<Props> = ({ children }) => {

    const [sendingRequest, setSendingRequest] = useState<boolean>(false);
    const [sendingDeleteRequest, setDeleteSendingRequest] = useState<boolean>(false);
    const [responses, setResponses] = useState<Array<IResponse>>([]);
    const [responseStatus, setResponseStatus] = useState<string | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [chatPageContent, setChatPageContent] = useState<string>("welcome");
    const [chatHistory, setChatHistory] = useState<Array<IChatHistory>>([]);
    const [tempChatHistory, setTempChatHistory] = useState<Array<IChatHistory>>([]);
    const [fetchingChatHistory, setFetchingChatHistory] = useState<boolean>(false);
    const [currentChatHistoryId, setCurrentChatHistoryId] = useState<string | null>("");
    const [prompt, setPrompt] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // speech drawer
    type Anchor = 'top' | 'left' | 'bottom' | 'right';
    
    const [dialogDrawerState, setDialogDrawerState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawerHandler = (anchor: Anchor, open: boolean | undefined) => {
        setDialogDrawerState({ ...dialogDrawerState, [anchor]: open });
    };

    const setPromptHandler = (text: string) => setPrompt(text);

    const setSpeechTextHandler = (text: string) => {
        if(text) {
            setPrompt(text);
            toggleDrawerHandler("bottom", false);
        }
    };

    const errorFeedback = (message: string) => {
        setSendingRequest(false);
        setResponseStatus("error");
        setIsOpen(true);
        setResponseMessage(message);
    }

    const successFeedback = (message: string) => {
        setSendingRequest(false);
        setIsOpen(true);
        setResponseStatus("success");
        setResponseMessage(message);
    }

    const changeChatPageContentHandler = (id: string | null) => {
        // reset chat window
        if(id) {
            setChatPageContent("new");
            setIsOpen(false);
            setSendingRequest(false);
            setFetchingChatHistory(false);
            // select and display selected chat history
            let selectedChatHistory: any = chatHistory.find(ch => ch.id == id);
            setResponses(selectedChatHistory.chats);
            setCurrentChatHistoryId(id);
        }
    };

    const newChatHandler = () => {
        setChatPageContent("new"); // reset chat window
        setResponses([]);         // clear responses and set chat history id
        setCurrentChatHistoryId(uuidv4()); // set default id 
    }

    // filters the query history list
    const searchQueryHandler = (query: string) => {
        const searchQuery = query.trim().toLowerCase();
        if(searchQuery == " " || searchQuery == undefined || searchQuery == null) {
            setChatHistory(tempChatHistory);
        }
        else {
            const itemsToDisplay = tempChatHistory.filter((history: any) => {
                if(searchQuery == "") return true;
                else if(history == undefined || history == null) return false;
                else if(history.title.trim().toLowerCase().indexOf(searchQuery) >= 0) return true;
                else return false;
            });
            setChatHistory(itemsToDisplay);
        }
    }

    // sends a query to the server to gets a response upon completion of request
    const sendChatQueryRequestToServerHandler = async (token: string): Promise<void> => {      
        setSendingRequest(true);

        const chat: IChat = {
            queryId: uuidv4(),
            query: prompt,
            historyId: currentChatHistoryId
        };

        const response = await sendQueryRequest(chat, token);
        if(response != null && response != undefined) {
            let res: any = response.chats;
            let chatExist = false;
            setResponses(res.reverse());

            const updatedHistory = chatHistory.map((history) => {
                if(history.id == response.id) {
                    history = response;  
                    chatExist = true;  
                }
                return history;
            });

            if(chatExist == false) setChatHistory((prevHistory) => [response, ...prevHistory])
            else setChatHistory(updatedHistory);
        }
        else errorFeedback("oops something went wrong 😢");
        setSendingRequest(false); 
        setPrompt("");
    };

    // send a get chat history request
    const getChatHistoryHandler = async (token: string) : Promise<void> => {
        setFetchingChatHistory(true);
        const history = await getChatHistoryRequest(token);
        if(history != null) {
            setFetchingChatHistory(false);
            setChatHistory(history);
            setTempChatHistory(history);
        }
        else {
            setFetchingChatHistory(false);
            errorFeedback("error fetching history. check your internet connection");
            setChatHistory([]);
        }
    } 

    const copyToClipboardHandler = (text: string | null) => {
        if(text !== null) {
            navigator.clipboard.writeText(text);
            successFeedback("copied ✅");
        }
    }

    // deletes query token 
    const deleteChatHistoryHandler = async (queryId: string | null): Promise<void> => {
        setDeleteSendingRequest(true);
        
        // reset chat window if the current history we are deleting is active
        if(queryId == currentChatHistoryId) 
            setChatPageContent("welcome");

        // get auth token
        const token = getUserAuthenticationToken();

        if(token != null && token != undefined && queryId != null && queryId != undefined) {
            // send delete query history request
            const response = await deleteQueryHistoryRequest(token, queryId);
            
            if(response != null && response != undefined && response != "") {
                successFeedback("Query deleted");
                // update chat history list
                const history = chatHistory.filter(c => c.id != queryId);
                setChatHistory(history);
            }
            else errorFeedback("oops something went wrong");
        }
        else errorFeedback("oops something went wrong");

        setDeleteSendingRequest(false);
    };

    // obtains current chat history
    useEffect(() => {
        const token: any = getUserAuthenticationToken();
        if(token == undefined || token == null) errorFeedback("oops something went wrong 😢");
        else {
           getChatHistoryHandler(token);
        }
    }, []);

    return (
        <QueryContext.Provider value={{ 
                sendingRequest: sendingRequest, 
                responseStatus: responseStatus,
                responseMessage: responseMessage,
                responses: responses,
                prompt: prompt,
                fetchingChatHistory: fetchingChatHistory,
                sendingDeleteRequest: sendingDeleteRequest,
                chatHistory: chatHistory,
                isOpen: isOpen,
                chatPageContent: chatPageContent,
                copyToClipboard: copyToClipboardHandler,
                changeChatPageContent: changeChatPageContentHandler,
                newChat: newChatHandler,
                sendChatQueryRequestToServer: sendChatQueryRequestToServerHandler,
                searchQuery: searchQueryHandler,
                setPromptHandler: setPromptHandler,
                deleteChatHistory:  deleteChatHistoryHandler,
                dialogDrawerState: dialogDrawerState,
                setSpeechText: setSpeechTextHandler,
                toggleDialogDrawer: toggleDrawerHandler,
            }}>
                {""}
                {children}
        </QueryContext.Provider>
    );
};

export default QueryContext;