import React from 'react';
import AccountLayout from '@/components/AccountLayout/AccountLayout';
import { Box } from "@/components/MaterialUI/Material-UI";
import { cookies } from 'next/headers';
import ChatHistory from '@/UI/ChatHistory/ChatHistory';
import Chat from '@/components/Chat/Chat';

export async function getUserAuthenticationToken(): Promise<string|undefined|null> {
  const cookie_name = process.env.NEXT_PUBLIC_COOKIE_NAME;

  if(cookie_name != undefined && cookie_name != null) {
    const cookieStore = cookies();
    const token = cookieStore.get(cookie_name)?.value;
    return token;
  }
  return undefined;
}

export default async function ChatPage() {

  const userAuthenticationToken: string | undefined | null = await getUserAuthenticationToken();
  if(userAuthenticationToken == undefined || userAuthenticationToken == null) 
    throw new Error("auth error");
  
  return (
    <AccountLayout>
       <Box sx={{ display: "flex" }}>
          <ChatHistory token={userAuthenticationToken} />
          <Chat />
       </Box>
    </AccountLayout> 
  )
}