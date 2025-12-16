// src/components/UnitDisplay.tsx
import React from 'react';
import './UnitDisplay.css';
import { formatNumber } from '../utils/formatNumber';

const TOTAL_SEGMENTS = 20; // Define el número total de segmentos en una barra

interface SegmentedBarProps {
  current: number;
  max: number;
  type: 'health' | 'shield';
}

const SegmentedBar: React.FC<SegmentedBarProps> = ({ current, max, type }) => {
  const activeSegments = max > 0 ? Math.ceil((current / max) * TOTAL_SEGMENTS) : 0;

  return (
    <div className="bar-wrapper">
      {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => (
        <div 
          key={index}
          className={`segment ${index < activeSegments ? `active ${type}` : ''}`}
        />
      ))}
    </div>
  );
};

interface UnitDisplayProps {
  name: string;
  currentHealth: number;
  maxHealth: number;
  currentShield: number;
  maxShield: number;
  alignment: 'left' | 'right';
}

const UnitDisplay: React.FC<UnitDisplayProps> = ({ 
  name, 
  currentHealth, 
  maxHealth, 
  currentShield, 
  maxShield, 
  alignment 
}) => {
  return (
    <div className={`unit-display ${alignment}`}>
      <div className="info-wrapper">
        <div className="unit-name-plate">{name}</div>
        <div className="all-bars-container">
          <SegmentedBar current={currentHealth} max={maxHealth} type="health" />
          {maxShield > 0 && <SegmentedBar current={currentShield} max={maxShield} type="shield" />}
        </div>
      </div>
      <div className="stats-text">
        <span>HP: {formatNumber(currentHealth)} / {formatNumber(maxHealth)}</span>
        {maxShield > 0 && <span> | SH: {formatNumber(currentShield)} / {formatNumber(maxShield)}</span>}
      </div>
    </div>
  );
};

export default UnitDisplay;