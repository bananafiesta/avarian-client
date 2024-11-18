import {Route, Navigate} from "react-router-dom";

import {MainHome} from "./MainHome";
import {MCHome} from "./MCHome";
import { ReactNode } from "react";
import {Login} from "./Login";
import { MCMap } from "./MCMap";
import { MCPage } from "./MCPage";
import { Leaderboard } from "./Leaderboard";
import { Profile } from "./Profile";
import { BasePage } from "./BasePage";

export function AppRoutes(): ReactNode {
  return (
    <Route path="/" element={<BasePage />}>
      <Route path="/" element={<MainHome />}/>
      <Route path="mc" element={<MCPage />}>
        <Route index element={<MCHome />}/>
        <Route path="map" element={<MCMap />}/>
        <Route path="leaderboard" element={<Leaderboard />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="*" element={<Navigate to="" replace />}/>
      </Route>
      <Route path="login" element={<Login />}/>
      <Route path="*" element={<Navigate to="/" replace={true}/>}/>
    </Route>
  );
}
