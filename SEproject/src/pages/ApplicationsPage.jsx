import React from 'react';
import { applications } from '../dummyData';
import '../styles/ApplicationsPage.css';

export default function ApplicationsPage() {
  return (
    <div className="applications-page">
      <h2>My Applications</h2>
      <ul>
        {applications.map((app, i) => (
          <li key={i}>
            <strong>{app.title}</strong> at {app.company} - <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
