import {ReactNode} from "react";
import {Navbar} from "./Navbar";
import { useDocumentTitle } from "./useDocumentTitle";

export function MCHome(): ReactNode {
  const title: string = "Mnemonic Spire";
  useDocumentTitle(title);
  return (
    <div className="h-screen flex flex-col">
      <Navbar>
        
      </Navbar>
      <div className="h-px bg-gray-300" />
      
      <div className="flex bg-[url('/mc_home.png')] bg-cover grow">

      </div>
    </div>
  )
}

