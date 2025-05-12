// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import CompanyList from './components/CompanyList.jsx';
import AcceptedCompaniesList from './components/AcceptedCompaniesList.jsx';
import AvailableInternshipsList from './components/AvailableInternshipsList.jsx';
import Login from './components/Login.jsx';
import './App.css';

// ← import your dummy data here
import { initialCompanies, USERS } from './data.js';

export default function App() {
  const [companies,   setCompanies]   = useState(initialCompanies);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab,   setActiveTab]   = useState('Dashboard');

  const handleLogin = (email, password) => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) return false;
    setCurrentUser(user);

    switch (user.role) {
      case 'SCAD Office':    setActiveTab('Companies Applying');    break;
      case 'Faculty Member': setActiveTab('Internship Reports');   break;
      case 'PRO Student':    setActiveTab('Available Internships'); break;
      default:               setActiveTab('Dashboard');
    }
    return true;
  };

  const handleAccept = id => {
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'Accepted' } : c));
  };
  const handleReject = id => {
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'Rejected' } : c));
  };

  if (!currentUser) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-container">
      <Sidebar active={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        <h1>Welcome, {currentUser.role}</h1>

        {activeTab === 'Companies Applying' && (
          <CompanyList
            companies={companies}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}

        {activeTab === 'Accepted Companies' && (
          <AcceptedCompaniesList companies={companies} />
        )}

        {activeTab === 'Available Internships' && (
          <AvailableInternshipsList />
        )}
      </main>
    </div>
  );
}
