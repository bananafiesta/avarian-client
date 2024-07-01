import React, { ReactNode } from "react";

function Navbutton({children}: {children: ReactNode}): React.ReactNode {
  return (
    <>
      <button type="button" className="flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-[#750000] relative" id="games-button" aria-expanded="true" aria-haspopup="true">
        {children}
        
        

      </button>
    </>
  );
}

export default Navbutton;