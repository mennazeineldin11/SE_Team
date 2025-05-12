import React, { useState } from 'react';
import './AvailableInternshipsList.css';
import { initialInternships } from '../data';

export default function AvailableInternshipsList() {
  const [query,          setQuery]          = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter,     setPaidFilter]     = useState('');
  const [selected,       setSelected]       = useState(null);

  // Build unique filter options from the data
  const industries = Array.from(
    new Set(initialInternships.map(i => i.industry))
  );
  const durations = Array.from(
    new Set(initialInternships.map(i => i.duration))
  );

  // Filtering logic
  const filtered = initialInternships.filter(i => {
    if (
      !i.company.toLowerCase().includes(query.trim().toLowerCase()) &&
      !i.title.toLowerCase().includes(query.trim().toLowerCase())
    ) {
      return false;
    }
    if (industryFilter && i.industry !== industryFilter) return false;
    if (durationFilter && i.duration !== durationFilter) return false;
    if (paidFilter === 'Paid' && !i.paid)     return false;
    if (paidFilter === 'Unpaid' && i.paid)    return false;
    return true;
  });

  return (
    <div className="internships-list">
      <h2>Available Internships</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by company or title…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <select
          value={industryFilter}
          onChange={e => setIndustryFilter(e.target.value)}
        >
          <option value="">All Industries</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>

        <select
          value={durationFilter}
          onChange={e => setDurationFilter(e.target.value)}
        >
          <option value="">All Durations</option>
          {durations.map(dur => (
            <option key={dur} value={dur}>{dur}</option>
          ))}
        </select>

        <select
          value={paidFilter}
          onChange={e => setPaidFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Industry</th>
            <th>Duration</th>
            <th>Paid</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map(i => (
              <tr
                key={i.id}
                className={selected?.id === i.id ? 'selected' : ''}
                onClick={() => setSelected(i)}
              >
                <td>{i.company}</td>
                <td>{i.title}</td>
                <td>{i.industry}</td>
                <td>{i.duration}</td>
                <td>{i.paid ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results">
                No internships match “{query}”
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Details view */}
      {selected && (
        <div className="internship-detail">
          <h3>{selected.title} @ {selected.company}</h3>
          <p><strong>Industry:</strong> {selected.industry}</p>
          <p><strong>Duration:</strong> {selected.duration}</p>
          <p><strong>Paid:</strong> {selected.paid ? 'Yes' : 'No'}</p>
          {selected.paid && (
            <p><strong>Expected Salary:</strong> {selected.salary}</p>
          )}
          <p><strong>Required Skills:</strong> {selected.skills.join(', ')}</p>
          <p><strong>Description:</strong> {selected.description}</p>
          <button onClick={() => setSelected(null)}>
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}
