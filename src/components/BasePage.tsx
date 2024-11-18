import { ReactElement } from "react";
import { Navbar } from "./Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

export function BasePage(): ReactElement {
  return (
    <div className="min-h-dvh flex flex-col w-dvw">
      <Navbar />
      <ScrollRestoration />
      <Outlet />
    </div>
  )
}