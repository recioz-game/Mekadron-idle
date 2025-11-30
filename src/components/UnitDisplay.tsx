// src/components/UnitDisplay.tsx
import React from 'react';
import './UnitDisplay.css';

interface SegmentedBarProps {
  current: number;
  max: number;
  type: 'health' | 'shield';
}

const SegmentedBar: React.FC<SegmentedBarProps> = ({ current, max, type }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  const segments = Array(10).fill(0);

  return (
    <div className={`segmented-bar-container ${type}`}>
      <div className="segmented-bar">
        {segments.map((_, index) => {
          const segmentValue = (index + 1) * 10;
          const isFilled = percentage >= segmentValue;
          const isPartial = percentage < segmentValue && percentage > index * 10;
          let partialWidth = '0%';
          if (isPartial) {
            partialWidth = `${((percentage - index * 10) / 10) * 100}%`;
          }

          return (
            <div key={index} className="segment">
              {isFilled ? (
                <div className={`segment-fill ${type}`} style={{ width: '100%' }}></div>
              ) : isPartial ? (
                <div className={`segment-fill ${type}`} style={{ width: partialWidth }}></div>
              ) : null}
            </div>
          );
        })}
      </div>
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

const UnitDisplay: React.FC<UnitDisplayProps> = ({ name, currentHealth, maxHealth, currentShield, maxShield, alignment }) => {
  const healthTen = maxHealth > 0 ? Math.ceil((currentHealth / maxHealth) * 10) : 0;

  return (
    <div className={`unit-display ${alignment}`}>
      <div className="unit-name-plate">{name}</div>
      <div className="bars-container">
        <div className="health-number">{healthTen}</div>
        <div className="all-bars">
          <SegmentedBar current={currentHealth} max={maxHealth} type="health" />
          {maxShield > 0 && <SegmentedBar current={currentShield} max={maxShield} type="shield" />}
        </div>
      </div>
    </div>
  );
};

export default UnitDisplay;
