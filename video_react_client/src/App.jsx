import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./components/AppRoutes";
import LoginForm from "./features/auth/LoginForm";
import { authClient } from "./features/auth/auth";

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((result) => {
      if (result.data?.session && result.data?.user) {
        setSession(result.data.session);
        setUser(result.data.user);
      }
      setLoading(false);
    });
  }, []);

  async function handleLogin(user) {
    setSession(user.session);
    setUser(user.user);
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Router>
      <div className="app-shell">
        <Navbar user={user} setUser={setUser} onLogin={handleLogin} />
        {/* <LoginForm session={session} user={user} onLogin={handleLogin} /> */}
        <main className="app-main">
          <AppRoutes user={user} setUser={setUser} />
        </main>
      </div>
    </Router>
  );
}

export default App;
