import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import MajorsPage from "./pages/MajorsPage";
import InternshipsPage from "./pages/InternshipsPage";
import InternshipDetails from "./pages/InternshipDetails";
import ApplyPage from "./pages/ApplyPage";
import ApplicationsPage from "./pages/ApplicationsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/majors" element={<MajorsPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/internship/:id" element={<InternshipDetails />} />
        <Route path="/apply/:id" element={<ApplyPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Routes>
    </Router>
  );
}
