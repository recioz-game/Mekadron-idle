import { cloneDeep } from 'lodash';
import { GameState } from '../types/gameState';
import { gameData, GameData } from '../data/gameData';

// Función para actualizar el fondo según el progreso del juego
const updateBackground = (state: GameState): GameState => {
  const { modules, currentBackground } = state;

  // Solo actualizar si el fondo actual es menor al que debería ser
  if (!modules.techCenter && currentBackground < 2) {
    // Fondo 1: Inicio del juego
    return state;
  } else if (modules.techCenter && !modules.foundry && currentBackground < 3) {
    // Fondo 2: Laboratorio desbloqueado
    return { ...state, currentBackground: 2 };
  } else if (modules.foundry && !modules.shipyard && currentBackground < 4) {
    // Fondo 3: Fundición desbloqueada
    return { ...state, currentBackground: 3 };
  } else if (modules.shipyard && currentBackground < 5) {
    // Fondo 4: Astillero desbloqueado
    return { ...state, currentBackground: 4 };
  }

  return state;
};

const recalculateRates = (state: GameState): GameState => {
  const { techCenter, workshop, energy, storage, resources } = state;
  const { upgrades } = techCenter;

  const powerOptimizationMultiplier = 1 - (upgrades.powerOptimization * 0.05);
  
  let totalEnergyConsumption = 0;
  for (const key in workshop.drones) {
    const droneType = key as keyof typeof workshop.drones;
    const droneCount = workshop.drones[droneType];
    const droneData = gameData.workshop[droneType];
    if (droneCount > 0 && droneData && droneData.energyConsumption) {
      totalEnergyConsumption += droneCount * droneData.energyConsumption;
    }
  }
  totalEnergyConsumption *= powerOptimizationMultiplier;
  
  const energyEfficiencyMultiplier = 1 + (upgrades.energyEfficiency * 0.10);
  const coreEfficiencyMultiplier = 1 + (upgrades.coreEfficiency * 0.10);

  let totalEnergyProduction = 0;
  for (const key in energy) {
    const energySource = key as keyof typeof energy;
    if (energySource === 'queues') continue;

    const sourceCount = energy[energySource] as number;
    const sourceData = (gameData.energy as any)[energySource];
    
    if (sourceCount > 0 && sourceData && sourceData.energyProduction) {
      let multiplier = 1;
      if (energySource.toLowerCase().includes('core')) {
        multiplier = coreEfficiencyMultiplier;
      } else if(energySource !== 'fusionReactor') {
        multiplier = energyEfficiencyMultiplier;
      }
      totalEnergyProduction += sourceCount * sourceData.energyProduction * multiplier;
    }
  }

  const automatedDistributionMultiplier = 1 + (upgrades.automatedDistribution || 0) * 0.05;

  const baseMaxEnergy = 50;
  let energyStorageBonus = 0;
  for (const key in energy) {
    if (key === 'queues') continue;
    const itemData = gameData.energy[key];
    if (itemData && itemData.maxEnergyBonus) {
      energyStorageBonus += (energy[key as keyof typeof energy] as number) * itemData.maxEnergyBonus;
    }
  }
  for (const key in storage) {
    if (key === 'queues') continue;
    const itemData = gameData.storage[key];
    if (itemData && itemData.maxEnergyBonus) {
      energyStorageBonus += (storage[key as keyof typeof storage] as number) * itemData.maxEnergyBonus * (1 + (upgrades.energyStorage * 0.10));
    }
  }
  const totalMaxEnergy = (baseMaxEnergy + energyStorageBonus) * (1 + (upgrades.batteryTech * 0.15)) * automatedDistributionMultiplier;

  const baseMaxScrap = 150;
  let storageBonus = 0;
  for (const key in storage) {
    if (key === 'queues') continue;
    const itemData = gameData.storage[key];
    if (itemData && itemData.maxScrapBonus) {
      storageBonus += (storage[key as keyof typeof storage] as number) * itemData.maxScrapBonus;
    }
  }
  const totalMaxScrap = (baseMaxScrap + storageBonus) * (1 + (upgrades.storageOptimization * 0.15)) * (1 + (upgrades.cargoDrones * 0.10)) * automatedDistributionMultiplier;

  const hasEnoughEnergy = resources.energy > 0;
  
  let golemMetalProduction = 0;
  if (hasEnoughEnergy && workshop.drones.golem > 0) {
    golemMetalProduction = workshop.drones.golem * 0.5;
  }

  let wyrmSteelProduction = 0;
  if (hasEnoughEnergy && workshop.drones.wyrm > 0) {
    wyrmSteelProduction = workshop.drones.wyrm * 0.25;
  }

  const collectionMultiplier = 1 + (upgrades.collectionEfficiency * 0.10);
  const globalEfficiencyMultiplier = 1 + (upgrades.globalEfficiency * 0.05);

  let totalScrapProduction = 0;
  if (hasEnoughEnergy) {
    for (const key in workshop.drones) {
      const droneType = key as keyof typeof workshop.drones;
      const droneCount = workshop.drones[droneType];
      const droneData = gameData.workshop[droneType];
      if (droneCount > 0 && droneData && droneData.scrapProduction) {
        totalScrapProduction += droneCount * droneData.scrapProduction;
      }
    }
    totalScrapProduction *= collectionMultiplier;
    totalScrapProduction *= globalEfficiencyMultiplier;
  }

  const baseResearch = 0.1 * (1 + (upgrades.researchEfficiency * 0.10)); 
  const totalDrones = Object.values(workshop.drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.004) * (1 + (upgrades.advancedAnalysis * 0.05));
  const energySurplus = Math.max(0, totalEnergyProduction - totalEnergyConsumption);
  const energyResearch = (energySurplus * 0.0002) * (1 + (upgrades.algorithmOptimization * 0.075));
  
  const totalResearchPerSecond = techCenter.unlocked 
    ? (baseResearch + droneResearch + energyResearch) 
    : 0;

  return {
    ...state,
    resources: {
      ...state.resources,
      energyConsumption: totalEnergyConsumption,
      energyProduction: totalEnergyProduction,
      maxEnergy: totalMaxEnergy,
      maxScrap: totalMaxScrap,
    },
    rates: { 
      ...state.rates, 
      scrapPerSecond: totalScrapProduction,
      metalPerSecond: golemMetalProduction,
      steelPerSecond: wyrmSteelProduction,
      researchPerSecond: totalResearchPerSecond,
    },
  };
};

export const processGameTick = (state: GameState): GameState & { auroraMessages: { message: string; messageKey: string }[] } => {
  const currentState = cloneDeep(state);
  const { upgrades } = currentState.techCenter;

  // --- FASE 1: PROCESAR COLAS DE CONSTRUCCIÓN ---
  
  let globalConstructionSpeed = 1 + (upgrades.constructionEfficiency * 0.05);
  if (upgrades.poweredFabricators > 0 && currentState.resources.energy > 0 && currentState.resources.maxEnergy > 0 && currentState.resources.energy / currentState.resources.maxEnergy > 0.9) {
    globalConstructionSpeed *= 1 + (upgrades.poweredFabricators * 0.10);
  }

  const processQueuesForCategory = <
    C extends keyof GameData,
    Q extends GameState[C] extends { queues: any } ? GameState[C]['queues'] : never,
    I extends Record<string, number>
  >(
    category: C,
    inventory: I,
    speedBonus: number,
    currentState: GameState
  ): { newInventory: I; newQueues: Q; changed: boolean } => {
    
    const queues = (currentState[category] as { queues: any }).queues as Q;
    let newInventory = { ...inventory };
    let newQueues: Q = { ...queues };
    let changed = false;
    const totalSpeedMultiplier = globalConstructionSpeed + speedBonus;

    for (const key in queues) {
      if (Object.prototype.hasOwnProperty.call(queues, key)) {
        const originalQueueItem = queues[key as keyof Q];
        
        let itemTime = originalQueueItem.time;
        if (category === 'foundry') {
          let speedMultiplier = 1;
          if (key === 'metalRefinado') speedMultiplier += (upgrades.metalSmeltingSpeed || 0) * 0.05;
          else if (key === 'aceroEstructural') speedMultiplier += (upgrades.steelProductionSpeed || 0) * 0.05;
          else if (key === 'placasCasco') speedMultiplier += (upgrades.hullPlateProduction || 0) * 0.05;
          else if (key === 'cableadoSuperconductor') speedMultiplier += (upgrades.wiringProduction || 0) * 0.05;
          else if (key === 'barraCombustible') speedMultiplier += (upgrades.fuelRodProduction || 0) * 0.05;
          itemTime /= speedMultiplier;
        }

        if (originalQueueItem.queue > 0) {
          if (!changed) changed = true;
          
          let queueItem = { ...originalQueueItem };
          
          const newProgress = queueItem.progress + 1 * totalSpeedMultiplier;
          const itemsFinished = Math.floor(newProgress / itemTime);
          const actualItemsFinished = Math.min(itemsFinished, queueItem.queue);

          if (actualItemsFinished > 0) {
            const itemData = (gameData[category] as any)?.[key];
            const produceInfo = itemData?.produces;
            const resourceToIncrement = produceInfo?.resource || key;
            const amountPerItem = produceInfo?.amount || 1;
            newInventory = {
              ...newInventory,
              [resourceToIncrement]: ((newInventory as any)[resourceToIncrement] || 0) + actualItemsFinished * amountPerItem,
            };
            queueItem.queue -= actualItemsFinished;
            queueItem.progress = newProgress - actualItemsFinished * itemTime;
          } else {
            queueItem.progress = newProgress;
          }

          if (queueItem.queue === 0) queueItem.progress = 0;
          
          (newQueues as any)[key] = queueItem;
        }
      }
    }
    return { newInventory, newQueues, changed };
  };

  const workshopResult = processQueuesForCategory('workshop', { ...currentState.workshop.drones }, upgrades.droneAssembly * 0.05, currentState);
  const energyResult = processQueuesForCategory(
    'energy',
    {
      solarPanels: currentState.energy.solarPanels,
      mediumSolarPanels: currentState.energy.mediumSolarPanels,
      advancedSolar: currentState.energy.advancedSolar,
      energyCores: currentState.energy.energyCores,
      stabilizedEnergyCores: currentState.energy.stabilizedEnergyCores,
      empoweredEnergyCores: currentState.energy.empoweredEnergyCores,
      fusionReactor: currentState.energy.fusionReactor
    },
    upgrades.energyCalibration * 0.05,
    currentState
  );
  const storageResult = processQueuesForCategory('storage', { basicStorage: currentState.storage.basicStorage, mediumStorage: currentState.storage.mediumStorage, advancedStorage: currentState.storage.advancedStorage, quantumHoardUnit: currentState.storage.quantumHoardUnit, lithiumIonBattery: currentState.storage.lithiumIonBattery, plasmaAccumulator: currentState.storage.plasmaAccumulator, harmonicContainmentField: currentState.storage.harmonicContainmentField }, upgrades.storageConstruction * 0.05, currentState);
  const foundryResult = processQueuesForCategory('foundry', { ...currentState.resources }, 0, currentState);
  
  const stateAfterQueues = {
    ...currentState,
    workshop: workshopResult.changed 
      ? { ...currentState.workshop, drones: workshopResult.newInventory, queues: workshopResult.newQueues } 
      : currentState.workshop,
    energy: energyResult.changed ? { ...currentState.energy, ...energyResult.newInventory, queues: energyResult.newQueues } : currentState.energy,
    storage: storageResult.changed ? { ...currentState.storage, ...storageResult.newInventory, queues: storageResult.newQueues } : currentState.storage,
    resources: foundryResult.changed ? { ...currentState.resources, ...foundryResult.newInventory } : currentState.resources,
    foundry: foundryResult.changed ? { ...currentState.foundry, queues: foundryResult.newQueues } : currentState.foundry,
  };

  // --- FASE 2: APLICAR TASAS Y RECURSOS ---
  let stateWithRates = stateAfterQueues;
  
  // Forzar el recálculo si se ha construido algo que pueda afectar las tasas.
  const ratesNeedRecalc = workshopResult.changed || energyResult.changed || storageResult.changed;

  if (stateWithRates.recalculationNeeded || ratesNeedRecalc) {
    stateWithRates = recalculateRates(stateAfterQueues);
    stateWithRates.recalculationNeeded = false;
  }
  const { rates, resources } = stateWithRates;

  const newEnergy = resources.energy + (resources.energyProduction - resources.energyConsumption);
  const clampedEnergy = Math.max(0, Math.min(newEnergy, resources.maxEnergy));
  
  const newScrap = resources.scrap + rates.scrapPerSecond;
  const clampedScrap = Math.min(newScrap, resources.maxScrap);

  const newMetalRefinado = resources.metalRefinado + rates.metalPerSecond;
  const newAceroEstructural = resources.aceroEstructural + rates.steelPerSecond;
  
  const newResearchPoints = stateWithRates.techCenter.researchPoints + rates.researchPerSecond;

  let newResources = { ...stateWithRates.resources };
  if (upgrades.geologicalScanners > 0 && resources.energy > 0) {
    const totalDrones = Object.values(stateWithRates.workshop.drones).reduce((sum, count) => sum + count, 0);
    const findChance = (totalDrones * 0.0001) * upgrades.geologicalScanners;
    if (Math.random() < findChance) {
      if (Math.random() < 0.5) newResources.fragmentosPlaca = (newResources.fragmentosPlaca || 0) + 1;
      else newResources.circuitosDañados = (newResources.circuitosDañados || 0) + 1;
    }
  }

  const stateAfterStats = {
    ...stateWithRates,
    resources: {
      ...newResources,
      scrap: clampedScrap,
      energy: clampedEnergy,
      metalRefinado: newMetalRefinado,
      aceroEstructural: newAceroEstructural,
    },
    techCenter: { ...stateWithRates.techCenter, researchPoints: newResearchPoints },
  };
  
  // --- FASE 3: DESBLOQUEOS Y MENSAJES ---
  
  const modulesBefore = state.modules;
  let newModules = { ...stateAfterStats.modules };
  let newTechCenter = { ...stateAfterStats.techCenter };

  if (stateAfterStats.resources.scrap >= 75 && !newModules.workshop) newModules.workshop = true;
  if (stateAfterStats.resources.scrap >= 50 && !newModules.energy) newModules.energy = true;
  if (stateAfterStats.resources.scrap >= 100 && !newModules.storage) newModules.storage = true;
    if (stateAfterStats.workshop.drones.medium >= 5 && stateAfterStats.energy.advancedSolar >= 1 && stateAfterStats.resources.scrap >= 1000 && !newModules.techCenter) {
    newModules.techCenter = true;
    newTechCenter.unlocked = true;
  }
  if (stateAfterStats.workshop.drones.expeditionDrone > 0 && !newModules.expeditions) newModules.expeditions = true;
  if (stateAfterStats.workshop.drones.golem > 0 && !newModules.shipyard) newModules.shipyard = true;
  
  const auroraMessages: { message: string; messageKey: string; audioId?: number }[] = [];
  if (state.settings.auroraNotificationsEnabled) {
    if (!modulesBefore.workshop && newModules.workshop) auroraMessages.push({ message: 'Nuevo módulo desbloqueado.', messageKey: 'unlock-workshop', audioId: 5 });
    if (!modulesBefore.energy && newModules.energy) auroraMessages.push({ message: 'Nuevo módulo desbloqueado.', messageKey: 'unlock-energy', audioId: 5 });
    if (!modulesBefore.storage && newModules.storage) auroraMessages.push({ message: 'Nuevo módulo desbloqueado.', messageKey: 'unlock-storage', audioId: 5 });
    if (!modulesBefore.techCenter && newModules.techCenter) auroraMessages.push({ message: 'Nuevo módulo desbloqueado.', messageKey: 'unlock-techCenter', audioId: 5 });
    if (!modulesBefore.foundry && newModules.foundry) auroraMessages.push({ message: 'Nuevo módulo desbloqueado.', messageKey: 'unlock-foundry', audioId: 5 });
    if (!modulesBefore.expeditions && newModules.expeditions) auroraMessages.push({ message: 'Nuevo módulo desbloqueado.', messageKey: 'unlock-expeditions', audioId: 5 });
    if (!modulesBefore.shipyard && newModules.shipyard) auroraMessages.push({ message: 'Nuevo módulo desbloqueado.', messageKey: 'unlock-shipyard', audioId: 5 });
  }

  let stateWithNewModules = {
    ...stateAfterStats,
    modules: newModules,
    techCenter: newTechCenter,
    notificationQueue: state.notificationQueue,
  };
  
  let finalState = updateBackground(stateWithNewModules);

  return {
    ...finalState,
    auroraMessages,
  };
};

