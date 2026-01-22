import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const PrivateRoute = () => {
    const Product=React.lazy(()=>import("../pages/private/product.jsx"));
    const Feedback=React.lazy(()=>import("../pages/private/Feedback.jsx"));
    return <>
    <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<Navigate to="/product" replace />} />
        </Routes>
        </Suspense>
    </>;
};

export default PrivateRoute;