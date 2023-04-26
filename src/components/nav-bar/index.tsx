import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full navbar bg-base-300 px-4">
      <div className="navbar-start">
        <label htmlFor="my-drawer-3">
          <Bars3Icon className="w-6 h-6 lg:hidden" />
        </label>
      </div>
      <div className="navbar-center">
        <h2 className="text-primary font-bold text-3xl">Chat App</h2>
      </div>
      <div className="navbar-end">
        <div className="menu menu-horizontal">
          <MagnifyingGlassIcon className="h-6 w-6 lg:hidden" />
          <div className="indicator">
            <BellIcon className="h-6 w-6" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
