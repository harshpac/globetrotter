// src/components/ScoreBoard.jsx
import React from 'react';

function ScoreBoard({score, user }) {
  return (
    <div className="mb-4 p-4 bg-white shadow rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Hi {user.username}! Your Score</h2>
      <p>✅ Correct: {score.correct}</p>
      <p>❌ Incorrect: {score.incorrect}</p>
    </div>
  );
}

export default ScoreBoard;
