/**
 * Quest Configuration
 * Maps quests to attributes for dynamic progression
 */

import { Quest, AttributeStats } from '@/store/skillStore';

export interface QuestConfig extends Quest {
  attributeType: keyof AttributeStats;
  attributeIncrement: number;
}

export const QUEST_CONFIGS: QuestConfig[] = [
  {
    id: '1',
    title: 'Deep Work Sprint',
    microSkill: 'Backend Logic',
    xpReward: 50,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'intelligence',
    attributeIncrement: 8,
  },
  {
    id: '2',
    title: 'Code Review Session',
    microSkill: 'Collaboration',
    xpReward: 35,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'sense',
    attributeIncrement: 6,
  },
  {
    id: '3',
    title: 'System Architecture',
    microSkill: 'Design Pattern',
    xpReward: 75,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'intelligence',
    attributeIncrement: 10,
  },
  {
    id: '4',
    title: 'Performance Optimization',
    microSkill: 'Efficiency',
    xpReward: 60,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'agility',
    attributeIncrement: 9,
  },
  {
    id: '5',
    title: 'Debugging Challenge',
    microSkill: 'Problem Solving',
    xpReward: 45,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'sense',
    attributeIncrement: 7,
  },
  {
    id: '6',
    title: 'Physical Exercise',
    microSkill: 'Health',
    xpReward: 30,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'vitality',
    attributeIncrement: 8,
  },
  {
    id: '7',
    title: 'Strength Training',
    microSkill: 'Fitness',
    xpReward: 40,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'strength',
    attributeIncrement: 10,
  },
  {
    id: '8',
    title: 'Meditation Session',
    microSkill: 'Mindfulness',
    xpReward: 25,
    isCompleted: false,
    isPenalty: false,
    attributeType: 'sense',
    attributeIncrement: 5,
  },
];

export const getQuestConfig = (questId: string): QuestConfig | undefined => {
  return QUEST_CONFIGS.find((q) => q.id === questId);
};

export const getDefaultQuests = (): QuestConfig[] => {
  return QUEST_CONFIGS.slice(0, 3);
};
