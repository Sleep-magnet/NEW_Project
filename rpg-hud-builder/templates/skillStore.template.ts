/**
 * Zustand Store Template for RPG HUD
 * Customize: skill names, initial values, max values
 */

import { create } from 'zustand';

export interface XPPopupState {
  amount: number;
  isVisible: boolean;
  x: number;
  y: number;
}

export interface SkillState {
  skills: {
    // CUSTOMIZE: Add your skill dimensions here
    strength: number;
    intelligence: number;
    agility: number;
    sense: number;
    vitality: number;
    willpower: number;
  };
  totalXP: number;
  xpPercentage: number;
  completedQuests: string[];
  lastUpdatedSkill: string | null;
  xpPopup: XPPopupState;
  
  // Actions
  incrementSkill: (skillName: keyof SkillState['skills'], amount: number) => void;
  addXP: (amount: number) => void;
  completeQuest: (questId: string) => void;
  showXPPopup: (amount: number, x?: number, y?: number) => void;
  hideXPPopup: () => void;
  resetSkills: () => void;
}

// CUSTOMIZE: Initial skill values
const INITIAL_SKILLS = {
  strength: 75,
  intelligence: 82,
  agility: 68,
  sense: 90,
  vitality: 78,
  willpower: 85,
};

// CUSTOMIZE: XP per level
const MAX_XP_PER_LEVEL = 100;

export const useSkillStore = create<SkillState>((set: any) => ({
  skills: INITIAL_SKILLS,
  totalXP: 0,
  xpPercentage: 0,
  completedQuests: [],
  lastUpdatedSkill: null,
  xpPopup: { amount: 0, isVisible: false, x: 0, y: 0 },

  incrementSkill: (skillName: keyof SkillState['skills'], amount: number) => {
    set((state: SkillState) => ({
      skills: {
        ...state.skills,
        [skillName]: Math.min(100, state.skills[skillName] + amount),
      },
      lastUpdatedSkill: skillName,
    }));

    // Reset indicator after animation
    setTimeout(() => {
      set({ lastUpdatedSkill: null });
    }, 1000);
  },

  addXP: (amount: number) => {
    set((state: SkillState) => {
      const newTotalXP = state.totalXP + amount;
      const newXPPercentage = (newTotalXP % MAX_XP_PER_LEVEL);
      return {
        totalXP: newTotalXP,
        xpPercentage: newXPPercentage,
      };
    });
  },

  completeQuest: (questId: string) => {
    set((state: SkillState) => ({
      completedQuests: [...state.completedQuests, questId],
    }));
  },

  showXPPopup: (amount: number, x: number = 0, y: number = 0) => {
    set({
      xpPopup: { amount, isVisible: true, x, y },
    });

    setTimeout(() => {
      set({
        xpPopup: { amount: 0, isVisible: false, x: 0, y: 0 },
      });
    }, 1500);
  },

  hideXPPopup: () => {
    set({
      xpPopup: { amount: 0, isVisible: false, x: 0, y: 0 },
    });
  },

  resetSkills: () => {
    set({
      skills: INITIAL_SKILLS,
      totalXP: 0,
      xpPercentage: 0,
      completedQuests: [],
      lastUpdatedSkill: null,
      xpPopup: { amount: 0, isVisible: false, x: 0, y: 0 },
    });
  },
}));
