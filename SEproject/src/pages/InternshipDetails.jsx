import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { internships } from '../dummyData';
import '../styles/InternshipDetails.css';

export default function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = internships.find((item) => item.id === parseInt(id));

  return (
    <div className="internship-details">
      <h2>{internship.title}</h2>
      <p><strong>Company:</strong> {internship.company}</p>
      <p><strong>Description:</strong> {internship.description}</p>
      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Paid:</strong> {internship.paid}</p>
      <p><strong>Salary:</strong> {internship.salary}</p>
      <p><strong>Skills Required:</strong> {internship.skills.join(', ')}</p>
      <button onClick={() => navigate(`/apply/${internship.id}`)}>Apply</button>
    </div>
  );
}
