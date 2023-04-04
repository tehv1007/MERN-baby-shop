import React from "react";
import NewSidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen flex-grow bg-gray-50 false">
      <NewSidebar />
      <div className="w-full mx-4 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
