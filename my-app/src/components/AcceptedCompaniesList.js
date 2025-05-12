import React from 'react';
import './CompanyList.css';  // reuse the same styles

export default function AcceptedCompaniesList({ companies }) {
  const accepted = companies.filter(c => c.status === 'Accepted');

  return (
    <div className="company-list">
      <h2>Previously Accepted Companies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accepted.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.industry}</td>
              <td>{c.contact}</td>
              <td>{c.status}</td>
            </tr>
          ))}
          {accepted.length === 0 && (
            <tr>
              <td colSpan="4" className="no-results">
                No companies have been accepted yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
