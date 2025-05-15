import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="nav-brand">GUC Internship</div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/submissions">My Submissions</Link></li>
        <li><Link to="/filter">Filter Applications</Link></li>
        <li><Link to="/sort">Sort Applications</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation; 