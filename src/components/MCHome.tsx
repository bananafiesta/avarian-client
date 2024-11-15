import {ReactElement} from "react";
import { useDocumentTitle } from "./useDocumentTitle";
import { Button } from "@headlessui/react"
import { Link } from "react-router-dom";

function CenterButton({text, link, art}: {text:string, link:string, art:ReactElement}): ReactElement {
  return(
    <Button className="flex flex-col bg-gray-800/70 p-4 rounded-2xl w-40 h-40 justify-center items-center hover:bg-gray-800/90 text-white font-dosis">
      <Link to={link}>
        <span className="text-lg font-semibold">{text}</span>
        {art}
      </Link>
    </Button>
  )
}

function MapIcon(): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-32">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
    </svg>
  )
}
function LeaderboardIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-32" stroke="currentColor">
      <path d="M15 21H9V12.6C9 12.2686 9.26863 12 9.6 12H14.4C14.7314 12 15 12.2686 15 12.6V21Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.4 21H15V18.1C15 17.7686 15.2686 17.5 15.6 17.5H20.4C20.7314 17.5 21 17.7686 21 18.1V20.4C21 20.7314 20.7314 21 20.4 21Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 21V16.1C9 15.7686 8.73137 15.5 8.4 15.5H3.6C3.26863 15.5 3 15.7686 3 16.1V20.4C3 20.7314 3.26863 21 3.6 21H9Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.8056 5.11325L11.7147 3.1856C11.8314 2.93813 12.1686 2.93813 12.2853 3.1856L13.1944 5.11325L15.2275 5.42427C15.4884 5.46418 15.5923 5.79977 15.4035 5.99229L13.9326 7.4917L14.2797 9.60999C14.3243 9.88202 14.0515 10.0895 13.8181 9.96099L12 8.96031L10.1819 9.96099C9.94851 10.0895 9.67568 9.88202 9.72026 9.60999L10.0674 7.4917L8.59651 5.99229C8.40766 5.79977 8.51163 5.46418 8.77248 5.42427L10.8056 5.11325Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ProfileIcon(): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-32">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

  )
}

export function MCHome(): ReactElement {
  const title: string = "Title TBD";
  useDocumentTitle(title);
  return (
    <div className="flex flex-col grow">
      <div className="h-px bg-gray-300" />
      
      <div className="flex bg-[url('/mc_home.png')] bg-cover bg-center grow">
        <div className="flex justify-center items-center grow gap-32">
          <CenterButton text="Map" link="map" art={<MapIcon />} />
          <CenterButton text="Leaderboard" link="leaderboard" art={<LeaderboardIcon />} />
          <CenterButton text="Profile" link="profile" art={<ProfileIcon />} />
        </div>
      </div>
    </div>
  )
}

