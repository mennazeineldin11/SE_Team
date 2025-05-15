import React, { useState } from 'react';
import Navigation from './Navigation';
import './FilterableApplications.css';

const dummyApplications = [
  { id: 1, student: 'Sarah Mostafa', company: 'Vodafone', status: 'Approved' },
  { id: 2, student: 'Ali Khaled', company: 'Microsoft', status: 'Pending' },
  { id: 3, student: 'Lina Ayman', company: 'IBM', status: 'Rejected' },
  { id: 4, student: 'Youssef Hamdy', company: 'Google', status: 'Pending' },
];

const FilterableApplications = () => {
  const [filter, setFilter] = useState('All');

  const filteredApps = filter === 'All'
    ? dummyApplications
    : dummyApplications.filter(app => app.status === filter);

  return (
    <>
      <Navigation />
      <div className="filterable-container">
        <h2>Submitted Applications</h2>

        <div className="filter-buttons">
          {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
            <button
              key={status}
              className={filter === status ? 'active' : ''}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="applications-list">
          {filteredApps.map(app => (
            <div key={app.id} className={`app-card ${app.status.toLowerCase()}`}>
              <div className="app-header">
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

export default FilterableApplications; 