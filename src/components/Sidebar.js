import React from "react";
import {Link} from "react-router-dom";

const menu = [
  {
    to: "/earn",
    label: "Earn",
  },
  {
    to: "/invest",
    label: "Invest",
  },
  {
    to: "/governance",
    label: "Governance",
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col col-span-12 sm:col-span-2 space-y-4">
      {menu.map((item, index) => (
        <div className="text-2xl" key={index}>
          <Link to={item.to}>{item.label}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
