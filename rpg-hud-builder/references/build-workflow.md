# RPG HUD Build Workflow

## Phase 1: Project Setup (30 mins)

1. **Initialize React + Vite project**
   ```bash
   webdev_init_project with React 18, Tailwind CSS, Framer Motion, Recharts, Lucide React
   ```

2. **Install dependencies**
   ```bash
   pnpm add zustand
   ```

3. **Configure design tokens in index.css**
   - Set pure black background (#050505)
   - Define color palette (cyan #00E5FF, crimson #FF003C)
   - Add JetBrains Mono font import
   - Set dark theme as default

4. **Create project structure**
   ```
   client/src/
   ├── components/
   │   ├── TacticalHeader.tsx
   │   ├── HexagonRadar.tsx
   │   ├── QuestCard.tsx
   │   ├── ActiveQuestGate.tsx
   │   ├── FloatingCommandPill.tsx
   │   └── XPPopup.tsx
   ├── store/
   │   └── skillStore.ts
   ├── lib/
   │   └── questConfig.ts
   └── pages/
       └── Home.tsx
   ```

## Phase 2: State Management (15 mins)

1. **Create Zustand store** (`store/skillStore.ts`)
   - Define SkillState interface with skills object
   - Add XP tracking (totalXP, xpPercentage)
   - Add quest tracking (completedQuests)
   - Add XP popup state (amount, isVisible, x, y)
   - Implement actions: incrementSkill, addXP, completeQuest, showXPPopup

2. **Create quest configuration** (`lib/questConfig.ts`)
   - Define QuestConfig interface mapping quests to skills
   - Create QUEST_CONFIGS array with 8 sample quests
   - Each quest: id, title, skillTag, xpReward, skillType, skillIncrement

## Phase 3: Component Development (1 hour)

### 3.1 TacticalHeader Component
- Read xpPercentage from store
- Animate XP bar based on store updates
- Display player name, rank badge, stat labels
- Use motion.div for bar animations (0.8s duration)

### 3.2 HexagonRadar Component
- Transform store skills into radar data format
- Use Recharts RadarChart with 6 data points
- Subscribe to lastUpdatedSkill for pulse animation
- Add CSS keyframes for skill-pulse effect

### 3.3 QuestCard Component
- Accept quest props (id, title, skillTag, xpReward)
- Implement drag="x" with dragConstraints
- On drag end (>50px right):
  - Get quest config
  - Call incrementSkill with skillType
  - Call addXP with xpReward
  - Call showXPPopup with position
  - Trigger onComplete callback

### 3.4 ActiveQuestGate Component
- Use getDefaultQuests() for initial quests
- Render quest cards with AnimatePresence
- Handle quest removal on completion
- Show empty state when no quests

### 3.5 FloatingCommandPill Component
- Create pill-shaped container (liquid glass)
- Render 4 Lucide icons
- Add hover/active animations
- Accept activeItem prop for state

### 3.6 XPPopup Component
- Display "+{amount} XP" text
- Animate: opacity 1→0, y: 0→-80, scale: 1→1.2
- Duration: 1.5s, ease: easeOut
- Use fixed positioning

## Phase 4: Integration (30 mins)

1. **Update Home.tsx**
   - Import all components
   - Import useSkillStore
   - Create 4-zone layout (15%, 40%, 35%, 10%)
   - Render XPPopup with AnimatePresence

2. **Connect store to components**
   - TacticalHeader reads xpPercentage
   - HexagonRadar reads skills, lastUpdatedSkill
   - QuestCard calls store actions on completion
   - Home renders XPPopup when xpPopup.isVisible

## Phase 5: Animation & Polish (30 mins)

1. **Add liquid glass styling**
   ```css
   backgroundColor: 'rgba(255, 255, 255, 0.05)',
   backdropFilter: 'blur(12px)',
   borderColor: 'rgba(255, 255, 255, 0.1)',
   ```

2. **Add glow effects**
   - XP bar: shadow-lg shadow-cyan-400/50
   - XP popup: textShadow with cyan glow
   - Radar: drop-shadow on chart

3. **Implement animations**
   - Bar animations: duration 0.8s, easeOut
   - Skill pulse: 0.6s keyframe animation
   - XP popup: 1.5s rise and fade
   - Card removal: exit animation with scale

4. **Test mobile responsiveness**
   - Verify max-w-md constraint
   - Check touch targets (44x44px)
   - Ensure no scrolling on main view

## Phase 6: Testing & Refinement (15 mins)

1. **Test quest completion flow**
   - Swipe quest card to the right
   - Verify skill increment in radar
   - Verify XP bar animation
   - Verify XP popup appears and fades

2. **Test state persistence**
   - Complete multiple quests
   - Verify XP accumulates
   - Verify skills update correctly
   - Verify quests disappear

3. **Browser testing**
   - Chrome DevTools mobile view
   - Test drag gestures
   - Verify animations smooth
   - Check for console errors

## Key Patterns to Remember

### Connecting Components to Store
```tsx
const { xpPercentage, skills } = useSkillStore();
// Component automatically re-renders on store updates
```

### Triggering Animations on Store Changes
```tsx
animate={{ width: `${xpPercentage}%` }}
transition={{ duration: 0.8, ease: 'easeOut' }}
```

### Position-Aware Popups
```tsx
const rect = cardRef.current?.getBoundingClientRect();
const x = rect ? rect.left + rect.width / 2 : 0;
const y = rect ? rect.top + rect.height / 2 : 0;
showXPPopup(amount, x - window.innerWidth / 2, y - window.innerHeight / 2);
```

### Smooth Card Removal
```tsx
<AnimatePresence mode="popLayout">
  {quests.map(quest => (
    <motion.div
      key={quest.id}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
    >
      {/* card content */}
    </motion.div>
  ))}
</AnimatePresence>
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| XP bar not animating | Verify motion.div has animate prop with width binding |
| Radar not updating | Check if HexagonRadar is reading from store |
| Popup not showing | Verify xpPopup.isVisible is true, AnimatePresence is present |
| Drag not working | Check dragConstraints and dragElastic values |
| Liquid glass looks flat | Add backdrop-filter: blur(12px) to style |

## Time Estimates

- Setup: 30 mins
- State Management: 15 mins
- Components: 60 mins
- Integration: 30 mins
- Polish: 30 mins
- Testing: 15 mins
- **Total: ~2.5 hours**
