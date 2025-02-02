import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const Base_Url = "http://localhost:3000/api/users";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingIn: false, // Corrected variable name here

  // checking user
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axios.get(`${Base_Url}/checkAuth`);
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // signup User

  signup: async (formData) => {
    set({ isSigningUp: true });
    const { name, email, password, gender } = formData;
    try {
      const res = await axios.post(`${Base_Url}/signup`, {
        name,
        email,
        password,
        gender,
      });
      set({ authUser: res.data, isSigningUp: false });
      toast.success("Sign-up successful!");
    } catch (error) {
      set({ isSigningUp: false });
      const errorMessage =
        error.response?.data?.message || "An error occurred during sign-up.";
      toast.error(errorMessage);
    }
  },

  // login User

  login: async (userData) => {
    set({ isLoggingIn: true }); // Corrected variable name here
    const { email, password } = userData;
    try {
      const res = await axios.post(`${Base_Url}/login`, {
        email,
        password,
      });
      set({ authUser: res.data, isLoggingIn: false }); // Corrected variable name here
      toast.success("Login successful!");
    } catch (error) {
      set({ isLoggingIn: false });
      toast.error(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  },

  // logout User
  logout: async () => {
    try {
      await axios.post(`${Base_Url}/logout`);
      set({ authUser: null });
      toast.success("Logout successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout."
      );
    }
  },

  // delete User

  deleteUser: async (email) => {
    try {
      const res = await axios.delete(`${Base_Url}/deleteUser/${email}`);
      toast.success(res.data.message || "User deleted successfully.");
      // Optional: Clear authUser if the deleted user was the logged-in user
      set({ authUser: null });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during deletion.";
      toast.error(errorMessage);
    }
  },
}));
