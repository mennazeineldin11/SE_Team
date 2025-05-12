// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

export default function Sidebar({ active, onTabChange, role }) {
  const tabs = [
    'Dashboard',
    'Companies Applying',
    'Available Internships',
    'Internship Reports',
    'Career Development',
    'Documents',
    // Only SCAD Office sees this
    ...(role === 'SCAD Office' ? ['Cycle Settings'] : [])
  ];

  return (
    <nav className="sidebar">
      <h1 className="sidebar-title">SCAD System</h1>
      <ul>
        {tabs.map(tab => (
          <li
            key={tab}
            className={tab === active ? 'active' : ''}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
}
