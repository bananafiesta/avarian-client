import {ReactElement} from "react";
import { useDocumentTitle } from "./useDocumentTitle";

export function MCMap(): ReactElement {
  const title = "Oracle of Remembrance";
  useDocumentTitle(title);
  return (
    <div className="flex flex-col grow">
      <div className="h-px bg-gray-300" />
      <iframe src="https://avarian.net" title="map" className="w-full h-full"></iframe>

    </div>
  )
}