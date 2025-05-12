import React, { useState } from 'react';
import './CompanyList.css';

const initialCompanies = [
  // Technology
  {
    id: 1,
    name: 'Tech Innovators',
    contact: 'tech@innovators.com',
    industry: 'Technology',
    description: 'A cutting-edge R&D firm focused on AI and IoT solutions.',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'AI Nexus',
    contact: 'contact@ainexus.com',
    industry: 'Technology',
    description: 'Provides machine learning platforms for enterprise.',
    status: 'Pending',
  },
  {
    id: 6,
    name: 'CodeWorks',
    contact: 'hello@codeworks.com',
    industry: 'Technology',
    description: 'Custom software development and consulting services.',
    status: 'Pending',
  },

  // Environmental
  {
    id: 2,
    name: 'Green Earth Solutions',
    contact: 'contact@greenearth.com',
    industry: 'Environmental',
    description: 'Sustainable waste-management and recycling services.',
    status: 'Pending',
  },
  {
    id: 7,
    name: 'EcoGuard Systems',
    contact: 'info@ecoguard.com',
    industry: 'Environmental',
    description: 'Air and water quality monitoring technology.',
    status: 'Pending',
  },
  {
    id: 8,
    name: 'Blue Ocean Recycling',
    contact: 'support@blueoceanrecycle.com',
    industry: 'Environmental',
    description: 'Ocean cleanup and plastics upcycling programs.',
    status: 'Pending',
  },

  // Manufacturing
  {
    id: 3,
    name: 'Smart Robotics Inc.',
    contact: 'info@smartrobotics.com',
    industry: 'Manufacturing',
    description: 'Designs and manufactures autonomous industrial robots.',
    status: 'Pending',
  },
  {
    id: 9,
    name: 'Precision Automation',
    contact: 'sales@precisionauto.com',
    industry: 'Manufacturing',
    description: 'High-precision CNC machining and automation.',
    status: 'Pending',
  },
  {
    id: 10,
    name: 'MetalForge Ltd.',
    contact: 'contact@metalforge.com',
    industry: 'Manufacturing',
    description: 'Custom metal fabrication and prototyping services.',
    status: 'Pending',
  },

  // Education
  {
    id: 4,
    name: 'EduTech Hub',
    contact: 'support@edutech.com',
    industry: 'Education',
    description: 'Creates e-learning platforms and virtual classrooms.',
    status: 'Pending',
  },
  {
    id: 11,
    name: 'Learnify',
    contact: 'info@learnify.com',
    industry: 'Education',
    description: 'Adaptive learning software for K–12 students.',
    status: 'Pending',
  },
  {
    id: 12,
    name: 'CodeCampus',
    contact: 'hello@codecampus.com',
    industry: 'Education',
    description: 'Bootcamp-style coding courses and certifications.',
    status: 'Pending',
  },
];

export default function CompanyList() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [selected, setSelected] = useState(null);

  // unique industries
  const industries = [...new Set(initialCompanies.map(c => c.industry))];

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase().trim()) &&
    (industry === '' || c.industry === industry)
  );

  const decide = (id, decision) => {
    setCompanies(list =>
      list.map(c => (c.id === id ? { ...c, status: decision } : c))
    );
    if (selected?.id === id) {
      setSelected({ ...selected, status: decision });
    }
  };

  return (
    <div className="company-list">
      <h2>Companies Applying to Join SCAD</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          value={industry}
          onChange={e => setIndustry(e.target.value)}
        >
          <option value="">All Industries</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr
              key={c.id}
              onClick={() => setSelected(c)}
              className={selected?.id === c.id ? 'selected' : ''}
            >
              <td>{c.name}</td>
              <td>{c.industry}</td>
              <td>{c.contact}</td>
              <td>{c.status}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" className="no-results">
                No matches for “<strong>{query}</strong>”
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selected && (
        <div className="company-details">
          <h3>{selected.name}</h3>
          <p><strong>Industry:</strong> {selected.industry}</p>
          <p><strong>Contact:</strong> {selected.contact}</p>
          <p><strong>Description:</strong> {selected.description}</p>
          <p><strong>Status:</strong> {selected.status}</p>
          <div className="actions">
            <button
              onClick={() => decide(selected.id, 'Accepted')}
              disabled={selected.status === 'Accepted'}
            >
              Accept
            </button>
            <button
              onClick={() => decide(selected.id, 'Rejected')}
              disabled={selected.status === 'Rejected'}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
