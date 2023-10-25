import React from 'react';
import ForgotPasswordRequestForm from '@/UI/ForgotPasswordRequestForm/ForgotPasswordRequestForm';
import { getUserAuthenticationToken } from '../user/chat/page';
import { redirect } from 'next/navigation';

export default async function page() {

  const userAuthenticationToken: string | undefined | null = await getUserAuthenticationToken();
  if(userAuthenticationToken) 
    redirect("/user/chat");

  return (
    <>
      <ForgotPasswordRequestForm />
    </>
  )
}
