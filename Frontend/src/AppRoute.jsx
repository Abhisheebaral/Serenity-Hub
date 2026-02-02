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

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch (only when role is provided)
  if (role && role !== userRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Allowed
  return children;
};

export default AppRoute;
