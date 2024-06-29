import React from "react";

function MainHome() {
  return (
    <body className="bg-[url('/rugged_highlands.jpg')] h-screen bg-cover">
      {/* Navbar */}
      <nav className="bg-[#540000] top-0 py-2">
        
        <div className="xl:container mx-auto px-3 relative">
            <div className="flex flex-grow items-center gap-12">
              {/* Name and icon */}
              <a href="/" className="flex items-center space-x-2">
                <img src="/avarian_icon.webp" className="h-16 rounded-full" alt="Avarian Logo" />
                <span className="self-center text-4xl whitespace-nowrap text-white font-dosis">Avarian</span>
              </a>

              {/* drop down items */}
              <div className="flex flex-grow justify-start px-2">
                <button type="button" className="flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-[#750000] relative" id="games-button" aria-expanded="true" aria-haspopup="true">
                  Games
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                  </svg>
                  
                </button>
                <button type="button" className="flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-[#750000] relative" id="utilities-button" aria-expanded="true" aria-haspopup="true">
                  Utilities
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                  </svg>
                  
                </button>
              </div>

              {/* Right side elements */}
              <div className="">
                <a href="/" className="block">Login</a>
              </div>
            </div>

        </div>
      </nav>

      
    </body>
  );
}

export default MainHome;