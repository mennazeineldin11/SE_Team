import React, { useState } from 'react';
import './CompanyList.css';

export default function CompanyList({ companies, onAccept, onReject }) {
  const [search, setSearch]       = useState('');
  const [industry, setIndustry]   = useState('');
  const pending = companies.filter(c => c.status==='Pending');

  const filtered = pending.filter(c =>
    c.name.toLowerCase().includes(search) &&
    (industry === '' || c.industry === industry)
  );

  return (
    <div className="company-list">
      <h2>Companies Applying</h2>
      <input placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} />
      <select value={industry} onChange={e=>setIndustry(e.target.value)}>
        <option value="">All Industries</option>
        {/* generate options from pending.map(c=>c.industry) */}
      </select>

      <table>
        <thead>…</thead>
        <tbody>
          {filtered.map(c=>(
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.industry}</td>
              <td>
                <button onClick={()=>onAccept(c.id)}>Accept</button>
                <button onClick={()=>onReject(c.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
