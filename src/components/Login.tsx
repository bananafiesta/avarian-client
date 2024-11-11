import { ReactNode, useCallback} from "react";
import {Button} from "@headlessui/react";
import {useLocation} from "react-router-dom";
import {useDocumentTitle} from "./useDocumentTitle";
import { supabase } from "./supabase.ts";




export function Login(): ReactNode {
  console.log(import.meta.env.REDIRECT);
  const title: string = "Sign In";
  useDocumentTitle(title);

  const checkUrl: string | undefined = useLocation().state.prevUrl;
  const prevUrl: string = checkUrl !== undefined ? checkUrl : import.meta.env.VITE_HOMEURL;

  // const googleLogin: () => void = useCallback(() => {
  //   const asyncGoogle = async () => {
  //     await supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //       options: {
  //         redirectTo: prevUrl
  //       }
  //     }).then(() => {
        
  //     }).catch(() => {
  //       // deal w/ errors here
  //     })
  //   }
  //   asyncGoogle();

  // }, [prevUrl]);
  const discordLogin: () => void = useCallback(() => {
    const asyncDiscord = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          // redirect to handle backend
          // redirectTo: process.env.URL_TO_USE + '/auth/callback'
          redirectTo: prevUrl
        }
      }).then(() => {

      }).catch(() => {
        // deal w/ errors
      })
    }

    asyncDiscord();
  }, [prevUrl]);
  
 
  return (
    <div className="bg-gray-900 flex flex-col h-screen w-screen justify-center items-center">
      <div className="text-white">
        <div className="flex flex-col p-10 rounded-xl relative">
          <span className="absolute top-0 place-self-center text-xl">Sign In</span>
          {/* <Button className="flex flex-row items-center rounded-full text-3xl px-5 py-2 hover:bg-white/15 gap-2" onClick={() => {googleLogin();}}>
            <div className="bg-white rounded-full p-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </div>  
            Google
          </Button> */}
          <Button className="flex flex-row items-center rounded-full text-3xl px-5 py-2 hover:bg-white/15 gap-3" onClick={() => {discordLogin();}}>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
              <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
            </svg>
             
            Discord
          </Button>
        </div>
      </div>
      <div className="flex h-12"></div>
    </div>
  )
}
