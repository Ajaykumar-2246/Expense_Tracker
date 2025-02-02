import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../ZustandStores/authStore";
import { LogOut, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout, deleteUser } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // console.log(authUser);
  
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
        <nav className="nav  w-full h-14 flex items-center justify-between px-4 md:px-8 lg:px-16 bg-white shadow-lg">
          {/* Logo */}
          <div className="text-2xl italic md:text-3xl font-semibold focus:none text-blue-400">
            <Link to="/" className="hover:text-blue-500 transition">
            Spendly
            </Link>
          </div>

          {/* User Profile Button */}
          <div className="flex items-center gap-1 sm:gap-3">
            <div
              className={`flex items-center relative p-2 rounded-full cursor-pointer ${
                showProfile ? "bg-gray-100" : ""
              }`}
              onClick={() => setShowProfile(!showProfile)}
              ref={profileRef}
            >
              <User className="w-5 h-5" />
              {showProfile && (
                <div className="absolute top-10 italic right-0 w-[200px] bg-white shadow-lg rounded-lg">
                  <div className="text-center">
                    <p className="text-md rounded-t-lg font-bold italic text-white p-3 bg-blue-500">
                      User Profile
                    </p>
                  </div>
                  <div className="px-2 flex flex-col gap-1 py-3">
                    <label htmlFor="name" className="flex items-center gap-1">
                      <User className="text-gray-700 w-5 h-5" /> Username:
                    </label>
                    <p className="px-3 py-1 w-full border rounded-full">
                      {authUser.name}
                    </p>
                    <label htmlFor="email" className="flex items-center gap-1">
                      <Mail className="text-gray-700 w-5 h-5" /> Email:
                    </label>
                    <p className="px-3 py-1 w-full border rounded-full">
                      {authUser.email}
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={handleDeleteAccount}
                      className="p-2 italic bg-red-400 hover:bg-red-600 text-white rounded-b-lg font-semibold w-full"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-sm md:text-base sm:bg-gray-100 text-black rounded-full hover:bg-red-500 hover:text-white transition-all bg-white"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:flex">Logout</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
