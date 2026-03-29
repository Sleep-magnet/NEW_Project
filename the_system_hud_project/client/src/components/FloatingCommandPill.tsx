/**
 * ZONE 4: Floating Command Pill
 * Design: Fixed floating nav bar at bottom with 4 Lucide icons
 * - Liquid glass styling with backdrop blur
 * - 4 navigation items: Home, Quests, Skill Tree, AI Coach
 * - Glowing effect on hover
 * - Fixed height (10% of viewport)
 */

import { motion } from 'framer-motion';
import { Hexagon, ListTodo, Network, Cpu } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FloatingCommandPillProps {
  onNavClick?: (itemId: string) => void;
  activeItem?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Hexagon size={20} /> },
  { id: 'quests', label: 'Quests', icon: <ListTodo size={20} /> },
  { id: 'skills', label: 'Skills', icon: <Network size={20} /> },
  { id: 'coach', label: 'Coach', icon: <Cpu size={20} /> },
];

export default function FloatingCommandPill({
  onNavClick,
  activeItem = 'home',
}: FloatingCommandPillProps) {
  const [active, setActive] = useState(activeItem);

  const handleClick = (itemId: string) => {
    setActive(itemId);
    onNavClick?.(itemId);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div
        className="flex items-center justify-center gap-4 px-6 py-3 rounded-full border"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="p-2 rounded-lg transition-colors"
            style={{
              color: active === item.id ? '#00E5FF' : 'rgba(255, 255, 255, 0.5)',
              backgroundColor: active === item.id ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
            }}
            whileHover={{
              color: '#00E5FF',
              backgroundColor: 'rgba(0, 229, 255, 0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            title={item.label}
          >
            {item.icon}
          </motion.button>
        ))}
      </div>

      <style>{`
        @keyframes pill-glow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(0, 229, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
          }
        }
      `}</style>
    </motion.div>
  );
}
