import React from 'react';
import internships from '../data/internships.json';

export default function InternshipList() {
  return (
    <div style={{ padding: 20 }}>
      <h1>My Internships</h1>
      <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: 12
        }}>
        <thead>
          <tr>
            {['#','Company','Role','Start Date','End Date','Status']
              .map(col => (
                <th key={col}
                    style={{ border: '1px solid #ccc', padding: 8, textAlign: 'left' }}>
                  {col}
                </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {internships.map(item => (
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
