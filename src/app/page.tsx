import Main from "@/components/Main/Main";
import { redirect } from "next/navigation";
import { getUserAuthenticationToken } from "./(SSR)/user/chat/page";

export default async function Home() {
  
  const userAuthenticationToken: string | undefined | null = await getUserAuthenticationToken();
  if(userAuthenticationToken != undefined || userAuthenticationToken != null) 
      redirect('/user/chat')

  return (
    <>
      <Main />
    </>
  )
}
