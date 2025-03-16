import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import Feedback from './components/Feedback';
import ScoreBoard from './components/ScoreBoard';
import { useLocation } from 'react-router-dom';
import ChallengeInvite from './components/ChallengeInvite';


function App() {

  const [gameData, setGameData] = useState(null); // holds clues and options
  const [challengeGameData, setChallengeGameData] = useState(null); 
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [feedback, setFeedback] = useState(null); // holds feedback after an answer
  const [user, setUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const location = useLocation(); // ✅ use hook at component level
  const params = new URLSearchParams(location.search);
  const challengeId = params.get('inviteId');
  const [inviteData, setInviteData] = useState(null);
  const [challengeInfo, setChallengeInfo] = useState(null);
  

  const handleRegister = async () => {
    if (!usernameInput.trim()) return;
  
    // Here we call backend to register the user
    try {
      const response = await fetch('http://localhost:8082/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: usernameInput }),
      });
  
      if (!response.ok) throw new Error('Failed to register');
  
      const data = await response.json(); // My backend server will return { id, username, score }
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data)); // Storing user for auto-login
  
      // Now start the game
      fetchNewGame();
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  // Fetch new game data from backend
  const fetchNewGame = async () => {
    try {

      setFeedback(null); // reset feedback on new game
      let url = 'http://localhost:8082/api/game/new';
      if (challengeId) {
        url = `http://localhost:8082/api/challenge/${challengeId}`; // backend should serve game+inviter
      }
      const response = await fetch(url);
      const data = await response.json();
      console.log('url now', url);
      console.log('data now', data);
      if(challengeId) {
        setChallengeGameData(data.newGame);
        setChallengeInfo({
          inviterName: data.inviterName,
          inviterScore: data.inviterScore,
          inviterId: data.inviterId
        });
      } else {
        setGameData(data);
      }
    } catch (error) {
      console.error("Failed to fetch game data", error); // 👈 LOGGING
    }
  }; 

  // Handle user's answer submission
  const handleAnswer = async (selectedAnswer) => {
    try {
      const response = await fetch('http://localhost:8082/api/game/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: activeGameData.gameId, // Assuming you have gameId in your gameData
          userAnswer: selectedAnswer, // This is user's selected answer
          userId: user.userId, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to validate answer');
      }
  
      const result = await response.json();

      console.log(result)
  
      // Set feedback (right/wrong)
      setFeedback(result);
  
      // Update score
      if (result.correct) {
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };


  const handleChallenge = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please register first!');
        return;
      }
  
      const response = await fetch('http://localhost:8082/api/challenge/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId }),
      });
  
      if (!response.ok) throw new Error('Failed to create challenge');
  
      const data = await response.json();

      console.log('challenge data', data)
      
      // ✅ Show popup with link (you can replace with modal too)
      setInviteData({ inviteId: data.inviteId, inviterUsername: user.username });
  
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };


  const closeInvitePopup = () => setInviteData(null);

  
  

  // Fetch game on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Auto-login
      console.log("inside this user", storedUser)
      fetchNewGame(challengeId);
       // Start game if user already registered
    }
    else{
      console.log("nofff ")
      
    }
    
  }, [challengeId]);

  useEffect(() => {
    if (user && challengeInfo) {
      if (challengeInfo.inviterId === user.userId) {
        alert("You can't accept your own challenge! Please log out and open the link again, or use an incognito window.");
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, [inviteData, user, challengeInfo]);

  const activeGameData = challengeGameData || gameData;
  
  console.log('active data', activeGameData);
  

  return (
    <div className="app">
      <h1 className="text-3xl font-bold mb-6">🌍 Welcome to Globetrotter! Can you guess the City? 🌍</h1>
  
      {!user ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="usernameInput"
          />
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register/Login to Play
          </button>
        </div>
      ) : (
        <>

           

          <button
            onClick={handleChallenge}
            className="challenge-friend"
          >
            Challenge your friend!
          </button>

          

          {challengeInfo && (
            <div className="p-4 mb-4 bg-yellow-100 rounded-lg">
              <p className="text-lg">
                <strong>{challengeInfo.inviterName}</strong> has challenged you! Their score is <strong>{challengeInfo.inviterScore}</strong>.
              </p>
            </div>
          )}

          {inviteData && (
            <ChallengeInvite
              inviteId={inviteData.inviteId}
              inviterUsername={inviteData.inviterUsername}
              onClose={closeInvitePopup}
            />
          )}

        <ScoreBoard score={score} user = {user}/>
  
          {activeGameData && !feedback && (
            <Game
              clues={activeGameData.clues}
              options={activeGameData.options}
              onSubmitAnswer={handleAnswer}
            />
          )}
  
          {feedback && (
            <Feedback
            options={activeGameData.options}
            correct={feedback.correct}
            funFact={feedback.funFact}
            correctAnswer={feedback.correctAnswer}
            onNext={() => fetchNewGame(challengeId)} 
            gameId={activeGameData.gameId}
            onChallenge={handleChallenge}
            />
          )}
        </>
      )}
    </div>
  );


  
}

export default App;