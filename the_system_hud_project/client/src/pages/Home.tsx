/**
 * THE SYSTEM - Main HUD Page
 * 
 * Design Philosophy: Liquid Glass Cyberpunk HUD
 * - Pure black background (#050505)
 * - Neon cyan (#00E5FF) for XP/Primary actions
 * - Crimson red (#FF003C) for HP/Penalties
 * - Mobile-first, no scrolling (h-screen overflow-hidden)
 * 
 * Layout: 4 Zones
 * Zone 1 (15%): Tactical Header - Player name, rank, XP/HP bars
 * Zone 2 (40%): Hexagon Radar - 6-point skill distribution
 * Zone 3 (35%): Active Quest Gate - Draggable quest cards
 * Zone 4 (10%): Floating Command Pill - Bottom navigation
 */

import { motion, AnimatePresence } from 'framer-motion';
import TacticalHeader from '@/components/TacticalHeader';
import HexagonRadar from '@/components/HexagonRadar';
import ActiveQuestGate from '@/components/ActiveQuestGate';
import FloatingCommandPill from '@/components/FloatingCommandPill';
import XPPopup from '@/components/XPPopup';
import { useSystemStore } from '@/store/skillStore';

export default function Home() {
  const { playerName, level } = useSystemStore();

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col bg-black"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Mobile-first container: max-w-md mx-auto */}
      <div className="max-w-md mx-auto w-full h-full flex flex-col relative">
        {/* ZONE 1: Tactical Header (15%) */}
        <TacticalHeader />

        {/* ZONE 2: Hexagon Radar (40%) */}
        <HexagonRadar />

        {/* ZONE 3: Active Quest Gate (35%) */}
        <ActiveQuestGate />

        {/* ZONE 4: Floating Command Pill (10% + fixed positioning) */}
        <FloatingCommandPill activeItem="home" />

        {/* XP Popup Animation - Removed, will add later */}
      </div>

      {/* Global Glow Effect */}
      <style>{`
        body {
          background-color: #050505;
          color: #E0E0E0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Smooth scrollbar for quest cards */
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 255, 0.2);
          border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 255, 0.4);
        }

        /* Global animations */
        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 16px rgba(0, 229, 255, 0.6);
          }
        }

        .glow-text {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
