import React, { useState } from 'react';

const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDebugUnlock = () => {
    const event = new CustomEvent('debugUnlockTechCenter');
    window.dispatchEvent(event);
    setIsOpen(false); // Cerrar el menú después de hacer clic
  };

  const handleResetGame = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo el progreso? Esta acción no se puede deshacer.')) {
      const event = new CustomEvent('resetGame');
      window.dispatchEvent(event);
      setIsOpen(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      zIndex: 1000,
      fontFamily: 'Inter, sans-serif'
    }}>
      {isOpen && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#111827',
          borderRadius: '8px',
          border: '2px solid #374151',
          marginBottom: '0.5rem',
          width: '200px'
        }}>
          <strong style={{ color: '#EF4444', fontSize: '0.9rem' }}>AJUSTES DE DESARROLLO</strong>
          <button 
            onClick={handleDebugUnlock}
            style={{
              padding: '0.5rem',
              backgroundColor: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginTop: '1rem',
              width: '100%'
            }}
          >
            Desbloquear Módulos
          </button>
          <button 
            onClick={handleResetGame}
            style={{
              padding: '0.5rem',
              backgroundColor: '#991B1B', // Un rojo más oscuro
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              width: '100%'
            }}
          >
            Reiniciar Juego
          </button>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Ajustes"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid #374151',
          backgroundColor: '#1F2937',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ⚙️
      </button>
    </div>
  );
};

export default SettingsMenu;
