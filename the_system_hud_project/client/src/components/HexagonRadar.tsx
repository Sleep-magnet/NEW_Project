/**
 * HexagonRadar.tsx - Zone 2 (40% height)
 * Visualizes 5-dimensional attribute distribution using Recharts RadarChart
 * Attributes: Strength, Intelligence, Agility, Sense, Vitality
 * 
 * Design: Liquid Glass HUD with cyan glow effect
 * - Faint white/grey grid lines
 * - Cyan fill: rgba(0, 229, 255, 0.3)
 * - Cyan stroke: #00E5FF
 * - Drop shadow for glow
 */

import { useSystemStore } from '@/store/skillStore';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function HexagonRadar() {
  const { attributes } = useSystemStore();

  // Transform attributes into Recharts data format
  const radarData = useMemo(
    () => [
      { name: 'Strength', value: attributes.strength, fullMark: 100 },
      { name: 'Intelligence', value: attributes.intelligence, fullMark: 100 },
      { name: 'Agility', value: attributes.agility, fullMark: 100 },
      { name: 'Sense', value: attributes.sense, fullMark: 100 },
      { name: 'Vitality', value: attributes.vitality, fullMark: 100 },
    ],
    [attributes]
  );

  return (
    <motion.div
      className="w-full h-[40%] flex items-center justify-center px-4 py-6 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <style>{`
        .recharts-surface {
          filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.4));
        }
        
        .radar-grid {
          opacity: 0.6;
        }
      `}</style>

      {/* Radar Chart Container with Liquid Glass */}
      <div
        className="w-full h-full flex items-center justify-center rounded-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 0 24px rgba(0, 229, 255, 0.15)',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            {/* Faint grid lines */}
            <PolarGrid
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={1}
              radialLines={true}
              className="radar-grid"
            />

            {/* Attribute labels */}
            <PolarAngleAxis
              dataKey="name"
              tick={{
                fill: 'rgba(255, 255, 255, 0.5)',
                fontSize: 11,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              tickLine={false}
            />

            {/* Radius axis (0-100) */}
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />

            {/* Cyan radar polygon with glow */}
            <Radar
              name="Attributes"
              dataKey="value"
              stroke="#00E5FF"
              fill="rgba(0, 229, 255, 0.3)"
              strokeWidth={2}
              dot={{
                fill: '#00E5FF',
                r: 3,
                strokeWidth: 1,
                stroke: 'rgba(0, 229, 255, 0.6)',
              }}
              activeDot={{
                fill: '#00E5FF',
                r: 5,
                strokeWidth: 2,
                stroke: '#00E5FF',
              }}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
