import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Building2,
  CircleDollarSign,
  Users,
  MessageCircle,
  Bell,
  FileText,
  Settings,
  HelpCircle,
  MenuIcon,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  text,
  isCollapsed,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-primary-100 text-primary-700 font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {!isCollapsed && <span className="text-sm">{text}</span>}
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) return null;

  // Role-based items
  const entrepreneurItems = [
    {
      to: "/dashboard/entrepreneur",
      icon: <Home size={20} />,
      text: "Dashboard",
    },
    {
      to: "/profile/entrepreneur/" + user.id,
      icon: <Building2 size={20} />,
      text: "My Startup",
    },
    {
      to: "/investors",
      icon: <CircleDollarSign size={20} />,
      text: "Find Investors",
    },
    { to: "/messages", icon: <MessageCircle size={20} />, text: "Messages" },
    { to: "/notifications", icon: <Bell size={20} />, text: "Notifications" },
    { to: "/documents", icon: <FileText size={20} />, text: "Documents" },
  ];

  const investorItems = [
    { to: "/dashboard/investor", icon: <Home size={20} />, text: "Dashboard" },
    {
      to: "/profile/investor/" + user.id,
      icon: <CircleDollarSign size={20} />,
      text: "My Portfolio",
    },
    { to: "/entrepreneurs", icon: <Users size={20} />, text: "Find Startups" },
    { to: "/messages", icon: <MessageCircle size={20} />, text: "Messages" },
    { to: "/notifications", icon: <Bell size={20} />, text: "Notifications" },
    { to: "/deals", icon: <FileText size={20} />, text: "Deals" },
  ];

  const sidebarItems =
    user.role === "entrepreneur" ? entrepreneurItems : investorItems;

  const commonItems = [
    { to: "/settings", icon: <Settings size={20} />, text: "Settings" },
    { to: "/help", icon: <HelpCircle size={20} />, text: "Help & Support" },
  ];

  return (
    <motion.div
      animate={{ width: isCollapsed ? "80px" : "250px" }}
      className="bg-white h-[600px] border-r border-gray-200 hidden md:flex flex-col shadow-sm"
    >
      {/* Header: Logo + Toggle */}
      {/* Header: Logo + Toggle */}
      <div className="flex items-center justify-between px-3 py-4 ">
        <Link to="/" className="flex items-center space-x-2">
          {/* Logo sirf tab show hoga jab sidebar collapsed na ho */}
          {!isCollapsed && (
            <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Text bhi sirf tab show hoga jab sidebar collapsed na ho */}
          {!isCollapsed && (
            <span className= " text-sm font-bold text-gray-900  whitespace-nowrap">
              Business Nexus
            </span>
          )}
        </Link>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-2 mr-4 p-1 rounded-md hover:bg-gray-100"
        >
          {isCollapsed ?
             <MenuIcon  />
         
          : <X size={20}/>
          
          }
        </button>
      </div>

      {/* Sidebar items */}
      <div className="flex-1 py-3 overflow-y-auto">
        <div className="px-2 space-y-1">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              to={item.to}
              icon={item.icon}
              text={item.text}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        <div className="mt-6 px-2 space-y-1">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Settings
            </h3>
          )}
          <div className="space-y-1">
            {commonItems.map((item, index) => (
              <SidebarItem
                key={index}
                to={item.to}
                icon={item.icon}
                text={item.text}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="p-3 border-t border-gray-200">
        <div className="bg-gray-50 rounded-md p-2 text-center">
          {!isCollapsed ? (
            <>
              <p className="text-xs text-gray-600">Need assistance?</p>
              <h4 className="text-sm font-medium text-gray-900 mt-1">
                Contact Support
              </h4>
              <a
                href="mailto:support@businessnexus.com"
                className="mt-1 inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-500"
              >
                support@businessnexus.com
              </a>
            </>
          ) : (
            <HelpCircle size={18} className="mx-auto text-gray-500" />
          )}
        </div>
      </div>
    </motion.div>
  );
};
