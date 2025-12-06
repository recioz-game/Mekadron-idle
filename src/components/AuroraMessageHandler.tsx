import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const AuroraMessageHandler: React.FC = () => {
  const { gameState, dispatch } = useGame();

  // Gestiona el mensaje de bienvenida y el tutorial guiado para nuevos jugadores.
  useEffect(() => {
    const { aurora, currentScene, energy, workshop } = gameState;
    const { shownMessages, pendingMessages, activeMessages } = aurora;

    // Si ya hay mensajes activos o en cola, no hacer nada para evitar añadir mensajes duplicados o seguidos.
    if (pendingMessages.length > 0 || activeMessages.length > 0) {
      return;
    }

    const safeShownMessages = shownMessages instanceof Set ? shownMessages : new Set();

    const addAuroraMessage = (message: string, key: string, audioId?: number) => {
      dispatch({ type: 'ADD_AURORA_MESSAGE', payload: { message, messageKey: key, audioId } });
    };

    if (currentScene !== 'main') return;

    // Paso 1: Mensaje de bienvenida SOLO si es una partida realmente nueva
    if (
      !safeShownMessages.has("welcome_message") &&
      gameState.workshop.drones.basic === 0 &&
      gameState.energy.solarPanels === 0 &&
      gameState.resources.scrap < 50
    ) {
      addAuroraMessage("Bienvenido, es hora de recoger chatarra.", "welcome_message", 1);
      return;
    }

    // Paso 2: Guía para construir el panel solar (se muestra DESPUÉS del de bienvenida)
    if (safeShownMessages.has("welcome_message") && !safeShownMessages.has("tutorial_step_1")) {
      addAuroraMessage("Nuestra primera prioridad es la energía. Construye un Panel Solar para empezar la restauración.", "tutorial_step_1");
      return;
    }

    // Paso 3: Guía para construir el dron (después de construir un panel)
    if (safeShownMessages.has("tutorial_step_1") && !safeShownMessages.has("tutorial_step_2")) {
      if (energy.solarPanels > 0) {
        addAuroraMessage("Excelente. Con la energía estabilizándose, ahora necesitamos recursos. Construye un Dron Básico en el Taller.", "tutorial_step_2");
        return;
      }
    }
    
    // Paso 4: Guía de vuelta a las misiones (después de construir un dron)
    if (safeShownMessages.has("tutorial_step_2") && !safeShownMessages.has("tutorial_step_3")) {
      if (workshop.drones.basic > 0) {
        addAuroraMessage("Buen trabajo. El dron recolectará chatarra automáticamente. Revisa el panel de Misiones para ver tus siguientes objetivos.", "tutorial_step_3");
        return;
      }
    }

  }, [gameState, dispatch]);

  return null;
};

export default AuroraMessageHandler;