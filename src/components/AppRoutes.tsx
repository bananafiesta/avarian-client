import {Route, Routes, Navigate} from "react-router-dom";

import MainHome from "./MainHome";
import MCHome from "./MCHome";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainHome />}/>
      <Route path="/mc/" element={<MCHome />}/>
      <Route path="*" element={<Navigate to="/" replace={true}/>}/>
    </Routes>
  );
}

export default AppRoutes;