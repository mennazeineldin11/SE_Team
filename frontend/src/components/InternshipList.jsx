// src/components/InternshipList.jsx

import React, { useState } from 'react';
import internships from '../data/internships.json';

export default function InternshipList() {
  // 1️⃣ State for search term and status filter
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // 2️⃣ Compute filtered list before rendering
  const filtered = internships.filter(item => {
    // Search: match company or role (case-insensitive)
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());

    // Status: All / Current Intern (Present) / Internship Complete (Past)
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Current Intern' && item.status === 'Present') ||
      (statusFilter === 'Internship Complete' && item.status === 'Past');

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>

      {/* 3️⃣ Search input & status dropdown */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 16 }}>
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
      </div>

      {/* 4️⃣ Internships table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: 12
        }}
      >
        <thead>
          <tr>
            {['#','Company','Role','Start Date','End Date','Status'].map(col => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
