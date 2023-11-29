// import React, { useEffect, useState } from 'react'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LetterDetails from "../pages/LetterDetails";
import Profile from "pages/Profile";
import Auth from "pages/Auth";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="letter-details/:id" element={<LetterDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
