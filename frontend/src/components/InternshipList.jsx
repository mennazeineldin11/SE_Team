// src/components/InternshipList.jsx

import React, { useState } from 'react';
import internships from '../data/internships.json';

export default function InternshipList() {
  // 1️⃣ State for search, status, and date filters
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate]         = useState('');
  const [toDate, setToDate]             = useState('');

  // 2️⃣ Filter logic
  const filtered = internships.filter(item => {
    // — Search by company or position —
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());

    // — Status filter: All / Current Intern / Internship Complete —
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Current Intern' && item.status === 'Present') ||
      (statusFilter === 'Internship Complete' && item.status === 'Past');

    // — Date range filter —
    // Parse internship dates
    const start = new Date(item.startDate);
    const end   = item.endDate ? new Date(item.endDate) : new Date();

    // If fromDate is set, only include internships starting on/after that
    const afterFrom = fromDate ? start >= new Date(fromDate) : true;
    // If toDate is set, only include internships ending on/before that
    const beforeTo = toDate ? end <= new Date(toDate) : true;

    return matchesSearch && matchesStatus && afterFrom && beforeTo;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>

      {/* 3️⃣ Controls: Search, Status & Date */}
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
