import React from 'react';
import phase2BackgroundUrl from '../assets/phase2-background.png';
import SettingsMenu from './SettingsMenu';
import Phase2ResourceBar from './Phase2ResourceBar';
import { useGame } from '../context/GameContext';
import BattleRoom from './BattleRoom';
import Armory from './Armory';

const Phase2Scene: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { resources, currentView } = gameState;

  const handleCloseView = () => {
    dispatch({ type: 'CLOSE_CURRENT_VIEW' });
  };

  return (
    <div style={{
      backgroundImage: `url(${phase2BackgroundUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#E5E7EB',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 1. Barra de Recursos Simplificada para Fase 2 */}
      <Phase2ResourceBar
        metalRefinado={resources.metalRefinado}
        aceroEstructural={resources.aceroEstructural}
        placasCasco={resources.placasCasco}
        cableadoSuperconductor={resources.cableadoSuperconductor}
        aleacionReforzada={resources.aleacionReforzada}
        neuroChipCorrupto={resources.neuroChipCorrupto}
        barraCombustible={resources.barraCombustible}
      />
      
      <div style={{
        flex: 1,
        display: 'flex'
      }}>
        {/* 2. Área de Contenido Principal */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          {currentView === 'battleRoom' && <BattleRoom onClose={handleCloseView} />}
          {currentView === 'armory' && <Armory onClose={handleCloseView} />}
        </div>
        
        {/* 3. Panel de Módulos */}
        <div style={{
          backgroundColor: 'rgba(31, 41, 55, 0.8)', // Fondo semitransparente
          padding: '1rem',
          width: '300px',
          borderLeft: '2px solid #374151',
          backdropFilter: 'blur(5px)' // Efecto de desenfoque para mejor legibilidad
        }}>
          <h3 style={{ 
            color: '#93C5FD',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Vindicator
          </h3>
          {/* Módulos de Fase 2 */}
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'battleRoom' })}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: currentView === 'battleRoom' ? '#F59E0B' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '0.5rem',
              width: '100%',
              textAlign: 'left'
            }}
          >
            ⚔️ Sala de Batalla
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'armory' })}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: currentView === 'armory' ? '#F59E0B' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '0.5rem',
              width: '100%',
              textAlign: 'left'
            }}
          >
            🛡️ Armería
          </button>

          {/* Navegación */}
          <button
            onClick={() => dispatch({ type: 'RETURN_TO_PHASE_1' })}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem',
              width: '100%',
              textAlign: 'left'
            }}
          >
            🛰️ Volver a la Estación
          </button>
        </div>
      </div>

      <SettingsMenu />
    </div>
  );
};

export default Phase2Scene;
