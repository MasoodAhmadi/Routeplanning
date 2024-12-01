import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const responseText = await response.text();
        console.error("Error Response Text:", responseText);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Registration failed! Please check the console for details.");
    }
  };

  return (
    <Container style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.submitButton}>
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={styles.backButton}
          >
            Back to Login
          </button>
        </form>
      </div>
    </Container>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%", // Full width of the page
    backgroundColor: "",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px", // Card will not stretch unnecessarily
    width: "100%", // Ensures it adjusts within the container
    margin: "0 20px", // Small margin for smaller screens
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    outline: "none",
    transition: "border 0.3s",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    textAlign: "center",
  },
  backButton: {
    padding: "12px",
    backgroundColor: "#6b7280",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    textAlign: "center",
  },
  "@media (max-width: 768px)": {
    card: {
      padding: "20px",
    },
    title: {
      fontSize: "22px",
    },
    input: {
      fontSize: "14px",
      padding: "10px",
    },
    submitButton: {
      fontSize: "14px",
      padding: "10px",
    },
    backButton: {
      fontSize: "14px",
      padding: "10px",
    },
  },
};

export default RegisterPage;
