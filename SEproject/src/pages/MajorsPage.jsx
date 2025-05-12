import React, { useState } from 'react';
import '../styles/MajorsPage.css';

export default function MajorsPage() {
  const [major, setMajor] = useState('');
  const [semester, setSemester] = useState('');

  return (
    <div className="majors-page">
      <h2>Select Major and Semester</h2>
      <select onChange={(e) => setMajor(e.target.value)} value={major}>
        <option value="">Choose Major</option>
        <option value="MET">MET</option>
        <option value="IET">IET</option>
      </select>
      <select onChange={(e) => setSemester(e.target.value)} value={semester}>
        <option value="">Choose Semester</option>
        {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>Semester {num}</option>)}
      </select>
    </div>
  );
}
