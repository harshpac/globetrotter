// src/components/ChallengeInvite.jsx

import React from 'react';

const ChallengeInvite = ({ inviteId, inviterUsername, onClose }) => {
  const inviteLink = `${window.location.origin}/challenge?inviteId=${inviteId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy!', err));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Challenge Link by {inviterUsername}</h2>
        <input
          type="text"
          value={inviteLink}
          readOnly
          className="border p-2 rounded w-full mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy Link
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeInvite;
