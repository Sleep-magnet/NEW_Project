import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import { QUEST_CONFIGS } from '@/lib/questConfig';

// 1. Define the Types (The Blueprint)
export type ClassType = 'The Vanguard' | 'The Arcanist' | 'The Shadow' | 'Unassigned';

export interface AttributeStats {
  strength: number;
  intelligence: number;
  agility: number;
  sense: number;
  vitality: number;
}

export interface Quest {
  id: string;
  title: string;
  microSkill: string;
  xpReward: number;
  isCompleted: boolean;
  isPenalty: boolean;
}

interface SystemState {
  // Player Data
  playerName: string;
  playerClass: ClassType;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  currentHP: number;
  maxHP: number;
  attributes: AttributeStats;
  
  // Game State
  hasCompletedOnboarding: boolean;
  activeQuests: Quest[];
  
  // Actions (The Logic)
  completeOnboarding: (name: string, chosenClass: ClassType) => void;
  gainXP: (amount: number, attribute: keyof AttributeStats) => void;
  takeDamage: (amount: number) => void;
  completeQuest: (questId: string) => void;
}

// 2. The Math (XP Scaling Curve)
const calculateNextLevelXP = (level: number) => Math.floor(100 * Math.pow(level, 1.5));

// 3. The Store (Zustand + localForage for offline saving)
export const useSystemStore = create<SystemState>()(
  persist(
    (set, get) => ({
      // Initial State
      playerName: 'Player',
      playerClass: 'Unassigned',
      level: 1,
      currentXP: 0,
      nextLevelXP: 100,
      currentHP: 100,
      maxHP: 100,
      attributes: { strength: 1, intelligence: 1, agility: 1, sense: 1, vitality: 1 },
      hasCompletedOnboarding: false,
      activeQuests: QUEST_CONFIGS.slice(0, 3).map(q => ({
        id: q.id,
        title: q.title,
        microSkill: q.microSkill,
        xpReward: q.xpReward,
        isCompleted: false,
        isPenalty: false,
      })),

      // Actions
      completeOnboarding: (name, chosenClass) => set({
        playerName: name,
        playerClass: chosenClass,
        hasCompletedOnboarding: true,
      }),

      gainXP: (amount, attribute) => set((state) => {
        let newXP = state.currentXP + amount;
        let newLevel = state.level;
        let newNextLevelXP = state.nextLevelXP;
        
        // Level Up Logic
        if (newXP >= state.nextLevelXP) {
          newLevel += 1;
          newXP = newXP - state.nextLevelXP; // Carry over leftover XP
          newNextLevelXP = calculateNextLevelXP(newLevel);
        }

        return {
          currentXP: newXP,
          level: newLevel,
          nextLevelXP: newNextLevelXP,
          attributes: {
            ...state.attributes,
            [attribute]: state.attributes[attribute] + 1
          }
        };
      }),

      takeDamage: (amount) => set((state) => ({
        currentHP: Math.max(0, state.currentHP - amount)
      })),

      completeQuest: (questId) => set((state) => ({
        activeQuests: state.activeQuests.filter(q => q.id !== questId)
      })),
    }),
    {
      name: 'system-storage', // name of item in storage
      storage: createJSONStorage(() => localforage), // Use IndexedDB so it never lags
    }
  )
);
