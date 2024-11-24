import { ReactElement } from "react";
import { Navbar } from "./Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

export function BasePage(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col max-h-screen overflow-hidden">
      <Navbar />
      <ScrollRestoration />
      <Outlet />
    </div>
  )
}