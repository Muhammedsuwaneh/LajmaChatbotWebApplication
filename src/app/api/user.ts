import { IUserInfo } from '@/context/UserContext/UserContext';

const axios = require('axios').default;
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

interface IResponse {
  status: number,
  message: string,
  data: any
};

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

export const getUserInfoRequest = async (token: string): Promise<IUserInfo|null> => {
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;
    const apiUrl = process.env.NEXT_PUBLIC_API_GET_USER_URL;
    
    if (cookieName != undefined && apiUrl != undefined) {

        const options = getOptions(token);
        try {
          const response = await axios.get(apiUrl, options);
          const { responseObject }:{ responseObject: IUserInfo } = response.data;
          return responseObject;
        }
        catch(error) {
          return null;
        };
    }
    else return null;
};

export const updateUserInfoRequest = async (token: string, userInfo: IUserInfo): Promise<IUserInfo | null> => {
  const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const apiUrl = process.env.NEXT_PUBLIC_API_UPDATE_USER_URL;
  
  if (cookieName != undefined && apiUrl != undefined && userInfo != null) {

      const options = getOptions(token);
      try {
        const response = await axios.put(apiUrl, userInfo, options);
        const { responseObject }:{ responseObject: IUserInfo } = response.data;
        return responseObject;
      }
      catch(error) {
        return null;
      };
  }
  else return null;
};


export const resetPasswordHandler = async (token: string, password: string): Promise<boolean> => {
  const url = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL;

  if (url) {
      const userInfo = { password: password };
      const options = getOptions(token);
      try {
        const response = await axios.put(url, userInfo, options);
        const { status } = response.data;
        if(status == 200) return true;
        return false;
      }
      catch(error) {
        return false;
      };
  }
  else return false;
};