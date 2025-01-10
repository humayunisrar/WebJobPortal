import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [show, setShow] = useState(false); // Toggle sidebar visibility
  const [active, setActive] = useState("HOME");

  
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>

      {/* Sidebar Links */}
      <div className={`sidebar ${show ? "show" : ""}`}>
        <ul>
          <li>
            <Link
              to="/"
              className={active === "HOME" ? "active" : ""}
              onClick={() => {
                setActive("HOME");
                setShow(false); // Close the sidebar when an option is clicked
              }}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className={active === "JOBS" ? "active" : ""}
              onClick={() => {
                setActive("JOBS");
                setShow(false); // Close the sidebar when an option is clicked
              }}
            >
              JOBS
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link
                to="/dashboard"
                className={active === "DASHBOARD" ? "active" : ""}
                onClick={() => {
                  setActive("DASHBOARD");
                  setShow(false); // Close the sidebar when an option is clicked
                }}
              >
                DASHBOARD
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={active === "LOGIN" ? "active" : ""}
                onClick={() => {
                  setActive("LOGIN");
                  setShow(false); // Close the sidebar when an option is clicked
                }}
              >
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
