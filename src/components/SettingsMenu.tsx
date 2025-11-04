import React, { useState } from 'react';
import './SettingsMenu.css'; // Importar el archivo CSS
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
    <div className="settings-menu-container">
      {isOpen && (
        <div className="settings-menu-content">
          {/* --- SECCIÓN DE AJUSTES GENERALES --- */}
          <strong className="settings-section-title">AJUSTES</strong>

          {/* Control de Volumen */}
          <div className="volume-control">
            <label htmlFor="volume-slider">
              Volumen: {volume}%
            </label>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
            />
          </div>

          {/* Botón de Créditos */}
          <button
            onClick={() => { /* Lógica de créditos aquí */ alert("Créditos: Próximamente..."); setIsOpen(false); }}
            className="settings-button credits-button"
          >
            Créditos
          </button>
          
          <hr style={{ border: 'none', borderBottom: '1px solid #374151', marginBottom: '1rem' }} />

          {/* --- SECCIÓN DE DESARROLLO --- */}
          <strong className="dev-section-title">AJUSTES DE DESARROLLO</strong>
          <button
            onClick={handleDebugUnlock}
            className="dev-button unlock-button"
          >
            Desbloquear Módulos
          </button>
          <button
            onClick={handleDebugCompleteVindicator}
            className="dev-button complete-vindicator-button"
          >
            Completar Vindicator
          </button>
          <button
            onClick={handleDebugFinishExpeditions}
            className="dev-button finish-expeditions-button"
          >
            Finalizar Expediciones
          </button>
          <button
            onClick={handleResetGame}
            className="dev-button reset-button"
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
            className="dev-button exit-button"
          >
            Salir
          </button>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Ajustes"
        className="settings-toggle-button"
      >
        ⚙️
      </button>
    </div>
  );
};

export default SettingsMenu;



