// src/components/CycleSettings.jsx
import React, { useState } from 'react';
import './CycleSettings.css';

export default function CycleSettings() {
  const [startDate, setStartDate] = useState('');
  const [endDate,   setEndDate]   = useState('');

  const handleSave = () => {
    alert(`Saved Cycle:\nStart: ${startDate}\nEnd:   ${endDate}`);
    // In a real app you'd POST this to your backend.
  };

  return (
    <div className="cycle-settings">
      <h2>Internship Cycle Dates</h2>
      <label>
        Start Date:{' '}
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:{' '}
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save Cycle</button>
    </div>
  );
}
