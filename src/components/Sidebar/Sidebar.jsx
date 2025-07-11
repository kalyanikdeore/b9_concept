import React, { useState } from "react";
import { getSidebarItems } from "../../utils/sidebarConfig";
import useAuthStore from "../../store/authStore";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
  const { role, loading } = useAuthStore();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Wait for auth to be checked before rendering
  if (loading) {
    return <div>Loading sidebar...</div>;
  }

  const menu = getSidebarItems(role);

  return (
    <div className="rounded-r-3xl hidden md:flex flex-col w-64 h-screen bg-gray-900 text-white">
      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menu.map((item, index) => (
            <li key={index} className="p-2 rounded">
              {item.subMenu ? (
                <div>
                  {/* Parent Menu Item */}
                  <button
                    onClick={() => toggleMenu(index)}
                    className="flex items-center justify-between w-full p-2 rounded text-sm md:text-md hover:bg-yellow-800"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {openMenus[index] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Submenu Items */}
                  {openMenus[index] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.link}
                            className={({ isActive }) =>
                              `block p-2 text-sm rounded ${
                                isActive ? "bg-blue-700" : "hover:bg-blue-800"
                              }`
                            }
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-2 rounded text-sm md:text-md ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-800"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
