/**
 * XP Popup Component
 * Displays floating "+XP" text that rises and fades out
 * Triggered when quests are completed
 */

import { motion } from 'framer-motion';

interface XPPopupProps {
  amount: number;
  x?: number;
  y?: number;
}

export default function XPPopup({ amount, x = 0, y = 0 }: XPPopupProps) {
  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -80, scale: 1.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div
        className="font-bold text-lg whitespace-nowrap"
        style={{
          color: '#00E5FF',
          fontFamily: 'JetBrains Mono, monospace',
          textShadow: '0 0 12px rgba(0, 229, 255, 0.6)',
        }}
      >
        +{amount} XP
      </div>
    </motion.div>
  );
}
