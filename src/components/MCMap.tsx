import {ReactNode} from "react";
import {Navbar} from "./Navbar";
import { useDocumentTitle } from "./useDocumentTitle";

export function MCMap(): ReactNode {
  const title = "Oracle of Remembrance";
  useDocumentTitle(title);
  return (
    <div className="h-screen flex flex-col">
      <Navbar>

      </Navbar>
      <div className="h-px bg-gray-300" />
      <iframe src="https://avarian.net" title="map" className="w-full h-full"></iframe>

    </div>
  )
}