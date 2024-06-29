import {Route, Routes} from "react-router-dom";

import MainHome from "./MainHome";
import MCHome from "./MCHome";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainHome />}/>
      <Route path="/mc/" element={<MCHome />}/>
    </Routes>
  );
}

export default AppRoutes;