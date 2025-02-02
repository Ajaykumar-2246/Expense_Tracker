import React, { useState } from "react";
import { Mail, Lock, Loader,EyeOff,Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../ZustandStores/authStore";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Initialize errors state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();
  const navigate = useNavigate();

  const handleChangingFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFormData = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    const isValid = validateFormData();
    if (isValid) {
      try {
        await login(formData);
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-300 to-indigo-200">
      <div className="bg-white shadow-2xl  rounded-2xl w-full sm:w-96 px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Log In
        </h1>
        <form onSubmit={handleFormData}>
          {/* Email Field */}
          <div className="flex flex-col gap-2 mb-3">
            <label
              htmlFor="email"
              className="text-gray-700 flex items-center gap-2 text-sm font-medium"
            >
              <Mail className="w-5 h-5" /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChangingFormData}
              className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
              placeholder="Enter your email"
              aria-label="Email Address"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 mb-3 relative">
            <label
              htmlFor="password"
              className="text-gray-700 flex items-center gap-2 text-sm font-medium"
            >
              <Lock className="w-5 h-5" /> Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChangingFormData}
              className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
              placeholder="Enter your password"
              aria-label="Password"
            />
            <div
              className=" absolute  right-3 bottom-3 flex items-center cursor-pointer text-gray-600 hover:text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full text-center bg-indigo-500 text-white py-3 rounded-lg font-medium text-sm hover:bg-indigo-600 transition duration-300 shadow-md"
          >
            {isLoggingIn ? (
              <Loader className="w-5 h-5 mx-auto animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 hover:underline hover:text-indigo-600"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
