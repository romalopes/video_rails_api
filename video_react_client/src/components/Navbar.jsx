import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <NavLink className="brand" to="/">
        <span className="brand-mark" aria-hidden="true">
          V
        </span>
        <span>
          <strong>Video Journal</strong>
          <small>Rails API client</small>
        </span>
      </NavLink>

      <div className="nav-actions">
        <NavLink to="/loginSignup">Login/Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
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
