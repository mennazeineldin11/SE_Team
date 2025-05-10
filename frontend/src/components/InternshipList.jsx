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

  // — Evaluation state (story 43) —
  const [evaluations, setEvaluations] = useState({});
  const [evalEditing, setEvalEditing] = useState(false);
  const [evalForm, setEvalForm] = useState({ recommend: false, comment: '' });

  // — Report state (story 44) —
  const [reports, setReports]       = useState({});
  const [reportEditing, setReportEditing] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    introduction: '',
    body: ''
  });

  // — Filter logic —
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

  // — Handlers for selecting an internship —
  const handleSelect = intern => {
    setSelected(intern);

    // Prefill evaluation form if exists
    const ev = evaluations[intern.id] || {};
    setEvalForm({ recommend: ev.recommend || false, comment: ev.comment || '' });
    setEvalEditing(false);

    // Prefill report form if exists
    const rp = reports[intern.id] || {};
    setReportForm({
      title: rp.title || '',
      introduction: rp.introduction || '',
      body: rp.body || ''
    });
    setReportEditing(false);
  };

  // — CRUD for Evaluation —
  const submitEvaluation = e => {
    e.preventDefault();
    setEvaluations(prev => ({
      ...prev,
      [selected.id]: { ...evalForm }
    }));
    setEvalEditing(false);
  };
  const deleteEvaluation = () => {
    setEvaluations(prev => {
      const copy = { ...prev };
      delete copy[selected.id];
      return copy;
    });
    setEvalForm({ recommend: false, comment: '' });
    setEvalEditing(false);
  };

  // — CRUD for Report —
  const submitReport = e => {
    e.preventDefault();
    setReports(prev => ({
      ...prev,
      [selected.id]: { ...reportForm }
    }));
    setReportEditing(false);
  };
  const deleteReport = () => {
    setReports(prev => {
      const copy = { ...prev };
      delete copy[selected.id];
      return copy;
    });
    setReportForm({ title: '', introduction: '', body: '' });
    setReportEditing(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>

      {/* Filters */}
      <div style={{ marginBottom: 12, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* existing search/status/date controls */}
        {/* …omitted for brevity… */}
      </div>

      {/* Internships Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        {/* …table head & body as before… */}
        {/* include the Select button column */}
      </table>

      {/* Selected Internship Details */}
      {selected && (
        <div style={{ marginTop: 24, padding: 16, border: '1px solid #ccc' }}>
          <h2>Selected Internship Details</h2>
          <p><strong>Company:</strong> {selected.company}</p>
          <p><strong>Role:</strong> {selected.position}</p>
          <p><strong>Dates:</strong> {selected.startDate} – {selected.endDate || 'Present'}</p>

          {/* Evaluation Section (story 43) */}
          <h3>Evaluation</h3>
          {evaluations[selected.id] && !evalEditing ? (
            <div>
              <p><strong>Recommend:</strong> {evaluations[selected.id].recommend ? 'Yes' : 'No'}</p>
              <p><strong>Comment:</strong> {evaluations[selected.id].comment}</p>
              <button onClick={() => setEvalEditing(true)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={deleteEvaluation}>Delete</button>
            </div>
          ) : (
            <form onSubmit={submitEvaluation}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Recommend to others:{' '}
                <input
                  type="checkbox"
                  checked={evalForm.recommend}
                  onChange={e => setEvalForm(f => ({ ...f, recommend: e.target.checked }))}
                />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Comment:
                <textarea
                  value={evalForm.comment}
                  onChange={e => setEvalForm(f => ({ ...f, comment: e.target.value }))}
                  rows={3}
                  style={{ width: '100%', padding: 4 }}
                />
              </label>
              <button type="submit" style={{ marginRight: 8 }}>
                {evaluations[selected.id] ? 'Update' : 'Submit'}
              </button>
              {evaluations[selected.id] && (
                <button type="button" onClick={() => setEvalEditing(false)}>
                  Cancel
                </button>
              )}
            </form>
          )}

          {/* Report Section (story 44) */}
          <h3>Report</h3>
          {reports[selected.id] && !reportEditing ? (
            <div>
              <p><strong>Title:</strong> {reports[selected.id].title}</p>
              <p><strong>Introduction:</strong> {reports[selected.id].introduction}</p>
              <p><strong>Body:</strong> {reports[selected.id].body}</p>
              <button onClick={() => setReportEditing(true)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={deleteReport}>Delete</button>
            </div>
          ) : (
            <form onSubmit={submitReport}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Title:
                <input
                  type="text"
                  value={reportForm.title}
                  onChange={e => setReportForm(f => ({ ...f, title: e.target.value }))}
                  style={{ width: '100%', padding: 4 }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Introduction:
                <textarea
                  value={reportForm.introduction}
                  onChange={e => setReportForm(f => ({ ...f, introduction: e.target.value }))}
                  rows={2}
                  style={{ width: '100%', padding: 4 }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Body:
                <textarea
                  value={reportForm.body}
                  onChange={e => setReportForm(f => ({ ...f, body: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: 4 }}
                  required
                />
              </label>
              <button type="submit" style={{ marginRight: 8 }}>
                {reports[selected.id] ? 'Update Report' : 'Submit Report'}
              </button>
              {reports[selected.id] && (
                <button type="button" onClick={() => setReportEditing(false)}>
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
