import { useState, useEffect } from "react";
import { authClient } from "../features/auth/auth";
import { NavLink } from "react-router-dom";

function ShowLogin({ user, setUser }) {
  //   const [session, setSession] = useState(null);
  //   const [user, setUser] = useState(null);
  //   useEffect(() => {
  //     console.log("ShowLogin useEffect");
  //     authClient.getSession().then((result) => {
  //       if (result.data?.session && result.data?.user) {
  //         setSession(result.data.session);
  //         setUser(result.data.user);
  //       }
  //     });
  //   }, []);

  async function handleSignOut() {
    await authClient.signOut();
    // setSession(null);
    setUser(null);
  }

  if (user) {
    return (
      <>
        <span>Logged in as {user.email}</span>
        <button className="button button-primary" onClick={handleSignOut}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <NavLink to="/login">Login/Signup</NavLink>
      {/* <NavLink to="/signup">Sign up</NavLink> */}
    </>
  );
}

export default ShowLogin;
