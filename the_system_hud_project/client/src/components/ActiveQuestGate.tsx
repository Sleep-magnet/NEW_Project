/**
 * ActiveQuestGate.tsx - Zone 3 (35% height)
 * Vertical list of draggable quest cards with smooth removal animation
 * 
 * Design: Liquid Glass container with AnimatePresence for smooth quest removal
 * - Pulls activeQuests from useSystemStore
 * - Renders QuestCard for each quest
 * - Smooth collapse and disappear on swipe completion
 */

import { motion, AnimatePresence } from 'framer-motion';
import QuestCard from './QuestCard';
import { useSystemStore } from '@/store/skillStore';

export default function ActiveQuestGate() {
  const { activeQuests } = useSystemStore();

  return (
    <motion.div
      className="w-full h-[35%] flex flex-col gap-2 overflow-hidden px-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 px-1">
        <span
          className="text-xs font-bold text-cyan-400 uppercase tracking-wider"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          ACTIVE QUESTS
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
      </div>

      {/* Quest Cards Container */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {activeQuests && activeQuests.length > 0 ? (
            activeQuests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <QuestCard
                  quest={quest}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="text-xs text-gray-500 text-center"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <p>// No active quests</p>
                <p>// Complete objectives to earn XP</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
