import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const SettingsMenu: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const { volume } = gameState.settings;

  const handleVolumeChange = (newVolume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
  };

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

  const handleDebugCompleteVindicator = () => {
    const event = new CustomEvent('debugCompleteVindicator');
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  const handleDebugFinishExpeditions = () => {
    const event = new CustomEvent('debugFinishExpeditions');
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      zIndex: 1000,
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    }}>
      {isOpen && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#111827',
          borderRadius: '8px',
          border: '2px solid #374151',
          marginBottom: '0.5rem',
          width: '220px' // Ancho aumentado para acomodar los nuevos elementos
        }}>
          {/* --- SECCIÓN DE AJUSTES GENERALES --- */}
          <strong style={{ color: '#E5E7EB', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>AJUSTES</strong>

          {/* Control de Volumen */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="volume-slider" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Volumen: {volume}%
            </label>
                        <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Botón de Créditos */}
          <button
            onClick={() => { /* Lógica de créditos aquí */ alert("Créditos: Próximamente..."); setIsOpen(false); }}
            style={{
              padding: '0.5rem',
              backgroundColor: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              width: '100%',
              marginBottom: '1rem'
            }}
          >
            Créditos
          </button>
          
          <hr style={{ border: 'none', borderBottom: '1px solid #374151', marginBottom: '1rem' }} />

          {/* --- SECCIÓN DE DESARROLLO --- */}
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
            onClick={handleDebugCompleteVindicator}
            style={{
              padding: '0.5rem',
              backgroundColor: '#F59E0B', // Amarillo
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              width: '100%'
            }}
          >
            Completar Vindicator
          </button>
          <button
            onClick={handleDebugFinishExpeditions}
            style={{
              padding: '0.5rem',
              backgroundColor: '#10B981', // Verde
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              width: '100%'
            }}
          >
            Finalizar Expediciones
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
          
          {/* Botón de Salir */}
          <button
            onClick={() => {
              if (window.confirm('¿Estás seguro de que quieres salir del juego?')) {
                window.close(); // Cierra la ventana/pestaña
              }
            }}
            style={{
              padding: '0.5rem',
              backgroundColor: '#1E40AF', // Azul
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              width: '100%'
            }}
                    >
            Salir
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



