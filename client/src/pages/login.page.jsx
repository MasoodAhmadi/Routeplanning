import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user, token } = await response.json();

        login(user, token);
        // Store token and user information in localStorage or state
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.userId); // Save userId in localStorage

        // Optionally, decode the token to get additional user info
        const decoded = jwt_decode(token);
        navigate("/profile");
        // alert("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Username"
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Password"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
          <button
            type="button"
            style={{ ...styles.button, backgroundColor: "#28a745" }}
            onClick={() => navigate("/register")}
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  inputHoverFocus: {
    borderColor: "#007bff",
  },
  button: {
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.2s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
    transform: "translateY(-2px)",
  },
};

export default LoginPage;
