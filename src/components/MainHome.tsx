import { ReactElement } from "react";
import { useDocumentTitle } from "./useDocumentTitle";

export function MainHome(): ReactElement {
  const title = "Avarian - Now with less bugs!"
  useDocumentTitle(title);
  return (
    <div className="bg-[url('/rugged_highlands.jpg')] bg-cover bg-center md:bg-top bg-no-repeat flex grow">

    </div>
  );
}
