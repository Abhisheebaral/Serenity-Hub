// // App.jsx
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import { Suspense } from "react";

// // Public pages
// import Home from "./pages/public/Home";
// import Login from "./pages/public/Login";
// import Register from "./pages/public/Register";
// import About from "./pages/public/About";
// import Contact from "./pages/public/Contact";
// import Professionals from "./pages/public/Professionals";

// // Private page
// import Dashboard from "./pages/private/Dashboard";

// function App() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/professionals" element={<Professionals />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* After login */}
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;
// App.jsx
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
import Profile from "./pages/private/Profile"; // ✅ Profile added

// 🔐 Route Guard
import AppRoute from "./AppRoute";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected */}
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

        {/* 🔐 CalmMind Page */}
        <Route
          path="/calm-mind"
          element={
            <AppRoute>
              <CalmMind />
            </AppRoute>
          }
        />

        {/* 🔐 Profile Page */}
        <Route
          path="/profile"
          element={
            <AppRoute>
              <Profile />
            </AppRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
