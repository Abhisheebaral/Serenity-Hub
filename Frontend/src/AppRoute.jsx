
// import { Navigate } from "react-router-dom";

// /* 🔐 Inline Private Route */
// const AppRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   // If no token → redirect to HOME
//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   // Token exists → allow route
//   return children;
// };

// export default AppRoute;
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AppRoute = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!token) return <Navigate to="/" replace />;

  return children;
};

export default AppRoute;

