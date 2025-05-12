// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CompanyList from './components/CompanyList';
import AvailableInternshipsList from './components/AvailableInternshipsList';
import DocumentList from './components/DocumentList';
import CycleSettings from './components/CycleSettings';
import Login from './components/Login';
import './App.css';

const initialCompanies = [
  { id: 1, name: 'TechCorp',       industry: 'Technology',   status: 'Pending' },
  { id: 2, name: 'HealthPlus',     industry: 'Healthcare',   status: 'Pending' },
  { id: 3, name: 'Smart Robotics', industry: 'Manufacturing',status: 'Pending' },
  { id: 4, name: 'EduTech Hub',    industry: 'Education',    status: 'Pending' },
  // …etc…
];

const USERS = [
  { email: 'student@guc.com',    password: 'pass', role: 'Student'        },
  { email: 'prostudent@guc.com', password: 'pass', role: 'PRO Student'    },
  { email: 'scad@guc.com',       password: 'pass', role: 'SCAD Office'    },
  { email: 'faculty@guc.com',    password: 'pass', role: 'Faculty Member' },
];

export default function App() {
  // State
  const [companies,   setCompanies]   = useState(initialCompanies);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab,   setActiveTab]   = useState('Dashboard');

  // Fake login handler
  const handleLogin = (email, password) => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) return false;
    setCurrentUser(user);

    // set default landing tab by role
    switch (user.role) {
      case 'SCAD Office':
        setActiveTab('Companies Applying');
        break;
      case 'Faculty Member':
        setActiveTab('Internship Reports');
        break;
      case 'PRO Student':
        setActiveTab('Available Internships');
        break;
      default:
        setActiveTab('Dashboard');
    }
    return true;
  };

  // Accept / Reject handlers
  const handleAcceptCompany = id =>
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'Accepted' } : c));

  const handleRejectCompany = id =>
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'Rejected' } : c));

  // If not logged in, only render the login form
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Main app UI
  return (
    <div className="app-container">
      <Sidebar
        active={activeTab}
        onTabChange={setActiveTab}
        role={currentUser.role}
      />

      <main className="main-content">
        <h1>Welcome, {currentUser.role}</h1>

        {/* Companies Applying */}
        {activeTab === 'Companies Applying' && (
          <CompanyList
            companies={companies}
            onAccept={handleAcceptCompany}
            onReject={handleRejectCompany}
          />
        )}

        {/* Available Internships */}
        {activeTab === 'Available Internships' && (
          <AvailableInternshipsList />
        )}

        {/* Documents (all roles) */}
        {activeTab === 'Documents' && <DocumentList />}

        {/* Cycle Settings (SCAD Office only) */}
        {currentUser.role === 'SCAD Office' &&
          activeTab === 'Cycle Settings' && <CycleSettings />}
      </main>
    </div>
  );
}
