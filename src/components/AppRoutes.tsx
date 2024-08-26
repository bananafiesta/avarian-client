import {Route, Navigate} from "react-router-dom";

import {MainHome} from "./MainHome";
import {MCHome} from "./MCHome";
import { ReactNode } from "react";
import {Login} from "./Login";
import { MCMap } from "./MCMap";
import { MCPage } from "./MCPage";

export function AppRoutes(): ReactNode {
  return (
    <>
      <Route path="/" element={<MainHome />}/>
      <Route path="mc" element={<MCPage />}>
        <Route index element={<MCHome />}/>
        <Route path="map" element={<MCMap />}/>
        <Route path="*" element={<Navigate to="" replace />}/>
      </Route>
      <Route path="login" element={<Login />}/>
      <Route path="*" element={<Navigate to="/" replace={true}/>}/>
    </>
  );
}
