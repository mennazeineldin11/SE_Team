import React, { useState } from 'react';
import '../styles/InternshipsPage.css';
import { internships } from '../dummyData';
import { useNavigate } from 'react-router-dom';

export default function InternshipsPage() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [duration, setDuration] = useState('');
  const [isPaid, setIsPaid] = useState('');
  const navigate = useNavigate();

  const filtered = internships.filter((internship) =>
    internship.title.toLowerCase().includes(search.toLowerCase()) &&
    (industry ? internship.industry === industry : true) &&
    (duration ? internship.duration === duration : true) &&
    (isPaid ? internship.paid === isPaid : true)
  );

  return (
    <div className="internships-page">
      <h2>All Available Internships</h2>
      <input
        type="text"
        placeholder="Search by job title or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <select onChange={(e) => setIndustry(e.target.value)}>
          <option value="">Industry</option>
          <option value="Tech">Tech</option>
          <option value="Design">Design</option>
        </select>
        <select onChange={(e) => setDuration(e.target.value)}>
          <option value="">Duration</option>
          <option value="1 month">1 month</option>
          <option value="3 months">3 months</option>
        </select>
        <select onChange={(e) => setIsPaid(e.target.value)}>
          <option value="">Paid/Unpaid</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      <div className="internship-list">
        {filtered.map((item, i) => (
          <div className="internship-card" key={i} onClick={() => navigate(`/internship/${item.id}`)}>
            <h3>{item.title}</h3>
            <p>{item.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
