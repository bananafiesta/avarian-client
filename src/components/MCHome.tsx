import {ReactNode} from "react";
import {Navbar} from "./Navbar";
import { useDocumentTitle } from "./useDocumentTitle";

export function MCHome(): ReactNode {
  const title: string = "Memories of Realms";
  useDocumentTitle(title);
  return (
    <div className="h-screen flex flex-col">
      <Navbar>
        
      </Navbar>
      <div className="h-px bg-gray-300" />
      {/* <h1>mc goes here</h1> */}
      {/* <iframe src="https://avarian.net" title="map" className="w-full h-full"></iframe> */}
      <div className="flex bg-[url('/mc_home.png')] bg-cover grow">

      </div>
    </div>
  )
}

