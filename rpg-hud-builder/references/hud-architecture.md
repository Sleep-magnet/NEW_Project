# RPG HUD Architecture Reference

## Overview

The RPG-style HUD is a mobile-first PWA built with React 18, Tailwind CSS, Framer Motion, and Zustand. It divides the screen into four zones, each with specific responsibilities and animations.

## Zone Breakdown

### Zone 1: Tactical Header (15% height)
**Purpose**: Display player identity, rank, and vital stats

**Components**:
- Player name + title (left side)
- Rank badge (right side, liquid glass style)
- XP progress bar (cyan, animated)
- HP progress bar (crimson, static)
- Stat labels (XP %, HP %)

**Key Features**:
- Connected to Zustand store for real-time XP updates
- Smooth bar animations on quest completion
- Responsive to skill store changes

**Design Pattern**:
```tsx
// TacticalHeader reads from store
const { xpPercentage } = useSkillStore();
// Animates bar based on store updates
<motion.div animate={{ width: `${xpPercentage}%` }} />
```

### Zone 2: Hexagon Radar (40% height)
**Purpose**: Visualize player skill distribution across 6 dimensions

**Components**:
- Recharts RadarChart with 6 data points
- Skill labels (Strength, Intelligence, Agility, Sense, Vitality, Willpower)
- Translucent cyan fill with glowing stroke
- Faint grid background

**Key Features**:
- Real-time updates when skills increment
- Pulse animation on skill updates
- Responsive sizing with ResponsiveContainer

**Design Pattern**:
```tsx
// HexagonRadar subscribes to skill changes
const { skills, lastUpdatedSkill } = useSkillStore();
// Triggers pulse animation when skill updates
className={lastUpdatedSkill ? 'skill-updated' : ''}
```

### Zone 3: Active Quest Gate (35% height)
**Purpose**: Display and manage active quests with drag-to-complete interaction

**Components**:
- Section label with cyan accent
- Quest card list (max 3 visible)
- Each card: title, skill tag, XP reward
- Drag handle hint

**Key Features**:
- Draggable cards (drag="x" constraint)
- AnimatePresence for smooth removal
- Swipe-to-complete gesture (>50px right)
- Empty state message

**Design Pattern**:
```tsx
// QuestCard integrates with store
const handleDragEnd = (event, info) => {
  if (info.offset.x > 50) {
    // Trigger skill update + XP popup
    incrementSkill(skillType, amount);
    showXPPopup(xpAmount);
  }
};
```

### Zone 4: Floating Command Pill (10% + fixed)
**Purpose**: Bottom navigation with 4 main actions

**Components**:
- Pill-shaped container (liquid glass)
- 4 Lucide icons: Home, Quests, Skills, Coach
- Active state indicator
- Fixed positioning at bottom-6

**Key Features**:
- Liquid glass styling (bg-white/5, backdrop-blur-md)
- Hover and active animations
- Responsive to route changes

## State Management (Zustand Store)

### Core State
```typescript
interface SkillState {
  skills: {
    strength, intelligence, agility, sense, vitality, willpower
  };
  totalXP: number;
  xpPercentage: number;
  completedQuests: string[];
  lastUpdatedSkill: string | null;
  xpPopup: { amount, isVisible, x, y };
}
```

### Key Actions
- `incrementSkill(skillName, amount)` - Increase skill value, trigger pulse
- `addXP(amount)` - Add XP and update percentage
- `completeQuest(questId)` - Mark quest as done
- `showXPPopup(amount, x, y)` - Display floating XP animation

## Animation Patterns

### Liquid Glass
```css
backgroundColor: 'rgba(255, 255, 255, 0.05)',
backdropFilter: 'blur(12px)',
borderColor: 'rgba(255, 255, 255, 0.1)',
```

### Glow Effects
```css
textShadow: '0 0 12px rgba(0, 229, 255, 0.6)',
boxShadow: '0 0 8px rgba(0, 229, 255, 0.3)',
```

### Skill Update Pulse
```css
@keyframes skill-pulse {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.3)); }
  50% { filter: drop-shadow(0 0 16px rgba(0, 229, 255, 0.6)); }
}
```

### XP Popup Float
```tsx
initial={{ opacity: 1, y: 0, scale: 1 }}
animate={{ opacity: 0, y: -80, scale: 1.2 }}
transition={{ duration: 1.5, ease: 'easeOut' }}
```

## Color System

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary Action | Cyan | #00E5FF | XP, skills, highlights |
| Penalty/HP | Crimson | #FF003C | HP bar, errors |
| Background | Pure Black | #050505 | Main background |
| Text Primary | Light Gray | rgba(255,255,255,0.85) | Labels, text |
| Text Secondary | Dark Gray | rgba(255,255,255,0.4) | Hints, secondary |
| Glass Light | White 5% | rgba(255,255,255,0.05) | Card backgrounds |
| Glass Border | White 10% | rgba(255,255,255,0.1) | Card borders |

## Typography

- **Numbers/Ranks**: JetBrains Mono (monospace)
- **Labels**: System-ui, sans-serif
- **Sizes**: 
  - Player name: text-sm (14px)
  - Section labels: text-xs (12px)
  - Card text: text-xs (12px)
  - XP popup: text-lg (18px)

## Responsive Constraints

- **Mobile-first**: max-w-md mx-auto
- **No scrolling**: h-screen overflow-hidden
- **Touch targets**: 44x44px minimum
- **Zone heights**: Fixed percentages (15%, 40%, 35%, 10%)

## Quest Configuration Pattern

Quests map to skills for dynamic updates:
```typescript
interface QuestConfig {
  id: string;
  title: string;
  skillTag: string;
  xpReward: number;
  skillType: keyof SkillState['skills'];
  skillIncrement: number;
}
```

When quest completes:
1. Skill increments by `skillIncrement`
2. XP increases by `xpReward`
3. XP bar animates to new percentage
4. XP popup displays at quest location
5. Radar chart pulses on updated skill
6. Quest card animates out

## Performance Considerations

- Use `useMemo` for radar data transformation
- Debounce rapid skill updates
- AnimatePresence with `mode="popLayout"` for smooth card removal
- Recharts ResponsiveContainer for responsive sizing
- Framer Motion spring physics for natural feel
