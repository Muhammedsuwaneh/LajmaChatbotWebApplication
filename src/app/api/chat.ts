import { IChatHistory, IChat } from "@/context/QueryContext/QueryContext";
const axios = require('axios').default;
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});


const getOptions = (token: string) => {
    const options = {
      httpsAgent: agent,
      mode: 'cors',
      withCredentials: true,
      credentials: 'same-origin',
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

export const getChatHistoryRequest = async (token: string): Promise<Array<IChatHistory> | undefined | null> => {
    try {
        const options = getOptions(token);
        const url = process.env.NEXT_PUBLIC_GET_CHAT_HISTORY_URL;
        const response = await axios.get(url, options);
        const { responseObject }:{ responseObject: Array<IChatHistory> } = response.data;
        return responseObject;
    } catch(error) {
        return undefined;
    }   
}

export const sendQueryRequest = async (query: IChat | null, token: string): Promise<IChatHistory | null> => {
    try {
        const url = process.env.NEXT_PUBLIC_SEND_CHAT_HISTORY_URL;
        const options = getOptions(token);
        const response = await axios.post(url, query, options);
        const { responseObject }: { responseObject: IChatHistory } = response.data;
        return responseObject;
    }
    catch(error) {
        return null;
    }
}

export const deleteQueryHistoryRequest = async (token: string, queryId: string): Promise<string | null> => {
    try {
        
        const url = process.env.NEXT_PUBLIC_DELETE_CHAT_HISTORY_URL;
        const options = getOptions(token);

        const response = await axios.delete(`${url}/${queryId}`, options);
        const { responseObject }: { responseObject: string } = response.data;
        return responseObject;

    } catch (error) {
        return null;
    }
};
