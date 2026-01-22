
import { Navigate } from "react-router-dom";

/* 🔐 Inline Private Route */
const AppRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token → redirect to HOME
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Token exists → allow route
  return children;
};

export default AppRoute;
