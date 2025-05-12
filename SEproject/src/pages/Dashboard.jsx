import React from 'react';
import '../styles/Dashboard.css';
import { recommendedInternships } from '../dummyData';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Suggested Internships</h2>
      <div className="internship-list">
        {recommendedInternships.map((item, i) => (
          <div className="internship-card" key={i}>
            <h3>{item.title}</h3>
            <p>{item.company}</p>
            <p>{item.industry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
