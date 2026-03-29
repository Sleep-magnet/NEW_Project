/**
 * Quest Configuration Template for RPG HUD
 * Customize: quest titles, skill mappings, XP rewards
 */

import { SkillState } from '@/store/skillStore';

export interface QuestConfig {
  id: string;
  title: string;
  skillTag: string;
  xpReward: number;
  skillType: keyof SkillState['skills'];
  skillIncrement: number;
}

// CUSTOMIZE: Your quest list
export const QUEST_CONFIGS: QuestConfig[] = [
  {
    id: '1',
    title: 'Deep Work Sprint',
    skillTag: 'Backend Logic',
    xpReward: 50,
    skillType: 'intelligence',
    skillIncrement: 8,
  },
  {
    id: '2',
    title: 'Code Review Session',
    skillTag: 'Collaboration',
    xpReward: 35,
    skillType: 'willpower',
    skillIncrement: 6,
  },
  {
    id: '3',
    title: 'System Architecture',
    skillTag: 'Design Pattern',
    xpReward: 75,
    skillType: 'intelligence',
    skillIncrement: 10,
  },
  {
    id: '4',
    title: 'Performance Optimization',
    skillTag: 'Efficiency',
    xpReward: 60,
    skillType: 'agility',
    skillIncrement: 9,
  },
  {
    id: '5',
    title: 'Debugging Challenge',
    skillTag: 'Problem Solving',
    xpReward: 45,
    skillType: 'sense',
    skillIncrement: 7,
  },
  {
    id: '6',
    title: 'Physical Exercise',
    skillTag: 'Health',
    xpReward: 30,
    skillType: 'vitality',
    skillIncrement: 8,
  },
  {
    id: '7',
    title: 'Strength Training',
    skillTag: 'Fitness',
    xpReward: 40,
    skillType: 'strength',
    skillIncrement: 10,
  },
  {
    id: '8',
    title: 'Meditation Session',
    skillTag: 'Mindfulness',
    xpReward: 25,
    skillType: 'willpower',
    skillIncrement: 5,
  },
];

export const getQuestConfig = (questId: string): QuestConfig | undefined => {
  return QUEST_CONFIGS.find((q) => q.id === questId);
};

export const getDefaultQuests = (): QuestConfig[] => {
  // CUSTOMIZE: Return first N quests for initial display
  return QUEST_CONFIGS.slice(0, 3);
};
