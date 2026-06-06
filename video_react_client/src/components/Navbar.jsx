import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
import ShowLogin from "./ShowLogin.jsx";

function NavBar({ user, setUser, onLogin }) {
  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <NavLink className="brand" to="/">
        <span className="brand-mark" aria-hidden="true">
          R
        </span>
        <span>
          <strong>Video Journal</strong>
          <small>Rails API client</small>
        </span>
      </NavLink>

      <div className="nav-actions">
        {/* <NavLink to="/loginSignup">Login/Signup</NavLink> */}
        <ShowLogin user={user} onLogin={onLogin} setUser={setUser} />

        <NavLink to="/" end>
          Library
        </NavLink>
        <NavLink className="button button-primary" to="/new">
          New Post
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
