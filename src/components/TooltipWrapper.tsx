import React, { useState, ReactNode } from 'react';
import './TooltipWrapper.css';

interface TooltipWrapperProps {
  tooltipText: string;
  children: ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ tooltipText, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div 
          className="tooltip-container"
          style={{ 
            top: position.y + 15, // Pequeño offset para no tapar el cursor
            left: position.x + 15,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default TooltipWrapper;
