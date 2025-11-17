import React, { useState } from 'react';
import './Phase2Scene.css'; // Importar el archivo CSS
import phase2BackgroundUrl from '../assets/images/backgrounds/Vindicator-background.png';
import SettingsMenu from './SettingsMenu';
import Phase2ResourceBar from './Phase2ResourceBar';
import { useGame } from '../context/GameContext';
import BattleRoom from './BattleRoom';
import Armory from './Armory';
import { Bodega } from './Bodega';

// Importar las imágenes para los botones
import battleRoomImage from '../assets/images/ui/battle-room-button.png';
import armoryImage from '../assets/images/ui/armory-button.png';
import bodegaButtonIcon from '../assets/images/ui/bodega-button.png';
import returnStationImage from '../assets/images/ui/return-station-button.png';

const Phase2Scene: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { vindicator, currentView } = gameState;

  const handleCloseView = () => {
    dispatch({ type: 'CLOSE_CURRENT_VIEW' });
  };

  return (
    <div className="phase2-scene-container" style={{ backgroundImage: `url(${phase2BackgroundUrl})` }}>
      {/* 1. Barra de Recursos Simplificada para Fase 2 */}
          <Phase2ResourceBar />
      
      <div className="main-content">
        {/* 2. Área de Contenido Principal */}
        <div className="content-area">
          {currentView === 'battleRoom' && <BattleRoom onClose={handleCloseView} />}
          {currentView === 'armory' && <Armory onClose={handleCloseView} />}
          {currentView === 'bodega' && <Bodega />}
        </div>
        
        {/* 3. Panel de Módulos */}
        <div className="modules-panel">
          {/* Módulos de Fase 2 - Ahora con imágenes sin texto ni bordes */}
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'battleRoom' })}
            className={`image-button ${currentView === 'battleRoom' ? 'active' : ''}`}
          >
            <img src={battleRoomImage} alt="Sala de Batalla" className="button-image" />
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'armory' })}
            className={`image-button ${currentView === 'armory' ? 'active' : ''}`}
          >
            <img src={armoryImage} alt="Armería" className="button-image" />
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'bodega' })}
            className={`image-button ${currentView === 'bodega' ? 'active' : ''}`}
          >
            <img src={bodegaButtonIcon} alt="Bodega" className="button-image" />
          </button>

          {/* Navegación - Ahora con imagen */}
          <button
            onClick={() => dispatch({ type: 'RETURN_TO_PHASE_1' })}
            className="image-button"
          >
            <img src={returnStationImage} alt="Volver a la Estación" className="button-image" />
          </button>
        </div>
      </div>

      <SettingsMenu />
    </div>
  );
};

export default Phase2Scene;
