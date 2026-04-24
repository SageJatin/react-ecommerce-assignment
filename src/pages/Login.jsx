import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(username.trim(), password.trim());
      localStorage.setItem("token", data.accessToken);
      navigate("/products");
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <h1 className={styles.title}>Lume Beauty</h1>
        <p className={styles.subtitle}>Please sign in to continue</p>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        
        <div className={styles.testCredentials}>
          <p>Test Credentials:</p>
          <p>Username: <strong>emilys</strong></p>
          <p>Password: <strong>emilyspass</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;