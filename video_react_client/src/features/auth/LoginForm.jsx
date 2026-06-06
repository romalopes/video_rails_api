import { useState, useEffect } from "react";
import { authClient } from "./auth";

export default function LoginForm({ user, setUser }) {
  // const [session, setSession] = useState(null);
  // const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   authClient.getSession().then((result) => {
  //     if (result.data?.session && result.data?.user) {
  //       setSession(result.data.session);
  //       setUser(result.data.user);
  //     }
  //     setLoading(false);
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = isSignUp
      ? await authClient.signUp.email({
          name: email.split("@")[0] || "User",
          email,
          password,
        })
      : await authClient.signIn.email({ email, password });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    const sessionResult = await authClient.getSession();
    if (sessionResult.data?.session && sessionResult.data?.user) {
      // onLogin(sessionResult.data);
      // setSession(sessionResult.data.session);
      setUser(sessionResult.data.user);
    }
  };

  async function handleSignOut() {
    await authClient.signOut();
    // setSession(null);
    setUser(null);
  }

  // const handleSignOut = async () => {
  //   await authClient.signOut();
  //   setSession(null);
  //   setUser(null);
  // };

  // if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        <h1>Logged in as {user.email}</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      <p>
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(false);
              }}
            >
              Sign in
            </a>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(true);
              }}
            >
              Sign up
            </a>
          </>
        )}
      </p>
    </form>
  );

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await authClient.signIn.email({ email, password });
  //   } catch (err) {
  //     setError(err.message);
  //     return;
  //   }
  // };

  // return (
  //   <div className="login-page">
  //     <h1>Login</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         required
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //       <button type="submit">Sign In</button>
  //       {error && <p style={{ color: "red" }}>{error}</p>}
  //     </form>
  //   </div>
  // );
}
