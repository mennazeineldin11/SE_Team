// src/components/InternshipList.jsx

import React, { useState } from 'react';
import internships from '../data/internships.json';

export default function InternshipList() {
  // —1— State for search term and status filter
  const [searchTerm, setSearchTerm]       = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Map the user‐facing filter names to our data.status values
  const statusMap = {
    'Current Intern': 'Present',
    'Internship Complete': 'Past'
  };

  // —2— Compute filtered list before rendering
  const filtered = internships.filter(item => {
    // Search matches company OR position
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter: All, Current Intern, or Internship Complete
    const matchesStatus =
      statusFilter === 'All' ||
      item.status === statusMap[statusFilter];

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>

      {/* —3— Search box & status dropdown */}
      <div style={{ marginBottom: 12 }}>
        <label>
          Search:{' '}
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Company or role"
            style={{ marginRight: 12, padding: 4 }}
          />
        </label>
        <label>
          Status:{' '}
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

      {/* —4— Internships table */}
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
              <td style={{ border: '1px solid #eee', padding: 8 }}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
