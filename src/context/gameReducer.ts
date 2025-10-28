import { GameState, ExpeditionId, initialGameState, Mission } from '../types/gameState';
import { ActionType } from '../types/actions';
import { expeditionsData } from '../data/expeditions';
import { gameData } from '../data/gameData';
import { battleDestinations } from '../data/battleData';
import { allMissions } from '../data/missionsData';

// Interfaz para la configuración de construcción genérica
interface BuildConfiguration {
  costs: Partial<Record<keyof GameState['resources'], number>>;
  buyAmount: number | 'max';
  queuePath: [keyof GameState, 'queues', string];
  prerequisites?: (state: GameState) => boolean;
}

// Función genérica para manejar la construcción y el crafteo
const handleBuild = (state: GameState, config: BuildConfiguration): GameState => {
  // 1. Comprobar prerrequisitos
  if (config.prerequisites && !config.prerequisites(state)) {
    return state;
  }

  // 2. Calcular la cantidad máxima que se puede permitir
  const costEntries = Object.entries(config.costs);
  if (costEntries.length === 0) return state;

  const maxAffordableAmounts = costEntries.map(([resource, cost]) => {
    // Asegurarse de que el costo no sea cero para evitar la división por cero
    if (cost === 0) return Infinity;
    return Math.floor((state.resources as any)[resource] / cost);
  });
  const maxAffordable = Math.min(...maxAffordableAmounts);

  // 3. Determinar la cantidad final a construir
  const amount = config.buyAmount === 'max' ? maxAffordable : Math.min(config.buyAmount, maxAffordable);

  if (amount <= 0) {
    return state;
  }

  // 4. Crear el nuevo estado y restar recursos
  const newState = JSON.parse(JSON.stringify(state)); // Copia profunda para seguridad

  for (const [resource, cost] of costEntries) {
    (newState.resources as any)[resource] -= amount * cost;
  }

    // 5. Añadir a la cola de producción
  const [category, queuesProp, itemName] = config.queuePath;
    (newState[category as keyof GameState] as any)[queuesProp][itemName].queue += amount;
  
  return newState;
};

// Interface para los datos de expedición
interface ExpeditionData {
  id: ExpeditionId;
  name: string;
  description: string;
  duration: number;
  costs: {
    drones: number;
    metalRefinado?: number;
    aceroEstructural?: number;
  };
    rewards: {
    [key: string]: [number, number];
  };
  risk: {
    chance: number;
    droneLossPercentage: number;
  };
}

export const gameReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'SET_WORKSHOP_BUY_AMOUNT':
      return {
        ...state,
        workshopBuyAmount: action.payload,
      };

    case 'RESET_GAME':
      try {
        localStorage.removeItem('mekadron-savegame');
      } catch (err) {
        console.error("No se pudo limpiar la partida guardada:", err);
      }
      return { ...initialGameState, notificationQueue: [] };

    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notificationQueue: state.notificationQueue.slice(1),
      };

    case 'BUILD_BASIC_DRONE':
      return handleBuild(state, { ...gameData.drones.basic, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'basic'] });

    case 'BUILD_MEDIUM_DRONE':
      return handleBuild(state, { ...gameData.drones.medium, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'medium'] });

    case 'BUILD_ADVANCED_DRONE':
      return handleBuild(state, { ...gameData.drones.advanced, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'advanced'] });

    case 'BUILD_REINFORCED_BASIC':
      return handleBuild(state, { ...gameData.drones.reinforcedBasic, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'reinforcedBasic'] });

    case 'BUILD_REINFORCED_MEDIUM':
      return handleBuild(state, { ...gameData.drones.reinforcedMedium, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'reinforcedMedium'] });

    case 'BUILD_REINFORCED_ADVANCED':
      return handleBuild(state, { ...gameData.drones.reinforcedAdvanced, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'reinforcedAdvanced'] });

    case 'BUILD_GOLEM_DRONE':
      return handleBuild(state, { ...gameData.drones.golem, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'golem'] });

    case 'BUILD_EXPEDITION_DRONE':
      return handleBuild(state, { ...gameData.drones.expeditionDrone, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'expeditionDrone'] });

    case 'BUILD_WYRM':
      return handleBuild(state, { ...gameData.drones.wyrm, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'wyrm'] });

    case 'SET_ENERGY_BUY_AMOUNT':
      return {
        ...state,
        energyBuyAmount: action.payload,
      };

    case 'SET_STORAGE_BUY_AMOUNT':
        return {
          ...state,
          storageBuyAmount: action.payload,
        };

    case 'BUILD_SOLAR_PANEL':
      return handleBuild(state, { ...gameData.energy.solarPanels, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'solarPanels'] });

    case 'BUILD_MEDIUM_SOLAR':
      return handleBuild(state, { ...gameData.energy.mediumSolarPanels, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'mediumSolarPanels'] });

    case 'BUILD_ADVANCED_SOLAR':
      return handleBuild(state, { ...gameData.energy.advancedSolar, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'advancedSolar'] });

    case 'BUILD_ENERGY_CORE':
      return handleBuild(state, { ...gameData.energy.energyCores, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'energyCores'] });

    case 'BUILD_BASIC_STORAGE':
      return handleBuild(state, { ...gameData.storage.basicStorage, buyAmount: state.storageBuyAmount, queuePath: ['storage', 'queues', 'basicStorage'] });

    case 'BUILD_MEDIUM_STORAGE':
      return handleBuild(state, { ...gameData.storage.mediumStorage, buyAmount: state.storageBuyAmount, queuePath: ['storage', 'queues', 'mediumStorage'] });

    case 'BUILD_ADVANCED_STORAGE':
      return handleBuild(state, { ...gameData.storage.advancedStorage, buyAmount: state.storageBuyAmount, queuePath: ['storage', 'queues', 'advancedStorage'] });

    case 'BUILD_QUANTUM_HOARD_UNIT':
      return handleBuild(state, { ...gameData.storage.quantumHoardUnit, buyAmount: state.storageBuyAmount, queuePath: ['storage', 'queues', 'quantumHoardUnit'] });

    case 'BUILD_LITHIUM_ION_BATTERY':
      return handleBuild(state, { ...gameData.storage.lithiumIonBattery, buyAmount: state.storageBuyAmount, queuePath: ['storage', 'queues', 'lithiumIonBattery'] });

    case 'BUILD_PLASMA_ACCUMULATOR':
      return handleBuild(state, { ...gameData.storage.plasmaAccumulator, buyAmount: state.storageBuyAmount, queuePath: ['storage', 'queues', 'plasmaAccumulator'] });

    case 'BUILD_HARMONIC_CONTAINMENT_FIELD':
      return handleBuild(state, { ...gameData.storage.harmonicContainmentField, buyAmount: state.storageBuyAmount, queuePath: ['storage', 'queues', 'harmonicContainmentField'] });

    case 'SET_FOUNDRY_BUY_AMOUNT':
        return {
            ...state,
            foundryBuyAmount: action.payload,
        };

    case 'ACTIVATE_FOUNDRY': {
        const cost = 25000;
        if (state.resources.scrap >= cost && !state.modules.foundry) {
            return {
            ...state,
            resources: { ...state.resources, scrap: state.resources.scrap - cost },
            modules: { ...state.modules, foundry: true }
            };
        }
        return state;
    }

    case 'CRAFT_REFINED_METAL':
      return handleBuild(state, { ...gameData.foundry.metalRefinado, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'metalRefinado'] });

    case 'CRAFT_STRUCTURAL_STEEL':
      return handleBuild(state, { ...gameData.foundry.aceroEstructural, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'aceroEstructural'] });

    case 'CRAFT_HULL_PLATE':
      return handleBuild(state, { ...gameData.foundry.placasCasco, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'placasCasco'] });

    case 'CRAFT_SUPERCONDUCTOR_WIRING':
      return handleBuild(state, { ...gameData.foundry.cableadoSuperconductor, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'cableadoSuperconductor'] });

    case 'START_GAME':
        return {
            ...state,
            currentScene: 'introScene'
        };

    case 'SHOW_MAIN_SCENE':
        return {
            ...state,
                        currentScene: 'main'
        };

    case 'START_PHASE_2':
      return {
        ...state,
        currentScene: 'phase2Main'
      };

    case 'RETURN_TO_PHASE_1':
      return {
        ...state,
                currentScene: 'main'
      };

    case 'GO_TO_PHASE_2':
      return {
        ...state,
        currentScene: 'phase2Main'
      };

    case 'COLLECT_SCRAP': {
        const newScrap = state.resources.scrap + state.rates.scrapPerClick;
        const clampedScrap = Math.min(newScrap, state.resources.maxScrap);
        return {
            ...state,
            resources: {
            ...state.resources,
            scrap: clampedScrap
            }
        };
    }

    case 'CLOSE_AURORA_MESSAGE':
        return {
            ...state,
            aurora: {
            ...state.aurora,
            currentMessage: ''
            }
        };

    case 'ADD_AURORA_MESSAGE': {
        const { message, messageKey } = action.payload;
        if (state.aurora.shownMessages.has(messageKey)) {
            return {
                ...state,
                aurora: {
                    ...state.aurora,
                    messageQueue: state.aurora.messageQueue.filter(m => m.key !== messageKey),
                }
            };
        }

        const newShownMessages = new Set(state.aurora.shownMessages);
        newShownMessages.add(messageKey);

        return {
            ...state,
            aurora: {
                ...state.aurora,
                currentMessage: message,
                shownMessages: newShownMessages,
                messageQueue: state.aurora.messageQueue.slice(1),
            }
        };
    }

    case 'SET_CURRENT_VIEW':
        return {
            ...state,
            currentView: action.payload
        };

    case 'CLOSE_CURRENT_VIEW':
        return {
            ...state,
            currentView: ''
        };

    // LÓGICA DE MISIONES NUEVA Y CORREGIDA
        case 'UPDATE_MISSION_PROGRESS': {
      const { resources, drones, energy, storage, techCenter, modules, shipyard, missions, rates } = state;
      let vindicatorCompletedThisTick = false;

      const missionsWithUpdatedProgress = missions.activeMissions.map(mission => {
        if (mission.completed) return mission;

        let currentProgress = mission.current;
        
        switch (mission.id) {
          case 'main_1_unlock_tech':
            currentProgress = (techCenter.unlocked ? 1 : 0) + (modules.foundry ? 1 : 0);
            break;
          case 'main_2_produce_alloys':
            currentProgress = resources.metalRefinado + resources.aceroEstructural;
            break;
          case 'main_3_expeditions':
            currentProgress = state.activeExpeditions.filter(exp => exp.completionTimestamp > 0).length;
            break;
          case 'main_4_fabricate_components':
            currentProgress = resources.placasCasco + resources.cableadoSuperconductor;
            break;
          case 'main_5_final_assembly': {
            const componentKeys = Object.keys(shipyard.costs) as Array<keyof typeof shipyard.costs>;
            const isComplete = componentKeys.every(key => {
              const costSpec = shipyard.costs[key];
              const progressSpec = shipyard.progress[key];
              const resourceKeys = Object.keys(costSpec) as Array<keyof typeof costSpec>;
              return resourceKeys.every(resourceKey => (progressSpec as Record<string, number>)[resourceKey] >= (costSpec as Record<string, number>)[resourceKey]);
            });
            currentProgress = isComplete ? 1 : 0;

                        // Transición automática a Fase 2
            if (isComplete && !mission.completed) {
              vindicatorCompletedThisTick = true;
              return { ...mission, current: 1, completed: true }; 
            }
            break;
          }
          
                    // --- MISIONES SECUNDARIAS ---
          
          // Cat 1: Crecimiento y Estabilidad
          case 'sec_1_1_basic_fleet':
            currentProgress = drones.basic;
            break;
          case 'sec_1_2_scrap_engine_i':
            currentProgress = rates.scrapPerSecond;
            break;
          case 'sec_1_3_power_surplus_i':
            if (resources.energyProduction - resources.energyConsumption >= 20) {
              currentProgress = (mission.current || 0) + 1;
            } else {
              currentProgress = 0; // Se resetea si no se cumple la condición
            }
            break;
          case 'sec_1_4_scrap_reserves':
            currentProgress = resources.maxScrap;
            break;
          case 'sec_1_5_charged_batteries':
            currentProgress = resources.maxEnergy;
            break;
          case 'sec_1_6_expanding_force':
            currentProgress = drones.medium > 0 ? 1 : 0;
            break;
          case 'sec_1_7_continuous_operation':
            if (resources.energy > 0) {
              currentProgress = (mission.current || 0) + 1;
            } else {
              currentProgress = 0; // Se resetea si la energía llega a 0
            }
            break;
          case 'sec_1_8_scrap_engine_ii':
            currentProgress = rates.scrapPerSecond;
            break;
          case 'sec_1_9_first_gigawatt':
            currentProgress = energy.solarPanels + energy.mediumSolarPanels + energy.advancedSolar;
            break;
          case 'sec_1_10_self_sufficiency':
            currentProgress = (drones.basic > 0 ? 1 : 0) + (drones.medium > 0 ? 1 : 0) + (energy.solarPanels > 0 ? 1 : 0) + (storage.basicStorage > 0 ? 1 : 0);
            break;

          // Cat 2: Especialización y Tecnología
          case 'sec_2_1_collective_mind_i':
            currentProgress = techCenter.researchPoints;
            break;
          case 'sec_2_2_first_alloy':
            currentProgress = resources.metalRefinado > 0 ? 1 : 0;
            break;
          case 'sec_2_3_always_optimizing':
            currentProgress = Object.values(techCenter.upgrades).filter(level => level > 0).length;
            break;
          case 'sec_2_4_balanced_fleet':
            if (drones.basic >= 20 && drones.medium >= 10 && drones.advanced >= 5) {
              currentProgress = 35;
            } else {
              currentProgress = 0;
            }
            break;
          case 'sec_2_5_basic_metallurgy':
            currentProgress = resources.metalRefinado;
            break;
          case 'sec_2_6_one_step_ahead':
            currentProgress = drones.advanced > 0 ? 1 : 0;
            break;
          case 'sec_2_7_efficiency_master':
            currentProgress = Math.max(0, ...Object.values(techCenter.upgrades));
            break;
          case 'sec_2_8_front_line':
            currentProgress = drones.reinforcedBasic + drones.reinforcedMedium + drones.reinforcedAdvanced;
            break;
          case 'sec_2_9_advanced_siderurgy':
            currentProgress = resources.aceroEstructural;
            break;
          case 'sec_2_10_collective_mind_ii':
            currentProgress = techCenter.researchPoints;
            break;

          // Cat 3: Dominio y Expedición
          case 'sec_3_1_rookie_explorer':
            // Se maneja externamente o con un contador de estadísticas
            break;
          case 'sec_3_2_a_titan_is_born':
            currentProgress = drones.golem > 0 ? 1 : 0;
            break;
          case 'sec_3_3_seasoned_adventurer':
            // Se maneja externamente o con un contador de estadísticas
            break;
          case 'sec_3_4_dragons_hoard':
            currentProgress = resources.scrap;
            break;
          case 'sec_3_5_final_preparations':
            if(resources.metalRefinado >= 500 && resources.aceroEstructural >= 100){
              currentProgress = 600;
            } else {
              currentProgress = 0;
            }
            break;
          case 'sec_3_6_steel_army':
            currentProgress = Object.values(drones).reduce((a, b) => a + b, 0);
            break;
          case 'sec_3_7_the_great_wyrm':
            currentProgress = drones.wyrm > 0 ? 1 : 0;
            break;
          case 'sec_3_8_legendary_treasure_hunter':
            // Se maneja externamente o con un contador de estadísticas
            break;
          case 'sec_3_9_mass_production':
            currentProgress = resources.metalRefinado + resources.aceroEstructural;
            break;
          case 'sec_3_10_industrial_empire':
            currentProgress = rates.scrapPerSecond;
            break;
        }
        
        const newCurrent = Math.min(currentProgress, mission.target);
        if (newCurrent !== mission.current) {
            return { ...mission, current: newCurrent };
        }
        return mission;
      });

      if (vindicatorCompletedThisTick) {
        return {
          ...state,
          currentScene: 'phase2Intro',
          phase2Unlocked: true,
          missions: {
            ...state.missions,
            activeMissions: missionsWithUpdatedProgress.filter(m => m.id !== 'main_5_final_assembly'),
            completedMissions: [...state.missions.completedMissions, 'main_5_final_assembly'],
          }
        };
      }
      
      return {
        ...state,
        missions: {
          ...state.missions,
          activeMissions: missionsWithUpdatedProgress,
        }
      };
    }

    case 'CLAIM_REWARD': {
      const missionId = action.payload;
      const mission = state.missions.activeMissions.find(m => m.id === missionId);
      
      if (!mission || mission.current < mission.target) {
        return state;
      }

      let canClaim = true;
      switch (mission.reward.type) {
        case 'scrap':
          canClaim = state.resources.scrap + mission.reward.value <= state.resources.maxScrap;
          break;
        case 'energy':
          canClaim = state.resources.energy + mission.reward.value <= state.resources.maxEnergy;
          break;
        default:
          canClaim = true;
      }

      if (!canClaim) {
        return state;
      }

      const newResources = { ...state.resources };
            switch (mission.reward.type) {
        case 'scrap':
          newResources.scrap += mission.reward.value;
          break;
        case 'energy':
          newResources.energy += mission.reward.value;
          break;
        case 'nucleoSingularidad':
          newResources.nucleoSingularidad += mission.reward.value;
          break;
      }
      
      const updatedActiveMissions = state.missions.activeMissions.filter(m => m.id !== missionId);
      const newCompletedMissions = [...state.missions.completedMissions, missionId];
      const missionsToAdd: Mission[] = [];

      if (mission.isMain) {
        const missionIndex = allMissions.findIndex(m => m.id === missionId);
        if (missionIndex !== -1 && missionIndex + 1 < allMissions.length) {
          const nextMission = allMissions[missionIndex + 1];
          if (!state.missions.activeMissions.some(m => m.id === nextMission.id) && !state.missions.completedMissions.includes(nextMission.id)) {
            missionsToAdd.push({ ...nextMission, current: 0, completed: false });
          }
        }
      }
      
      const finalActiveMissions = [...updatedActiveMissions, ...missionsToAdd];

      return {
        ...state,
        resources: newResources,
        missions: {
          ...state.missions,
          activeMissions: finalActiveMissions,
          completedMissions: newCompletedMissions,
        }
      };
    }

    case 'RESEARCH_UPGRADE': {
      const { upgradeName, cost } = action.payload;
      if (state.techCenter.researchPoints >= cost) {
        const newUpgrades = { ...state.techCenter.upgrades };
        let newModules = { ...state.modules };
        
                if (upgradeName in newUpgrades && typeof (newUpgrades as any)[upgradeName] === 'number') {
          ((newUpgrades as any)[upgradeName] as number) += 1;
        }

        if (upgradeName === 'foundryProtocols') {
          newModules.foundry = true;
        }
        
        return {
          ...state,
          modules: newModules,
          techCenter: {
            ...state.techCenter,
            researchPoints: state.techCenter.researchPoints - cost,
            upgrades: newUpgrades
          }
        };
      }
      return state;
    }

    case 'GAME_TICK': {
      let newState = { ...state };
      const { upgrades } = newState.techCenter;

      const globalConstructionSpeed = 1 + (upgrades.constructionEfficiency * 0.05);

      const processQueue = <
        TQueue extends Record<string, { queue: number; progress: number; time: number }>
      >(
        queues: TQueue,
        inventory: Record<keyof TQueue, number>,
        categoryBonus: number
      ): { newInventory: Record<keyof TQueue, number>; newQueues: TQueue; changed: boolean } => {
        const newInventory = { ...inventory };
        const newQueues = JSON.parse(JSON.stringify(queues)) as TQueue;
        let changed = false;
        const totalSpeedMultiplier = globalConstructionSpeed + categoryBonus;

        for (const key in newQueues) {
            if (Object.prototype.hasOwnProperty.call(newQueues, key)) {
                const queueItem = newQueues[key];
                if (queueItem.queue > 0) {
                    changed = true;
                    const newProgress = queueItem.progress + 1 * totalSpeedMultiplier;
                    const itemsFinished = Math.floor(newProgress / queueItem.time);
                    const actualItemsFinished = Math.min(itemsFinished, queueItem.queue);

                    if (actualItemsFinished > 0) {
                        newInventory[key as keyof TQueue] = (newInventory[key as keyof TQueue] || 0) + actualItemsFinished;
                        queueItem.queue -= actualItemsFinished;
                        queueItem.progress = newProgress - actualItemsFinished * queueItem.time;
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

      const workshopResult = processQueue(newState.workshop.queues, { ...newState.drones }, upgrades.droneAssembly * 0.05);
      const energyResult = processQueue(newState.energy.queues, { 
        solarPanels: newState.energy.solarPanels, 
        mediumSolarPanels: newState.energy.mediumSolarPanels, 
        advancedSolar: newState.energy.advancedSolar, 
        energyCores: newState.energy.energyCores 
      }, upgrades.energyCalibration * 0.05);
      
      const storageInventory = Object.keys(newState.storage.queues).reduce((acc, key) => {
        (acc as any)[key] = (newState.storage as any)[key];
        return acc;
      }, {} as Record<keyof typeof newState.storage.queues, number>);
      const storageResult = processQueue(newState.storage.queues, storageInventory, upgrades.storageConstruction * 0.05);
      
      // Modificar los tiempos de la fundición basándose en las mejoras
      const modifiedFoundryQueues = { ...newState.foundry.queues };
      modifiedFoundryQueues.metalRefinado = {
        ...modifiedFoundryQueues.metalRefinado,
        time: initialGameState.foundry.queues.metalRefinado.time * (1 - ((upgrades.metalSmeltingSpeed || 0) * 0.05))
      };
      modifiedFoundryQueues.aceroEstructural = {
        ...modifiedFoundryQueues.aceroEstructural,
        time: initialGameState.foundry.queues.aceroEstructural.time * (1 - ((upgrades.steelProductionSpeed || 0) * 0.05))
      };

      const foundryResult = processQueue(modifiedFoundryQueues, { 
        metalRefinado: newState.resources.metalRefinado, 
        aceroEstructural: newState.resources.aceroEstructural, 
        placasCasco: newState.resources.placasCasco, 
        cableadoSuperconductor: newState.resources.cableadoSuperconductor 
      }, 0);

      if (workshopResult.changed || energyResult.changed || storageResult.changed || foundryResult.changed) {
        let newModules = { ...newState.modules };
        // Lógica de desbloqueo de módulos por construcción
        if (workshopResult.newInventory.expeditionDrone > 0 && !newModules.expeditions) {
          newModules.expeditions = true;
        }
        if (workshopResult.newInventory.golem > 0 && !newModules.shipyard) {
          newModules.shipyard = true;
        }

        newState = {
          ...newState,
          modules: newModules,
          drones: { ...newState.drones, ...workshopResult.newInventory },
          workshop: { ...newState.workshop, queues: workshopResult.newQueues },
          energy: { 
            ...newState.energy, 
            solarPanels: energyResult.newInventory.solarPanels, 
            mediumSolarPanels: energyResult.newInventory.mediumSolarPanels, 
            advancedSolar: energyResult.newInventory.advancedSolar, 
            energyCores: energyResult.newInventory.energyCores, 
            queues: energyResult.newQueues 
          },
          storage: { 
            ...newState.storage, 
            basicStorage: storageResult.newInventory.basicStorage, 
            mediumStorage: storageResult.newInventory.mediumStorage, 
            advancedStorage: storageResult.newInventory.advancedStorage, 
            quantumHoardUnit: storageResult.newInventory.quantumHoardUnit, 
            lithiumIonBattery: storageResult.newInventory.lithiumIonBattery, 
            plasmaAccumulator: storageResult.newInventory.plasmaAccumulator, 
            harmonicContainmentField: storageResult.newInventory.harmonicContainmentField, 
            queues: storageResult.newQueues 
          },
          foundry: { ...newState.foundry, queues: foundryResult.newQueues },
          resources: {
            ...newState.resources,
            metalRefinado: foundryResult.newInventory.metalRefinado,
            aceroEstructural: foundryResult.newInventory.aceroEstructural,
            placasCasco: foundryResult.newInventory.placasCasco,
            cableadoSuperconductor: foundryResult.newInventory.cableadoSuperconductor
          },
        };
      }
      
      const modulesBefore = { ...newState.modules };
      const prev = newState;

      const powerOptimizationMultiplier = 1 - (upgrades.powerOptimization * 0.05);
      const totalEnergyConsumption = (prev.drones.basic * 1 + prev.drones.medium * 3 + prev.drones.advanced * 5 + prev.drones.reinforcedBasic * 3 + prev.drones.reinforcedMedium * 6 + prev.drones.reinforcedAdvanced * 12 + prev.drones.golem * 50 + prev.drones.wyrm * 200) * powerOptimizationMultiplier;
      
      const energyEfficiencyMultiplier = 1 + (upgrades.energyEfficiency * 0.10);
      const coreEfficiencyMultiplier = 1 + (upgrades.coreEfficiency * 0.10);
      const totalEnergyProduction = (prev.energy.solarPanels * 3 + prev.energy.mediumSolarPanels * 10 + prev.energy.advancedSolar * 30) * energyEfficiencyMultiplier + (prev.energy.energyCores * 50) * coreEfficiencyMultiplier;
      
      const baseMaxEnergy = 50;
      const energyCoreBonus = prev.energy.energyCores * 100;
      const energyStorageBonus = (prev.storage.lithiumIonBattery * 50 + prev.storage.plasmaAccumulator * 250 + prev.storage.harmonicContainmentField * 1200) * (1 + (upgrades.energyStorage * 0.10));
      const totalMaxEnergy = (baseMaxEnergy + energyCoreBonus + energyStorageBonus) * (1 + (upgrades.batteryTech * 0.15));

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
      const energySurplus = Math.max(0, prev.resources.energy - totalEnergyConsumption);
      const energyResearch = (energySurplus * 0.005) * (1 + (upgrades.algorithmOptimization * 0.15));
      const researchPointsToAdd = (baseResearch + droneResearch + energyResearch) / (1 - (upgrades.quantumComputing * 0.05));
      const newResearchPoints = prev.techCenter.researchPoints + researchPointsToAdd;

      const finalState = {
        ...prev,
        resources: {
          ...prev.resources,
          scrap: clampedScrap,
          metalRefinado: newMetalRefinado,
          aceroEstructural: newAceroEstructural,
          energy: clampedEnergy,
          energyConsumption: totalEnergyConsumption,
          energyProduction: totalEnergyProduction,
          maxEnergy: totalMaxEnergy,
          maxScrap: totalMaxScrap
        },
        rates: { ...prev.rates, scrapPerSecond: totalScrapProduction },
        techCenter: { ...prev.techCenter, researchPoints: newResearchPoints },
      };

      // Lógica de desbloqueo de módulos por recursos
      if (finalState.resources.scrap >= 50 && !finalState.modules.energy) {
        finalState.modules = { ...finalState.modules, energy: true };
      }
      if (finalState.resources.scrap >= 75 && !finalState.modules.storage) {
        finalState.modules = { ...finalState.modules, storage: true };
      }

      // Lógica de desbloqueo del Centro Técnico
      if (
        finalState.drones.medium >= 3 &&
        finalState.energy.advancedSolar >= 1 &&
        finalState.resources.scrap >= 1000 &&
        !finalState.modules.techCenter
      ) {
        finalState.modules = { ...finalState.modules, techCenter: true };
        finalState.techCenter = { ...finalState.techCenter, unlocked: true };
      }

      // --- Lógica de Notificaciones de Desbloqueo ---
      const finalModules = finalState.modules;
      const newNotifications = [...finalState.notificationQueue];

      if (!modulesBefore.energy && finalModules.energy) {
        newNotifications.push({
          id: `energy-${Date.now()}`,
          title: 'Módulo de Energía Desbloqueado',
          message: 'Ahora puedes construir paneles solares para generar energía y alimentar más drones.'
        });
      }
      if (!modulesBefore.storage && finalModules.storage) {
        newNotifications.push({
          id: `storage-${Date.now()}`,
          title: 'Módulo de Almacenamiento Desbloqueado',
          message: 'Construye unidades de almacén para aumentar tu capacidad máxima de chatarra y energía.'
        });
      }
      if (!modulesBefore.techCenter && finalModules.techCenter) {
        newNotifications.push({
          id: `tech-center-${Date.now()}`,
          title: 'Centro Técnico Desbloqueado',
          message: 'Investiga nuevas tecnologías para mejorar tus drones, la producción de energía y mucho más.'
        });
      }
      if (!modulesBefore.foundry && finalModules.foundry) {
        newNotifications.push({
          id: `foundry-${Date.now()}`,
          title: 'Fundición Desbloqueada',
          message: 'Refina chatarra en materiales avanzados para construir estructuras y drones más potentes.'
        });
      }
      if (!modulesBefore.expeditions && finalModules.expeditions) {
        newNotifications.push({
          id: `expeditions-${Date.now()}`,
          title: 'Módulo de Expediciones Desbloqueado',
          message: 'Envía drones a lo desconocido para encontrar recursos que no se pueden fabricar.'
        });
      }
      if (!modulesBefore.shipyard && finalModules.shipyard) {
        newNotifications.push({
          id: `shipyard-${Date.now()}`,
          title: 'Astillero Desbloqueado',
          message: '¡El objetivo final! Dona componentes para reconstruir la nave "Vindicator".'
        });
      }
      
      finalState.notificationQueue = newNotifications;
      // --- Fin de la Lógica de Notificaciones ---

      return finalState;
    }
    
    case 'DEBUG_UNLOCK_TECH_CENTER':
        return {
            ...state,
            modules: { ...state.modules, techCenter: true, foundry: true, shipyard: true, expeditions: true },
            techCenter: {
              ...state.techCenter,
              unlocked: true,
              upgrades: {
                ...state.techCenter.upgrades,
                collectionEfficiency: 1,
                droneAssembly: 1,
                reinforcedBasicDrones: 1,
                reinforcedMediumDrones: 1,
                reinforcedAdvancedDrones: 1,
                golemChassis: 1,
              }
            },
            shipyard: { ...state.shipyard, unlocked: true },
            drones: { 
              ...state.drones, 
              medium: Math.max(state.drones.medium, 3),
              reinforcedMedium: Math.max(state.drones.reinforcedMedium, 3),
              reinforcedAdvanced: Math.max(state.drones.reinforcedAdvanced, 5),
              golem: Math.max(state.drones.golem, 1),
              expeditionDrone: Math.max(state.drones.expeditionDrone, 1)
            },
            energy: { ...state.energy, advancedSolar: Math.max(state.energy.advancedSolar, 1) },
            resources: { 
              ...state.resources, 
              scrap: Math.max(state.resources.scrap, 150000),
                            metalRefinado: Math.max(state.resources.metalRefinado, 5000),
            }
        };

        case 'DEBUG_COMPLETE_VINDICATOR': {
      const newProgress = JSON.parse(JSON.stringify(state.shipyard.costs));
      return {
        ...state,
        shipyard: {
          ...state.shipyard,
          progress: newProgress
        }
      };
    }

    case 'DEBUG_FINISH_EXPEDITIONS': {
      const finishedExpeditions = state.activeExpeditions.map(exp => ({
        ...exp,
        completionTimestamp: Date.now()
      }));
      return {
        ...state,
        activeExpeditions: finishedExpeditions
      };
    }

        case 'DONATE_TO_SHIPYARD': {
      const { component, resource, amount } = action.payload as { 
        component: keyof GameState['shipyard']['costs'], 
        resource: string, 
        amount: number 
      };
      
      if (!(component in state.shipyard.costs)) {
        return state;
      }
      
            const cost = (state.shipyard.costs[component] as Record<string, number>)[resource];
      const progress = (state.shipyard.progress[component] as Record<string, number>)[resource];

      if (cost === undefined || progress === undefined) {
        return state;
      }
      
      let amountToDonate: number;
      let newResources = { ...state.resources };
            let newTechCenter = { ...state.techCenter };

      if (resource === 'researchPoints') {
        amountToDonate = Math.min(amount, state.techCenter.researchPoints, cost - progress);
        if (amountToDonate > 0) {
          newTechCenter.researchPoints -= amountToDonate;
        }
      } else if (Object.keys(state.resources).includes(resource)) {
                amountToDonate = Math.min(amount, (state.resources as any)[resource], cost - progress);
        if (amountToDonate > 0) {
          (newResources as any)[resource] -= amountToDonate;
        }
      } else {
        return state; 
      }

      if (amountToDonate <= 0) return state;

      const newShipyardProgress = JSON.parse(JSON.stringify(state.shipyard.progress));
      (newShipyardProgress[component] as any)[resource] += amountToDonate;

      return {
        ...state,
        resources: newResources,
        techCenter: newTechCenter,
        shipyard: {
          ...state.shipyard,
          progress: newShipyardProgress,
        }
      };
    }

    case 'SELECT_BATTLE_DESTINATION':
      return {
        ...state,
        battleRoom: {
          ...state.battleRoom,
          selectedDestination: action.payload,
        },
      };

        case 'START_BATTLE': {
      if (state.battleRoom.selectedDestination === null) {
        return state;
      }

      const destinationIndex = state.battleRoom.selectedDestination;
      const destination = battleDestinations[destinationIndex];
      const battleIndex = state.battleRoom.battlesCompleted[destinationIndex] || 0;

      if (battleIndex >= destination.battles.length) {
        return state; // Todas las batallas en este destino ya están completadas
      }

      const enemy = destination.battles[battleIndex];

      return {
        ...state,
        currentScene: 'combatScene', // ¡Cambiamos a la nueva escena de combate!
        activeBattle: {
          destinationIndex,
          battleIndex,
          enemyName: enemy.enemyName,
          enemyMaxHealth: enemy.health,
          enemyCurrentHealth: enemy.health,
          enemyMaxShield: enemy.shield,
          enemyCurrentShield: enemy.shield,
        },
        // Opcional: Regenerar completamente el escudo del Vindicator al empezar una batalla
        vindicator: {
          ...state.vindicator,
          currentShield: state.vindicator.maxShield,
                },
      };
    }

    case 'PLAYER_ATTACK': {
      if (!state.activeBattle) {
        return state; // No se puede atacar si no hay batalla
      }
      
      const { activeBattle, vindicator } = state;
      const enemy = battleDestinations[activeBattle.destinationIndex].battles[activeBattle.battleIndex];

      const applyDamage = (
        damage: number,
        targetShield: number,
        targetHealth: number
      ): { newShield: number; newHealth: number } => {
        let remainingDamage = damage;
        let newShield = targetShield;
        let newHealth = targetHealth;

        const shieldDamage = Math.min(newShield, remainingDamage);
        newShield -= shieldDamage;
        remainingDamage -= shieldDamage;

        if (remainingDamage > 0) {
          newHealth = Math.max(0, newHealth - remainingDamage);
        }
        return { newShield, newHealth };
      };

      // Vindicator ataca al enemigo
      const enemyDamageResult = applyDamage(
        vindicator.damage,
        activeBattle.enemyCurrentShield,
        activeBattle.enemyCurrentHealth
      );

      // Si el enemigo sobrevive al ataque, contraataca
      let vindicatorDamageResult = { newShield: vindicator.currentShield, newHealth: vindicator.currentHealth };
      if (enemyDamageResult.newHealth > 0) {
        vindicatorDamageResult = applyDamage(
          enemy.damage,
          vindicator.currentShield,
          vindicator.currentHealth
        );
      }
      
      const updatedVindicator = {
        ...vindicator,
        currentShield: vindicatorDamageResult.newShield,
        currentHealth: vindicatorDamageResult.newHealth,
      };

      const updatedActiveBattle = {
        ...activeBattle,
        enemyCurrentShield: enemyDamageResult.newShield,
        enemyCurrentHealth: enemyDamageResult.newHealth,
      };

      // Comprobar fin de la batalla
      if (updatedVindicator.currentHealth <= 0) {
        // --- DERROTA ---
        return {
          ...state,
          currentScene: 'phase2Main',
          activeBattle: null,
          vindicator: {
            ...vindicator,
            currentHealth: vindicator.maxHealth,
            currentShield: 0,
          }
        };
      } else if (updatedActiveBattle.enemyCurrentHealth <= 0) {
        // --- VICTORIA ---
        const newBattlesCompleted = [...state.battleRoom.battlesCompleted];
        newBattlesCompleted[activeBattle.destinationIndex]++;
        
                return {
          ...state,
          currentScene: 'phase2Main',
          activeBattle: null,
                    resources: {
            ...state.resources,
            scrap: state.resources.scrap + (enemy.reward.scrap || 0),
            aleacionReforzada: state.resources.aleacionReforzada + (enemy.reward.aleacionReforzada || 0),
            neuroChipCorrupto: state.resources.neuroChipCorrupto + (enemy.reward.neuroChipCorrupto || 0),
          },
          battleRoom: {
            ...state.battleRoom,
            battlesCompleted: newBattlesCompleted,
          },
          vindicator: updatedVindicator,
        };
      } else {
        // --- LA BATALLA CONTINÚA ---
        return {
          ...state,
          vindicator: updatedVindicator,
          activeBattle: updatedActiveBattle,
        };
      }
    }

    case 'CANCEL_QUEUE_ITEM': {
      const { category, itemName, amount } = action.payload;

      // Crear una copia profunda del estado para evitar mutaciones inesperadas
      const newState = JSON.parse(JSON.stringify(state));

      // Obtener la cola específica
      const queue = (newState[category as keyof GameState] as any)?.queues?.[itemName];

      if (!queue) {
      return state;
  }

      // Calcular la cantidad a cancelar
      const amountToCancel = amount === 'all' ? queue.queue : Math.min(amount, queue.queue);

      if (amountToCancel <= 0) {
        return state;
} 

      // Obtener los costos del item para devolver los recursos
      // Usamos gameData para una fuente única de verdad
                        const getItemCosts = (cat: string, item: string): Record<string, number> => {
        const categoryData = (gameData as any)[cat];
        if (categoryData && categoryData[item] && categoryData[item].costs) {
          return categoryData[item].costs;
        }
        // Casos especiales
        if (cat === 'workshop' && gameData.drones[item as keyof typeof gameData.drones]) {
            return gameData.drones[item as keyof typeof gameData.drones].costs;
        }
        if (cat === 'foundry') {
            const foundryItem = Object.values(gameData.foundry).find(
                (foundryItem) => (foundryItem as any).id.toLowerCase() === item.toLowerCase()
            );
            if (foundryItem) {
                return foundryItem.costs;
            }
        }
        return {};
    };

      const costs = getItemCosts(category, itemName);

      // Devolver los recursos
      Object.entries(costs).forEach(([resource, cost]) => {
        if (resource in newState.resources) {
          (newState.resources as any)[resource] += (cost as number) * amountToCancel;
        }
      });

      // Reducir la cola
      queue.queue -= amountToCancel;

      // Si la cola queda vacía, reiniciar el progreso
      if (queue.queue === 0) {
        queue.progress = 0;
      }

      return newState;
    }

        default:
      return state;
  }
}

