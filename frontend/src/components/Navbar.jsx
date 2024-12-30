import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className={`navbar ${show ? "show_navbar" : ""}`}>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
       
      </div>
      <GiHamburgerMenu
        className="hamburger"
        onClick={() => setShow((prevShow) => !prevShow)}
      />
      <div className="links">
        <ul>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/jobs" onClick={() => setShow(false)}>
              JOBS
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/dashboard" onClick={() => setShow(false)}>
                DASHBOARD
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={() => setShow(false)}>
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
