import { Link } from "react-router-dom";
import React from "react";

export function Navbar({children}: {children?: React.ReactNode}): React.ReactNode {
  return (
    <div>
      <nav className="bg-[#540000] top-0 py-2">
          
        <div className="xl:container mx-auto px-3">
          <div className="flex flex-grow items-center gap-12">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/avarian_icon.webp" className="h-16 rounded-full" alt="Avarian Logo" />
              <span className="self-center text-4xl whitespace-nowrap text-white font-dosis">Avarian</span>
            </Link>

            {/* Navbar middle elements */}
            <div className="flex flex-grow justify-start px-2 relative">
              {children}
            </div>

            {/* Login stuff on right side */}
            <div className="">
              <a href="/" className="block">Login</a>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

