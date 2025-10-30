// src/context/AchievementsToast.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../data/achievementsList';
import { HiTrophy } from 'react-icons/hi2';

type Props = {
  toasts: Achievement[];
};

export default function AchievementsToast({ toasts }: Props) {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-3 z-[9999] items-end pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: -10 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className="relative flex items-center gap-3 bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] px-5 py-3 w-[260px] pointer-events-auto"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-yellow-400 rounded-l-2xl" />

            <div className="flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-xl p-2">
              <HiTrophy size={18} />
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-gray-600 mt-0.5">{toast.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
