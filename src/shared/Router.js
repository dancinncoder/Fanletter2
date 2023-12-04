// import React, { useEffect, useState } from 'react'
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "../pages/Home";
import LetterDetails from "../pages/LetterDetails";
import Profile from "pages/Profile";
import Auth from "pages/Auth";
import { useDispatch, useSelector } from "react-redux";

function Router() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
    </BrowserRouter>
  );
}

export default Router;
