import React from "react";
import Navbar from "./Navbar";

function MainHome(): React.ReactNode {
  return (
    <div className="bg-[url('/rugged_highlands.jpg')] h-screen bg-cover">
      <Navbar />
    </div>
  );
}

export default MainHome;