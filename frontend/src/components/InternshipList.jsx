// src/components/InternshipList.jsx

import React, { useState } from 'react';
import internships from '../data/internships.json';

export default function InternshipList() {
  // — Filters & selection (existing) —
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate]         = useState('');
  const [toDate, setToDate]             = useState('');
  const [selected, setSelected]         = useState(null);

  // — Evaluations state: map internshipId → { recommend, comment } —
  const [evaluations, setEvaluations] = useState({});
  const [isEditing, setIsEditing]     = useState(false);

  // form state for the evaluation inputs
  const [formValues, setFormValues] = useState({
    recommend: false,
    comment: ''
  });

  // — Filter logic (existing) —
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

  // — Handlers for evaluation CRUD —
  const handleSelect = intern => {
    setSelected(intern);
    setIsEditing(false);
    // pre-fill form if already evaluated
    const existing = evaluations[intern.id];
    setFormValues({
      recommend: existing?.recommend ?? false,
      comment:   existing?.comment   ?? ''
    });
  };

  const handleSubmitEval = e => {
    e.preventDefault();
    setEvaluations(prev => ({
      ...prev,
      [selected.id]: { ...formValues }
    }));
    setIsEditing(false);
  };

  const handleDeleteEval = () => {
    setEvaluations(prev => {
      const copy = { ...prev };
      delete copy[selected.id];
      return copy;
    });
    setFormValues({ recommend: false, comment: '' });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>

      {/* Filters */}
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

      {/* Internships Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            {['#','Company','Role','Start Date','End Date','Status','Select'].map(col => (
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
                    onClick={() => handleSelect(item)}
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

      {/* Selected Internship & Evaluation */}
      {selected && (
        <div style={{ marginTop: 24, padding: 16, border: '1px solid #ccc' }}>
          <h2>Selected Internship Details</h2>
          <p><strong>Company:</strong> {selected.company}</p>
          <p><strong>Role:</strong> {selected.position}</p>
          <p><strong>Start Date:</strong> {selected.startDate}</p>
          <p><strong>End Date:</strong> {selected.endDate || '—'}</p>
          <p>
            <strong>Status:</strong>{' '}
            {selected.status === 'Present' ? 'Current Intern' : 'Internship Complete'}
          </p>

          {/* Evaluation Section */}
          <h3>Evaluation</h3>

          {evaluations[selected.id] && !isEditing ? (
            // Read view
            <div>
              <p>
                <strong>Recommend to others:</strong>{' '}
                {evaluations[selected.id].recommend ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Comment:</strong> {evaluations[selected.id].comment}
              </p>
              <button onClick={() => setIsEditing(true)} style={{ marginRight: 8 }}>
                Edit
              </button>
              <button onClick={handleDeleteEval}>Delete</button>
            </div>
          ) : (
            // Create / Update form
            <form onSubmit={handleSubmitEval}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Recommend to others:{' '}
                <input
                  type="checkbox"
                  checked={formValues.recommend}
                  onChange={e =>
                    setFormValues(fv => ({ ...fv, recommend: e.target.checked }))
                  }
                />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Comment:
                <textarea
                  value={formValues.comment}
                  onChange={e =>
                    setFormValues(fv => ({ ...fv, comment: e.target.value }))
                  }
                  rows={3}
                  style={{ width: '100%', padding: 4 }}
                />
              </label>
              <button type="submit" style={{ marginRight: 8 }}>
                {evaluations[selected.id] ? 'Update' : 'Submit'}
              </button>
              {evaluations[selected.id] && (
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
