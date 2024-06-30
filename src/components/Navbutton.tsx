import React, { ReactNode } from "react";

function Navbutton({children}) {
  return (
    <>
      <button type="button" className="flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-[#750000] relative" id="games-button" aria-expanded="true" aria-haspopup="true">
        {children}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
        </svg>  */}
        

      </button>
    </>
  );
}

export default Navbutton;