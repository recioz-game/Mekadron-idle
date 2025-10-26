import React, { useState } from 'react';

interface BotonConTooltipProps {
  onClick: () => void;
  disabled: boolean;
  tooltipText: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const BotonConTooltip: React.FC<BotonConTooltipProps> = ({ 
  onClick, 
  disabled, 
  tooltipText, 
  children,
  style
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const buttonStyle: React.CSSProperties = {
    ...style,
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative', 
  };
  
  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '125%', 
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1F2937',
    color: '#E5E7EB',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #4B5563',
    zIndex: 10,
    width: 'max-content',
    textAlign: 'center',
    visibility: showTooltip && disabled ? 'visible' : 'hidden',
    opacity: showTooltip && disabled ? 1 : 0,
    transition: 'opacity 0.2s',
  };

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        style={buttonStyle}
      >
        {children}
      </button>
      <div style={tooltipStyle}>
        {tooltipText}
      </div>
    </div>
  );
};

export default BotonConTooltip;