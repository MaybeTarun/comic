"use client";

import React from "react";

interface GameScreenProps {
  isGameOver: boolean;
  score: number;
  wave: number;
  highScore: number;
  isNewHighScore: boolean;
  onStartGame: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  isGameOver,
  score,
  wave,
  isNewHighScore,
  onStartGame,
}) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center backdrop-blur-md">
      <div className="text-center text-white max-w-md mx-4 p-8 rounded-2xl shadow-xl border border-gray-700 bg-black/60 backdrop-blur-sm animate-fadeIn">
        {isGameOver ? (
          <>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-red-500 drop-shadow-lg animate-bounce">
              💀 Game Over!
            </h3>
            <p className="text-lg md:text-xl mb-2 font-medium">
              Final Score:{" "}
              <span className="text-cyan-400 font-bold">{score}</span>
            </p>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Reached Wave <span className="text-yellow-400">{wave}</span>
            </p>
            {isNewHighScore && (
              <p className="text-yellow-300 font-bold mb-6 text-lg md:text-xl animate-pulse">
                🏆 New High Score!
              </p>
            )}
            <button
              onClick={onStartGame}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all w-full text-lg font-semibold shadow-md hover:shadow-lg"
            >
              Play Again
            </button>
          </>
        ) : (
          <>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-400 drop-shadow-md">
              🛠 Time To Debug!!
            </h3>
            <p className="text-sm md:text-base mb-6 text-gray-300">
              Use <span className="font-bold text-cyan-400">Arrow keys</span> /{" "}
              <span className="font-bold text-cyan-400">A & D</span> or{" "}
              <span className="font-bold text-cyan-400">Touch</span> to move
            </p>
            <button
              onClick={onStartGame}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all w-full text-lg font-semibold shadow-md hover:shadow-lg"
            >
              Start Game
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
