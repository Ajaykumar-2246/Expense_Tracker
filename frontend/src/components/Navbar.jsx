import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../ZustandStores/authStore";
import { LogOut, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout, deleteUser } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Close profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser(authUser.email);
    } else {
      setShowProfile(false);
    }
  };

  return (
    <div className="navbar">
      {authUser && (
        <nav className="w-full h-16 flex items-center justify-between px-4 md:px-8 lg:px-16 bg-white shadow-lg">
          {/* Logo */}
          <div className="text-2xl italic md:text-3xl font-semibold text-blue-500 hover:text-blue-600 transition-colors">
            <Link to="/">Spendly</Link>
          </div>

          {/* User Profile Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className="relative"
              ref={profileRef}
            >
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <User className="w-6 h-6 text-gray-700" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="text-center bg-blue-500 text-white rounded-t-lg py-3">
                    <p className="text-lg font-semibold italic">User Profile</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-5 h-5 text-gray-700" />
                      <p className="text-gray-700">{authUser.name}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-gray-700" />
                      <p className="text-gray-700">{authUser.email}</p>
                    </div>
                    <button
                      onClick={handleDeleteAccount}
                      className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-full hover:bg-red-500 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;