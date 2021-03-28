import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({children}) => {
  return (
    <div className="max-w-8xl mx-auto px-12">
      <Header />
      <div className="grid grid-cols-12 gap-4">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
