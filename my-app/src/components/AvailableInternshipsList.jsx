import React, { useState } from 'react';
import './AvailableInternshipsList.css';

const initialInternships = [
  { id: 1, company: 'Tech Innovators',   title: 'Frontend Developer', duration: '3 months' },
  { id: 2, company: 'Green Earth',        title: 'Environmental Analyst', duration: '6 months' },
  { id: 3, company: 'Smart Robotics',     title: 'Embedded Engineer',    duration: '4 months' },
  { id: 4, company: 'EduTech Hub',        title: 'Instructional Designer', duration: '2 months' },
  { id: 5, company: 'AI Nexus',          title: 'Machine Learning Intern', duration: '5 months' },
  { id: 6, company: 'CodeWorks',         title: 'Fullstack Developer',    duration: '3 months' },
  { id: 7, company: 'EcoGuard Systems',  title: 'Data Analyst',           duration: '4 months' },
  { id: 8, company: 'Blue Ocean Recycling', title: 'Sustainability Intern', duration: '6 months' },
];

export default function AvailableInternshipsList() {
  const [query, setQuery] = useState('');

  // filter by company OR title
  const filtered = initialInternships.filter(i =>
    i.company.toLowerCase().includes(query.toLowerCase().trim()) ||
    i.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <div className="internships-list">
      <h2>Available Internships</h2>
      <input
        className="search-box"
        type="text"
        placeholder="Search by company or job title…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map(i => (
              <tr key={i.id}>
                <td>{i.company}</td>
                <td>{i.title}</td>
                <td>{i.duration}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-results">
                No internships match “{query}”
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
