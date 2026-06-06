// import React, { useEffect, useMemo, useState } from "react";
// import { createRoot } from "react-dom/client";
// // import "./loginSignupStyles.css";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";
// const TOKEN_KEY = "auth_test_jwt";
// console.log(`Using API URL: ${API_URL}`);

// function LoginSignupForm() {
//   const [mode, setMode] = useState("login");
//   const [email, setEmail] = useState("demo@example.com");
//   const [password, setPassword] = useState("password");
//   const [token, setToken] = useState(
//     () => localStorage.getItem(TOKEN_KEY) || "",
//   );
//   const [user, setUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isAuthed = Boolean(token);
//   const authHeaders = useMemo(
//     () => (token ? { Authorization: `Bearer ${token}` } : {}),
//     [token],
//   );

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem(TOKEN_KEY, token);
//       fetchMe(token);
//     } else {
//       localStorage.removeItem(TOKEN_KEY);
//       setUser(null);
//     }
//   }, [token]);

//   async function request(path, options = {}) {
//     const response = await fetch(`${API_URL}${path}`, {
//       headers: {
//         "Content-Type": "application/json",
//         ...options.headers,
//       },
//       ...options,
//     });

//     const data = await response.json().catch(() => ({}));

//     if (!response.ok) {
//       const errors =
//         data.errors || data.error || data.message || "Request failed.";
//       throw new Error(Array.isArray(errors) ? errors.join(" ") : errors);
//     }

//     return {
//       data,
//       token:
//         response.headers.get("Authorization")?.replace(/^Bearer /, "") ||
//         data.token,
//     };
//   }

//   async function fetchMe(nextToken = token) {
//     if (!nextToken) return;

//     try {
//       const { data } = await request("/api/me", {
//         headers: { Authorization: `Bearer ${nextToken}` },
//       });
//       setUser(data.user);
//       setMessage("JWT accepted by Rails.");
//     } catch (error) {
//       setToken("");
//       setMessage(error.message);
//     }
//   }

//   async function submitAuth(event) {
//     event.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const endpoint = mode === "login" ? "/api/login" : "/api/signup";
//       const { data, token: nextToken } = await request(endpoint, {
//         method: "POST",
//         body: JSON.stringify({ user: { email, password } }),
//       });

//       setUser(data.user);
//       setToken(nextToken);
//       setMessage(data.message || "Authenticated.");
//     } catch (error) {
//       setMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function logout() {
//     setLoading(true);
//     setMessage("");

//     try {
//       await request("/api/logout", {
//         method: "DELETE",
//         headers: authHeaders,
//       });
//       setMessage("Logged out and token revoked.");
//     } catch (error) {
//       setMessage(error.message);
//     } finally {
//       setToken("");
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="app-shell">
//       <section className="auth-panel">
//         <div>
//           <p className="eyebrow">Rails API + React</p>
//           <h1>JWT Authentication</h1>
//           <p className="lede">
//             Register or log in, then call a protected endpoint with the returned
//             JWT.
//           </p>
//         </div>

//         <div className="segmented" aria-label="Authentication mode">
//           <button
//             className={mode === "login" ? "active" : ""}
//             onClick={() => setMode("login")}
//           >
//             Log in
//           </button>
//           <button
//             className={mode === "signup" ? "active" : ""}
//             onClick={() => setMode("signup")}
//           >
//             Sign up
//           </button>
//         </div>

//         <form onSubmit={submitAuth} className="form">
//           <label>
//             Email
//             <input
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               autoComplete="email"
//               required
//             />
//           </label>

//           <label>
//             Password
//             <input
//               type="password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               autoComplete={
//                 mode === "login" ? "current-password" : "new-password"
//               }
//               minLength={6}
//               required
//             />
//           </label>

//           <button className="primary" type="submit" disabled={loading}>
//             {loading
//               ? "Working..."
//               : mode === "login"
//                 ? "Log in"
//                 : "Create account"}
//           </button>
//         </form>
//       </section>

//       <section className="status-panel">
//         <div className="status-header">
//           <div>
//             <p className="eyebrow">Protected state</p>
//             <h2>{isAuthed ? "Authenticated" : "Signed out"}</h2>
//           </div>
//           {isAuthed && (
//             <button className="ghost" onClick={logout} disabled={loading}>
//               Logout
//             </button>
//           )}
//         </div>

//         <dl>
//           <div>
//             <dt>User</dt>
//             <dd>{user ? user.email : "No user loaded"}</dd>
//           </div>
//           <div>
//             <dt>JWT</dt>
//             <dd className="token">{token || "No token stored"}</dd>
//           </div>
//           <div>
//             <dt>API message</dt>
//             <dd>{message || "Ready"}</dd>
//           </div>
//         </dl>

//         <button
//           className="secondary"
//           onClick={() => fetchMe()}
//           disabled={!isAuthed || loading}
//         >
//           Fetch /api/me
//         </button>
//       </section>
//     </main>
//   );
// }

// // createRoot(document.getElementById("root")).render(<App />);
// export default LoginSignupForm;
