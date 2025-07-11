import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FiPackage } from "react-icons/fi";
import { FaIdCard } from "react-icons/fa";
import useAuthStore from "../../store/authStore";

const Profile = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  //   console.log(user);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynamic menu options based on the role
  const menuOptions = {
    admin: [],
    hr: [
      // { label: "Manage Employees", link: "employees", icon: <FiPackage /> },
      // { label: "Manage Clients", link: "clients", icon: <FiPackage /> },
    ],
    // Add more roles as needed
  };

  const role = user?.role;
  const menu = menuOptions[role] || [];

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <Button
          shape="circle"
          icon={<UserOutlined />}
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50"
        />
      </div>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1  ring-opacity-5 z-50">
          <div className="py-1">
            {/* User info */}
            <div className="px-4 py-2 text-sm text-gray-700 ">
              <div className="font-medium">{user?.username}</div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>

            {/* Dynamic menu items */}
            {menu.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(`/dashboard/${item.link}`);
                  setOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* About Us */}
            <button
              onClick={() => {
                navigate("/user-dashboard");
                setOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-2">
                <BsExclamationCircle />
              </span>
              User Dashboard
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            >
              <span className="mr-2">
                <LogoutOutlined />
              </span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
