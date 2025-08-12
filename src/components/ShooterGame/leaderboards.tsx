import React from "react";
import { FiX } from "react-icons/fi";

type LeaderboardProps = {
  onClose: () => void;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
  const sampleScores = [
    { name: "AceHunter", score: 150 },
    { name: "ShadowFox", score: 145 },
    { name: "BladeStorm", score: 140 },
    { name: "NightWolf", score: 135 },
    { name: "CrimsonViper", score: 130 },
    { name: "IronFist", score: 125 },
    { name: "PhantomStrike", score: 120 },
    { name: "FrostBite", score: 115 },
    { name: "VenomClaw", score: 110 },
    { name: "RogueSniper", score: 105 },
    { name: "SilentBlade", score: 100 },
    { name: "SteelHeart", score: 95 },
    { name: "DarkRider", score: 90 },
    { name: "ThunderFang", score: 85 },
    { name: "GhostReaper", score: 80 },
  ];

  const topThree = sampleScores.slice(0, 3);
  const others = sampleScores.slice(3);

  const medalColors = ["bg-gray-300", "bg-yellow-300", "bg-amber-600"]; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[500px] shadow-lg max-h-[85vh] flex flex-col">
        {/* Header with title & close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-center flex-1">Leaderboards</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            <FiX />
          </button>
        </div>

        {/* Top 3 medals */}
        <div className="flex justify-center items-end gap-6 py-6 border-b">
          {/* 2nd place - Silver */}
          <div className="flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-full flex justify-center items-center text-lg font-bold text-black ${medalColors[0]}`}
            >
              2
            </div>
            <span className="mt-2 font-medium">{topThree[1].name}</span>
            <span className="text-sm text-gray-500">{topThree[1].score}</span>
          </div>

          {/* 1st place - Gold (bigger) */}
          <div className="flex flex-col items-center">
            <div
              className={`w-24 h-24 rounded-full flex justify-center items-center text-xl font-bold text-black ${medalColors[1]}`}
            >
              1
            </div>
            <span className="mt-2 font-medium">{topThree[0].name}</span>
            <span className="text-sm text-gray-500">{topThree[0].score}</span>
          </div>

          {/* 3rd place - Bronze */}
          <div className="flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-full flex justify-center items-center text-lg font-bold text-white ${medalColors[2]}`}
            >
              3
            </div>
            <span className="mt-2 font-medium">{topThree[2].name}</span>
            <span className="text-sm text-gray-500">{topThree[2].score}</span>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-3 font-bold border-b border-gray-400 bg-gray-200 sticky top-0 z-10">
            <div className="p-2 text-center">Rank</div>
            <div className="p-2 text-center">Username</div>
            <div className="p-2 text-center">Score</div>
        </div>

        {/* Scrollable remaining players */}
        <div className="flex-1 overflow-y-auto">
        {others.map((player, index) => (
            <div
            key={index}
            className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 px-2 py-2"
            >
            <div className="text-center font-bold">{index + 4}</div>
            <div className="text-center">{player.name}</div>
            <div className="text-center">{player.score}</div>
            </div>
        ))}
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
