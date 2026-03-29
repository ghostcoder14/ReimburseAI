import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="p-6">
        <Outlet />  
      </div>
    </div>
  );
};

export default Layout;