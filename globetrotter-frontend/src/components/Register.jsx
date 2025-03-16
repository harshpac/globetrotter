import { useState } from 'react';

export default function Register({ setUser }) {
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    const res = await fetch('http://localhost:8082/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setUser(data);
  };

  return (
    <div className="space-y-4">
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="p-2 border rounded" />
      <button onClick={handleRegister} className="px-4 py-2 bg-blue-500 text-white rounded">Register</button>
    </div>
  );
}
