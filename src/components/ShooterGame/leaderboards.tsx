import React, { useState, useEffect } from "react";
import { FiX, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "./authmodal";

type LeaderboardProps = {
  onClose: () => void;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scores, setScores] = useState<Array<{ name: string; score: number; isCurrentUser?: boolean; uid?: string }>>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, logout, getTopScores } = useAuth();

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

  useEffect(() => {
    if (currentUser) {
      fetchRealScores();
    } else {
      setScores(sampleScores);
    }
  }, [currentUser]);

  const fetchRealScores = async () => {
    setLoading(true);
    try {
      const realScores = await getTopScores();
      setScores(realScores);
    } catch (error) {
      console.error('Error fetching scores:', error);
      setScores(sampleScores);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      const updatedScores = scores.map(score => ({
        ...score,
        isCurrentUser: false
      }));
      setScores(updatedScores);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const topThree = scores.slice(0, 3);
  const others = scores.slice(3);

  const medalColors = ["bg-gray-300", "bg-yellow-300", "bg-amber-600"];

  if (showAuthModal) {
    return <AuthModal onClose={() => setShowAuthModal(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[500px] shadow-lg max-h-[85vh] flex flex-col">
        {/* Header with title, user info & close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold flex-1">
            {currentUser ? 'Global Leaderboards' : 'Leaderboards (Demo)'}
          </h2>
          
          <div className="flex items-center gap-2 mr-4">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <FiUser className="text-xs" />
                  {currentUser.displayName || 'Player'}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 text-sm"
                  title="Logout"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            <FiX />
          </button>
        </div>

        {!currentUser && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Sign in to see your rank</span> and compete with other players globally!
            </p>
          </div>
        )}

        {currentUser && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Your rank: #{scores.findIndex(s => s.isCurrentUser) + 1}</span> with {scores.find(s => s.isCurrentUser)?.score || 0} points
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading scores...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Top 3 medals */}
            <div className="flex justify-center items-end gap-6 py-6 border-b">
              {topThree.length >= 2 && (
                <div className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full flex justify-center items-center text-lg font-bold text-black ${medalColors[0]} ${topThree[1].isCurrentUser ? 'ring-4 ring-green-400' : ''}`}
                  >
                    2
                  </div>
                  <span className={`mt-2 font-medium ${topThree[1].isCurrentUser ? 'text-green-600' : ''}`}>
                    {topThree[1].name} {topThree[1].isCurrentUser ? '(You)' : ''}
                  </span>
                  <span className="text-sm text-gray-500">{topThree[1].score}</span>
                </div>
              )}

              {topThree.length >= 1 && (
                <div className="flex flex-col items-center">
                  <div
                    className={`w-24 h-24 rounded-full flex justify-center items-center text-xl font-bold text-black ${medalColors[1]} ${topThree[0].isCurrentUser ? 'ring-4 ring-green-400' : ''}`}
                  >
                    1
                  </div>
                  <span className={`mt-2 font-medium ${topThree[0].isCurrentUser ? 'text-green-600' : ''}`}>
                    {topThree[0].name} {topThree[0].isCurrentUser ? '(You)' : ''}
                  </span>
                  <span className="text-sm text-gray-500">{topThree[0].score}</span>
                </div>
              )}

              {topThree.length >= 3 && (
                <div className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full flex justify-center items-center text-lg font-bold text-white ${medalColors[2]} ${topThree[2].isCurrentUser ? 'ring-4 ring-green-400' : ''}`}
                  >
                    3
                  </div>
                  <span className={`mt-2 font-medium ${topThree[2].isCurrentUser ? 'text-green-600' : ''}`}>
                    {topThree[2].name} {topThree[2].isCurrentUser ? '(You)' : ''}
                  </span>
                  <span className="text-sm text-gray-500">{topThree[2].score}</span>
                </div>
              )}
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 font-bold border-b border-gray-400 bg-gray-200 sticky top-0 z-10">
              <div className="p-2 text-center">Rank</div>
              <div className="p-2 text-center">Username</div>
              <div className="p-2 text-center">Score</div>
            </div>

            {/* Scrollable remaining players */}
            <div className="flex-1 overflow-y-auto">
              {others.length > 0 ? (
                others.map((player, index) => (
                  <div
                    key={`${player.name}-${index}`}
                    className={`grid grid-cols-3 border-b border-gray-200 px-2 py-2 ${
                      player.isCurrentUser ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`text-center font-bold ${player.isCurrentUser ? 'text-green-600' : ''}`}>
                      {index + 4}
                    </div>
                    <div className={`text-center ${player.isCurrentUser ? 'text-green-600 font-medium' : ''}`}>
                      {player.name} {player.isCurrentUser ? '(You)' : ''}
                    </div>
                    <div className={`text-center ${player.isCurrentUser ? 'text-green-600 font-medium' : ''}`}>
                      {player.score}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-12">
                  <p className="text-gray-500">No additional scores available</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;