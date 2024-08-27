import {ReactNode} from "react";
import { useDocumentTitle } from "./useDocumentTitle";
import { Button } from "@headlessui/react"
import { Link } from "react-router-dom";

export function MCHome(): ReactNode {
  const title: string = "Mnemonic Spire";
  useDocumentTitle(title);
  return (
    <div className="flex flex-col grow">
      <div className="h-px bg-gray-300" />
      
      <div className="flex bg-[url('/mc_home.png')] bg-cover bg-center grow">
        <div className="flex justify-center items-center grow gap-32">
          <Button className="flex flex-col bg-gray-800/70 p-4 rounded-2xl w-40 h-40 justify-center items-center hover:bg-gray-800/90 text-white font-dosis">
            <Link to="map">
              <span className="text-lg font-semibold">Map</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-32">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
            </Link>
          </Button>
          <Button className="flex flex-col bg-gray-800/70 p-4 rounded-2xl w-40 h-40 justify-center items-center hover:bg-gray-800/90 text-white font-dosis">
            <Link to="">
              <span className="text-lg font-semibold">Overview</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-32">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

