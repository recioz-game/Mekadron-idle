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

interface GameContextProps {
  gameState: GameState;
  dispatch: React.Dispatch<ActionType>;
  showFloatingText: (text: string, x: number, y: number) => void;
  floatingTexts: FloatingTextData[];
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

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

  // Simular múltiples ticks de juego
  const ticksToSimulate = Math.min(effectiveSeconds, 3600); // Máximo 1 hora de ticks individuales

  for (let i = 0; i < ticksToSimulate; i++) {
    simulatedState = simulateGameTick(simulatedState);
  }

  // Si hay más tiempo, calcular el resto en bloques más grandes
  if (effectiveSeconds > ticksToSimulate) {
    const remainingSeconds = effectiveSeconds - ticksToSimulate;
    simulatedState = applyBulkOfflineProduction(simulatedState, remainingSeconds);
  }

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
      simulatedState.aurora.messageQueue.push({
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

    // Fusionar el estado guardado con el inicial para asegurar compatibilidad
    const mergedState = { ...initialGameState, ...storedState };

    // Recuperar el Set de mensajes de Aurora que no es serializable por defecto
    // Asegurar que shownMessages sea siempre un Set
    if (Array.isArray(storedState.aurora?.shownMessages)) {
      mergedState.aurora.shownMessages = new Set(storedState.aurora.shownMessages);
    } else if (storedState.aurora?.shownMessages instanceof Set) {
      mergedState.aurora.shownMessages = storedState.aurora.shownMessages;
    } else {
      mergedState.aurora.shownMessages = new Set();
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
    <GameContext.Provider value={{ gameState, dispatch, showFloatingText, floatingTexts }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

