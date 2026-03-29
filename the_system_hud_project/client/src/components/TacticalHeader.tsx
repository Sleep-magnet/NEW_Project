/**
 * ZONE 1: Tactical Header
 * Design: Liquid Glass HUD with player identity and vital stats
 * - Player name (left) + rank badge (right)
 * - Ultra-thin XP bar (cyan) and HP bar (crimson) below
 * - Connected to Zustand store for real-time XP updates
 * - No scrolling, fixed height (15% of viewport)
 */

import { motion } from 'framer-motion';
import { useSystemStore } from '@/store/skillStore';

interface TacticalHeaderProps {
  playerName?: string;
  rank?: string;
}

export default function TacticalHeader({
  playerName,
  rank,
}: TacticalHeaderProps) {
  const { playerName: storedName, level, currentXP, nextLevelXP, currentHP, maxHP } = useSystemStore();

  // CRITICAL: Calculate XP percentage inside component
  const xpPercentage = Math.min(100, (currentXP / nextLevelXP) * 100);
  const hpPercentage = Math.min(100, (currentHP / maxHP) * 100);

  const displayName = playerName || storedName || 'PLAYER';
  const displayRank = rank || `${level}-RANK`;

  return (
    <motion.div
      className="w-full h-[15%] flex flex-col justify-between px-4 py-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Player Identity Row */}
      <div className="flex items-center justify-between">
        {/* Player Name - Left */}
        <div className="flex flex-col">
          <span
            className="text-sm font-bold text-cyan-400"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {displayName.toUpperCase()}
          </span>
          <span
            className="text-xs text-gray-500"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            // THE SYSTEM
          </span>
        </div>

        {/* Rank Badge - Right */}
        <motion.div
          className="px-3 py-1 rounded-sm border"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span
            className="text-xs font-bold text-cyan-400"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            [ {displayRank} ]
          </span>
        </motion.div>
      </div>

      {/* Progress Bars Container */}
      <div className="flex flex-col gap-1">
        {/* XP Bar - Cyan */}
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-lg shadow-cyan-400/50"
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* HP Bar - Crimson */}
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/50"
            initial={{ width: 0 }}
            animate={{ width: `${hpPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Stats Row - Below bars */}
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          XP: {Math.round(xpPercentage)}%
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          HP: {Math.round(hpPercentage)}%
        </span>
      </div>
    </motion.div>
  );
}
