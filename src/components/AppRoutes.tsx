import {Route, Navigate} from "react-router-dom";

import {MainHome} from "./MainHome";
import {MCHome} from "./MCHome";
import { ReactNode } from "react";
import {Login} from "./Login";
import { MCMap } from "./MCMap";

export function AppRoutes(): ReactNode {
  return (
    <>
      <Route path="/" element={<MainHome />}/>
      <Route path="/mc/" element={<MCHome />}/>
      <Route path="/mc/map/" element={<MCMap />} />
      <Route path="/login/" element={<Login />}/>
      <Route path="*" element={<Navigate to="/" replace={true}/>}/>
    </>
  );
}
