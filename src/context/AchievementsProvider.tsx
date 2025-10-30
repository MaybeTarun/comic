// src/context/AchievementsProvider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { achievementsList, Achievement } from '../data/achievementsList';
import AchievementsToast from './AchievementsToast';

type AchievementsContextType = {
  unlockAchievement: (id: string) => void;
};

const AchievementsContext = createContext<AchievementsContextType>({
  unlockAchievement: () => {},
});

export const useAchievements = () => useContext(AchievementsContext);

export const AchievementsProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Achievement[]>([]);

  const unlockAchievement = (id: string) => {
    const unlocked = JSON.parse(localStorage.getItem('achievements') || '{}');
    if (unlocked[id]) return; // already unlocked

    unlocked[id] = true;
    localStorage.setItem('achievements', JSON.stringify(unlocked));

    const achievement = achievementsList.find((a) => a.id === id);
    if (achievement) {
      setToasts((prev) => [...prev, achievement]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    }
  };

  // Initialize all achievement conditions
  useEffect(() => {
    achievementsList.forEach((a) => a.condition(unlockAchievement));
  }, []);

  return (
    <AchievementsContext.Provider value={{ unlockAchievement }}>
      {children}
      <AchievementsToast toasts={toasts} />
    </AchievementsContext.Provider>
  );
};
