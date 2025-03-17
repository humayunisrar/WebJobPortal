import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  // Check local storage for user data on page load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.token) {
          fetchUser(parsedUser.token);
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user"); // ✅ Clear corrupt data
    }
  }, []);

  // Fetch user details from the server
  const fetchUser = async (token) => {
    try {
      const response = await axios.get("https://jobportalback.onrender.com/api/v1/user/getuser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("Fetch user failed:", error.response?.data?.message || error.message);
      logout(); // Auto-logout if token is invalid
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login setUser={setUser} />} />
        <Route path="/post/application/:jobId" element={user ? <PostApplication /> : <Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" theme="dark" />
    </Router>
  );
};

export default App;
