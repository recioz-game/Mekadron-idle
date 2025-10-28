import React from 'react';
import coverImageUrl from '../assets/cover.png';
import playButtonUrl from '../assets/play-button.png';

interface StartMenuProps {
  onStartGame: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onStartGame }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
            height: '100vh',
                  backgroundColor: '#0F172A',
      color: '#E5E7EB',
      backgroundImage: `url(${coverImageUrl})`,
            backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
            <button 
        onClick={onStartGame}
        style={{
          background: `url(${playButtonUrl}) no-repeat center center`,
          backgroundSize: 'contain',
          width: '200px',
          height: '80px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: '73%',
          left: '47%',
          transform: 'translate(-50%, -50%)'
        }}
        aria-label="Jugar"
      />
    </div>
  );
};

export default StartMenu;