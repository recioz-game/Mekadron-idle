import { allExpeditionsData } from '../data/expeditionsData';
import { allShipyardProjects } from '../data/shipyardData';
import { constructionReducer } from './constructionReducer';
import { missionsReducer } from './missionsReducer';
import { combatReducer } from './combatReducer';
import { processGameTick } from '../gameLogic/tickLogic';
import { GameState, initialGameState, ActiveExpedition, ResourceType, ExpeditionId } from '../types/gameState';
import { vindicatorLevelData, vindicatorMK2LevelData, vindicatorMK3LevelData, vindicatorMK4LevelData, vindicatorMK5LevelData, vindicatorMK6LevelData, vindicatorMK7LevelData, vindicatorMK8LevelData, vindicatorMK9LevelData } from '../data/battleData';
import { ActionType } from '../types/actions';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';
import { droneData } from '../data/droneData';
import { updateVindicatorToVM01, updateVindicatorToVM02, updateVindicatorToVM03, updateVindicatorToVM04, updateVindicatorToVM05, updateVindicatorToVM06, updateVindicatorToVM07, updateVindicatorToVM08, updateVindicatorToVM09 } from '../gameLogic/utils';
import { bodegaData } from '../data/bodegaData';
import { ResourceCategory } from '../data/categoryData';
import { deepMerge, rehydrateState } from './contextUtils';
import { formatNumber } from '../utils/formatNumber';

// Helper function for Vindicator star upgrades
const handleVindicatorStarUpgrade = (
  state: GameState,
  upgradeId: string,
  upgradesData: any,
  upgradesKey: keyof GameState
): GameState => {
  const upgrade = upgradesData[upgradeId];
  if (!upgrade || upgrade.currentStars >= upgrade.maxStars) {
    return state;
  }

  const { phase1Resources, phase2Resources } = upgrade.costPerStar;

  const hasEnoughResources = 
    Object.entries(phase1Resources).every(([res, amount]) => state.vindicator.bodegaResources[res as keyof typeof state.vindicator.bodegaResources] >= (amount as number)) &&
    Object.entries(phase2Resources).every(([res, amount]) => state.vindicator.bodegaResources[res as keyof typeof state.vindicator.bodegaResources] >= (amount as number));

  if (!hasEnoughResources) {
    return state;
  }

  const newBodegaResources = { ...state.vindicator.bodegaResources };
  Object.entries(phase1Resources).forEach(([resource, amount]) => { newBodegaResources[resource as keyof typeof newBodegaResources] -= (amount as number); });
  Object.entries(phase2Resources).forEach(([resource, amount]) => { newBodegaResources[resource as keyof typeof newBodegaResources] -= (amount as number); });

  const { health, shield, damage } = upgrade.statIncreasePerStar;

  return {
    ...state,
    vindicator: {
      ...state.vindicator,
      bodegaResources: newBodegaResources,
      maxHealth: state.vindicator.maxHealth + (health || 0),
      maxShield: state.vindicator.maxShield + (shield || 0),
      damage: state.vindicator.damage + (damage || 0),
    },
    [upgradesKey]: {
      ...upgradesData,
      [upgradeId]: { ...upgrade, currentStars: upgrade.currentStars + 1 }
    }
  };
};

export const gameReducer = (state: GameState, action: ActionType): GameState => {
  let newState = { ...state };

    // Call sub-reducers
    newState = combatReducer(newState, action);
  newState = constructionReducer(newState, action);
  newState = missionsReducer(newState, action);

        // The rest of the switch handles non-combat actions
  switch (action.type) {
    case 'LOAD_STATE': {
      // Primero, fusiona el estado cargado con el estado inicial por defecto.
      // Esto asegura que cualquier nueva propiedad en el juego que no exista en el guardado
      // se inicialice correctamente en lugar de causar errores.
      const mergedState = deepMerge(initialGameState, action.payload);

      // Luego, rehidrata el estado fusionado.
      // Esto convierte datos que no sobreviven bien el formato JSON (como los Sets)
      // de vuelta a su formato original.
      const hydratedState = rehydrateState(mergedState);

      // Finalmente, actualiza el timestamp de guardado para que el cálculo offline funcione
      // correctamente la próxima vez que el jugador abra el juego.
      hydratedState.lastSaveTimestamp = Date.now();

      return hydratedState;
    }
    
    case 'SET_WORKSHOP_BUY_AMOUNT':
      return {
        ...state,
        workshopBuyAmount: action.payload,
      };

    case 'RESET_GAME':
      try {
        localStorage.removeItem('mekadron-savegame');
      } catch (err) {
        console.error("Failed to clear save game:", err);
      }
      return { ...initialGameState, notificationQueue: [] };

    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notificationQueue: state.notificationQueue.slice(1),
      };

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

        case 'SET_FOUNDRY_BUY_AMOUNT':
        return {
            ...state,
            foundryBuyAmount: action.payload,
        };

    case 'SET_EXPEDITION_BUY_AMOUNT':
        return {
            ...state,
            expeditionBuyAmount: action.payload,
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

    case 'GO_TO_PHASE_2_VIEW':
      return {
        ...state,
        currentScene: 'phase2Main',
        currentView: action.payload,
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

                case 'REMOVE_AURORA_MESSAGE': {
            return {
                ...state,
                aurora: {
                    ...state.aurora,
                    activeMessages: state.aurora.activeMessages.filter(msg => msg.id !== action.payload.messageId),
                }
            };
        }

        case 'PROCESS_AURORA_QUEUE': {
        if (state.aurora.pendingMessages.length === 0) {
            return state;
        }

                const newMessageToAdd = state.aurora.pendingMessages[0];
        const newActiveMessage = {
            id: Date.now(),
            text: newMessageToAdd.message,
            key: newMessageToAdd.key,
            audioId: newMessageToAdd.audioId
        };

        return {
            ...state,
            aurora: {
                ...state.aurora,
                activeMessages: [...state.aurora.activeMessages, newActiveMessage],
                pendingMessages: state.aurora.pendingMessages.slice(1),
            }
        };
    }

        case 'ADD_AURORA_MESSAGE': {
        const { message, messageKey, audioId } = action.payload;
        if (state.aurora.shownMessages.has(messageKey)) {
            return state;
        }
        const newShownMessages = new Set(state.aurora.shownMessages);
        newShownMessages.add(messageKey);

        return {
            ...state,
            aurora: {
                ...state.aurora,
                pendingMessages: [...state.aurora.pendingMessages, { message, key: messageKey, audioId }],
                shownMessages: newShownMessages,
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
        currentView: '' // Asegurarse de que sea un string vacío
      };

        case 'START_EXPEDITION': {
      const { expeditionId, amount } = action.payload;
      const expedition = allExpeditionsData.find(e => e.id === expeditionId);
      if (!expedition) return state;

      const { drones: dronesRequiredPerExpedition, ...resourceCostsPerExpedition } = expedition.costs;
      const droneType = expedition.droneType;

      const dronesInUse = state.activeExpeditions
        .filter(exp => allExpeditionsData.find(e => e.id === exp.id)?.droneType === droneType)
        .reduce((sum, exp) => sum + exp.dronesSent, 0);
      
      const availableDrones = state.workshop.drones[droneType] - dronesInUse;

      let maxAffordableByResources = Infinity;
      for (const [resource, cost] of Object.entries(resourceCostsPerExpedition)) {
        const resourceKey = resource as keyof typeof state.vindicator.bodegaResources;
        const availableResource = state.vindicator.bodegaResources[resourceKey] ?? 0;
        maxAffordableByResources = Math.min(maxAffordableByResources, Math.floor(availableResource / (cost ?? 1)));
      }
      
      const maxAffordableByDrones = Math.floor(availableDrones / dronesRequiredPerExpedition);
      const maxAffordable = Math.min(maxAffordableByDrones, maxAffordableByResources);
      
      const amountToSend = amount === 'max' ? maxAffordable : Math.min(amount, maxAffordable);

      if (amountToSend <= 0) return state;

      const totalDronesToSend = amountToSend * dronesRequiredPerExpedition;
      const totalResourceCosts: { [key: string]: number } = {};
      for (const [resource, cost] of Object.entries(resourceCostsPerExpedition)) {
        totalResourceCosts[resource] = (cost ?? 0) * amountToSend;
      }
      
      const newBodegaResources = { ...state.vindicator.bodegaResources };
      for (const [resource, cost] of Object.entries(totalResourceCosts)) {
        newBodegaResources[resource as keyof typeof newBodegaResources] -= cost;
      }

            const newActiveExpedition: ActiveExpedition = {
        id: expeditionId as ExpeditionId,
        instanceId: Date.now(),
        completionTimestamp: Date.now() + expedition.duration * 1000,
        dronesSent: totalDronesToSend,
        expeditionCount: amountToSend,
      };

      return {
        ...state,
        vindicator: { ...state.vindicator, bodegaResources: newBodegaResources },
        activeExpeditions: [...state.activeExpeditions, newActiveExpedition],
      };
    }

        case 'RESEARCH_UPGRADE': {
      const { upgradeName, cost } = action.payload;
      if (state.techCenter.researchPoints >= cost) {
        const newUpgrades = {
          ...state.techCenter.upgrades,
          [upgradeName]: (state.techCenter.upgrades[upgradeName as keyof typeof state.techCenter.upgrades] || 0) + 1
        };

        // --- Lógica de Cambio de Fondo ---
        // Transición a Phase 3 (fondo 4) al investigar Foundry
        let newBackground = state.currentBackground;
        if (upgradeName === 'foundryProtocols' && state.currentBackground < 4) {
          newBackground = 4;
        }

        return {
          ...state,
          currentBackground: newBackground,
          modules: { ...state.modules, ...(upgradeName === 'foundryProtocols' && { foundry: true }) },
          techCenter: { ...state.techCenter, researchPoints: state.techCenter.researchPoints - cost, upgrades: newUpgrades }
        };
      }
      return state;
    }

                        case 'GAME_TICK': {
      let stateAfterTick = processGameTick(state) as GameState & { auroraMessages?: { message: string; messageKey: string }[] };

      // Procesar los mensajes de Aurora devueltos por tickLogic
      if (stateAfterTick.auroraMessages && stateAfterTick.auroraMessages.length > 0) {
        const newPendingMessages = [...stateAfterTick.aurora.pendingMessages];
        const newShownMessages = new Set(stateAfterTick.aurora.shownMessages);

        stateAfterTick.auroraMessages.forEach(msg => {
          if (!newShownMessages.has(msg.messageKey)) {
            newPendingMessages.push({ message: msg.message, key: msg.messageKey, audioId: (msg as any).audioId });
            newShownMessages.add(msg.messageKey);
          }
        });

        stateAfterTick.aurora = {
          ...stateAfterTick.aurora,
          pendingMessages: newPendingMessages,
          shownMessages: newShownMessages,
        };
      }
      
      // Limpiar la propiedad temporal
      delete stateAfterTick.auroraMessages;

      // --- Lógica de Cambio de Fondo ---
            // Transición a Phase 1 (fondo 2)
      if (stateAfterTick.currentBackground === 1 && stateAfterTick.modules.energy && stateAfterTick.resources.scrap >= 75) {
        stateAfterTick.currentBackground = 2;
      }
      // Transición a Phase 2 (fondo 3)
      if (stateAfterTick.currentBackground === 2 && stateAfterTick.modules.techCenter) {
        stateAfterTick.currentBackground = 3;
      }
      
                        // Ya no es necesario llamar al missionsReducer aquí, se hace a nivel global
      stateAfterTick = missionsReducer(stateAfterTick, { type: 'UPDATE_MISSION_PROGRESS' }); // <-- CORRECCIÓN: Llamar con la acción correcta
      return stateAfterTick;
    }

        case 'DEBUG_UNLOCK_TECH_CENTER':
        return {
            ...state,
            modules: { ...state.modules, techCenter: true, foundry: true, shipyard: true, expeditions: true },
            techCenter: { ...state.techCenter, unlocked: true, upgrades: { ...state.techCenter.upgrades, collectionEfficiency: 1, droneAssembly: 1, reinforcedBasicDrones: 1, reinforcedMediumDrones: 1, reinforcedAdvancedDrones: 1, golemChassis: 1, fusionTech: 1, } },
            shipyard: { ...state.shipyard, unlocked: true },
            workshop: {
              ...state.workshop,
              drones: { ...state.workshop.drones, medium: Math.max(state.workshop.drones.medium, 3), reinforcedMedium: Math.max(state.workshop.drones.reinforcedMedium, 3), reinforcedAdvanced: Math.max(state.workshop.drones.reinforcedAdvanced, 5), golem: Math.max(state.workshop.drones.golem, 1), expeditionDrone: Math.max(state.workshop.drones.expeditionDrone, 1) }
            },
            energy: { ...state.energy, advancedSolar: Math.max(state.energy.advancedSolar, 1) },
            resources: { ...state.resources, scrap: Math.max(state.resources.scrap, 150000) },
            vindicator: { 
              ...state.vindicator, 
              bodegaResources: { 
                ...state.vindicator.bodegaResources, 
                metalRefinado: Math.max(state.vindicator.bodegaResources.metalRefinado, 5000) 
              } 
            },
        };
                case 'DEBUG_COMPLETE_VINDICATOR': {
      const { shipyard } = state;
      const currentProject = allShipyardProjects[shipyard.currentProjectIndex];
      if (!currentProject) return state;

      // Crea un nuevo objeto de progreso donde cada recurso está al máximo
      const newProgress: GameState['shipyard']['progress'] = {};
      Object.keys(currentProject.costs).forEach(componentId => {
        newProgress[componentId] = { ...currentProject.costs[componentId] };
      });
      
      const tempState = { ...state, shipyard: { ...shipyard, progress: newProgress } };
      
      // Simula una donación final (con cantidad 0) para activar la lógica de transición en el reducer
      const lastComponent = Object.keys(currentProject.costs).pop()!;
      const lastResource = Object.keys(currentProject.costs[lastComponent]).pop()!;
      return gameReducer(tempState, { type: 'DONATE_TO_SHIPYARD', payload: { component: lastComponent, resource: lastResource, amount: 0 } });
    }
        case 'DEBUG_FINISH_EXPEDITIONS': {
      const finishedExpeditions = state.activeExpeditions.map(exp => ({ ...exp, completionTimestamp: Date.now() }));
      return { ...state, activeExpeditions: finishedExpeditions };
        }

            case 'DEBUG_UNLOCK_VINDICATOR_MK1': {
      // Acción atómica para establecer el estado de MK1 directamente
                    const tempState = updateVindicatorToVM01(state);
      tempState.vindicator.bodegaResources.barraCombustible = (tempState.vindicator.bodegaResources.barraCombustible || 0) + 5000;
                  return {
        ...tempState,
        phase2Unlocked: true,
                shipyard: {
          ...tempState.shipyard,
          currentProjectIndex: 2, // El MK.I está construido, el siguiente proyecto es el MK.II (índice 2)
          progress: {}, 
        },
      };
    }

            case 'DEBUG_UNLOCK_VINDICATOR_MK2': {
      // Acción atómica para establecer el estado de MK2 directamente
      let tempState = state;
      // Primero, asegura que el estado base esté listo para MK2 (p.ej. MK1 desbloqueado)
      if (tempState.vindicator.vindicatorType !== 'vm01_origin' && tempState.vindicator.vindicatorType !== 'vm02_interceptor') {
        tempState = updateVindicatorToVM01(tempState);
      }
      // Luego, actualiza a MK2
      tempState = updateVindicatorToVM02(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
        shipyard: {
          ...tempState.shipyard,
                    currentProjectIndex: 3, // Asumiendo que el MK2 es el proyecto de índice 2, el siguiente es el 3
          progress: {}, 
        },
      };
    }

        case 'DEBUG_UNLOCK_VINDICATOR_MK3': {
      // Acción atómica para establecer el estado de MK3 directamente
      let tempState = state;
      // Asegurar que se ha pasado por los estados anteriores
      if (tempState.vindicator.vindicatorType === 'base') {
        tempState = updateVindicatorToVM01(tempState);
      }
      if (tempState.vindicator.vindicatorType === 'vm01_origin') {
        tempState = updateVindicatorToVM02(tempState);
      }
      // Actualizar a MK3
      tempState = updateVindicatorToVM03(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
        shipyard: {
          ...tempState.shipyard,
                    currentProjectIndex: 4, // El MK3 es el proyecto 3, el siguiente es el 4
          progress: {}, 
        },
      };
    }

        case 'DEBUG_UNLOCK_VINDICATOR_MK4': {
      // Acción atómica para establecer el estado de MK4 directamente
      let tempState = state;
      // Asegurar que se ha pasado por los estados anteriores
      if (tempState.vindicator.vindicatorType === 'base') {
        tempState = updateVindicatorToVM01(tempState);
      }
      if (tempState.vindicator.vindicatorType === 'vm01_origin') {
        tempState = updateVindicatorToVM02(tempState);
      }
      if (tempState.vindicator.vindicatorType === 'vm02_interceptor') {
        tempState = updateVindicatorToVM03(tempState);
      }
      // Actualizar a MK4
      tempState = updateVindicatorToVM04(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
        shipyard: {
          ...tempState.shipyard,
                    currentProjectIndex: 5, // El MK4 es el proyecto 4, el siguiente es el 5
          progress: {}, 
        },
      };
    }

        case 'DEBUG_UNLOCK_VINDICATOR_MK5': {
      let tempState = state;
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToVM01(tempState);
      if (tempState.vindicator.vindicatorType === 'vm01_origin') tempState = updateVindicatorToVM02(tempState);
      if (tempState.vindicator.vindicatorType === 'vm02_interceptor') tempState = updateVindicatorToVM03(tempState);
      if (tempState.vindicator.vindicatorType === 'vm03_devastator') tempState = updateVindicatorToVM04(tempState);
      tempState = updateVindicatorToVM05(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
        shipyard: {
          ...tempState.shipyard,
                    currentProjectIndex: 6,
          progress: {}, 
        },
      };
    }

        case 'DEBUG_UNLOCK_VINDICATOR_MK6': {
      let tempState = state;
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToVM01(tempState);
      if (tempState.vindicator.vindicatorType === 'vm01_origin') tempState = updateVindicatorToVM02(tempState);
      if (tempState.vindicator.vindicatorType === 'vm02_interceptor') tempState = updateVindicatorToVM03(tempState);
      if (tempState.vindicator.vindicatorType === 'vm03_devastator') tempState = updateVindicatorToVM04(tempState);
      if (tempState.vindicator.vindicatorType === 'vm04_reaper') tempState = updateVindicatorToVM05(tempState);
      tempState = updateVindicatorToVM06(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
        shipyard: {
          ...tempState.shipyard,
                    currentProjectIndex: 7,
          progress: {}, 
        },
      };
    }

        case 'DEBUG_UNLOCK_VINDICATOR_MK7': {
      let tempState = state;
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToVM01(tempState);
      if (tempState.vindicator.vindicatorType === 'vm01_origin') tempState = updateVindicatorToVM02(tempState);
      if (tempState.vindicator.vindicatorType === 'vm02_interceptor') tempState = updateVindicatorToVM03(tempState);
      if (tempState.vindicator.vindicatorType === 'vm03_devastator') tempState = updateVindicatorToVM04(tempState);
      if (tempState.vindicator.vindicatorType === 'vm04_reaper') tempState = updateVindicatorToVM05(tempState);
      if (tempState.vindicator.vindicatorType === 'vm05_aegis') tempState = updateVindicatorToVM06(tempState);
      tempState = updateVindicatorToVM07(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
                shipyard: {
          ...tempState.shipyard,
          currentProjectIndex: 8, // El siguiente proyecto
          progress: {}, 
        },
      };
    }

        case 'DEBUG_UNLOCK_VINDICATOR_MK8': {
      let tempState = state;
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToVM01(tempState);
      if (tempState.vindicator.vindicatorType === 'vm01_origin') tempState = updateVindicatorToVM02(tempState);
      if (tempState.vindicator.vindicatorType === 'vm02_interceptor') tempState = updateVindicatorToVM03(tempState);
      if (tempState.vindicator.vindicatorType === 'vm03_devastator') tempState = updateVindicatorToVM04(tempState);
      if (tempState.vindicator.vindicatorType === 'vm04_reaper') tempState = updateVindicatorToVM05(tempState);
      if (tempState.vindicator.vindicatorType === 'vm05_aegis') tempState = updateVindicatorToVM06(tempState);
      if (tempState.vindicator.vindicatorType === 'vm06_tempest') tempState = updateVindicatorToVM07(tempState);
      tempState = updateVindicatorToVM08(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
                shipyard: {
          ...tempState.shipyard,
          currentProjectIndex: 9, // El siguiente proyecto
          progress: {},
        },
      };
    }

        case 'DEBUG_UNLOCK_VINDICATOR_MK9': {
      let tempState = state;
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToVM01(tempState);
      if (tempState.vindicator.vindicatorType === 'vm01_origin') tempState = updateVindicatorToVM02(tempState);
      if (tempState.vindicator.vindicatorType === 'vm02_interceptor') tempState = updateVindicatorToVM03(tempState);
      if (tempState.vindicator.vindicatorType === 'vm03_devastator') tempState = updateVindicatorToVM04(tempState);
      if (tempState.vindicator.vindicatorType === 'vm04_reaper') tempState = updateVindicatorToVM05(tempState);
      if (tempState.vindicator.vindicatorType === 'vm05_aegis') tempState = updateVindicatorToVM06(tempState);
      if (tempState.vindicator.vindicatorType === 'vm06_tempest') tempState = updateVindicatorToVM07(tempState);
      if (tempState.vindicator.vindicatorType === 'vm07_wraith') tempState = updateVindicatorToVM08(tempState);
      tempState = updateVindicatorToVM09(tempState);

      return {
        ...tempState,
        phase2Unlocked: true,
        shipyard: {
          ...tempState.shipyard,
          currentProjectIndex: 10, // Ya no hay más proyectos
          progress: {},
        },
      };
    }

                    case 'DONATE_TO_SHIPYARD': {
            const { component, resource, amount } = action.payload;
      const { shipyard, resources, techCenter, vindicator } = state;
      const currentProject = allShipyardProjects[shipyard.currentProjectIndex];

      if (!currentProject || !currentProject.costs[component] || !currentProject.costs[component][resource]) {
        return state;
      }

      const cost = currentProject.costs[component][resource];
      const progress = shipyard.progress[component]?.[resource] || 0;
      
                        const currentResourceAmount = resource === 'researchPoints' 
        ? techCenter.researchPoints 
        : (vindicator.bodegaResources[resource as keyof typeof vindicator.bodegaResources] || resources[resource as keyof typeof resources] || 0);

      const amountToDonate = Math.min(amount, currentResourceAmount, cost - progress);

      if (amountToDonate <= 0 && amount !== 0) { // Permitir donación de 0 para el modo debug
        return state;
      }

      let newState = { ...state };

      if (resource === 'researchPoints') {
        newState.techCenter = { ...techCenter, researchPoints: techCenter.researchPoints - amountToDonate };
      } else if (resource in vindicator.bodegaResources) {
        newState.vindicator = { ...vindicator, bodegaResources: { ...vindicator.bodegaResources, [resource]: currentResourceAmount - amountToDonate } };
      } else {
        newState.resources = { ...resources, [resource]: currentResourceAmount - amountToDonate };
      }

      const newProgress = {
        ...shipyard.progress,
        [component]: {
          ...(shipyard.progress[component] || {}),
          [resource]: progress + amountToDonate
        }
      };
      newState.shipyard = { ...shipyard, progress: newProgress };

      const isProjectComplete = Object.keys(currentProject.costs).every(componentId => {
        return Object.keys(currentProject.costs[componentId]).every(resourceId => {
          const required = currentProject.costs[componentId][resourceId];
          const donated = newProgress[componentId]?.[resourceId] || 0;
          return donated >= required;
        });
      });

      if (isProjectComplete) {
        const nextProjectIndex = shipyard.currentProjectIndex + 1;
                if (allShipyardProjects[nextProjectIndex]) {
          const nextProject = allShipyardProjects[nextProjectIndex];
          const newEmptyProgress: GameState['shipyard']['progress'] = {};
          Object.keys(nextProject.costs).forEach(componentId => {
            newEmptyProgress[componentId] = {};
            Object.keys(nextProject.costs[componentId]).forEach(resourceId => {
              newEmptyProgress[componentId][resourceId] = 0;
            });
          });

                    newState.shipyard = {
            ...shipyard,
            currentProjectIndex: nextProjectIndex,
            progress: newEmptyProgress,
          };
          
                    // Unificar todos los mensajes de construcción en uno solo de Aurora
          const auroraMessage = {
            message: "Nueva nave de combate construida. ¡A combatir!",
            messageKey: `ship-built-${currentProject.id}-${Date.now()}`,
            audioId: 8 // <-- AUDIO AÑADIDO
          };
          
          // Actualizar estado del Vindicator según el proyecto
          if (currentProject.id === 'vindicator_base') {
            newState.phase2Unlocked = true;
            newState.currentScene = 'phase2Intro';
            newState.vindicator.bodegaResources.barraCombustible = (newState.vindicator.bodegaResources.barraCombustible || 0) + 500;
          } else if (currentProject.id === 'vindicator_mk1') {
            newState = updateVindicatorToVM01(newState);
          } else if (currentProject.id === 'vindicator_mk2_interceptor') {
            newState = updateVindicatorToVM02(newState);
          } else if (currentProject.id === 'vindicator_mk3_devastator') {
            newState = updateVindicatorToVM03(newState);
          } else if (currentProject.id === 'vindicator_mk4_reaper') {
            newState = updateVindicatorToVM04(newState);
          } else if (currentProject.id === 'vindicator_mk5_aegis') {
            newState = updateVindicatorToVM05(newState);
          } else if (currentProject.id === 'vindicator_mk6_tempest') {
            newState = updateVindicatorToVM06(newState);
          } else if (currentProject.id === 'vindicator_mk7_wraith') {
            newState = updateVindicatorToVM07(newState);
          } else if (currentProject.id === 'vindicator_mk8_phantom') {
            newState = updateVindicatorToVM08(newState);
          } else if (currentProject.id === 'vindicator_mk9_apex') {
            newState = updateVindicatorToVM09(newState);
          }
          
          // Llamada recursiva para añadir el mensaje de Aurora
          return gameReducer(newState, { type: 'ADD_AURORA_MESSAGE', payload: auroraMessage });
        }
        return newState;
      }
      
      return newState;
    }

    case 'REPAIR_VINDICATOR_HEALTH': {
      const { scrapCost } = action.payload;
      if (state.resources.scrap >= scrapCost && state.vindicator.currentHealth < state.vindicator.maxHealth) {
        return { ...state, resources: { ...state.resources, scrap: state.resources.scrap - scrapCost }, vindicator: { ...state.vindicator, currentHealth: state.vindicator.maxHealth } };
      }
      return state;
    }

            case 'REPAIR_VINDICATOR_SHIELD': {
      const { fuelCost } = action.payload;
      if (state.vindicator.bodegaResources.barraCombustible >= fuelCost && state.vindicator.currentShield < state.vindicator.maxShield) {
        return { ...state, vindicator: { ...state.vindicator, bodegaResources: { ...state.vindicator.bodegaResources, barraCombustible: state.vindicator.bodegaResources.barraCombustible - fuelCost }, currentShield: state.vindicator.maxShield } };
      }
      return state;
    }

                                                    case 'UPGRADE_VINDICATOR_STAR': { // Ahora solo para el Base
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorUpgrades, 'vindicatorUpgrades');
    }

    case 'UPGRADE_VINDICATOR_MK2_STAR': {
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK2Upgrades, 'vindicatorMK2Upgrades');
    }

    case 'UPGRADE_VINDICATOR_MK3_STAR': {
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK3Upgrades, 'vindicatorMK3Upgrades');
    }

    case 'UPGRADE_VINDICATOR_MK4_STAR': {
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK4Upgrades, 'vindicatorMK4Upgrades');
    }

    case 'UPGRADE_VINDICATOR_MK5_STAR': {
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK5Upgrades, 'vindicatorMK5Upgrades');
    }

    case 'UPGRADE_VINDICATOR_MK6_STAR': {
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK6Upgrades, 'vindicatorMK6Upgrades');
    }

    case 'UPGRADE_VINDICATOR_MK7_STAR': {
     return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK7Upgrades, 'vindicatorMK7Upgrades');
    }

    case 'UPGRADE_VINDICATOR_MK8_STAR': {
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK8Upgrades, 'vindicatorMK8Upgrades');
    }

    case 'UPGRADE_VINDICATOR_MK9_STAR': {
      return handleVindicatorStarUpgrade(state, action.payload.upgradeId, state.vindicatorMK9Upgrades, 'vindicatorMK9Upgrades');
    }

    case 'LEVEL_UP_VINDICATOR': {
        const currentLevel = state.vindicatorLevel;
        const nextLevelData = vindicatorLevelData.find(level => level.level === currentLevel + 1);
        if (!nextLevelData || state.blueprints < nextLevelData.blueprintCost) return state;
                const { statBonus } = nextLevelData;
        return { ...state, blueprints: state.blueprints - nextLevelData.blueprintCost, vindicatorLevel: currentLevel + 1, vindicator: { ...state.vindicator, maxHealth: state.vindicator.maxHealth + statBonus.health, currentHealth: state.vindicator.currentHealth + statBonus.health, maxShield: state.vindicator.maxShield + statBonus.shield, currentShield: state.vindicator.currentShield + statBonus.shield, damage: state.vindicator.damage + statBonus.damage, } };
    }

                case 'LEVEL_UP_VINDICATOR_MK2': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK2LevelData.find(level => level.level === currentLevel + 1);
      
      if (!nextLevelData || state.vindicator.bodegaResources.planosDeInterceptor < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return { 
        ...state, 
        vindicator: { 
          ...state.vindicator, 
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosDeInterceptor: state.vindicator.bodegaResources.planosDeInterceptor - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health, 
          currentHealth: state.vindicator.currentHealth + statBonus.health, 
          maxShield: state.vindicator.maxShield + statBonus.shield, 
          currentShield: state.vindicator.currentShield + statBonus.shield, 
          damage: state.vindicator.damage + statBonus.damage, 
        },
                vindicatorLevel: currentLevel + 1,
      };
    }

        case 'LEVEL_UP_VINDICATOR_MK3': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK3LevelData.find(level => level.level === currentLevel + 1);
      
      if (!nextLevelData || state.vindicator.bodegaResources.planosMK3 < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return { 
        ...state, 
        vindicator: { 
          ...state.vindicator, 
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosMK3: state.vindicator.bodegaResources.planosMK3 - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health, 
          currentHealth: state.vindicator.currentHealth + statBonus.health, 
          maxShield: state.vindicator.maxShield + statBonus.shield, 
          currentShield: state.vindicator.currentShield + statBonus.shield, 
          damage: state.vindicator.damage + statBonus.damage, 
        },
        vindicatorLevel: currentLevel + 1,
      };
    }

    case 'LEVEL_UP_VINDICATOR_MK4': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK4LevelData.find(level => level.level === currentLevel + 1);
      
      if (!nextLevelData || state.vindicator.bodegaResources.planosMK4 < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return { 
        ...state, 
        vindicator: { 
          ...state.vindicator, 
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosMK4: state.vindicator.bodegaResources.planosMK4 - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health, 
          currentHealth: state.vindicator.currentHealth + statBonus.health, 
          maxShield: state.vindicator.maxShield + statBonus.shield, 
          currentShield: state.vindicator.currentShield + statBonus.shield, 
          damage: state.vindicator.damage + statBonus.damage, 
        },
        vindicatorLevel: currentLevel + 1,
      };
    }

        case 'LEVEL_UP_VINDICATOR_MK5': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK5LevelData.find(level => level.level === currentLevel + 1);
      
      if (!nextLevelData || state.vindicator.bodegaResources.planosMK5 < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return { 
        ...state, 
        vindicator: { 
          ...state.vindicator, 
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosMK5: state.vindicator.bodegaResources.planosMK5 - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health, 
          currentHealth: state.vindicator.currentHealth + statBonus.health, 
          maxShield: state.vindicator.maxShield + statBonus.shield, 
          currentShield: state.vindicator.currentShield + statBonus.shield, 
          damage: state.vindicator.damage + statBonus.damage, 
        },
        vindicatorLevel: currentLevel + 1,
      };
    }

    case 'LEVEL_UP_VINDICATOR_MK6': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK6LevelData.find(level => level.level === currentLevel + 1);
      
      if (!nextLevelData || state.vindicator.bodegaResources.planosMK6 < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return { 
        ...state, 
        vindicator: { 
          ...state.vindicator, 
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosMK6: state.vindicator.bodegaResources.planosMK6 - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health, 
          currentHealth: state.vindicator.currentHealth + statBonus.health, 
          maxShield: state.vindicator.maxShield + statBonus.shield, 
          currentShield: state.vindicator.currentShield + statBonus.shield, 
          damage: state.vindicator.damage + statBonus.damage, 
        },
                vindicatorLevel: currentLevel + 1,
      };
    }

    case 'LEVEL_UP_VINDICATOR_MK7': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK7LevelData.find(level => level.level === currentLevel + 1);
      
      if (!nextLevelData || state.vindicator.bodegaResources.planosMK7 < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return { 
        ...state, 
        vindicator: { 
          ...state.vindicator, 
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosMK7: state.vindicator.bodegaResources.planosMK7 - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health, 
          currentHealth: state.vindicator.currentHealth + statBonus.health, 
          maxShield: state.vindicator.maxShield + statBonus.shield, 
          currentShield: state.vindicator.currentShield + statBonus.shield, 
          damage: state.vindicator.damage + statBonus.damage, 
        },
                vindicatorLevel: currentLevel + 1,
      };
    }

    case 'LEVEL_UP_VINDICATOR_MK8': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK8LevelData.find(level => level.level === currentLevel + 1);

      if (!nextLevelData || state.vindicator.bodegaResources.planosMK8 < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return {
        ...state,
        vindicator: {
          ...state.vindicator,
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosMK8: state.vindicator.bodegaResources.planosMK8 - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health,
          currentHealth: state.vindicator.currentHealth + statBonus.health,
          maxShield: state.vindicator.maxShield + statBonus.shield,
          currentShield: state.vindicator.currentShield + statBonus.shield,
          damage: state.vindicator.damage + statBonus.damage,
        },
                vindicatorLevel: currentLevel + 1,
      };
    }

    case 'LEVEL_UP_VINDICATOR_MK9': {
      const currentLevel = state.vindicatorLevel;
      const nextLevelData = vindicatorMK9LevelData.find(level => level.level === currentLevel + 1);

      if (!nextLevelData || state.vindicator.bodegaResources.planosMK9 < nextLevelData.blueprintCost) return state;

      const { statBonus } = nextLevelData;
      return {
        ...state,
        vindicator: {
          ...state.vindicator,
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            planosMK9: state.vindicator.bodegaResources.planosMK9 - nextLevelData.blueprintCost,
          },
          maxHealth: state.vindicator.maxHealth + statBonus.health,
          currentHealth: state.vindicator.currentHealth + statBonus.health,
          maxShield: state.vindicator.maxShield + statBonus.shield,
          currentShield: state.vindicator.currentShield + statBonus.shield,
          damage: state.vindicator.damage + statBonus.damage,
        },
        vindicatorLevel: currentLevel + 1,
      };
    }

                                                    case 'CLAIM_EXPEDITION_REWARDS': {
      const activeExpedition = action.payload;
      const expeditionData = allExpeditionsData.find(e => e.id === activeExpedition.id);
      if (!expeditionData) return state;

      const expeditionCount = activeExpedition.expeditionCount || 1;
      let totalDronesLost = 0;
      const totalRewards: { [key: string]: number } = {};
      let successCount = 0;

      for (let i = 0; i < expeditionCount; i++) {
        const wasSuccessful = Math.random() > expeditionData.risk.chance;
        if (wasSuccessful) {
          successCount++;
          for (const [resource, range] of Object.entries(expeditionData.rewards)) {
            if (range) {
              const [min, max] = range;
              const amount = Math.floor(Math.random() * (max - min + 1)) + min;
              if (amount > 0) {
                totalRewards[resource] = (totalRewards[resource] || 0) + amount;
              }
            }
          }
        } else {
          const droneSelfRepairLevel = state.techCenter.upgrades.droneSelfRepair || 0;
          const survivalChance = droneSelfRepairLevel * 0.10;
          const dronesPerSingleExpedition = expeditionData.costs.drones;
          const initialDronesLostInThisRun = Math.ceil(dronesPerSingleExpedition * expeditionData.risk.droneLossPercentage);
          let dronesSurvivedThisRun = 0;

          if (droneSelfRepairLevel > 0) {
            for (let j = 0; j < initialDronesLostInThisRun; j++) {
              if (Math.random() < survivalChance) {
                dronesSurvivedThisRun++;
              }
            }
          }
          totalDronesLost += initialDronesLostInThisRun - dronesSurvivedThisRun;
        }
      }

      const newBodegaResources = { ...state.vindicator.bodegaResources };
      for (const [resource, amount] of Object.entries(totalRewards)) {
        const key = resource as keyof typeof newBodegaResources;
        newBodegaResources[key] = (newBodegaResources[key] || 0) + amount;
      }
      
      const droneType = expeditionData.droneType;
      const newDrones = { ...state.workshop.drones };
      newDrones[droneType] -= totalDronesLost;

      const remainingExpeditions = state.activeExpeditions.filter(exp => exp.instanceId !== activeExpedition.instanceId);

      let finalMessage = `Convoy de ${expeditionCount} expediciones a "${expeditionData.title}" ha regresado.\n`;
      if (successCount > 0) {
        const rewardStrings = Object.entries(totalRewards).map(([res, amount]) => `${formatNumber(amount)} de ${res.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        finalMessage += `Éxitos: ${successCount}. Recompensas: ${rewardStrings.join(', ') || 'ninguna'}.\n`;
      }
      if (totalDronesLost > 0) {
        finalMessage += `Pérdidas: ${totalDronesLost} drones.`;
      }

      return {
        ...state,
        vindicator: { ...state.vindicator, bodegaResources: newBodegaResources },
        workshop: { ...state.workshop, drones: newDrones },
        activeExpeditions: remainingExpeditions,
        aurora: {
          ...state.aurora,
          pendingMessages: [...state.aurora.pendingMessages, { 
            message: finalMessage.trim(), 
            key: `exp-group-${Date.now()}`, 
            audioId: state.settings.voicesMuted ? undefined : (successCount > 0 ? 6 : 7) 
          }]
        }
      };
    }
            case 'SET_MASTER_VOLUME':
      return {
        ...state,
        settings: {
          ...state.settings,
          masterVolume: action.payload,
        },
      };

    case 'SET_MUSIC_VOLUME':
      return {
        ...state,
        settings: {
          ...state.settings,
          musicVolume: action.payload,
        },
      };

        case 'SET_SFX_VOLUME':
      return {
        ...state,
        settings: {
          ...state.settings,
          sfxVolume: action.payload,
        },
      };

    case 'SET_VOICE_VOLUME':
      return {
        ...state,
        settings: {
          ...state.settings,
          voiceVolume: action.payload,
        },
      };

    case 'TOGGLE_VOICES_MUTED':
      return { ...state, settings: { ...state.settings, voicesMuted: !state.settings.voicesMuted } };
    case 'TOGGLE_UI_ANIMATIONS':
      return { ...state, settings: { ...state.settings, uiAnimationsEnabled: !state.settings.uiAnimationsEnabled } };
        case 'TOGGLE_FLOATING_TEXT':
      return { ...state, settings: { ...state.settings, floatingTextEnabled: !state.settings.floatingTextEnabled } };
        case 'SET_NUMBER_FORMAT':
      return { ...state, settings: { ...state.settings, numberFormat: action.payload } };
    case 'TOGGLE_AURORA_NOTIFICATIONS':
      return { ...state, settings: { ...state.settings, auroraNotificationsEnabled: !state.settings.auroraNotificationsEnabled } };
        case 'TOGGLE_ACTION_CONFIRMATIONS':
      return { ...state, settings: { ...state.settings, actionConfirmationsEnabled: !state.settings.actionConfirmationsEnabled } };
    
        case 'SHOW_CREDITS':
      return { 
        ...state, 
        previousScene: state.currentScene, 
        currentScene: 'creditsScene' 
      };

    case 'CLOSE_CREDITS':
      return { 
        ...state, 
        currentScene: state.previousScene || 'startMenu' 
      };
    
    case 'SELECT_CHAPTER':
      return {
        ...state,
        battleRoom: {
          ...state.battleRoom,
          selectedChapterIndex: action.payload,
          selectedDestination: null, // Resetea el destino al cambiar de capítulo
        },
      };

    case 'BACK_TO_CHAPTER_SELECT':
            return {
        ...state,
        battleRoom: {
          ...state.battleRoom,
          selectedChapterIndex: null,
          selectedDestination: null,
        },
      };

                                case 'CRAFT_VINDICATOR_MODULE': {
      const { moduleId } = action.payload;
      const moduleData = 
        allArmoryMK1Modules.find(m => m.id === moduleId) || 
        allArmoryMK2Modules.find(m => m.id === moduleId);

      if (!moduleData) return state;

                  const { vindicator } = state;
            const costs = moduleData.costs;
      
      const isMK2Module = 'moduloManiobrasTácticas' in costs;

      const canAfford = isMK2Module
        ? (vindicator.bodegaResources.moduloManiobrasTácticas >= costs.moduloManiobrasTácticas &&
           vindicator.bodegaResources.placasCamuflajeActivo >= costs.placasCamuflajeActivo &&
           vindicator.bodegaResources.planosDeInterceptor >= costs.planosDeInterceptor)
        : (vindicator.bodegaResources.matrizQuitinaCristal >= costs.matrizQuitinaCristal &&
           vindicator.bodegaResources.nucleoSinapticoFracturado >= costs.nucleoSinapticoFracturado &&
           vindicator.bodegaResources.planosMK2 >= costs.planosMK2);
      
      if (!canAfford) return state;

      const newBodegaResources = { ...vindicator.bodegaResources };
      if (isMK2Module) {
        newBodegaResources.moduloManiobrasTácticas -= costs.moduloManiobrasTácticas;
        newBodegaResources.placasCamuflajeActivo -= costs.placasCamuflajeActivo;
        newBodegaResources.planosDeInterceptor -= costs.planosDeInterceptor;
      } else {
        newBodegaResources.matrizQuitinaCristal -= costs.matrizQuitinaCristal;
        newBodegaResources.nucleoSinapticoFracturado -= costs.nucleoSinapticoFracturado;
        newBodegaResources.planosMK2 -= costs.planosMK2;
      }

      const slot = moduleData.slot;
      return {
        ...state,
        vindicator: {
          ...vindicator,
          bodegaResources: newBodegaResources,
          modules: {
            ...vindicator.modules,
            [slot]: moduleId,
          }
        }
      };
    }

                    case 'RETROFIT_DRONE': {
      const { fromDrone, toDrone } = action.payload;
      const { workshop, resources, vindicator } = state;

      const fromCost = droneData[fromDrone]?.cost || {};
      const toCost = droneData[toDrone]?.cost || {};
      
      const retrofitCost: { [key in ResourceType]?: number } = {};
      let canAfford = true;

      // Calcular la diferencia de coste
      Object.keys(toCost).forEach(resource => {
        const key = resource as ResourceType;
        const diff = (toCost[key] || 0) - (fromCost[key] || 0);
        if (diff > 0) {
          retrofitCost[key] = diff;
        }
      });

      // Comprobar si se tienen los recursos
      Object.keys(retrofitCost).forEach(resource => {
        const key = resource as ResourceType;
        const resourceAmount = vindicator.bodegaResources[key as keyof typeof vindicator.bodegaResources] ?? resources[key] ?? 0;
        if (resourceAmount < (retrofitCost[key] || 0)) {
          canAfford = false;
        }
      });

      if (workshop.drones[fromDrone] > 0 && canAfford) {
        const newResources = { ...resources };
        const newBodegaResources = { ...vindicator.bodegaResources };
        Object.keys(retrofitCost).forEach(resource => {
          const key = resource as ResourceType;
          if (key in newBodegaResources) {
            newBodegaResources[key as keyof typeof newBodegaResources] -= retrofitCost[key] || 0;
          } else {
            newResources[key] -= retrofitCost[key] || 0;
          }
        });

        return {
          ...state,
          resources: newResources,
          vindicator: { ...vindicator, bodegaResources: newBodegaResources },
          workshop: {
            ...workshop,
            drones: {
              ...workshop.drones,
              [fromDrone]: workshop.drones[fromDrone] - 1,
              [toDrone]: (workshop.drones[toDrone] || 0) + 1,
            },
          },
        };
      }
      return state;
    }

                    case 'UPGRADE_BODEGA_CATEGORY': {
      const { category } = action.payload;
      const { vindicator } = state;
      const vindicatorType = vindicator.vindicatorType;
      
                        let type: 'base' | 'mk1' | 'mk2' | 'mk3' | 'mk4' | 'mk5' | 'mk6' | 'mk7' | 'mk8' | 'mk9';
            if (vindicatorType === 'vm01_origin') type = 'mk1';
      else if (vindicatorType === 'vm02_interceptor') type = 'mk2';
      else if (vindicatorType === 'vm03_devastator') type = 'mk3';
      else if (vindicatorType === 'vm04_reaper') type = 'mk4';
      else if (vindicatorType === 'vm05_aegis') type = 'mk5';
      else if (vindicatorType === 'vm06_tempest') type = 'mk6';
      else if (vindicatorType === 'vm07_wraith') type = 'mk7';
      else if (vindicatorType === 'vm08_phantom') type = 'mk8';
      else if (vindicatorType === 'vm09_apex') type = 'mk9';
      else type = 'base';
      
      const bodegaConfig = bodegaData[type]?.[category as ResourceCategory];
      if (!bodegaConfig) return state;

      const bodegaKey = `bodega${type === 'base' ? 'Base' : type.toUpperCase()}` as 'bodegaBase' | 'bodegaMK1' | 'bodegaMK2' | 'bodegaMK3' | 'bodegaMK4' | 'bodegaMK5' | 'bodegaMK6' | 'bodegaMK7' | 'bodegaMK8' | 'bodegaMK9';
      const currentBodega = vindicator[bodegaKey];
      const level = currentBodega.levels[category as ResourceCategory];

      const cost = Math.floor(bodegaConfig.baseCost * Math.pow(bodegaConfig.costIncreaseFactor, level - 1));
      const resourceNeeded = bodegaConfig.resource as keyof typeof vindicator.bodegaResources;

      if (vindicator.bodegaResources[resourceNeeded] >= cost) {
        const newBodegaResources = {
          ...vindicator.bodegaResources,
          [resourceNeeded]: vindicator.bodegaResources[resourceNeeded] - cost,
        };
                const newLevels = {
          ...currentBodega.levels,
          [category as ResourceCategory]: level + 1,
        };
        const newCapacities = {
          ...currentBodega.capacities,
          [category as ResourceCategory]: currentBodega.capacities[category as ResourceCategory] + bodegaConfig.capacityIncrease,
        };
        const newBodegaState = {
          levels: newLevels,
          capacities: newCapacities,
        };
        
        return {
          ...state,
          vindicator: {
            ...vindicator,
            bodegaResources: newBodegaResources,
            [bodegaKey]: newBodegaState,
          },
        };
      }
      return state;
    }
    
    case 'TOGGLE_GOD_MODE': {
      return {
        ...state,
        godMode: !state.godMode
      };
    }


    default:
      return newState;
  }
}

   


    