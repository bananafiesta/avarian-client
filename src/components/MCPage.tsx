import { ReactElement } from "react";
import { Outlet } from "react-router-dom";


export function MCPage(): ReactElement {
  return (
    <div className="flex flex-col grow">
      <Outlet />
    </div>
    

  )

}