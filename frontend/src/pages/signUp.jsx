import React, { useState } from "react";
import { User, Mail, Lock, Loader, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../ZustandStores/authStore";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const { isSigningUp, signup } = useAuthStore();

  const handleChangingFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFormData = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", gender: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
      valid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
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
        await signup(formData);
        setFormData({ name: "", email: "", password: "", gender: "" }); // Clear form after successful sign-up
      } catch (error) {
        toast.error(error.message || "Sign up failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm px-8 py-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">Create an Account</h1>
        <form onSubmit={handleFormData}>
          {/* Username Field */}
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="username" className="text-gray-700 flex items-center gap-2 text-sm font-medium">
              <User className="w-5 h-5" /> Username
            </label>
            <input id="username" name="name" type="text" value={formData.name} onChange={handleChangingFormData} className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm" placeholder="Enter your username" aria-label="Username" />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="email" className="text-gray-700 flex items-center gap-2 text-sm font-medium">
              <Mail className="w-5 h-5" /> Email
            </label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChangingFormData} className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm" placeholder="Enter your email" aria-label="Email Address" />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          {/* Gender Field */}
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="gender" className="text-gray-700 text-sm font-medium">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChangingFormData} className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm">
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500 text-xs">{errors.gender}</span>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 mb-3 relative">
            <label htmlFor="password" className="text-gray-700 flex items-center gap-2 text-sm font-medium">
              <Lock className="w-5 h-5" /> Password
            </label>
            <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChangingFormData} className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm" placeholder="Enter your password" aria-label="Password" />
            <div className="absolute right-3 bottom-3 flex items-center cursor-pointer text-gray-600 hover:text-blue-600" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSigningUp} className="w-full text-center bg-indigo-500 text-white py-3 rounded-lg font-medium text-sm hover:bg-indigo-600 transition duration-300 shadow-md">
            {isSigningUp ? <Loader className="w-5 h-5 mx-auto animate-spin" /> : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-3">Already have an account? <Link to="/login" className="text-indigo-500 hover:underline hover:text-indigo-600">Log in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
