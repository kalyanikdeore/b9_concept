import React from "react";
import { LogOut } from "lucide-react";

import axiosInstance from "../../services/api";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      if (response.status === 200) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      className="flex items-center px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-700"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-1" />
      Logout
    </button>
  );
};

export default LogoutButton;
