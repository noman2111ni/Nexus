import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  CreditCard,
  Home,
  CircleDollarSign,
  Users,
  Calendar,
  MessageCircle,
  Bell,
  FileText,
  Building2,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Investor sidebar items
  const investorLinks = [
    { to: "/dashboard/investor", icon: <Home size={18} />, text: "Dashboard" },
    { to: `/profile/investor/${user?.id}`, icon: <CircleDollarSign size={18} />, text: "My Portfolio" },
    { to: "/entrepreneurs", icon: <Users size={18} />, text: "Find Startups" },
    { to: "/calender", icon: <Calendar size={18} />, text: "Calendar" },
    { to: "/messages", icon: <MessageCircle size={18} />, text: "Messages" },
    { to: "/notifications", icon: <Bell size={18} />, text: "Notifications" },
    { to: "/deals", icon: <FileText size={18} />, text: "Deals" },
    { to: "/payments", icon: <CreditCard size={18} />, text: "Payments" },
  ];

  // Entrepreneur sidebar items
  const entrepreneurLinks = [
    { to: "/dashboard/entrepreneur", icon: <Home size={18} />, text: "Dashboard" },
    { to: `/profile/entrepreneur/${user?.id}`, icon: <Building2 size={18} />, text: "My Startup" },
    { to: "/investors", icon: <Users size={18} />, text: "Find Investors" },
    { to: "/calender", icon: <Calendar size={18} />, text: "Calendar" },
    { to: "/messages", icon: <MessageCircle size={18} />, text: "Messages" },
    { to: "/notifications", icon: <Bell size={18} />, text: "Notifications" },
    { to: "/deals", icon: <FileText size={18} />, text: "Deals" },
    { to: "/payments", icon: <CreditCard size={18} />, text: "Payments" },
  ];

  const navLinks = user?.role === "investor" ? investorLinks : entrepreneurLinks;

  // Split: first 5 main links + remaining in dropdown
  const mainLinks = navLinks.slice(0, 0);
  const moreLinks = navLinks.slice(0);

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between h-20 items-center p-3">
        <div>{/* Logo/Brand */}</div>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:space-x-4 relative">
          {user ? (
            <>
              {mainLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.text}
                </Link>
              ))}

              {/* Dropdown for remaining links */}
              {moreLinks.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    More <ChevronDown size={16} className="ml-1" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                      {moreLinks.map((link, index) => (
                        <Link
                          key={index}
                          to={link.to}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span className="mr-2">{link.icon}</span>
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Button
                variant="ghost"
                onClick={handleLogout}
                leftIcon={<LogOut size={18} />}
              >
                Logout
              </Button>

              <Link
                to={`/profile/${user.role}/${user.id}`}
                className="flex items-center space-x-2 ml-2"
              >
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  size="sm"
                  status={user.isOnline ? "online" : "offline"}
                />
                <div className="text-sm font-medium text-gray-700">
                  {user.name.slice(0, 7)}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu (all links visible directly) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-3 py-2">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="sm"
                    status={user.isOnline ? "online" : "offline"}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.text}
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link
                  to="/login"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" fullWidth>
                    Log in
                  </Button>
                </Link>
                <Link
                  to="/register"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button fullWidth>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
