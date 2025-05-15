import React, { useState } from 'react';
import Navigation from './Navigation';
import './SortableApplications.css';

const dummyData = [
  { id: 1, student: 'Mina Adel', company: 'Microsoft', status: 'Pending' },
  { id: 2, student: 'Laila Hassan', company: 'Vodafone', status: 'Approved' },
  { id: 3, student: 'Omar Salah', company: 'Orange', status: 'Rejected' },
  { id: 4, student: 'Yasmin Tarek', company: 'IBM', status: 'Pending' },
];

const SortableApplications = () => {
  const [sortKey, setSortKey] = useState('student');
  const sortedData = [...dummyData].sort((a, b) =>
    a[sortKey].localeCompare(b[sortKey])
  );

  return (
    <>
      <Navigation />
      <div className="sort-container">
        <h2>Applications List</h2>

        <div className="sort-controls">
          <label>Sort By:</label>
          <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
            <option value="student">Student Name</option>
            <option value="company">Company</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div className="application-list">
          {sortedData.map((app) => (
            <div key={app.id} className={`app-card ${app.status.toLowerCase()}`}>
              <div className="card-header">
                <span className="student">{app.student}</span>
                <span className="status">{app.status}</span>
              </div>
              <p><strong>Company:</strong> {app.company}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SortableApplications; 