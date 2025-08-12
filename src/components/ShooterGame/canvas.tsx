import React, { useState, useEffect, useRef } from "react";
import { FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import Leaderboard from "./leaderboards.tsx";
import GameArea from "./gamearea.tsx";
import { useNavigate } from 'react-router-dom';

const Canvas: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const gameAreaRef = useRef<{ endGame: () => void }>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHighScore = localStorage.getItem("shooterHighScore");
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
  }, []);

  const handleHighScoreUpdate = (newHighScore: number) => {
    setHighScore(newHighScore);
  };

  const handleScoreUpdate = (score: number) => {
    setCurrentScore(score);
  };

  const endGameIfRunning = () => {
    if (gameAreaRef.current) {
      gameAreaRef.current.endGame();
    }
  };
  
  const handleLeaderboardOpen = () => {
    endGameIfRunning();
    setShowLeaderboard(true);
  };
  
  const handleClose = () => {
    endGameIfRunning();
    navigate('/');
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white z-30 relative">
        <div className="text-lg font-bold">
          Highscore: {highScore} | Current: {currentScore}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLeaderboardOpen}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          >
            Leaderboards
          </button>

          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="text-xl text-white/90 hover:text-white"
          >
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>

          <button onClick={handleClose} className="text-xl text-white/90 hover:text-white">
            <FiX />
          </button>
        </div>
      </div>

      <GameArea 
        ref={gameAreaRef}
        isMuted={isMuted}
        highScore={highScore}
        onHighScoreUpdate={handleHighScoreUpdate}
        onScoreUpdate={handleScoreUpdate}
      />

      {showLeaderboard && (
        <div className="absolute inset-0 z-40">
          <Leaderboard onClose={() => setShowLeaderboard(false)} />
        </div>
      )}
    </div>
  );
};

export default Canvas;