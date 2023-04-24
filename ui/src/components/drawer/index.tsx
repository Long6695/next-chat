import React from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Card from "../card";
import SearchBar from "../search";
import Navbar from "../nav-bar";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer drawer-mobile bg-base-300">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <div className="p-4 h-full">
        {children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          <li>
            <SearchBar />
          </li>
          <li>
            <Card />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
