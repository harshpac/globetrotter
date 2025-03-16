// src/components/Feedback.jsx
import React from 'react';

function Feedback({ correct, funFact, onNext, correctAnswer, options, onChallenge }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-md text-center space-y-4">
      {correct ? (
        <h2 className="text-2xl font-bold text-green-600">🎉 Correct! It's {correctAnswer}</h2>
      ) : (
        <h2 className="text-2xl font-bold text-red-600">❌ Oops! Wrong Answer. It's {correctAnswer}</h2>
      )}

      <p className="italic text-gray-700">💡 Fun Fact: {funFact}</p>

      {/* Option buttons with color indication */}
      <div className="space-y-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            disabled
            className={`option-button ${option === correctAnswer ? 'correct' : 'incorrect'}`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
  onClick={onNext}
  className="next-button"
>
  Guess Next?
</button>

{/* 

<button
  onClick={onChallenge}
  className="challenge-friend"
>
  Challenge your friend!
</button> */}


    </div>
  );
}


export default Feedback;
