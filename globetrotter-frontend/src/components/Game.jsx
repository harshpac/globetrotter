// src/components/Game.jsx
import React from 'react';

function Game({ clues, options, onSubmitAnswer }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Some hints for you!</h2>
      <div className="mb-4">
        {clues.map((clue, idx) => (
          <p key={idx} className="italic">🔑 {clue}</p>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-4 ml-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSubmitAnswer(option)}
            className="option-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
