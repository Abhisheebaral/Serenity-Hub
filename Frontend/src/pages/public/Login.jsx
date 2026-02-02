// File: pages/public/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema/login.schema";
import { apiCall } from "../../utils/api";
import "../../style/Login.css";

const Login = () => {
  const navigate = useNavigate();

  /* Redirect if already logged in */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data) => {
    try {
      const res = await apiCall("POST", "/auth/login", data);

      if (res?.success && res?.access_token) {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("role", res.user.role);

        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(res?.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="loginPage">
      <Navbar />
      <div className="loginWrapper">
        <div className="loginContainer">
          <h2 className="loginTitle">Welcome Back!</h2>
          <p className="loginSubtitle">Please login to continue</p>

          <form className="loginForm" onSubmit={handleSubmit(handleLogin)}>
            <input type="email" placeholder="Email Address" {...register("email")} />
            {errors.email && <p className="errorText">{errors.email.message}</p>}

            <input type="password" placeholder="Password" {...register("password")} />
            {errors.password && <p className="errorText">{errors.password.message}</p>}

            <button type="submit" className="loginBtn">Log In</button>
          </form>

          <p className="signupLink">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign Up</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
