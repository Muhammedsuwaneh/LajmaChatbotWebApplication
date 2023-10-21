import React, { useContext } from 'react';
import { notFound, redirect } from "next/navigation";
import AccountLayout from '@/components/AccountLayout/AccountLayout';
import { getUserAuthenticationToken } from '../chat/page';

import Profile from "@/components/Profile/Profile";
import { getUserInfoRequest } from '@/app/api/user';

export default async function Page() {

  const userAuthenticationToken: string | undefined | null = await getUserAuthenticationToken();

  if(userAuthenticationToken == undefined || userAuthenticationToken == null) {
    throw new Error("auth error");
  }

  const response: any = await getUserInfoRequest(userAuthenticationToken);
  if(response == null) throw new Error("user not found");

  return (
    <AccountLayout>
        <Profile user={response} />
    </AccountLayout>
  )
}
