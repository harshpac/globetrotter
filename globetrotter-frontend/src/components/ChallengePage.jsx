import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ChallengePage() {
  const location = useLocation();
  const [inviteData, setInviteData] = useState(null);

  const params = new URLSearchParams(location.search);
  const inviteId = params.get('inviteId');

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/challenge/${inviteId}`);
        if (!response.ok) throw new Error('Failed to fetch invite');

        const data = await response.json();
        setInviteData(data); // { inviterUsername, inviterScore }
      } catch (error) {
        console.error('Error fetching invite:', error);
      }
    };

    if (inviteId) fetchInvite();
  }, [inviteId]);

  if (!inviteData) return <p>Loading challenge details...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">🏆 You've been challenged by {inviteData.inviterUsername}!</h2>
      <p className="mb-4">Current Score: {inviteData.inviterScore.correct} correct, {inviteData.inviterScore.incorrect} incorrect</p>
      
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Accept Challenge & Play Now!
      </a>
    </div>
  );
}
