---
name: rpg-hud-builder
description: Build gamified RPG-style productivity PWAs with Zustand state management, Framer Motion animations, and Recharts visualizations. Use for creating mobile-first HUD interfaces with quest systems, skill progression, and real-time XP animations.
---

# RPG HUD Builder Skill

Build high-impact gamified productivity PWAs with an RPG-style HUD. This skill provides a complete workflow for creating mobile-first interfaces with quest systems, skill progression tracking, and smooth animations.

## What This Skill Provides

- **Complete HUD architecture** with 4 zones (header, radar, quests, navigation)
- **State management patterns** using Zustand for skills, XP, and quests
- **Animation systems** with Framer Motion for XP popups, bar fills, and skill pulses
- **Component templates** for rapid customization
- **Build workflow** with time estimates and troubleshooting

## When to Use

Use this skill when:
- Building gamified productivity apps (task management, habit tracking, fitness apps)
- Creating mobile-first PWAs with RPG/game mechanics
- Implementing real-time stat progression and XP systems
- Designing dark-themed, modern UIs with liquid glass effects
- Working with React 18 + Tailwind + Framer Motion stack

## Quick Start

### 1. Project Setup (30 mins)

Initialize a React + Vite project with dependencies:
```bash
webdev_init_project with React 18, Tailwind CSS, Framer Motion, Recharts, Lucide React
pnpm add zustand
```

Configure `client/src/index.css`:
- Set background to pure black (#050505)
- Import JetBrains Mono font
- Define color palette: cyan (#00E5FF), crimson (#FF003C)
- Set dark theme as default

### 2. Create State Management (15 mins)

Copy `templates/skillStore.template.ts` to `client/src/store/skillStore.ts`:
- Customize skill names (strength, intelligence, etc.)
- Set initial skill values
- Adjust MAX_XP_PER_LEVEL if needed

Copy `templates/questConfig.template.ts` to `client/src/lib/questConfig.ts`:
- Define your quest list with skill mappings
- Set XP rewards and skill increments
- Customize quest titles and tags

### 3. Build Components (60 mins)

Create these components in `client/src/components/`:

**TacticalHeader.tsx** - Player identity + XP/HP bars
- Copy from `templates/TacticalHeader.template.tsx`
- Customize player name, rank badge, colors
- Reads xpPercentage from Zustand store

**HexagonRadar.tsx** - 6-point skill visualization
- Use Recharts RadarChart with 6 data points
- Connect to store for real-time updates
- Add pulse animation on skill changes

**QuestCard.tsx** - Individual draggable quest
- Implement drag="x" with 50px threshold
- Call store actions on completion
- Trigger XP popup with position

**ActiveQuestGate.tsx** - Quest list container
- Use AnimatePresence for smooth removal
- Render 3 quests with empty state
- Handle quest completion callbacks

**FloatingCommandPill.tsx** - Bottom navigation
- 4 Lucide icons (Home, List, Network, Cpu)
- Liquid glass styling
- Active state indicator

**XPPopup.tsx** - Floating XP animation
- Display "+{amount} XP" text
- Animate: rise 80px, fade out, scale 1.2
- Duration 1.5s with easeOut

### 4. Assemble Layout (30 mins)

Update `client/src/pages/Home.tsx` with 4-zone layout.

### 5. Polish & Test (45 mins)

- Add liquid glass styling to all cards
- Test quest completion flow (swipe right)
- Verify XP bar animation
- Check radar skill updates
- Test on mobile viewport (max-w-md)

## Architecture Overview

See `references/hud-architecture.md` for detailed zone breakdown, animation patterns, and design system.

## Build Workflow

See `references/build-workflow.md` for step-by-step implementation guide.

## Time Estimates

- Setup: 30 mins
- State Management: 15 mins
- Components: 60 mins
- Integration: 30 mins
- Polish: 45 mins
- Testing: 15 mins
- **Total: ~3 hours**

## Next Steps

After building the basic HUD:
1. Add level-up system with rank progression
2. Implement persistent storage (localStorage)
3. Create dedicated Quests page with all 8+ quests
4. Add sound effects on quest completion
5. Build Skill Tree page for stat distribution
6. Integrate backend API for cloud sync
