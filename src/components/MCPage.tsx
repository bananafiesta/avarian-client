import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Outlet, Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export function MCPage(): ReactNode {
  return (
    <div className="h-screen flex flex-col">
      <Navbar>
        <Menu>
          <MenuButton className="flex items-center gap-x-1.5 rounded-md px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-white/10">
            <img src="/Ether_drop_icon.png" alt="Ether Drop Icon" className="h-6" />
            Mnemonic Spire
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
            </svg>
          </MenuButton>
          <MenuItems transition anchor="bottom start" className="bg-black/50 text-white backdrop-blur-sm p-1 rounded-md origin-center transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-gap:0px] min-w-[var(--button-width)] font-lg font-semibold">
            <MenuItem>
              <Link to="map" className="flex grow rounded hover:bg-white/15 px-3 py-2">
                Map
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="" className="flex grow rounded hover:bg-white/15 px-3 py-2">
                Overview
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </Navbar>
      <Outlet />
    </div>
    

  )

}