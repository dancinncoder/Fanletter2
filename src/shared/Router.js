// import React, { useEffect, useState } from 'react'
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LetterDetails from "../pages/LetterDetails";
import Profile from "pages/Profile";
import Auth from "pages/Auth";
import { useDispatch, useSelector } from "react-redux";

function Router() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log("로그인상태(auth) in Router", auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<Auth />} />
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="letter-details/:id" element={<LetterDetails />} />
            <Route path="profile" element={<Profile />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth" replace />} />
        )}
      </Routes>
      {/* <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="letter-details/:id" element={<LetterDetails />} />
        <Route path="profile" element={<Profile />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default Router;
