/**
 * QuestCard.tsx - Zone 3 Item
 * Individual draggable quest card with swipe-to-complete gesture
 * 
 * Design: Liquid Glass with drag interaction
 * - Drag horizontally (drag="x", dragConstraints={{ left: 0, right: 100 }})
 * - If dragged >50px right: trigger completeQuest, haptic, fade out
 * - Shows quest title, microSkill tag, and XP reward
 */

import { motion } from 'framer-motion';
import { useSystemStore } from '@/store/skillStore';
import { getQuestConfig } from '@/lib/questConfig';
import { useRef } from 'react';

interface QuestCardProps {
  quest: {
    id: string;
    title: string;
    microSkill: string;
    xpReward: number;
    isCompleted: boolean;
  };
  onComplete?: (id: string) => void;
}

export default function QuestCard({ quest, onComplete }: QuestCardProps) {
  const { gainXP, completeQuest } = useSystemStore();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any) => {
    // If dragged more than 50px to the right, trigger complete
    if (info && info.offset && info.offset.x > 50) {
      // Get quest config to determine attribute increment
      const questConfig = getQuestConfig(quest.id);
      if (questConfig) {
        // Trigger haptic vibration if available
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }

        // Gain XP and increment attribute
        gainXP(questConfig.xpReward, questConfig.attributeType);
        
        // Mark quest as complete in store
        completeQuest(quest.id);
        
        // Callback
        onComplete?.(quest.id);
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="w-full px-3 py-3 rounded-md border cursor-grab active:cursor-grabbing"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 100 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Quest Info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium text-gray-100 truncate"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {quest.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-xs px-2 py-0.5 rounded border"
              style={{
                color: '#00E5FF',
                borderColor: 'rgba(0, 229, 255, 0.3)',
                backgroundColor: 'rgba(0, 229, 255, 0.05)',
              }}
            >
              [{quest.microSkill}]
            </span>
          </div>
        </div>

        {/* XP Reward */}
        <div className="flex flex-col items-end">
          <span
            className="text-xs font-bold text-cyan-400"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            +{quest.xpReward}
          </span>
          <span
            className="text-xs text-gray-500"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            XP
          </span>
        </div>
      </div>

      {/* Drag Hint */}
      <p
        className="text-xs text-gray-600 mt-2"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        → Swipe to complete
      </p>
    </motion.div>
  );
}
