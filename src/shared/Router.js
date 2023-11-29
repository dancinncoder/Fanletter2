// import React, { useEffect, useState } from 'react'
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LetterDetails from "../pages/LetterDetails";
import Profile from "pages/Profile";
import Auth from "pages/Auth";

function Router() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path="auth/*"
    //       element={<Auth isLogin={isLogin} setIsLogin={setIsLogin} />}
    //     />
    //     {isLogin ? (
    //       <>
    //         <Route path="/" element={<Home />} />
    //         <Route path="letter-details/:id" element={<LetterDetails />} />
    //         <Route path="profile" element={<Profile />} />
    //       </>
    //     ) : (
    //       <Route path="*" element={<Navigate to="/auth" replace />} />
    //     )}
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route
          path="auth/*"
          element={<Auth isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="letter-details/:id" element={<LetterDetails />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
