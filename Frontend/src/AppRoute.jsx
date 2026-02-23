// src/AppRoute.jsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AppRoute = ({ children, role }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  // Listen for localStorage changes (like manual deletion)
  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
      setUserRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

 if (role && userRole && role !== userRole) {
  return <Navigate to="/dashboard" replace />;
}


  return children;
};

export default AppRoute;
