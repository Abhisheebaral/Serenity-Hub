import {Navigate, Route, Routes} from "react-router-dom";
import React, { Suspense } from "react";



const PublicRoutes = () => {
    const Login = React.lazy(() => import("../pages/public/Login"));
    const Register = React.lazy(() => import("../pages/public/Register"));
   
  return <>
  <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="*" element={<Navigate to ="/login" replace />} />
        </Routes>
      </Suspense>
  </>
};
export default PublicRoutes;
