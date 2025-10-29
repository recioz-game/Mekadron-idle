import { GameState, initialGameState } from '../types/gameState';
import { gameData } from '../data/gameData';

export const processGameTick = (state: GameState): GameState => {
  let newState = { ...state };
  const { upgrades } = newState.techCenter;

  let globalConstructionSpeed = 1 + (upgrades.constructionEfficiency * 0.05);

  const poweredFabricatorsLevel = (upgrades as any).poweredFabricators || 0;
  if (poweredFabricatorsLevel > 0 && newState.resources.energy > 0 && newState.resources.maxEnergy > 0 && newState.resources.energy / newState.resources.maxEnergy > 0.9) {
    globalConstructionSpeed *= 1 + (poweredFabricatorsLevel * 0.10);
  }

  const processQueuesForCategory = <
    C extends keyof GameState,
    Q extends GameState[C] extends { queues: any } ? GameState[C]['queues'] : never,
    I extends Record<string, number>
  >(
    category: C,
    inventory: I,
    speedBonus: number
  ): { newInventory: I; newQueues: Q; changed: boolean } => {
    
    const queues = (newState[category] as any).queues as Q;
    const newInventory = { ...inventory };
    const newQueues = JSON.parse(JSON.stringify(queues)) as Q;
    let changed = false;
    const totalSpeedMultiplier = globalConstructionSpeed + speedBonus;

    for (const key in newQueues) {
      if (Object.prototype.hasOwnProperty.call(newQueues, key)) {
        const queueItem = (newQueues as any)[key];
        
        // Aplicar bonus de velocidad específicos
        let itemTime = queueItem.time;
        if (category === 'foundry') {
          if (key === 'metalRefinado') itemTime *= (1 - ((upgrades.metalSmeltingSpeed || 0) * 0.05));
          if (key === 'aceroEstructural') itemTime *= (1 - ((upgrades.steelProductionSpeed || 0) * 0.05));
        }

        if (queueItem.queue > 0) {
          changed = true;
          const newProgress = queueItem.progress + 1 * totalSpeedMultiplier;
          const itemsFinished = Math.floor(newProgress / itemTime);
          const actualItemsFinished = Math.min(itemsFinished, queueItem.queue);

          if (actualItemsFinished > 0) {
            const itemData = (gameData as any)[category]?.[key];
            const produceInfo = itemData?.produces;

            const resourceToIncrement = produceInfo?.resource || key;
            const amountPerItem = produceInfo?.amount || 1;

            if (resourceToIncrement in newInventory) {
              (newInventory as any)[resourceToIncrement] += actualItemsFinished * amountPerItem;
            } else {
              // Asumimos que es un sub-inventario como drones, energy, storage
              const parentObjectKey = category === 'workshop' ? 'drones' : category;
              if ((newState as any)[parentObjectKey]?.[resourceToIncrement] !== undefined) {
                 // Esto es complicado de tipar de forma genérica, así que usamos 'any' con cuidado
              } else {
                 console.warn(`Resource ${resourceToIncrement} not found in state!`);
              }
            }
            
            queueItem.queue -= actualItemsFinished;
            queueItem.progress = newProgress - actualItemsFinished * itemTime;
          } else {
            queueItem.progress = newProgress;
          }
          if (queueItem.queue === 0) {
            queueItem.progress = 0;
          }
        }
      }
    }
    return { newInventory, newQueues, changed };
  };

  const workshopResult = processQueuesForCategory('workshop', { ...newState.drones }, upgrades.droneAssembly * 0.05);
  const energyResult = processQueuesForCategory('energy', { solarPanels: newState.energy.solarPanels, mediumSolarPanels: newState.energy.mediumSolarPanels, advancedSolar: newState.energy.advancedSolar, energyCores: newState.energy.energyCores, fusionReactor: newState.energy.fusionReactor }, upgrades.energyCalibration * 0.05);
  const storageResult = processQueuesForCategory('storage', { basicStorage: newState.storage.basicStorage, mediumStorage: newState.storage.mediumStorage, advancedStorage: newState.storage.advancedStorage, quantumHoardUnit: newState.storage.quantumHoardUnit, lithiumIonBattery: newState.storage.lithiumIonBattery, plasmaAccumulator: newState.storage.plasmaAccumulator, harmonicContainmentField: newState.storage.harmonicContainmentField }, upgrades.storageConstruction * 0.05);
  const foundryResult = processQueuesForCategory('foundry', { ...newState.resources }, 0);
  
  if (workshopResult.changed) {
    newState.drones = workshopResult.newInventory;
    (newState.workshop as any).queues = workshopResult.newQueues;
  }
  if (energyResult.changed) {
    newState.energy = { ...newState.energy, ...energyResult.newInventory, queues: energyResult.newQueues };
  }
  if (storageResult.changed) {
    newState.storage = { ...newState.storage, ...storageResult.newInventory, queues: storageResult.newQueues };
  }
  if (foundryResult.changed) {
    newState.resources = foundryResult.newInventory;
    (newState.foundry as any).queues = foundryResult.newQueues;
  }

  // Lógica de desbloqueo de módulos
  if (newState.drones.expeditionDrone > 0 && !newState.modules.expeditions) {
    newState.modules.expeditions = true;
  }
  if (newState.drones.golem > 0 && !newState.modules.shipyard) {
    newState.modules.shipyard = true;
  }

  // --- RECALCULATE STATS ---
  // (El resto del código de tickLogic.ts permanece igual)
  const modulesBefore = { ...state.modules }; // Usar state para comparar con el estado original
  const prev = newState; // Usar el estado actualizado para los cálculos

  const powerOptimizationMultiplier = 1 - (upgrades.powerOptimization * 0.05);
  const totalEnergyConsumption = (prev.drones.basic * 1 + prev.drones.medium * 3 + prev.drones.advanced * 5 + prev.drones.reinforcedBasic * 3 + prev.drones.reinforcedMedium * 6 + prev.drones.reinforcedAdvanced * 12 + prev.drones.golem * 50 + prev.drones.wyrm * 200) * powerOptimizationMultiplier;
  
  const energyEfficiencyMultiplier = 1 + (upgrades.energyEfficiency * 0.10);
  const coreEfficiencyMultiplier = 1 + (upgrades.coreEfficiency * 0.10);
  const totalEnergyProduction = (prev.energy.solarPanels * 3 + prev.energy.mediumSolarPanels * 10 + prev.energy.advancedSolar * 30) * energyEfficiencyMultiplier + 
                              (prev.energy.energyCores * 50) * coreEfficiencyMultiplier +
                              ((prev.energy as any).fusionReactor * 250);
  
  const baseMaxEnergy = 50;
  const energyCoreBonus = prev.energy.energyCores * 100;
  const fusionReactorBonus = (prev.energy as any).fusionReactor * 1000;
  const energyStorageBonus = (prev.storage.lithiumIonBattery * 50 + prev.storage.plasmaAccumulator * 250 + prev.storage.harmonicContainmentField * 1200) * (1 + (upgrades.energyStorage * 0.10));
  const totalMaxEnergy = (baseMaxEnergy + energyCoreBonus + fusionReactorBonus + energyStorageBonus) * (1 + (upgrades.batteryTech * 0.15));

  const baseMaxScrap = 150;
  const storageBonus = (prev.storage.basicStorage * 50 + prev.storage.mediumStorage * 500 + prev.storage.advancedStorage * 5000 + prev.storage.quantumHoardUnit * 50000);
  const totalMaxScrap = (baseMaxScrap + storageBonus) * (1 + (upgrades.storageOptimization * 0.15)) * (1 + (upgrades.cargoDrones * 0.10));

  const collectionMultiplier = 1 + (upgrades.collectionEfficiency * 0.10);
  const hasEnoughEnergy = prev.resources.energy > 0;
  const totalScrapProduction = hasEnoughEnergy ? (prev.drones.basic * 1 + prev.drones.medium * 5 + prev.drones.advanced * 20 + prev.drones.reinforcedBasic * 8 + prev.drones.reinforcedMedium * 25 + prev.drones.reinforcedAdvanced * 80 + prev.drones.golem * 500) * collectionMultiplier : 0;

  const wyrmMetalProduction = hasEnoughEnergy ? prev.drones.wyrm * 1 : 0;
  const wyrmSteelProduction = hasEnoughEnergy ? prev.drones.wyrm * 0.1 : 0;

  const newEnergy = prev.resources.energy + (totalEnergyProduction - totalEnergyConsumption);
  const clampedEnergy = Math.max(0, Math.min(newEnergy, totalMaxEnergy));
  
  const newScrap = prev.resources.scrap + totalScrapProduction;
  const clampedScrap = Math.min(newScrap, totalMaxScrap);

  const newMetalRefinado = prev.resources.metalRefinado + wyrmMetalProduction;
  const newAceroEstructural = prev.resources.aceroEstructural + wyrmSteelProduction;
  
  const baseResearch = 0.1 * (1 + (upgrades.researchEfficiency * 0.20));
  const totalDrones = Object.values(prev.drones).reduce((sum, count) => sum + count, 0);
  const droneResearch = (totalDrones * 0.01) * (1 + (upgrades.advancedAnalysis * 0.10));
  const energySurplus = Math.max(0, totalEnergyProduction - totalEnergyConsumption);
  const energyResearch = (energySurplus * 0.005) * (1 + (upgrades.algorithmOptimization * 0.15));
  const researchPointsToAdd = (baseResearch + droneResearch + energyResearch) / (1 - (upgrades.quantumComputing * 0.05));
  const newResearchPoints = prev.techCenter.researchPoints + researchPointsToAdd;

  const geologicalScannersLevel = (upgrades as any).geologicalScanners || 0;
  if (geologicalScannersLevel > 0 && hasEnoughEnergy) {
    const findChance = (totalDrones * 0.0001) * geologicalScannersLevel;
    if (Math.random() < findChance) {
      if (Math.random() < 0.5) {
        prev.resources.fragmentosPlaca = (prev.resources.fragmentosPlaca || 0) + 1;
      } else {
        prev.resources.circuitosDañados = (prev.resources.circuitosDañados || 0) + 1;
      }
    }
  }

  newState.resources = {
      ...newState.resources,
      scrap: clampedScrap,
      metalRefinado: newMetalRefinado,
      aceroEstructural: newAceroEstructural,
      energy: clampedEnergy,
      energyConsumption: totalEnergyConsumption,
      energyProduction: totalEnergyProduction,
      maxEnergy: totalMaxEnergy,
      maxScrap: totalMaxScrap
  };
  newState.rates = { ...prev.rates, scrapPerSecond: totalScrapProduction };
  newState.techCenter = { ...prev.techCenter, researchPoints: newResearchPoints };

  if (newState.resources.scrap >= 50 && !newState.modules.energy) newState.modules.energy = true;
  if (newState.resources.scrap >= 75 && !newState.modules.storage) newState.modules.storage = true;
  if (newState.drones.medium >= 3 && newState.energy.advancedSolar >= 1 && newState.resources.scrap >= 1000 && !newState.modules.techCenter) {
    newState.modules.techCenter = true;
    newState.techCenter.unlocked = true;
  }

  const finalModules = newState.modules;
  const newNotifications = [...newState.notificationQueue];
  if (!modulesBefore.energy && finalModules.energy) newNotifications.push({ id: `energy-${Date.now()}`, title: 'Módulo de Energía Desbloqueado', message: 'Ahora puedes construir paneles solares para generar energía y alimentar más drones.' });
  if (!modulesBefore.storage && finalModules.storage) newNotifications.push({ id: `storage-${Date.now()}`, title: 'Módulo de Almacenamiento Desbloqueado', message: 'Construye unidades de almacén para aumentar tu capacidad máxima de chatarra y energía.' });
  if (!modulesBefore.techCenter && finalModules.techCenter) newNotifications.push({ id: `tech-center-${Date.now()}`, title: 'Centro Técnico Desbloqueado', message: 'Investiga nuevas tecnologías para mejorar tus drones, la producción de energía y mucho más.' });
  if (!modulesBefore.foundry && finalModules.foundry) newNotifications.push({ id: `foundry-${Date.now()}`, title: 'Fundición Desbloqueada', message: 'Refina chatarra en materiales avanzados para construir estructuras y drones más potentes.' });
  if (!modulesBefore.expeditions && finalModules.expeditions) newNotifications.push({ id: `expeditions-${Date.now()}`, title: 'Módulo de Expediciones Desbloqueado', message: 'Envía drones a lo desconocido para encontrar recursos que no se pueden fabricar.' });
  if (!modulesBefore.shipyard && finalModules.shipyard) newNotifications.push({ id: `shipyard-${Date.now()}`, title: 'Astillero Desbloqueado', message: '¡El objetivo final! Dona componentes para reconstruir la nave "Vindicator".' });
  newState.notificationQueue = newNotifications;

  return newState;
};
