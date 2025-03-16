import { useState } from 'react';

export default function ChallengeFriend({ userId }) {
  const [inviteLink, setInviteLink] = useState('');

  const generateInvite = async () => {
    const res = await fetch(`http://localhost:8082/api/challenge/invite/${userId}`);
    const data = await res.json();
    setInviteLink(data.link);
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=Join me in this game! Check my score and play: ${inviteLink}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <button onClick={generateInvite} className="px-4 py-2 bg-purple-500 text-white rounded">Challenge a Friend</button>
      {inviteLink && (
        <div>
          <p>Share this link: <a href={inviteLink} className="text-blue-600 underline">{inviteLink}</a></p>
          <button onClick={shareOnWhatsApp} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Share on WhatsApp</button>
        </div>
      )}
    </div>
  );
}
