// src/components/InternshipList.jsx

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import internships from '../data/internships.json';

export default function InternshipList() {
  // Filters & selection
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate]         = useState('');
  const [toDate, setToDate]             = useState('');
  const [selected, setSelected]         = useState(null);

  // Evaluation state
  const [evaluations, setEvaluations] = useState({});
  const [evalEditing, setEvalEditing] = useState(false);
  const [evalForm, setEvalForm]       = useState({ recommend: false, comment: '' });

  // Report state
  const [reports, setReports]           = useState({});
  const [reportEditing, setReportEditing] = useState(false);
  const [reportForm, setReportForm]     = useState({ title: '', introduction: '', body: '' });

  // Apply filters
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

  // Select handler
  const handleSelect = intern => {
    setSelected(intern);
    // Prefill evaluation form
    const ev = evaluations[intern.id] || {};
    setEvalForm({ recommend: ev.recommend || false, comment: ev.comment || '' });
    setEvalEditing(false);
    // Prefill report form
    const rp = reports[intern.id] || {};
    setReportForm({
      title: rp.title || '',
      introduction: rp.introduction || '',
      body: rp.body || ''
    });
    setReportEditing(false);
  };

  // Evaluation CRUD
  const submitEvaluation = e => {
    e.preventDefault();
    setEvaluations(prev => ({ ...prev, [selected.id]: evalForm }));
    setEvalEditing(false);
  };
  const deleteEvaluation = () => {
    setEvaluations(prev => { const c = { ...prev }; delete c[selected.id]; return c; });
    setEvalForm({ recommend: false, comment: '' });
    setEvalEditing(false);
  };

  // Report CRUD
  const submitReport = e => {
    e.preventDefault();
    setReports(prev => ({ ...prev, [selected.id]: reportForm }));
    setReportEditing(false);
  };
  const deleteReport = () => {
    setReports(prev => { const c = { ...prev }; delete c[selected.id]; return c; });
    setReportForm({ title: '', introduction: '', body: '' });
    setReportEditing(false);
  };

  // Download report as a real PDF via jsPDF
  const downloadReport = () => {
    const data = reports[selected.id];
    if (!data) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(data.title, 10, 20);

    doc.setFontSize(12);
    doc.text('Introduction:', 10,  thirty);
    doc.text(doc.splitTextToSize(data.introduction, 180), 10, 40);

    doc.text('Body:', 10, 80);
    doc.text(doc.splitTextToSize(data.body, 180), 10, 90);

    doc.save(`${selected.company}-${selected.id}-report.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>

      {/* Filter controls */}
      <div style={{ marginBottom: 12, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* … existing filters … */}
      </div>

      {/* Internships Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        {/* … table head & body … */}
      </table>

      {/* Selected Internship Details */}
      {selected && (
        <div style={{ marginTop: 24, padding: 16, border: '1px solid #ccc' }}>
          {/* … details, evaluation & report forms … */}

          {/* Report display with download button */}
          {reports[selected.id] && !reportEditing && (
            <div>
              <p><strong>Title:</strong> {reports[selected.id].title}</p>
              <p><strong>Introduction:</strong> {reports[selected.id].introduction}</p>
              <p><strong>Body:</strong> {reports[selected.id].body}</p>
              <button onClick={() => setReportEditing(true)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={deleteReport} style={{ marginRight: 8 }}>Delete</button>
              <button onClick={downloadReport}>Download Report as PDF</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
