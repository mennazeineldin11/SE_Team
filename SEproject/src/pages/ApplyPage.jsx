import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ApplyPage.css';

export default function ApplyPage() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully!');
  };

  return (
    <div className="apply-page">
      <h2>Apply for Internship #{id}</h2>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Cover Letter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
        <input type="file" onChange={(e) => setCv(e.target.files[0])} accept=".pdf" />
        <input type="file" onChange={(e) => setCertificate(e.target.files[0])} accept=".pdf" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
