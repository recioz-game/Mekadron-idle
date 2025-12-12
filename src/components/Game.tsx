// src/components/Game.tsx
import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import GameScene from './GameScene';
import AuroraMessage from './AuroraMessage';
import AuroraMessageHandler from './AuroraMessageHandler'; // <-- AÑADIR IMPORTACIÓN
import { TICK_INTERVAL } from '../data/gameConfig';
import { encryptData } from '../utils/encryption';

const Game: React.FC = () => {
        const { gameState, dispatch } = useGame();
  const lastTick = useRef<number | null>(null);

  // Game loop
  useEffect(() => {
    let frameId: number;

    const gameLoop = (timestamp: number) => {
      if (lastTick.current === null) {
        lastTick.current = timestamp;
      }
      const delta = timestamp - lastTick.current;
      if (delta >= TICK_INTERVAL) {
        const ticksToProcess = Math.floor(delta / TICK_INTERVAL);
        lastTick.current = timestamp - (delta % TICK_INTERVAL);
        for (let i = 0; i < ticksToProcess; i++) {
          dispatch({ type: 'GAME_TICK' });
        }
      }
      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameId);
  }, [dispatch]);

  // Guardado automático en localStorage
  useEffect(() => {
    try {
            // Preparamos el estado para la serialización
      const stateToSave = {
        ...gameState,
        lastSaveTimestamp: Date.now(),
        aurora: {
          ...gameState.aurora,
          // Convertimos el Set a un Array para que sea compatible con JSON
          shownMessages: Array.from(gameState.aurora.shownMessages),
        }
      };
      localStorage.setItem('mekadron-savegame', encryptData(stateToSave));
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

    const handleDebugCompleteVindicator = () => {
      dispatch({ type: 'DEBUG_COMPLETE_VINDICATOR' });
      dispatch({ type: 'ADD_AURORA_MESSAGE', payload: { message: "Modo desarrollo: 'Vindicator' completado.", messageKey: "debug_vindicator" } });
    };

    const handleDebugFinishExpeditions = () => {
      dispatch({ type: 'DEBUG_FINISH_EXPEDITIONS' });
                  dispatch({ type: 'ADD_AURORA_MESSAGE', payload: { message: "Modo desarrollo: Expediciones en curso finalizadas.", messageKey: "debug_expeditions" } });
    };

    window.addEventListener('debugCompleteVindicator', handleDebugCompleteVindicator);
    window.addEventListener('debugFinishExpeditions', handleDebugFinishExpeditions);
    
    return () => {
      window.removeEventListener('debugUnlockTechCenter', handleDebugUnlockTechCenter);
      window.removeEventListener('debugCompleteVindicator', handleDebugCompleteVindicator);
      window.removeEventListener('debugFinishExpeditions', handleDebugFinishExpeditions);
    };
  }, [dispatch]);

    // Procesador de la cola de mensajes de Aurora
  useEffect(() => {
    const interval = setInterval(() => {
      // Solo procesar si no hay demasiados mensajes en pantalla
      if (gameState.aurora.pendingMessages.length > 0 && gameState.aurora.activeMessages.length < 3) {
        dispatch({ type: 'PROCESS_AURORA_QUEUE' });
      }
    }, 1000); // Comprobar cada segundo

    return () => clearInterval(interval);
  }, [gameState.aurora.pendingMessages.length, gameState.aurora.activeMessages.length, dispatch]);

      return (
    <>
      <AuroraMessageHandler /> 
      <GameScene />
      <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000 }}>
        {gameState.aurora.activeMessages.map((msg, index) => (
          <div key={msg.id} style={{ marginBottom: index > 0 ? '1.6rem' : '0' }}>
            <AuroraMessage
                            message={msg.text}
              audioId={msg.audioId}
              onClose={() => dispatch({ type: 'REMOVE_AURORA_MESSAGE', payload: { messageId: msg.id } })}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;