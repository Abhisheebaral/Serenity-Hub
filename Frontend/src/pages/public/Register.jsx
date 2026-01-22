import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import "../../style/Register.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schema/register.schema.js";
import { apiCall } from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const onRegisterClick = async (data) => {
    try {
      console.log("Submitting register data:", data); // optional debug

      const res = await apiCall("POST", "/users", data);
      console.log("Backend response:", res); // optional debug

      if (res.success) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(res.message || "Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error?.message || "Server error. Please try again later.");
    }
  };

  return (
    <div className="registerPage">
      <Navbar />
      <div className="registerWrapper">
        <div className="registerContainer">
          <h2 className="registerTitle">Create Account</h2>
          <p className="registerSubtitle">Join Serenity Hub today</p>

          <form className="registerForm" onSubmit={handleSubmit(onRegisterClick)}>
            <input type="text" placeholder="Name" {...register("name")} />
            {errors.name && <p className="errorMsg">{errors.name.message}</p>}

            <input type="text" placeholder="Username" {...register("username")} />
            {errors.username && <p className="errorMsg">{errors.username.message}</p>}

            <input type="email" placeholder="Email Address" {...register("email")} />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}

            <input type="text" placeholder="Phone Number" {...register("phone")} />
            {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}

            <input type="password" placeholder="Password" {...register("password")} />
            {errors.password && <p className="errorMsg">{errors.password.message}</p>}

            <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="errorMsg">{errors.confirmPassword.message}</p>}

            <div className="termsWrapper">
              <label>
                <input type="checkbox" {...register("terms")} /> I agree to the terms and conditions
              </label>
              {errors.terms && <p className="errorMsg">{errors.terms.message}</p>}
            </div>

            <button type="submit" className="registerBtn">Register</button>
          </form>

          <p className="loginLink">
            Already have an account? <span onClick={() => navigate("/login")}>Log In</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
