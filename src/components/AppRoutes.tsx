import {Route, Routes, Navigate} from "react-router-dom";

import {MainHome} from "./MainHome";
import {MCHome} from "./MCHome";
import React from "react";

export function AppRoutes(): React.ReactNode {
  return (
    <Routes>
      <Route path="/" element={<MainHome />}/>
      <Route path="/mc/" element={<MCHome />}/>
      <Route path="*" element={<Navigate to="/" replace={true}/>}/>
    </Routes>
  );
}
