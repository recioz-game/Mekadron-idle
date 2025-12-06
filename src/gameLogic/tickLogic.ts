import { GameState } from '../types/gameState';
import { gameData, GameData } from '../data/gameData';
import { resourceCategories } from '../data/categoryData';

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

// Función auxiliar para los mensajes de Aurora (100% inmutable)
const checkAuroraMessages = (state: GameState): GameState => {
  const { aurora, workshop, resources, energy, storage, techCenter, currentScene } = state;
  const { drones } = workshop;
  const { shownMessages, pendingMessages } = aurora;

  // Asegurarse de que shownMessages es siempre un Set válido
  const originalShownMessages = shownMessages instanceof Set ? shownMessages : new Set<string>();
  let newPendingMessages = [...pendingMessages];
  let newShownMessages = new Set(originalShownMessages);
  let stateChanged = false;

  const addMessage = (message: string, key: string) => {
    if (!newShownMessages.has(key)) {
      newPendingMessages.push({ message, key });
      newShownMessages.add(key);
      stateChanged = true;
    }
  };

  if (!stateChanged) {
    return state;
  }

  return {
    ...state,
    aurora: {
      ...state.aurora,
      pendingMessages: newPendingMessages,
      shownMessages: newShownMessages,
    },
  };
};
  

export const processGameTick = (state: GameState): GameState & { auroraMessages: { message: string; messageKey: string }[] } => {

  const { upgrades } = state.techCenter;
  
  // --- FASE 1: PROCESAR COLAS DE CONSTRUCCIÓN ---
  
  let globalConstructionSpeed = 1 + (upgrades.constructionEfficiency * 0.05);
  // Ya no se necesita el `|| 0` gracias a la corrección de tipos
  if (upgrades.poweredFabricators > 0 && state.resources.energy > 0 && state.resources.maxEnergy > 0 && state.resources.energy / state.resources.maxEnergy > 0.9) {
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
          // CORRECCIÓN: Aplicar mejoras de velocidad a TODOS los items de la fundición
          let speedMultiplier = 1;

          // Aplicar mejoras específicas para cada tipo de producción
          if (key === 'metalRefinado') {
            speedMultiplier += (upgrades.metalSmeltingSpeed || 0) * 0.05;
          } else if (key === 'aceroEstructural') {
            speedMultiplier += (upgrades.steelProductionSpeed || 0) * 0.05;
          } else if (key === 'placasCasco') {
            speedMultiplier += (upgrades.hullPlateProduction || 0) * 0.05;
          } else if (key === 'cableadoSuperconductor') {
            speedMultiplier += (upgrades.wiringProduction || 0) * 0.05;
          } else if (key === 'barraCombustible') {
            speedMultiplier += (upgrades.fuelRodProduction || 0) * 0.05;
          }

          // Aplicar el multiplicador de velocidad (valor > 1 acelera)
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

          if (queueItem.queue === 0) {
            queueItem.progress = 0;
          }
          
          (newQueues as any)[key] = queueItem;
        }
      }
    }
    return { newInventory, newQueues, changed };
  };

  const workshopResult = processQueuesForCategory('workshop', { ...state.workshop.drones }, upgrades.droneAssembly * 0.05, state);
  const energyResult = processQueuesForCategory(
    'energy',
    {
      solarPanels: state.energy.solarPanels,
      mediumSolarPanels: state.energy.mediumSolarPanels,
      advancedSolar: state.energy.advancedSolar,
      energyCores: state.energy.energyCores,
      stabilizedEnergyCores: state.energy.stabilizedEnergyCores,
      empoweredEnergyCores: state.energy.empoweredEnergyCores,
      fusionReactor: state.energy.fusionReactor
    },
    upgrades.energyCalibration * 0.05,
    state
  );
  const storageResult = processQueuesForCategory('storage', { basicStorage: state.storage.basicStorage, mediumStorage: state.storage.mediumStorage, advancedStorage: state.storage.advancedStorage, quantumHoardUnit: state.storage.quantumHoardUnit, lithiumIonBattery: state.storage.lithiumIonBattery, plasmaAccumulator: state.storage.plasmaAccumulator, harmonicContainmentField: state.storage.harmonicContainmentField }, upgrades.storageConstruction * 0.05, state);
  const foundryResult = processQueuesForCategory('foundry', { ...state.vindicator.bodegaResources }, 0, state);
  
  const stateAfterQueues = {
    ...state,
    workshop: workshopResult.changed 
      ? { ...state.workshop, drones: workshopResult.newInventory, queues: workshopResult.newQueues } 
      : state.workshop,
    energy: energyResult.changed ? { ...state.energy, ...energyResult.newInventory, queues: energyResult.newQueues } : state.energy,
    storage: storageResult.changed ? { ...state.storage, ...storageResult.newInventory, queues: storageResult.newQueues } : state.storage,
    vindicator: foundryResult.changed 
      ? { ...state.vindicator, bodegaResources: foundryResult.newInventory }
      : state.vindicator,
    foundry: foundryResult.changed ? { ...state.foundry, queues: foundryResult.newQueues } : state.foundry,
  };

  // --- FASE 2: RECALCULAR ESTADÍSTICAS Y RECURSOS ---
  const prev = stateAfterQueues;

  const powerOptimizationMultiplier = 1 - (prev.techCenter.upgrades.powerOptimization * 0.05);
  
  // Refactor: Calcular el consumo de energía desde gameData
  let totalEnergyConsumption = 0;
  for (const key in prev.workshop.drones) {
    const droneType = key as keyof typeof prev.workshop.drones;
    const droneCount = prev.workshop.drones[droneType];
    const droneData = gameData.workshop[droneType];
    if (droneCount > 0 && droneData && droneData.energyConsumption) {
      totalEnergyConsumption += droneCount * droneData.energyConsumption;
    }
  }
  totalEnergyConsumption *= powerOptimizationMultiplier;
  
  const energyEfficiencyMultiplier = 1 + (prev.techCenter.upgrades.energyEfficiency * 0.10);
  const coreEfficiencyMultiplier = 1 + (prev.techCenter.upgrades.coreEfficiency * 0.10);

  // Refactor: Calcular la producción de energía desde gameData
  let totalEnergyProduction = 0;
  for (const key in prev.energy) {
    const energySource = key as keyof typeof prev.energy;
    // Asegurarse de que no estamos procesando las colas aquí
    if (energySource === 'queues') continue;

    const sourceCount = prev.energy[energySource] as number;
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
  // Refactor: Calcular bonus de energía desde gameData
  for (const key in prev.energy) {
    if (key === 'queues') continue;
    const itemData = gameData.energy[key];
    if (itemData && itemData.maxEnergyBonus) {
      energyStorageBonus += (prev.energy[key as keyof typeof prev.energy] as number) * itemData.maxEnergyBonus;
    }
  }
  for (const key in prev.storage) {
    if (key === 'queues') continue;
    const itemData = gameData.storage[key];
    if (itemData && itemData.maxEnergyBonus) {
      energyStorageBonus += (prev.storage[key as keyof typeof prev.storage] as number) * itemData.maxEnergyBonus * (1 + (upgrades.energyStorage * 0.10));
    }
  }
  const totalMaxEnergy = (baseMaxEnergy + energyStorageBonus) * (1 + (upgrades.batteryTech * 0.15)) * automatedDistributionMultiplier;

  const baseMaxScrap = 150;
  let storageBonus = 0;
  // Refactor: Calcular bonus de chatarra desde gameData
  for (const key in prev.storage) {
    if (key === 'queues') continue;
    const itemData = gameData.storage[key];
    if (itemData && itemData.maxScrapBonus) {
      storageBonus += (prev.storage[key as keyof typeof prev.storage] as number) * itemData.maxScrapBonus;
    }
  }
  const totalMaxScrap = (baseMaxScrap + storageBonus) * (1 + (upgrades.storageOptimization * 0.15)) * (1 + (upgrades.cargoDrones * 0.10)) * automatedDistributionMultiplier;


  const hasEnoughEnergy = prev.resources.energy > 0;
  
  // Lógica de producción/consumo de Golem y Wyrm
  let golemMetalProduction = 0;
  let golemScrapConsumption = 0;
  if (hasEnoughEnergy && prev.workshop.drones.golem > 0) {
    const potentialProduction = prev.workshop.drones.golem * 0.5;
    const scrapNeeded = prev.workshop.drones.golem * 500;
    
    // Producir solo si se puede pagar el coste de chatarra
    if (prev.resources.scrap >= scrapNeeded) {
      golemMetalProduction = potentialProduction;
      golemScrapConsumption = scrapNeeded;
    }
  }

  let wyrmSteelProduction = 0;
  let wyrmScrapConsumption = 0;
  if (hasEnoughEnergy && prev.workshop.drones.wyrm > 0) {
    const potentialProduction = prev.workshop.drones.wyrm * 0.25;
    const scrapNeeded = prev.workshop.drones.wyrm * 1000;

    // Producir solo si se puede pagar el coste de chatarra
    if (prev.resources.scrap >= scrapNeeded) {
      wyrmSteelProduction = potentialProduction;
      wyrmScrapConsumption = scrapNeeded;
    }
  }

  const collectionMultiplier = 1 + (prev.techCenter.upgrades.collectionEfficiency * 0.10);
  const globalEfficiencyMultiplier = 1 + (prev.techCenter.upgrades.globalEfficiency * 0.05); // Bonificación del 5% por nivel

  // Refactor: Calcular la producción de chatarra desde gameData
  let totalScrapProduction = 0;
  if (hasEnoughEnergy) {
    for (const key in prev.workshop.drones) {
      const droneType = key as keyof typeof prev.workshop.drones;
      const droneCount = prev.workshop.drones[droneType];
      const droneData = gameData.workshop[droneType];
      if (droneCount > 0 && droneData && droneData.scrapProduction) {
        totalScrapProduction += droneCount * droneData.scrapProduction;
      }
    }
    totalScrapProduction *= collectionMultiplier;
    totalScrapProduction *= globalEfficiencyMultiplier; // Aplicar la nueva bonificación
  }

  const newEnergy = prev.resources.energy + (totalEnergyProduction - totalEnergyConsumption);
  const clampedEnergy = Math.max(0, Math.min(newEnergy, totalMaxEnergy));
  
  const newScrap = prev.resources.scrap + totalScrapProduction - golemScrapConsumption - wyrmScrapConsumption;
  const clampedScrap = Math.min(newScrap, totalMaxScrap);

  const newMetalRefinado = prev.vindicator.bodegaResources.metalRefinado + golemMetalProduction;
  const newAceroEstructural = prev.vindicator.bodegaResources.aceroEstructural + wyrmSteelProduction;
  
  // Determinar la bodega actual y sus capacidades
  const vindicatorType = prev.vindicator.vindicatorType;
  
  const bodegaMap = {
    base: prev.vindicator.bodegaBase,
    vm01_origin: prev.vindicator.bodegaMK1,
    vm02_interceptor: prev.vindicator.bodegaMK2,
    vm03_devastator: prev.vindicator.bodegaMK3,
    vm04_reaper: prev.vindicator.bodegaMK4,
    vm05_aegis: prev.vindicator.bodegaMK5,
    vm06_tempest: prev.vindicator.bodegaMK6,
    vm07_wraith: prev.vindicator.bodegaMK7,
    vm08_phantom: prev.vindicator.bodegaMK8,
    vm09_apex: prev.vindicator.bodegaMK9,
  };

  const currentBodega = bodegaMap[vindicatorType] || prev.vindicator.bodegaBase;
  const capacities = currentBodega.capacities;

  // Calcular el total actual de recursos por categoría
  const categoryTotals = {
    materialesIndustriales: 0,
    componentesBatalla: 0,
    materialesExoticos: 0,
  };

  for (const resource in prev.vindicator.bodegaResources) {
    const category = resourceCategories[resource];
    if (category) {
      categoryTotals[category] += prev.vindicator.bodegaResources[resource as keyof typeof prev.vindicator.bodegaResources];
    }
  }

  // Comprobar y limitar los nuevos recursos basados en la capacidad de su categoría
  let clampedMetalRefinado = newMetalRefinado;
  const metalCategory = resourceCategories['metalRefinado'];
  if (categoryTotals[metalCategory] + golemMetalProduction > capacities[metalCategory]) {
    clampedMetalRefinado = prev.vindicator.bodegaResources.metalRefinado; // No añadir si excede
  }
  
  let clampedAceroEstructural = newAceroEstructural;
  const aceroCategory = resourceCategories['aceroEstructural'];
  if (categoryTotals[aceroCategory] + wyrmSteelProduction > capacities[aceroCategory]) {
    clampedAceroEstructural = prev.vindicator.bodegaResources.aceroEstructural; // No añadir si excede
  }
  
  const baseResearch = 0.05 * (1 + (prev.techCenter.upgrades.researchEfficiency * 0.20));
    const totalDrones = Object.values(prev.workshop.drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.005) * (1 + (prev.techCenter.upgrades.advancedAnalysis * 0.10));
  const energySurplus = Math.max(0, totalEnergyProduction - totalEnergyConsumption);
  const energyResearch = (energySurplus * 0.0025) * (1 + (prev.techCenter.upgrades.algorithmOptimization * 0.15));
  
  // Protección contra división por cero para Quantum Computing
  const quantumComputingLevel = prev.techCenter.upgrades.quantumComputing || 0;
  const costMultiplier = 1 - (quantumComputingLevel * 0.05);
  const safeDivisor = Math.max(0.05, costMultiplier); // Asegura que el divisor no sea <= 0

  const researchPointsToAdd = (baseResearch + droneResearch + energyResearch) / safeDivisor;
  const newResearchPoints = prev.techCenter.researchPoints + researchPointsToAdd;

  let newBodegaResources = { ...prev.vindicator.bodegaResources };
  if (upgrades.geologicalScanners > 0 && hasEnoughEnergy) {
    const findChance = (totalDrones * 0.0001) * upgrades.geologicalScanners;
    if (Math.random() < findChance) {
      if (Math.random() < 0.5) {
        newBodegaResources.fragmentosPlaca = (prev.vindicator.bodegaResources.fragmentosPlaca || 0) + 1;
      } else {
        newBodegaResources.circuitosDañados = (prev.vindicator.bodegaResources.circuitosDañados || 0) + 1;
      }
    }
  }

  const stateAfterStats = {
    ...stateAfterQueues,
    resources: {
      ...prev.resources,
      scrap: clampedScrap,
      energy: clampedEnergy,
      energyConsumption: totalEnergyConsumption,
      energyProduction: totalEnergyProduction,
      maxEnergy: totalMaxEnergy,
      maxScrap: totalMaxScrap,
    },
    vindicator: {
      ...prev.vindicator,
      bodegaResources: {
          ...newBodegaResources,
          metalRefinado: clampedMetalRefinado,
          aceroEstructural: clampedAceroEstructural,
        }
    },
    rates: { 
      ...prev.rates, 
      scrapPerSecond: totalScrapProduction - golemScrapConsumption - wyrmScrapConsumption,
      metalPerSecond: golemMetalProduction,
      steelPerSecond: wyrmSteelProduction
    },
    techCenter: { ...prev.techCenter, researchPoints: newResearchPoints },
  };
  
  // --- FASE 3: DESBLOQUEOS Y MENSAJES ---
  
  const modulesBefore = state.modules; // Comparar con el estado original del tick
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
    notificationQueue: state.notificationQueue, // Mantenemos la cola original sin cambios
  };
  
  // Actualizar el fondo y otros mensajes de Aurora
  let finalState = updateBackground(stateWithNewModules);
  finalState = checkAuroraMessages(finalState);

  // Combinar el estado final con los nuevos mensajes de desbloqueo
  return {
    ...finalState,
    auroraMessages,
  };
};

