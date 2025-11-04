// src/context/GameContext.tsx
import React, { createContext, useReducer, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { GameState, initialGameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { gameReducer } from './gameReducer';

interface FloatingTextData {
  id: number;
  text: string;
  x: number;
  y: number;
}

// Dividimos el contexto en dos para optimizar los re-renders
const GameStateContext = createContext<GameState | undefined>(undefined);
const GameDispatchContext = createContext<React.Dispatch<ActionType> | undefined>(undefined);
const FloatingTextContext = createContext<{
  showFloatingText: (text: string, x: number, y: number) => void;
  floatingTexts: FloatingTextData[];
} | undefined>(undefined);

// Función para calcular recursos generados durante la ausencia
const calculateOfflineResources = (loadedState: GameState): GameState => {
  const lastSaveTimestamp = loadedState.lastSaveTimestamp;

  if (!lastSaveTimestamp) {
    return loadedState; // No hay timestamp anterior, no calcular offline
  }

  const currentTime = Date.now();
  const timeElapsed = currentTime - lastSaveTimestamp;

  // Si pasó menos de 1 minuto, no calcular offline (evita cálculos innecesarios)
  if (timeElapsed < 60000) {
    return loadedState;
  }

  // Convertir tiempo transcurrido a segundos (el juego funciona por segundos)
  const secondsElapsed = Math.floor(timeElapsed / 1000);

  // Limitar el tiempo máximo offline (ej: 24 horas)
  const maxOfflineSeconds = 24 * 60 * 60; // 24 horas en segundos
  const effectiveSeconds = Math.min(secondsElapsed, maxOfflineSeconds);

  if (effectiveSeconds <= 0) {
    return loadedState;
  }

  console.log(`Calculando recursos offline por ${effectiveSeconds} segundos de ausencia`);

  // Crear una copia del estado para simular el cálculo
  let simulatedState = JSON.parse(JSON.stringify(loadedState));

  // OPTIMIZACIÓN: Usar cálculo directo en lugar de loop intensivo
  simulatedState = applyBulkOfflineProduction(simulatedState, effectiveSeconds);

  // Añadir mensaje de Aurora informando sobre los recursos generados
  if (effectiveSeconds > 60) { // Solo mostrar mensaje si estuvo fuera más de 1 minuto
    const hours = Math.floor(effectiveSeconds / 3600);
    const minutes = Math.floor((effectiveSeconds % 3600) / 60);

    let timeMessage = '';
    if (hours > 0) {
      timeMessage = `${hours}h ${minutes}m`;
    } else {
      timeMessage = `${minutes}m`;
    }

    const resourcesGained = {
      scrap: Math.floor(simulatedState.resources.scrap - loadedState.resources.scrap),
      metal: Math.floor(simulatedState.resources.metalRefinado - loadedState.resources.metalRefinado),
      steel: Math.floor(simulatedState.resources.aceroEstructural - loadedState.resources.aceroEstructural),
      research: Math.floor(simulatedState.techCenter.researchPoints - loadedState.techCenter.researchPoints)
    };

    // Solo mostrar mensaje si se generaron recursos significativos
    if (resourcesGained.scrap > 0 || resourcesGained.research > 0) {
      const message = `¡Bienvenido de vuelta! Durante tu ausencia de ${timeMessage}, generaste:\n` +
        (resourcesGained.scrap > 0 ? `• ${resourcesGained.scrap.toLocaleString()} chatarra\n` : '') +
        (resourcesGained.metal > 0 ? `• ${resourcesGained.metal.toLocaleString()} metal refinado\n` : '') +
        (resourcesGained.steel > 0 ? `• ${resourcesGained.steel.toLocaleString()} acero estructural\n` : '') +
        (resourcesGained.research > 0 ? `• ${resourcesGained.research.toLocaleString()} puntos de investigación` : '');

            // Añadir el mensaje a la cola de Aurora
      simulatedState.aurora.pendingMessages.push({
        message: message.trim(),
        key: `offline_production_${Date.now()}`
      });
    }
  }

  // Actualizar el timestamp
  simulatedState.lastSaveTimestamp = currentTime;

  return simulatedState;
};

// Función para simular un tick individual del juego
const simulateGameTick = (state: GameState): GameState => {
  // Esta es una versión simplificada del GAME_TICK del reducer
  // Solo calculamos los recursos básicos para evitar complejidades

  const { upgrades } = state.techCenter;
  const { drones, energy, resources } = state;

  // Cálculo de producción de energía
  const powerOptimizationMultiplier = 1 - (upgrades.powerOptimization * 0.05);
  const totalEnergyConsumption = (drones.basic * 1 + drones.medium * 3 + drones.advanced * 5 +
    drones.reinforcedBasic * 3 + drones.reinforcedMedium * 6 + drones.reinforcedAdvanced * 12 +
    drones.golem * 50 + drones.wyrm * 200) * powerOptimizationMultiplier;

  const energyEfficiencyMultiplier = 1 + (upgrades.energyEfficiency * 0.10);
  const coreEfficiencyMultiplier = 1 + (upgrades.coreEfficiency * 0.10);
  const totalEnergyProduction = (energy.solarPanels * 3 + energy.mediumSolarPanels * 10 +
    energy.advancedSolar * 30) * energyEfficiencyMultiplier +
    (energy.energyCores * 50) * coreEfficiencyMultiplier;

  // Cálculo de producción de chatarra
  const collectionMultiplier = 1 + (upgrades.collectionEfficiency * 0.10);
  const hasEnoughEnergy = resources.energy > 0;
  const totalScrapProduction = hasEnoughEnergy ?
    (drones.basic * 1 + drones.medium * 5 + drones.advanced * 20 +
     drones.reinforcedBasic * 8 + drones.reinforcedMedium * 25 +
     drones.reinforcedAdvanced * 80 + drones.golem * 500) * collectionMultiplier : 0;

  // Cálculo de producción de materiales por Wyrms
  const wyrmMetalProduction = hasEnoughEnergy ? drones.wyrm * 1 : 0;
  const wyrmSteelProduction = hasEnoughEnergy ? drones.wyrm * 0.1 : 0;

  // Actualizar recursos
  const newEnergy = Math.max(0, Math.min(
    resources.energy + (totalEnergyProduction - totalEnergyConsumption),
    resources.maxEnergy
  ));

  const newScrap = Math.min(
    resources.scrap + totalScrapProduction,
    resources.maxScrap
  );

  const newMetalRefinado = resources.metalRefinado + wyrmMetalProduction;
  const newAceroEstructural = resources.aceroEstructural + wyrmSteelProduction;

  // Cálculo de puntos de investigación
  const baseResearch = 0.1 * (1 + (upgrades.researchEfficiency * 0.20));
  const totalDrones = Object.values(drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.01) * (1 + (upgrades.advancedAnalysis * 0.10));
  const energySurplus = Math.max(0, resources.energy - totalEnergyConsumption);
  const energyResearch = (energySurplus * 0.005) * (1 + (upgrades.algorithmOptimization * 0.15));
  const researchPointsToAdd = (baseResearch + droneResearch + energyResearch) /
    (1 - (upgrades.quantumComputing * 0.05));

  return {
    ...state,
    resources: {
      ...resources,
      scrap: newScrap,
      metalRefinado: newMetalRefinado,
      aceroEstructural: newAceroEstructural,
      energy: newEnergy,
      energyConsumption: totalEnergyConsumption,
      energyProduction: totalEnergyProduction,
    },
    rates: { ...state.rates, scrapPerSecond: totalScrapProduction },
    techCenter: {
      ...state.techCenter,
      researchPoints: state.techCenter.researchPoints + researchPointsToAdd,
    },
  };
};

// Función para aplicar producción en bloques grandes (optimización)
const applyBulkOfflineProduction = (state: GameState, seconds: number): GameState => {
  const { upgrades } = state.techCenter;
  const { drones, energy, resources } = state;

  // Cálculos similares pero multiplicados por el tiempo
  const powerOptimizationMultiplier = 1 - (upgrades.powerOptimization * 0.05);
  const totalEnergyConsumption = (drones.basic * 1 + drones.medium * 3 + drones.advanced * 5 +
    drones.reinforcedBasic * 3 + drones.reinforcedMedium * 6 + drones.reinforcedAdvanced * 12 +
    drones.golem * 50 + drones.wyrm * 200) * powerOptimizationMultiplier;

  const energyEfficiencyMultiplier = 1 + (upgrades.energyEfficiency * 0.10);
  const coreEfficiencyMultiplier = 1 + (upgrades.coreEfficiency * 0.10);
  const totalEnergyProduction = (energy.solarPanels * 3 + energy.mediumSolarPanels * 10 +
    energy.advancedSolar * 30) * energyEfficiencyMultiplier +
    (energy.energyCores * 50) * coreEfficiencyMultiplier;

  const collectionMultiplier = 1 + (upgrades.collectionEfficiency * 0.10);
  const hasEnoughEnergy = resources.energy > 0;

  // Producción total durante el tiempo offline
  const totalScrapProduction = hasEnoughEnergy ?
    (drones.basic * 1 + drones.medium * 5 + drones.advanced * 20 +
     drones.reinforcedBasic * 8 + drones.reinforcedMedium * 25 +
     drones.reinforcedAdvanced * 80 + drones.golem * 500) * collectionMultiplier * seconds : 0;

  const wyrmMetalProduction = hasEnoughEnergy ? drones.wyrm * 1 * seconds : 0;
  const wyrmSteelProduction = hasEnoughEnergy ? drones.wyrm * 0.1 * seconds : 0;

  // Cálculo de energía neta (puede ser negativo si el consumo es mayor)
  const netEnergyChange = (totalEnergyProduction - totalEnergyConsumption) * seconds;

  // Actualizar recursos
  const newEnergy = Math.max(0, Math.min(
    resources.energy + netEnergyChange,
    resources.maxEnergy
  ));

  const newScrap = Math.min(
    resources.scrap + totalScrapProduction,
    resources.maxScrap
  );

  const newMetalRefinado = resources.metalRefinado + wyrmMetalProduction;
  const newAceroEstructural = resources.aceroEstructural + wyrmSteelProduction;

  // Cálculo de investigación
  const baseResearch = 0.1 * (1 + (upgrades.researchEfficiency * 0.20));
  const totalDrones = Object.values(drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.01) * (1 + (upgrades.advancedAnalysis * 0.10));
  const energySurplus = Math.max(0, resources.energy - totalEnergyConsumption);
  const energyResearch = (energySurplus * 0.005) * (1 + (upgrades.algorithmOptimization * 0.15));
  const researchPointsToAdd = ((baseResearch + droneResearch + energyResearch) /
    (1 - (upgrades.quantumComputing * 0.05))) * seconds;

  return {
    ...state,
    resources: {
      ...resources,
      scrap: newScrap,
      metalRefinado: newMetalRefinado,
      aceroEstructural: newAceroEstructural,
      energy: newEnergy,
      energyConsumption: totalEnergyConsumption,
      energyProduction: totalEnergyProduction,
    },
    techCenter: {
      ...state.techCenter,
      researchPoints: state.techCenter.researchPoints + researchPointsToAdd,
    },
  };
};

// Carga el estado inicial, intentando recuperarlo de localStorage
const loadState = (): GameState => {
  try {
    const serializedState = localStorage.getItem('mekadron-savegame');
    if (serializedState === null) {
      return initialGameState;
    }
            const storedState = JSON.parse(serializedState);

    // --- MIGRACIÓN DE DATOS DE AURORA ---
    // Comprobar si es un guardado antiguo y migrar la estructura de Aurora
    if (storedState.aurora && (storedState.aurora.currentMessage || storedState.aurora.messageQueue)) {
      console.log("Detectado guardado antiguo de Aurora. Migrando...");
      const migratedPendingMessages = [];
      if (storedState.aurora.currentMessage) {
        migratedPendingMessages.push({
          message: storedState.aurora.currentMessage,
          key: `migrated_${Date.now()}` // Asignar una clave genérica
        });
      }
      if (Array.isArray(storedState.aurora.messageQueue)) {
        migratedPendingMessages.push(...storedState.aurora.messageQueue);
      }

      // Crear la nueva estructura y limpiar la vieja
      storedState.aurora.activeMessages = [];
      storedState.aurora.pendingMessages = migratedPendingMessages;
      delete storedState.aurora.currentMessage;
      delete storedState.aurora.messageQueue;
    }

    // Rehidratar el Set de mensajes de Aurora que se pierde en la serialización
    if (storedState.aurora && Array.isArray(storedState.aurora.shownMessages)) {
      storedState.aurora.shownMessages = new Set(storedState.aurora.shownMessages);
    } else if (storedState.aurora) {
      // Si existe pero no es un array (por un guardado antiguo o corrupto), se resetea
      storedState.aurora.shownMessages = new Set();
    }

            // Fusionar el estado guardado con el inicial de forma profunda para asegurar compatibilidad.
    // Esto previene errores cuando se añaden nuevas propiedades (recursos, colas, etc.) al juego.
    const mergedState = {
      ...initialGameState,
      ...storedState,
      resources: { ...initialGameState.resources, ...(storedState.resources || {}) },
      drones: { ...initialGameState.drones, ...(storedState.drones || {}) },
      workshop: { ...initialGameState.workshop, ...(storedState.workshop || {}), queues: { ...initialGameState.workshop.queues, ...(storedState.workshop?.queues || {}) } },
      energy: { ...initialGameState.energy, ...(storedState.energy || {}), queues: { ...initialGameState.energy.queues, ...(storedState.energy?.queues || {}) } },
      storage: { ...initialGameState.storage, ...(storedState.storage || {}), queues: { ...initialGameState.storage.queues, ...(storedState.storage?.queues || {}) } },
      foundry: { ...initialGameState.foundry, ...(storedState.foundry || {}), queues: { ...initialGameState.foundry.queues, ...(storedState.foundry?.queues || {}) } },
      techCenter: { ...initialGameState.techCenter, ...(storedState.techCenter || {}), upgrades: { ...initialGameState.techCenter.upgrades, ...(storedState.techCenter?.upgrades || {}) } },
      aurora: { ...initialGameState.aurora, ...(storedState.aurora || {}) },
      battleRoom: { ...initialGameState.battleRoom, ...(storedState.battleRoom || {}) },
      shipyard: { ...initialGameState.shipyard, ...(storedState.shipyard || {}) },
      vindicator: { ...initialGameState.vindicator, ...(storedState.vindicator || {}) },
    };
    
    // La rehidratación del Set se hace sobre el estado ya fusionado para mayor seguridad
    if (mergedState.aurora && Array.isArray(mergedState.aurora.shownMessages)) {
      mergedState.aurora.shownMessages = new Set(mergedState.aurora.shownMessages);
    }

    // Calcular recursos generados durante la ausencia
    return calculateOfflineResources(mergedState);
  } catch (err) {
    console.error("No se pudo cargar la partida guardada:", err);
    return initialGameState;
  }
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, loadState());
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextData[]>([]);

  const showFloatingText = useCallback((text: string, x: number, y: number) => {
    const newText: FloatingTextData = {
      id: Date.now(),
      text,
      x,
      y,
    };
    setFloatingTexts(currentTexts => [...currentTexts, newText]);
  }, []);

  // Limpia los textos después de que la animación termine
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingTexts(currentTexts => currentTexts.filter(t => (Date.now() - t.id) < 1500)); // 1.5s
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
        <GameStateContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        <FloatingTextContext.Provider value={{ showFloatingText, floatingTexts }}>
          {children}
        </FloatingTextContext.Provider>
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};

export const useGameDispatch = () => {
  const context = useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return context;
};

export const useFloatingText = () => {
  const context = useContext(FloatingTextContext);
  if (context === undefined) {
    throw new Error('useFloatingText must be used within a GameProvider');
  }
  return context;
};

// Hook combinado para componentes que realmente necesitan ambos (usar con moderación)
export const useGame = () => {
  return {
    gameState: useGameState(),
    dispatch: useGameDispatch(),
    ...useFloatingText(),
  };
};

