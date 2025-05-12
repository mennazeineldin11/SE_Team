import React from 'react';
import './Sidebar.css';


const tabs = [
  'Dashboard',
  'Companies Applying',
  'Accepted Companies',
  'Available Internships',   // ← new
  'Internship Reports',
  'Career Development',
];


export default function Sidebar({ active, onTabChange }) {
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
            {tab}s
          </li>
        ))}
      </ul>
    </nav>
  );
}
