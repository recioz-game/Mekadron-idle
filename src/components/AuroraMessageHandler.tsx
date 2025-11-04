import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const AuroraMessageHandler: React.FC = () => {
  const { gameState, dispatch } = useGame();

  // Muestra un único mensaje de bienvenida al empezar el juego.
  useEffect(() => {
    const { aurora, currentScene } = gameState;
    const { shownMessages } = aurora;

    const safeShownMessages = shownMessages instanceof Set ? shownMessages : new Set();

    const addAuroraMessage = (message: string, key: string) => {
      dispatch({ type: 'ADD_AURORA_MESSAGE', payload: { message, messageKey: key } });
    };

    if (currentScene === 'main' && !safeShownMessages.has("initial_welcome")) {
      addAuroraMessage("Bienvenido, técnico. Los sistemas primarios están fuera de línea. Consulta las misiones para empezar la restauración.", "initial_welcome");
    }
  }, [gameState.currentScene, gameState.aurora.shownMessages, dispatch]);

  return null;
};

export default AuroraMessageHandler;

