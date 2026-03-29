/**
 * Tactical Header Component Template
 * Zone 1: Player identity, rank badge, XP/HP bars
 * 
 * CUSTOMIZE:
 * - Player name and title
 * - Rank badge styling and text
 * - HP percentage
 * - Bar colors and effects
 */

import { motion } from 'framer-motion';
import { useSkillStore } from '@/store/skillStore';

interface TacticalHeaderProps {
  playerName?: string;
  rank?: string;
  hpPercent?: number;
}

export default function TacticalHeader({
  playerName = 'PLAYER',
  rank = 'E-RANK',
  hpPercent = 85,
}: TacticalHeaderProps) {
  const { xpPercentage } = useSkillStore();

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
            {playerName}
          </span>
          <span
            className="text-xs text-gray-400"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            // CUSTOMIZE: Add your title here
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
            [ {rank} ]
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
            animate={{ width: `${hpPercent}%` }}
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
          HP: {hpPercent}%
        </span>
      </div>
    </motion.div>
  );
}
