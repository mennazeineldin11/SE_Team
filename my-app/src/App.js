// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CompanyList from './components/CompanyList';
import AcceptedCompaniesList from './components/AcceptedCompaniesList';
import AvailableInternshipsList from './components/AvailableInternshipsList';
import Login from './components/Login';
import './App.css';

const initialCompanies = [
  { id: 1, name: 'TechCorp',       industry: 'Technology',  status: 'Pending' },
  { id: 2, name: 'HealthPlus',     industry: 'Healthcare',  status: 'Pending' },
  { id: 3, name: 'Smart Robotics', industry: 'Manufacturing', status: 'Pending' },
  { id: 4, name: 'EduTech Hub',    industry: 'Education',   status: 'Pending' },
  // Add more companies here...
];

const USERS = [
  { email: 'student@guc.com',    password: 'pass', role: 'Student'       },
  { email: 'prostudent@guc.com', password: 'pass', role: 'PRO Student'   },
  { email: 'scad@guc.com',       password: 'pass', role: 'SCAD Office'   },
  { email: 'faculty@guc.com',    password: 'pass', role: 'Faculty Member'},
];

export default function App() {
  const [companies,   setCompanies]   = useState(initialCompanies);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab,   setActiveTab]   = useState('Dashboard');

  // Fake login
  const handleLogin = (email, password) => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) return false;
    setCurrentUser(user);

    // Default landing tab based on role
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
  const handleAcceptCompany = id => {
    setCompanies(cs =>
      cs.map(c => (c.id === id ? { ...c, status: 'Accepted' } : c))
    );
  };

  const handleRejectCompany = id => {
    setCompanies(cs =>
      cs.map(c => (c.id === id ? { ...c, status: 'Rejected' } : c))
    );
  };

  // If not logged in, show login screen only
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Main app UI
  return (
    <div className="app-container">
      <Sidebar active={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        <h1>Welcome, {currentUser.role}</h1>

        {activeTab === 'Companies Applying' && (
          <CompanyList
            companies={companies}
            onAccept={handleAcceptCompany}
            onReject={handleRejectCompany}
          />
        )}

        {activeTab === 'Accepted Companies' && (
          <AcceptedCompaniesList companies={companies} />
        )}

        {activeTab === 'Available Internships' && (
          <AvailableInternshipsList />
        )}

        {/* You can add more tabs here, e.g. Internship Reports, Career Development, etc. */}
      </main>
    </div>
  );
}
