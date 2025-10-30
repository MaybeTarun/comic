'use client';
import { useEffect, useState } from 'react';
import { HiTrophy, HiLockClosed } from 'react-icons/hi2';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { achievementsList } from './data/achievementsList';

export default function AchievementsPage() {
  const [unlocked, setUnlocked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('achievements') || '{}');
    setUnlocked(data);
  }, []);

  const unlockedCount = Object.keys(unlocked).filter((k) => unlocked[k]).length;
  const total = achievementsList.length;
  const progress = (unlockedCount / total) * 100;

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10 relative">
      {/* Back Button */}
      <button
        onClick={() => (window.location.href = '/')}
        className="absolute top-6 right-6 flex items-center gap-2 text-black hover:opacity-70 transition-opacity text-base md:text-lg font-mono"
      >
        <FaArrowRightToBracket className="text-lg scale-x-[-1]" />
        <span>back</span>
      </button>

      {/* Header */}
      <div className="flex flex-col items-start mb-10">
        <div className="flex items-center gap-3 mb-2">
          <HiTrophy className="text-yellow-500 text-4xl" />
          <h1 className="text-4xl font-bold">Your Achievements</h1>
        </div>
        <p className="text-gray-600 text-sm md:text-base">
          You’ve unlocked{' '}
          <span className="font-semibold text-black">{unlockedCount}</span> of{' '}
          {total} achievements.
        </p>
        <div className="w-full max-w-md mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {achievementsList.map((achievement) => {
          const isUnlocked = unlocked[achievement.id];

          return (
            <div
              key={achievement.id}
              className={`relative border rounded-xl p-5 transition-all duration-200 flex flex-col gap-2 ${
                isUnlocked
                  ? 'border-yellow-400 bg-white hover:shadow-md'
                  : 'border-gray-300 bg-gray-50 opacity-80'
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                {isUnlocked ? (
                  <HiTrophy className="text-yellow-500 text-2xl" />
                ) : (
                  <HiLockClosed className="text-gray-400 text-2xl" />
                )}
                <h2
                  className={`font-semibold text-lg ${
                    isUnlocked ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {achievement.title}
                </h2>
              </div>
              {achievement.description && (
                <p
                  className={`text-sm leading-snug ${
                    isUnlocked ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {achievement.description}
                </p>
              )}
              {isUnlocked && (
                <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-yellow-400 text-white text-[10px] px-2 py-[2px] rounded-full font-semibold uppercase tracking-wide">
                  Unlocked
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
