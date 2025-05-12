// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CompanyList from './components/CompanyList';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('Companies Applying');

  return (
    <div className="app-container">
      <Sidebar active={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {activeTab === 'Companies Applying' && <CompanyList />}
        {/* add more conditional renders for other tabs */}
      </main>
    </div>
  );
}

