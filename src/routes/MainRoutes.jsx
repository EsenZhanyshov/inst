import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import RegPage from "../components/RegPage";
import LogPage from "../components/LogPage";
import Profile from "../components/Profile";
import AddPosts from "../components/AddPosts";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<HomePage />} />
      <Route path="/reg" element={<RegPage />} />
      <Route path="/" element={<LogPage />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/addposts/:id" element={<AddPosts />} />
    </Routes>
  );
};

export default MainRoutes;
