import React from 'react';
import ResetPasswordForm from '@/UI/ResetPasswordForm/ResetPasswordForm';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { token: string }
}

// request to check if token is valid
const validateUserPasswordResetToken = () => {

}

export default function page({ params: { token } }: PageProps) {

  let content: any = "";

  if(!token) {
    return notFound(); 
  }

  return (
    <>
      <ResetPasswordForm token={token} />
    </>
  )
}
