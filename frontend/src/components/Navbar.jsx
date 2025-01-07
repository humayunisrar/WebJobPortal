import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("HOME");
  const [toggle, setToggle] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (toggle) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [toggle]);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>

      {/* Hamburger Icon */}
      <GiHamburgerMenu
        className="hamburger"
        onClick={() => setToggle(!toggle)}
      />

      {/* Sidebar Links */}
      <div className={`sidebar ${toggle ? "show" : ""}`}>
        {/* Close button */}
        <span
          className="close-btn"
          onClick={() => setToggle(false)}
        >
          &times;
        </span>
        <ul>
          <li>
            <Link
              to="/"
              className={active === "HOME" ? "active" : ""}
              onClick={() => {
                setActive("HOME");
                setToggle(false); // Close sidebar on click
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
                setToggle(false); // Close sidebar on click
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
                onClick={() => setActive("DASHBOARD")}
              >
                DASHBOARD
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={active === "LOGIN" ? "active" : ""}
                onClick={() => setActive("LOGIN")}
              >
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Regular Navbar Links (for larger screens) */}
      <div className="links">
        <ul>
          <li>
            <Link
              to="/"
              className={active === "HOME" ? "active" : ""}
              onClick={() => setActive("HOME")}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className={active === "JOBS" ? "active" : ""}
              onClick={() => setActive("JOBS")}
            >
              JOBS
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link
                to="/dashboard"
                className={active === "DASHBOARD" ? "active" : ""}
                onClick={() => setActive("DASHBOARD")}
              >
                DASHBOARD
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={active === "LOGIN" ? "active" : ""}
                onClick={() => setActive("LOGIN")}
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
