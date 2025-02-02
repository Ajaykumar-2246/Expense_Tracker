import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/signUp";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import UpdatePage from "./pages/UpdatePage";
import { useAuthStore } from "./ZustandStores/authStore"; // Assuming Zustand store for authentication state
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore(); // Assuming Zustand store holds auth state

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-36 animate-spin" />
      </div>
    );
  return (
    <div>
    <Navbar  />
      <Routes>
        {/* Home route: If user is authenticated, show HomePage, else show Login */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Signup route: If authenticated, redirect to home, else show Signup */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Login route: If authenticated, redirect to home, else show Login */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/update/:id"
          element={authUser ? <UpdatePage/> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
