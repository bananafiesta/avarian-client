import React, { ReactNode, useState, useCallback} from "react";
import {firebaseAuth, googleAuthProvider} from "./firebase.ts";
import {signInWithPopup} from "firebase/auth";
import {Button} from "@headlessui/react";
import {useNavigate, NavigateFunction} from "react-router-dom";
import {useDocumentTitle} from "./useDocumentTitle";

enum options {
  google = 0,
  choose
}

// function showLoginPage(displayOption: number, updateDisplay: (arg0: number) => void, googleLogin: () => void, doneLoading: boolean): ReactNode {
//   switch(displayOption) {
//     default:
//       return ChooseLogin(updateDisplay, googleLogin);
//   }
// }
function ChooseLogin(updateDisplay: (arg0: number) => void, googleLogin: () => void): ReactNode {
  return (
    <div className="flex flex-col p-10 rounded-xl relative">
      <span className="absolute top-0 place-self-center text-xl">Login</span>
      {/* <Button className="flex flex-row items-center rounded-full text-3xl px-5 py-2 hover:bg-white/15 gap-2" onClick={() => updateDisplay(options.email)}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>

        E-mail
      </Button> */}
      <Button className="flex flex-row items-center rounded-full text-3xl px-5 py-2 hover:bg-white/15 gap-2" onClick={() => {updateDisplay(options.google); googleLogin();}}>
        <div className="bg-white rounded-full p-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
        </div>
        
        Google
      </Button>
      {/* <Button className="absolute bottom-0 place-self-center hover:text-gray-500" onClick={() => updateDisplay(options.create)}>
        Sign Up
      </Button> */}
    </div>
  )
}




export function Login(): React.ReactNode {
  const [display, setDisplay]: [number, (arg0: number) => void] = useState(options.choose);
  const navigate: NavigateFunction = useNavigate();
  const title: string = "Sign In";
  useDocumentTitle(title);

  const googleLogin = useCallback(() => {
    signInWithPopup(firebaseAuth, googleAuthProvider).then((result) => {
      // Go back if auth was successful
      navigate(-1);
    }).catch((error) => {
      // Deal w/ errors here

    })
  }, []);
  
  
 
  return (
    <div className="bg-gray-900 flex flex-col h-screen w-screen justify-center items-center">
      <div className="text-white">
        {/* Email Login */}
        {
        // showLoginPage(display, setDisplay, googleLogin, doneLoading)
        ChooseLogin(setDisplay, googleLogin)
        }
      </div>
      <div className="flex h-12"></div>
    </div>
  )
}
