import React, { useState } from 'react';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    interests: '',
    jobs: '',
    activities: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <input name="interests" placeholder="Interests" value={profile.interests} onChange={handleChange} />
      <textarea name="jobs" placeholder="Previous Jobs" value={profile.jobs} onChange={handleChange}></textarea>
      <textarea name="activities" placeholder="College Activities" value={profile.activities} onChange={handleChange}></textarea>
    </div>
  );
}
