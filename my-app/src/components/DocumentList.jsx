import React from 'react';
import { documents } from '../data';

export default function DocumentList() {
  return (
    <div className="document-list">
      <h2>Available Documents</h2>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            {doc.name}{' '}
            <a href={doc.url} download={doc.name}>
              Download PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
