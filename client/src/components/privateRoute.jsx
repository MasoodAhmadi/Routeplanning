import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // Optional: Render a loading spinner or skeleton UI while session is being restored
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
