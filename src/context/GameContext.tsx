// src/context/GameContext.tsx
import React, { createContext, useReducer, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { GameState, initialGameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { gameReducer } from './gameReducer';
import { deepMerge, rehydrateState } from './contextUtils';

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
            metal: Math.floor(simulatedState.vindicator.bodegaResources.metalRefinado - loadedState.vindicator.bodegaResources.metalRefinado),
      steel: Math.floor(simulatedState.vindicator.bodegaResources.aceroEstructural - loadedState.vindicator.bodegaResources.aceroEstructural),
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
        key: 'offline_production_welcome_back'
      });
    }
  }

  // Actualizar el timestamp
  simulatedState.lastSaveTimestamp = currentTime;

  return simulatedState;
};



// Función para aplicar producción en bloques grandes (optimización)
const applyBulkOfflineProduction = (state: GameState, seconds: number): GameState => {
  const { upgrades } = state.techCenter;
  const { workshop, energy, resources } = state;
  const { drones } = workshop;

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

  const newMetalRefinado = state.vindicator.bodegaResources.metalRefinado + wyrmMetalProduction;
  const newAceroEstructural = state.vindicator.bodegaResources.aceroEstructural + wyrmSteelProduction;

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
      energy: newEnergy,
      energyConsumption: totalEnergyConsumption,
      energyProduction: totalEnergyProduction,
    },
    vindicator: {
      ...state.vindicator,
      bodegaResources: {
        ...state.vindicator.bodegaResources,
        metalRefinado: newMetalRefinado,
        aceroEstructural: newAceroEstructural,
      }
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

    // --- MIGRACIÓN DE DATOS ESTRUCTURAL: workshop.drones ---
    if (storedState.drones && !storedState.workshop?.drones) {
      if (!storedState.workshop) {
        storedState.workshop = { ...initialGameState.workshop };
      }
      storedState.workshop.drones = storedState.drones;
      delete storedState.drones;
    }

    // --- MIGRACIÓN DE DATOS DE AURORA ---
    if (storedState.aurora && (storedState.aurora.currentMessage || storedState.aurora.messageQueue)) {
      const migratedPendingMessages = [];
      if (storedState.aurora.currentMessage) {
        migratedPendingMessages.push({
          message: storedState.aurora.currentMessage,
          key: `migrated_${Date.now()}`
        });
      }
      if (Array.isArray(storedState.aurora.messageQueue)) {
        migratedPendingMessages.push(...storedState.aurora.messageQueue);
      }
      storedState.aurora.activeMessages = [];
      storedState.aurora.pendingMessages = migratedPendingMessages;
      delete storedState.aurora.currentMessage;
      delete storedState.aurora.messageQueue;
    }

    // --- MIGRACIÓN DE DATOS DE SHIPYARD ---
    if (!storedState.shipyard?.progress) {
      if (!storedState.shipyard) {
        storedState.shipyard = { ...initialGameState.shipyard };
      }
      storedState.shipyard.progress = { ...initialGameState.shipyard.progress };
    }

    // --- MIGRACIÓN DE DATOS DE BODEGA ---
    if (storedState.vindicator && storedState.vindicator.bodega) {
      if (!storedState.vindicator.bodegaResources) {
        storedState.vindicator.bodegaResources = storedState.vindicator.bodega.resources;
      }
      delete storedState.vindicator.bodega;
    }
    if (storedState.resources.metalRefinado) { // Mover recursos de la raíz a la bodega
      if (!storedState.vindicator.bodegaResources) {
        storedState.vindicator.bodegaResources = initialGameState.vindicator.bodegaResources;
      }
      Object.keys(initialGameState.vindicator.bodegaResources).forEach(key => {
        if (storedState.resources[key]) {
          storedState.vindicator.bodegaResources[key] = storedState.resources[key];
          delete storedState.resources[key];
        }
      });
    }
    // Asegurar que las estructuras de bodega por nivel existen
    if (storedState.vindicator && !storedState.vindicator.bodegaBase) {
      storedState.vindicator.bodegaBase = initialGameState.vindicator.bodegaBase;
    }
    if (storedState.vindicator && !storedState.vindicator.bodegaMK1) {
      storedState.vindicator.bodegaMK1 = initialGameState.vindicator.bodegaMK1;
    }
    if (storedState.vindicator && !storedState.vindicator.bodegaMK2) {
      storedState.vindicator.bodegaMK2 = initialGameState.vindicator.bodegaMK2;
    }


            const mergedState = deepMerge(initialGameState, storedState);
    const hydratedState = rehydrateState(mergedState);
    const finalState = calculateOfflineResources(hydratedState);
    return finalState;
  } catch (err) {
    console.error("No se pudo cargar la partida guardada:", err);
    return initialGameState;
  }
};




export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, loadState());
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextData[]>([]);

    const showFloatingText = useCallback((text: string, x: number, y: number) => {
    // Si los textos flotantes están desactivados, no hacer nada.
    if (!gameState.settings.floatingTextEnabled) {
      return;
    }

    const newText: FloatingTextData = {
      id: Date.now(),
      text,
      x,
      y,
    };
    setFloatingTexts(currentTexts => [...currentTexts, newText]);
  }, [gameState.settings.floatingTextEnabled]);

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

