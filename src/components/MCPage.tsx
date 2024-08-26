import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";


export function MCPage(): ReactNode {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
    

  )

}