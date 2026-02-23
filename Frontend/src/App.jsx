import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Public pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";

// Private pages
import Dashboard from "./pages/private/Dashboard";
import Professionals from "./pages/private/Professionals";
import Viewmore from "./pages/private/Viewmore";
import CalmMind from "./pages/private/CalmMind";
import Profile from "./pages/private/Profile";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Appointments from "./pages/admin/features/Appointments";
import AddProfessional from "./pages/admin/features/AddProfessional";
import ManageProfessionals from "./pages/admin/features/ManageProfessionals";

// 🔐 Route Guard
import AppRoute from "./AppRoute";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 🌐 Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 User Protected */}
        <Route
          path="/dashboard"
          element={
            <AppRoute>
              <Dashboard />
            </AppRoute>
          }
        />
        <Route
          path="/professionals"
          element={
            <AppRoute>
              <Professionals />
            </AppRoute>
          }
        />
        <Route
          path="/professionals/:id"
          element={
            <AppRoute>
              <Viewmore />
            </AppRoute>
          }
        />
        <Route
          path="/calm-mind"
          element={
            <AppRoute>
              <CalmMind />
            </AppRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AppRoute>
              <Profile />
            </AppRoute>
          }
        />

{/* 👑 Admin Protected */}
<Route
  path="/admin/dashboard"
  element={
    <AppRoute role="admin">
      <AdminDashboard />
    </AppRoute>
  }
/>

<Route
  path="/admin/appointments"
  element={
    <AppRoute role="admin">
      <Appointments />
    </AppRoute>
  }
/>

<Route
  path="/admin/add-professional"
  element={
    <AppRoute role="admin">
      <AddProfessional />
    </AppRoute>
  }
/>
        <Route
 path="/admin/professionals"
 element={
   <AppRoute role="admin">
     <ManageProfessionals />
   </AppRoute>
 }
/>
      </Routes>
    </Suspense>
  );
}

export default App;
