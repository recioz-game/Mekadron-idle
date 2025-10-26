// src/components/Game.tsx
import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import GameScene from './GameScene';
import AuroraMessage from './AuroraMessage';
import { useGameLoop } from '../hooks/useGameLoop';
import AuroraMessageHandler from './AuroraMessageHandler';

const Game: React.FC = () => {
  const { gameState, dispatch } = useGame();
  useGameLoop(dispatch);

  // Guardado automático en localStorage
  useEffect(() => {
    try {
      // Preparamos el estado para la serialización
      const stateToSave = {
        ...gameState,
        aurora: {
          ...gameState.aurora,
          // Convertimos el Set a un Array para que sea compatible con JSON
          shownMessages: Array.from(gameState.aurora.shownMessages),
        }
      };
      localStorage.setItem('mekadron-savegame', JSON.stringify(stateToSave));
    } catch (err) {
      console.error("No se pudo guardar la partida:", err);
    }
  }, [gameState]);

  // Listener para el botón debug del Centro Técnico
  useEffect(() => {
    const handleDebugUnlockTechCenter = () => {
        dispatch({ type: 'DEBUG_UNLOCK_TECH_CENTER' });
        dispatch({ type: 'ADD_AURORA_MESSAGE', payload: { message: "Modo desarrollo activado. Centro Técnico y Fundición desbloqueados.", messageKey: "debug_unlock" } });
    };

    window.addEventListener('debugUnlockTechCenter', handleDebugUnlockTechCenter);

    const handleResetGame = () => {
      dispatch({ type: 'RESET_GAME' });
      // También podrías querer redirigir al menú principal
      // O simplemente dejar que el estado reiniciado lo haga.
    };

    window.addEventListener('resetGame', handleResetGame);
    
    return () => {
      window.removeEventListener('debugUnlockTechCenter', handleDebugUnlockTechCenter);
      window.removeEventListener('resetGame', handleResetGame);
    };
  }, [dispatch]);

  return (
    <>
      <GameScene />
      <AuroraMessageHandler />
      {gameState.aurora.currentMessage && (
        <AuroraMessage
          message={gameState.aurora.currentMessage}
          onClose={() => dispatch({ type: 'CLOSE_AURORA_MESSAGE' })}
        />
      )}
    </>
  );
};

export default Game;