import React from "react";
import LogoutButton from "../LogoutButton/LogoutButton";
const HeaderRow = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-100 shadow-md rounded-md z-50">
      {/* Left Section: Logo + Title */}
      <div className="flex items-center space-x-3">
        <img
          src="http://b9concept.demovoting.com/assets/logo-DDQ4Kwqc.png"
          alt="B9 Concept Logo"
          className="w-28 h-12 rounded-full object-contain"
        />
        <span className="font-extrabold text-2xl text-gray-700">
          B9 CONCEPT
        </span>
      </div>

      {/* Right Section: Logout */}
      <div className="flex items-center space-x-2">
        <LogoutButton />
      </div>
    </div>
  );
};

export default HeaderRow;
