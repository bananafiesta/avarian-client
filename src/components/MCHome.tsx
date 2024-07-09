import React from "react";
import {Navbar} from "./Navbar";
import { useDocumentTitle } from "./useDocumentTitle";

export function MCHome(): React.ReactNode {
  const title: string = "Memories of Realms";
  useDocumentTitle(title);
  return (
    <div>
      <Navbar>
        
      </Navbar>
      <h1>mc goes here</h1>
    </div>
  )
}

