# 🌍 Globetrotter Game
Globetrotter is a fun, city-guessing trivia game built with a Java Dropwizard backend and React + Vite frontend. You can play solo or challenge your friends to guess cities based on clue

# Tech Stack:
Backend: Java 17, Dropwizard, Maven, REST API
Frontend: React, Vite, TailwindCSS (for styling)

# 🚀 Features
City guessing game with fun facts and clues
Scoreboard to track player scores
Challenge a friend via sharable links (challenge invites)
Dynamic game data from backend


# Setup Steps:
1. Clone the Repository

git clone https://github.com/harshpac/globetrotter
cd globetrotter


# Backend Setup (Java + Dropwizard)
Java 17+
Maven 3.x

cd backend
mvn clean install
java -jar target/your-backend-app.jar server config.yml
This starts the backend on port 8082 (adjust as per the config.yml).

# Frontend Setup (React + Vite)
Node.js (v16 or above recommended)
npm or yarn

# Challenge Flow
User A plays the game and clicks "Challenge a Friend" to generate a unique link.
User B opens the link, sees User A's name & score, and takes on the challenge.
Scoreboard updates as users play!
