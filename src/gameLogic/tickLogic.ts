import { GameState } from '../types/gameState';
import { gameData } from '../data/gameData';

// Función auxiliar para los mensajes de Aurora (100% inmutable)
const checkAuroraMessages = (state: GameState): GameState => {
  const { aurora, drones, resources, energy, storage, techCenter, currentScene } = state;
  const { shownMessages, pendingMessages } = aurora;

  const originalShownMessages = shownMessages instanceof Set ? shownMessages : new Set<string>(shownMessages);
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

  if (currentScene === 'main' && drones.basic === 0 && resources.scrap < 10 && !newShownMessages.has("initial")) {
    addMessage("Sistema de reactivación iniciado. Consulta las Misiones para tus primeros objetivos.", "initial");
  }
    if (drones.basic === 1 && !newShownMessages.has("first_drone")) {
        addMessage("Unidad de reparación funcional. Eficiencia: 12%. Buen inicio, técnico.", "first_drone");
    }
    if (energy.solarPanels === 1 && !newShownMessages.has("first_solar")) {
        addMessage("Suministro energético estabilizado. Los sistemas de soporte vuelven a responder.", "first_solar");
    }
    if (drones.basic >= 5 && !newShownMessages.has("unlock_medium")) {
        addMessage("Red de drones básicos operativa. Protocolos de ensamblaje medio disponibles en el Taller.", "unlock_medium");
    }
    if (drones.medium === 1 && !newShownMessages.has("first_medium")) {
        addMessage("Eficiencia de recolección incrementada. Continué con la expansión de la flota.", "first_medium");
    }
    if (storage.basicStorage === 1 && !newShownMessages.has("first_storage")) {
        addMessage("Depósitos restaurados. Capacidad de almacenamiento incrementada.", "first_storage");
    }
    if (drones.medium >= 3 && energy.advancedSolar >= 1 && 
        !techCenter.unlocked && !newShownMessages.has("tech_center_available")) {
        addMessage("He detectado que cumples los requisitos para reactivar el Centro Técnico. Podríamos optimizar todos nuestros sistemas desde allí.", "tech_center_available");
    }
    if (techCenter.upgrades.reinforcedBasicDrones === 1 && !newShownMessages.has("reinforced_basic_unlocked")) {
        addMessage("Protocolos de drones reforzados básicos desbloqueados. Ahora podemos construir unidades más resistentes en el Taller.", "reinforced_basic_unlocked");
    }
    if (techCenter.upgrades.reinforcedMediumDrones === 1 && !newShownMessages.has("reinforced_medium_unlocked")) {
        addMessage("Tecnología de drones reforzados medios disponible. La eficiencia de recolección aumentará significativamente.", "reinforced_medium_unlocked");
    }
    if (techCenter.upgrades.reinforcedAdvancedDrones === 1 && !newShownMessages.has("reinforced_advanced_unlocked")) {
        addMessage("Drones reforzados avanzados desbloqueados. Hemos alcanzado la cúspide de la automatización de reciclado.", "reinforced_advanced_unlocked");
    }
    if (techCenter.upgrades.researchEfficiency === 1 && !newShownMessages.has("research_efficiency_unlocked")) {
        addMessage("Algoritmos de investigación optimizados. La generación base de puntos de investigación ha aumentado.", "research_efficiency_unlocked");
    }
    if (techCenter.upgrades.advancedAnalysis === 1 && !newShownMessages.has("advanced_analysis_unlocked")) {
        addMessage("Sistemas de análisis avanzado activados. Los drones ahora contribuyen más a la investigación.", "advanced_analysis_unlocked");
    }
    if (techCenter.upgrades.algorithmOptimization === 1 && !newShownMessages.has("algorithm_optimization_unlocked")) {
        addMessage("Optimización algorítmica completada. La energía sobrante genera significativamente más puntos de investigación.", "algorithm_optimization_unlocked");
    }

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


export const processGameTick = (state: GameState): GameState => {

  const { upgrades } = state.techCenter;
  
  // --- FASE 1: PROCESAR COLAS DE CONSTRUCCIÓN ---
  
  let globalConstructionSpeed = 1 + (upgrades.constructionEfficiency * 0.05);
  const poweredFabricatorsLevel = (upgrades as any).poweredFabricators || 0;
  if (poweredFabricatorsLevel > 0 && state.resources.energy > 0 && state.resources.maxEnergy > 0 && state.resources.energy / state.resources.maxEnergy > 0.9) {
    globalConstructionSpeed *= 1 + (poweredFabricatorsLevel * 0.10);
  }

  const processQueuesForCategory = <
    C extends keyof GameState,
    Q extends GameState[C] extends { queues: any } ? GameState[C]['queues'] : never,
    I extends Record<string, number>
  >(
    category: C,
    inventory: I,
    speedBonus: number,
    currentState: GameState
  ): { newInventory: I; newQueues: Q; changed: boolean } => {
    
    const queues = (currentState[category] as any).queues as Q;
    let newInventory = { ...inventory };
    let newQueues: Q = { ...queues };
    let changed = false;
    const totalSpeedMultiplier = globalConstructionSpeed + speedBonus;

    for (const key in queues) {
      if (Object.prototype.hasOwnProperty.call(queues, key)) {
        const originalQueueItem = queues[key as keyof Q];
        
        let itemTime = originalQueueItem.time;
        if (category === 'foundry') {
          if (key === 'metalRefinado') itemTime *= (1 - ((upgrades.metalSmeltingSpeed || 0) * 0.05));
          if (key === 'aceroEstructural') itemTime *= (1 - ((upgrades.steelProductionSpeed || 0) * 0.05));
        }

        if (originalQueueItem.queue > 0) {
          if (!changed) changed = true;
          
          let queueItem = { ...originalQueueItem };
          
          const newProgress = queueItem.progress + 1 * totalSpeedMultiplier;
          const itemsFinished = Math.floor(newProgress / itemTime);
          const actualItemsFinished = Math.min(itemsFinished, queueItem.queue);

          if (actualItemsFinished > 0) {
            const itemData = (gameData as any)[category]?.[key];
            const produceInfo = itemData?.produces;

            const resourceToIncrement = produceInfo?.resource || key;
            const amountPerItem = produceInfo?.amount || 1;

            newInventory = {
              ...newInventory,
              [resourceToIncrement]: (newInventory as any)[resourceToIncrement] + actualItemsFinished * amountPerItem,
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

  const workshopResult = processQueuesForCategory('workshop', { ...state.drones }, upgrades.droneAssembly * 0.05, state);
  const energyResult = processQueuesForCategory('energy', { solarPanels: state.energy.solarPanels, mediumSolarPanels: state.energy.mediumSolarPanels, advancedSolar: state.energy.advancedSolar, energyCores: state.energy.energyCores, fusionReactor: state.energy.fusionReactor }, upgrades.energyCalibration * 0.05, state);
  const storageResult = processQueuesForCategory('storage', { basicStorage: state.storage.basicStorage, mediumStorage: state.storage.mediumStorage, advancedStorage: state.storage.advancedStorage, quantumHoardUnit: state.storage.quantumHoardUnit, lithiumIonBattery: state.storage.lithiumIonBattery, plasmaAccumulator: state.storage.plasmaAccumulator, harmonicContainmentField: state.storage.harmonicContainmentField }, upgrades.storageConstruction * 0.05, state);
  const foundryResult = processQueuesForCategory('foundry', { ...state.resources }, 0, state);
  
  const stateAfterQueues = {
    ...state,
    drones: workshopResult.changed ? workshopResult.newInventory : state.drones,
    workshop: workshopResult.changed ? { ...state.workshop, queues: workshopResult.newQueues } : state.workshop,
    energy: energyResult.changed ? { ...state.energy, ...energyResult.newInventory, queues: energyResult.newQueues } : state.energy,
    storage: storageResult.changed ? { ...state.storage, ...storageResult.newInventory, queues: storageResult.newQueues } : state.storage,
    resources: foundryResult.changed ? foundryResult.newInventory : state.resources,
    foundry: foundryResult.changed ? { ...state.foundry, queues: foundryResult.newQueues } : state.foundry,
  };

  // --- FASE 2: RECALCULAR ESTADÍSTICAS Y RECURSOS ---
  const prev = stateAfterQueues;

  const powerOptimizationMultiplier = 1 - (prev.techCenter.upgrades.powerOptimization * 0.05);
  const totalEnergyConsumption = (prev.drones.basic * 1 + prev.drones.medium * 3 + prev.drones.advanced * 5 + prev.drones.reinforcedBasic * 3 + prev.drones.reinforcedMedium * 6 + prev.drones.reinforcedAdvanced * 12 + prev.drones.golem * 50 + prev.drones.wyrm * 200) * powerOptimizationMultiplier;
  
  const energyEfficiencyMultiplier = 1 + (prev.techCenter.upgrades.energyEfficiency * 0.10);
  const coreEfficiencyMultiplier = 1 + (prev.techCenter.upgrades.coreEfficiency * 0.10);
  const totalEnergyProduction = (prev.energy.solarPanels * 3 + prev.energy.mediumSolarPanels * 10 + prev.energy.advancedSolar * 30) * energyEfficiencyMultiplier + 
                              (prev.energy.energyCores * 50) * coreEfficiencyMultiplier +
                              ((prev.energy as any).fusionReactor * 250);
  
  const baseMaxEnergy = 50;
  const energyCoreBonus = prev.energy.energyCores * 100;
  const fusionReactorBonus = (prev.energy as any).fusionReactor * 1000;
  const energyStorageBonus = (prev.storage.lithiumIonBattery * 50 + prev.storage.plasmaAccumulator * 250 + prev.storage.harmonicContainmentField * 1200) * (1 + (prev.techCenter.upgrades.energyStorage * 0.10));
  const totalMaxEnergy = (baseMaxEnergy + energyCoreBonus + fusionReactorBonus + energyStorageBonus) * (1 + (prev.techCenter.upgrades.batteryTech * 0.15));

  const baseMaxScrap = 150;
  const storageBonus = (prev.storage.basicStorage * 50 + prev.storage.mediumStorage * 500 + prev.storage.advancedStorage * 5000 + prev.storage.quantumHoardUnit * 50000);
  const totalMaxScrap = (baseMaxScrap + storageBonus) * (1 + (prev.techCenter.upgrades.storageOptimization * 0.15)) * (1 + (prev.techCenter.upgrades.cargoDrones * 0.10));

  const hasEnoughEnergy = prev.resources.energy > 0;
  const collectionMultiplier = 1 + (prev.techCenter.upgrades.collectionEfficiency * 0.10);
  const totalScrapProduction = hasEnoughEnergy ? (prev.drones.basic * 1 + prev.drones.medium * 5 + prev.drones.advanced * 20 + prev.drones.reinforcedBasic * 8 + prev.drones.reinforcedMedium * 25 + prev.drones.reinforcedAdvanced * 80 + prev.drones.golem * 500) * collectionMultiplier : 0;

  const wyrmMetalProduction = hasEnoughEnergy ? prev.drones.wyrm * 1 : 0;
  const wyrmSteelProduction = hasEnoughEnergy ? prev.drones.wyrm * 0.1 : 0;

  const newEnergy = prev.resources.energy + (totalEnergyProduction - totalEnergyConsumption);
  const clampedEnergy = Math.max(0, Math.min(newEnergy, totalMaxEnergy));
  
  const newScrap = prev.resources.scrap + totalScrapProduction;
  const clampedScrap = Math.min(newScrap, totalMaxScrap);

  const newMetalRefinado = prev.resources.metalRefinado + wyrmMetalProduction;
  const newAceroEstructural = prev.resources.aceroEstructural + wyrmSteelProduction;
  
  const baseResearch = 0.1 * (1 + (prev.techCenter.upgrades.researchEfficiency * 0.20));
  const totalDrones = Object.values(prev.drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.01) * (1 + (prev.techCenter.upgrades.advancedAnalysis * 0.10));
  const energySurplus = Math.max(0, totalEnergyProduction - totalEnergyConsumption);
  const energyResearch = (energySurplus * 0.005) * (1 + (prev.techCenter.upgrades.algorithmOptimization * 0.15));
  const researchPointsToAdd = (baseResearch + droneResearch + energyResearch) / (1 - (prev.techCenter.upgrades.quantumComputing * 0.05));
  const newResearchPoints = prev.techCenter.researchPoints + researchPointsToAdd;

  let newResources = { ...prev.resources };
  const geologicalScannersLevel = (prev.techCenter.upgrades as any).geologicalScanners || 0;
  if (geologicalScannersLevel > 0 && hasEnoughEnergy) {
    const findChance = (totalDrones * 0.0001) * geologicalScannersLevel;
    if (Math.random() < findChance) {
      if (Math.random() < 0.5) {
        newResources.fragmentosPlaca = (prev.resources.fragmentosPlaca || 0) + 1;
      } else {
        newResources.circuitosDañados = (prev.resources.circuitosDañados || 0) + 1;
      }
    }
  }

  const stateAfterStats = {
    ...stateAfterQueues,
    resources: {
      ...newResources,
      scrap: clampedScrap,
      metalRefinado: newMetalRefinado,
      aceroEstructural: newAceroEstructural,
      energy: clampedEnergy,
      energyConsumption: totalEnergyConsumption,
      energyProduction: totalEnergyProduction,
      maxEnergy: totalMaxEnergy,
      maxScrap: totalMaxScrap,
    },
    rates: { ...prev.rates, scrapPerSecond: totalScrapProduction },
    techCenter: { ...prev.techCenter, researchPoints: newResearchPoints },
  };
  
  // --- FASE 3: DESBLOQUEOS Y MENSAJES ---
  
  const modulesBefore = state.modules; // Comparar con el estado original del tick
  let newModules = { ...stateAfterStats.modules };
  let newTechCenter = { ...stateAfterStats.techCenter };

  if (stateAfterStats.resources.scrap >= 50 && !newModules.energy) newModules.energy = true;
  if (stateAfterStats.resources.scrap >= 75 && !newModules.storage) newModules.storage = true;
  if (stateAfterStats.drones.medium >= 3 && stateAfterStats.energy.advancedSolar >= 1 && stateAfterStats.resources.scrap >= 1000 && !newModules.techCenter) {
    newModules.techCenter = true;
    newTechCenter.unlocked = true;
  }
  if (stateAfterStats.drones.expeditionDrone > 0 && !newModules.expeditions) newModules.expeditions = true;
  if (stateAfterStats.drones.golem > 0 && !newModules.shipyard) newModules.shipyard = true;
  
  let newNotifications = [...stateAfterStats.notificationQueue];
  if (!modulesBefore.energy && newModules.energy) newNotifications.push({ id: `energy-${Date.now()}`, title: 'Módulo de Energía Desbloqueado', message: 'Ahora puedes construir paneles solares para generar energía y alimentar más drones.' });
  if (!modulesBefore.storage && newModules.storage) newNotifications.push({ id: `storage-${Date.now()}`, title: 'Módulo de Almacenamiento Desbloqueado', message: 'Construye unidades de almacén para aumentar tu capacidad máxima de chatarra y energía.' });
  if (!modulesBefore.techCenter && newModules.techCenter) newNotifications.push({ id: `tech-center-${Date.now()}`, title: 'Centro Técnico Desbloqueado', message: 'Investiga nuevas tecnologías para mejorar tus drones, la producción de energía y mucho más.' });
  if (!modulesBefore.foundry && newModules.foundry) newNotifications.push({ id: `foundry-${Date.now()}`, title: 'Fundición Desbloqueada', message: 'Refina chatarra en materiales avanzados para construir estructuras y drones más potentes.' });
  if (!modulesBefore.expeditions && newModules.expeditions) newNotifications.push({ id: `expeditions-${Date.now()}`, title: 'Módulo de Expediciones Desbloqueado', message: 'Envía drones a lo desconocido para encontrar recursos que no se pueden fabricar.' });
  if (!modulesBefore.shipyard && newModules.shipyard) newNotifications.push({ id: `shipyard-${Date.now()}`, title: 'Astillero Desbloqueado', message: '¡El objetivo final! Dona componentes para reconstruir la nave "Vindicator".' });
  
  let finalState = {
    ...stateAfterStats,
    modules: newModules,
    techCenter: newTechCenter,
    notificationQueue: newNotifications
  };
  
  finalState = checkAuroraMessages(finalState);

  return finalState;
};