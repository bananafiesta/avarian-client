import {ReactElement} from "react";
import { useDocumentTitle } from "./useDocumentTitle";

export function MCMap(): ReactElement {
  const title = "Oracle of Remembrance";
  useDocumentTitle(title);
  return (
    <>
      <div className="h-px bg-gray-300" />
      <iframe src="https://map.avarian.net" title="map" className="flex grow"></iframe>

    </>
  )
}