import React from "react";
import {Navbar} from "./Navbar";
import { Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "./useDocumentTitle";

export function MainHome(): React.ReactNode {
  const title = "Avarian - Now with less bugs!"
  useDocumentTitle(title);
  return (
    <div className="h-screen flex flex-col">
      <Navbar>
        <Menu>
          <MenuButton className="flex items-center gap-x-1.5 rounded-md px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-white/10">
            Games
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
            </svg>
          </MenuButton>
          <MenuItems transition anchor="bottom start" className="bg-black/50 text-white backdrop-blur-sm p-1 rounded-xl origin-center transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-gap:0px] min-w-[var(--button-width)] font-lg">
            <MenuItem>
              <Link to="/mc/" className="flex items-center rounded-md gap-2 font-dosis hover:bg-white/15 px-3 py-2 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                Minecraft
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </Navbar>
      <div className="bg-[url('/rugged_highlands.jpg')] bg-cover bg-[center_top_-5rem] bg-no-repeat flex grow">

      </div>
    </div>
  );
}
