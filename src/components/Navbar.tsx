import { Link } from "react-router-dom";
import { Button, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { useState, useCallback, useEffect, ReactElement } from "react";
import { supabase } from "./supabase";
import { User, UserIdentity } from "@supabase/supabase-js";

function ProfileDropdown(displayName: string, photoUrl: string, funcSignOut: () => void): ReactElement {
  return (
    <Menu>
      <MenuButton className="flex hover:bg-white/10 px-3 py-2 rounded-md text-white items-center gap-2 text-lg">
        <img src={photoUrl} alt="Profile Picture" className="rounded-full h-12 border-2 border-white/10"/>
        {displayName}
      </MenuButton>
      <MenuItems anchor="bottom end" transition className="flex flex-col font-lg bg-black/50 text-white backdrop-blur-sm p-1 rounded-md origin-center transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-gap:0px] min-w-[var(--button-width)]">
        {/* <MenuItem disabled>
          <Link to="/profile" className="flex grow items-center rounded-md p-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="line-through decoration-2">Profile</span>
          </Link>
        </MenuItem> */}
        {/* <div className="my-1 h-px bg-white/5" /> */}
        <MenuItem>
          <Button className="flex grow items-center rounded hover:bg-white/10 p-2 gap-2" onClick={funcSignOut}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            Sign Out
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

function SignIn(): ReactElement {
  return (
    <Link to="/login/" state={{ prevUrl: `${location.origin}${location.pathname}` }}>
      <Button className="flex hover:bg-white/10 px-3 py-2 rounded-md text-white items-center text-lg gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
        Sign In
      </Button>
    </Link>
  )
}

export function Navbar(): ReactElement {
  const [loggedIn, setLoggedIn]: [boolean, (arg0: boolean) => void] = useState(false);
  const [displayName, setDisplayName]: [string, (arg0: string) => void] = useState("");
  const [photoUrl, setPhotoUrl]: [string, (arg0: string) => void] = useState("");
  const [identityChecked, setIdentityChecked]: [boolean, (arg0: boolean) => void] = useState(false);

  const funcSignOut: () => void = useCallback(() => {

    supabase.auth.signOut().then(() => {
      setLoggedIn(false);
      setDisplayName("");
      setPhotoUrl("");
    }).catch(() => {

    });
  }, [])

  useEffect(() => {
    const userHelper = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error === null && data.session !== null) {
        const user: User = data.session.user;
        setLoggedIn(true);
        
        const discordIdentity: UserIdentity | undefined = user.identities?.find((identity) => identity.provider === 'discord');
        if (discordIdentity !== undefined && discordIdentity.identity_data !== undefined) {
          setDisplayName(discordIdentity.identity_data.full_name);
          setPhotoUrl(discordIdentity.identity_data.picture);
        }
      }
      setIdentityChecked(true);
    }
    userHelper();
  })

  return (
    <nav className="bg-[#540000] top-0 py-2">
        
      <div className="xl:container mx-auto px-3">
        <div className="flex flex-grow items-center gap-12">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/avarian_icon.webp" className="h-16 rounded-full" alt="Avarian Logo" />
            <span className="self-center text-4xl whitespace-nowrap text-white font-dosis">Avarian</span>
          </Link>

          {/* Navbar middle elements */}
          <div className="flex flex-grow justify-start px-2 relative">
            <Menu>
            <MenuButton className="flex items-center gap-x-1.5 rounded-md px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-white/10">
              Games
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
              </svg>
            </MenuButton>
            <MenuItems transition anchor="bottom start" className="bg-black/50 text-white backdrop-blur-sm p-1 rounded-md origin-center transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-gap:0px] min-w-[var(--button-width)] font-lg">
              <MenuItem>
                <Link to="/mc/" className="flex items-center rounded gap-2 font-dosis hover:bg-white/15 px-3 py-2 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  Minecraft
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
          </div>

          {/* Login stuff on right side */}
          <div className="">
            <Transition show={identityChecked}>
              <div className="transition duration-500 ease-in data-[closed]:opacity-0">
                {loggedIn ? ProfileDropdown(displayName, photoUrl, funcSignOut) : SignIn()}
              </div>
            </Transition>
          </div>

        </div>
      </div>
    </nav>
  );
}

