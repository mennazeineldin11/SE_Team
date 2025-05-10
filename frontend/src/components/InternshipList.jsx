// src/components/InternshipList.jsx

import React, { useState } from 'react';
import internships from '../data/internships.json';

export default function InternshipList() {
  // 0️⃣ Add state for selection
  const [selected, setSelected] = useState(null);

  // 1️⃣ Existing state
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate]         = useState('');
  const [toDate, setToDate]             = useState('');

  // 2️⃣ Filter logic
  const filtered = internships.filter(item => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Current Intern' && item.status === 'Present') ||
      (statusFilter === 'Internship Complete' && item.status === 'Past');

    const start = new Date(item.startDate);
    const end   = item.endDate ? new Date(item.endDate) : new Date();

    const afterFrom = fromDate ? start >= new Date(fromDate) : true;
    const beforeTo  = toDate   ? end   <= new Date(toDate)   : true;

    return matchesSearch && matchesStatus && afterFrom && beforeTo;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>

      {/* Search, Status & Date Filters */}
      <div style={{ marginBottom: 12, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <label>
          Search:{' '}
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Company or role"
            style={{ padding: 4 }}
          />
        </label>

        <label>
          Show:{' '}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: 4 }}
          >
            <option>All</option>
            <option>Current Intern</option>
            <option>Internship Complete</option>
          </select>
        </label>

        <label>
          From:{' '}
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            style={{ padding: 4 }}
          />
        </label>

        <label>
          To:{' '}
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            style={{ padding: 4 }}
          />
        </label>
      </div>

      {/* Internships Table with Action Column */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            {['#','Company','Role','Start Date','End Date','Status','Action'].map(col => (
              <th
                key={col}
                style={{ border: '1px solid #ccc', padding: 8, textAlign: 'left' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.id}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.company}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.position}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.startDate}</td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>
                {item.endDate || '—'}
              </td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>
                {item.status === 'Present' ? 'Current Intern' : 'Internship Complete'}
              </td>
              <td style={{ border: '1px solid #eee', padding: 8 }}>
                {item.status === 'Past' ? (
                  <button
                    onClick={() => setSelected(item)}
                    style={{ padding: '4px 8px', cursor: 'pointer' }}
                  >
                    Select
                  </button>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selected Internship Details */}
      {selected && (
        <div style={{ marginTop: 24, padding: 16, border: '1px solid #ccc' }}>
          <h2>Selected Internship Details</h2>
          <p><strong>Company:</strong> {selected.company}</p>
          <p><strong>Role:</strong> {selected.position}</p>
          <p><strong>Start Date:</strong> {selected.startDate}</p>
          <p><strong>End Date:</strong> {selected.endDate || '—'}</p>
          <p><strong>Status:</strong> {selected.status === 'Present' ? 'Current Intern' : 'Internship Complete'}</p>
        </div>
      )}
    </div>
  );
}
