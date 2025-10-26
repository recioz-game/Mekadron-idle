import React from 'react';

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
      backgroundColor: '#0F172A', // Azul petróleo del GDD
      color: '#E5E7EB' // Texto principal
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '2rem',
        fontFamily: 'Orbitron, sans-serif' // Fuente futurista
      }}>
        Mekadron Idle
      </h1>
      <button 
        onClick={onStartGame}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#06B6D4', // Cian técnico
          color: '#0F172A',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        Jugar
      </button>
    </div>
  );
};

export default StartMenu;