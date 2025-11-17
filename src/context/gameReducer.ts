import { allExpeditionsData } from '../data/expeditionsData';
import { allShipyardProjects } from '../data/shipyardData';
import { constructionReducer } from './constructionReducer';
import { missionsReducer } from './missionsReducer';
import { combatReducer } from './combatReducer';
import { processGameTick } from '../gameLogic/tickLogic';
import { GameState, initialGameState, ActiveExpedition, ResourceType } from '../types/gameState';
import { vindicatorLevelData, vindicatorMK2LevelData, vindicatorMK3LevelData, vindicatorMK4LevelData, vindicatorMK5LevelData, vindicatorMK6LevelData, vindicatorMK7LevelData, vindicatorMK8LevelData, vindicatorMK9LevelData } from '../data/battleData';
import { ActionType } from '../types/actions';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';
import { droneData } from '../data/droneData';
import { updateVindicatorToMK1, updateVindicatorToMK2, updateVindicatorToMK3, updateVindicatorToMK4, updateVindicatorToMK5, updateVindicatorToMK6, updateVindicatorToMK7, updateVindicatorToMK8, updateVindicatorToMK9 } from '../gameLogic/utils';
import { bodegaData } from '../data/bodegaData';
import { ResourceCategory } from '../data/categoryData';

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
        const { message, messageKey } = action.payload;
        if (state.aurora.shownMessages.has(messageKey)) {
            return state;
        }
        const newShownMessages = new Set(state.aurora.shownMessages);
        newShownMessages.add(messageKey);

        return {
            ...state,
            aurora: {
                ...state.aurora,
                pendingMessages: [...state.aurora.pendingMessages, { message, key: messageKey }],
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
        const { expeditionId } = action.payload;
        const expedition = allExpeditionsData.find(e => e.id === expeditionId);
        if (!expedition) {
          console.error(`Expedition data not found for id: ${expeditionId}`);
          return state;
        }
        const dronesRequired = expedition.costs.drones;
        const droneType = expedition.droneType;
        const dronesInUse = state.activeExpeditions
          .filter(exp => allExpeditionsData.find(e => e.id === exp.id)?.droneType === droneType)
          .reduce((sum, exp) => sum + exp.dronesSent, 0);
        const availableDrones = state.workshop.drones[droneType] - dronesInUse;
        if (availableDrones < dronesRequired) {
          console.warn(`Not enough ${droneType} available.`);
          return state;
        }
                        const newBodegaResources = { ...state.vindicator.bodegaResources };
        let canAfford = true;
                for (const [resource, cost] of Object.entries(expedition.costs)) {
          if (resource === 'drones') continue;
          if (newBodegaResources[resource as keyof typeof newBodegaResources] < cost) {
            canAfford = false;
            console.warn(`Not enough ${resource} for expedition.`);
            break;
          }
          newBodegaResources[resource as keyof typeof newBodegaResources] -= cost;
        }
                if (!canAfford) {
          return state;
        }

        const newActiveExpedition: ActiveExpedition = {
          id: expeditionId,
          instanceId: Date.now(), // <-- AÑADIDO
          completionTimestamp: Date.now() + expedition.duration * 1000,
          dronesSent: dronesRequired,
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
      let stateAfterTick = processGameTick(state);

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
              const tempState = updateVindicatorToMK1(state);
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
      if (tempState.vindicator.vindicatorType !== 'mk1' && tempState.vindicator.vindicatorType !== 'mk2_interceptor') {
        tempState = updateVindicatorToMK1(tempState);
      }
      // Luego, actualiza a MK2
      tempState = updateVindicatorToMK2(tempState);

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
        tempState = updateVindicatorToMK1(tempState);
      }
      if (tempState.vindicator.vindicatorType === 'mk1') {
        tempState = updateVindicatorToMK2(tempState);
      }
      // Actualizar a MK3
      tempState = updateVindicatorToMK3(tempState);

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
        tempState = updateVindicatorToMK1(tempState);
      }
      if (tempState.vindicator.vindicatorType === 'mk1') {
        tempState = updateVindicatorToMK2(tempState);
      }
      if (tempState.vindicator.vindicatorType === 'mk2_interceptor') {
        tempState = updateVindicatorToMK3(tempState);
      }
      // Actualizar a MK4
      tempState = updateVindicatorToMK4(tempState);

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
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToMK1(tempState);
      if (tempState.vindicator.vindicatorType === 'mk1') tempState = updateVindicatorToMK2(tempState);
      if (tempState.vindicator.vindicatorType === 'mk2_interceptor') tempState = updateVindicatorToMK3(tempState);
      if (tempState.vindicator.vindicatorType === 'mk3_devastator') tempState = updateVindicatorToMK4(tempState);
      tempState = updateVindicatorToMK5(tempState);

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
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToMK1(tempState);
      if (tempState.vindicator.vindicatorType === 'mk1') tempState = updateVindicatorToMK2(tempState);
      if (tempState.vindicator.vindicatorType === 'mk2_interceptor') tempState = updateVindicatorToMK3(tempState);
      if (tempState.vindicator.vindicatorType === 'mk3_devastator') tempState = updateVindicatorToMK4(tempState);
      if (tempState.vindicator.vindicatorType === 'mk4_reaper') tempState = updateVindicatorToMK5(tempState);
      tempState = updateVindicatorToMK6(tempState);

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
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToMK1(tempState);
      if (tempState.vindicator.vindicatorType === 'mk1') tempState = updateVindicatorToMK2(tempState);
      if (tempState.vindicator.vindicatorType === 'mk2_interceptor') tempState = updateVindicatorToMK3(tempState);
      if (tempState.vindicator.vindicatorType === 'mk3_devastator') tempState = updateVindicatorToMK4(tempState);
      if (tempState.vindicator.vindicatorType === 'mk4_reaper') tempState = updateVindicatorToMK5(tempState);
      if (tempState.vindicator.vindicatorType === 'mk5_aegis') tempState = updateVindicatorToMK6(tempState);
      tempState = updateVindicatorToMK7(tempState);

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
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToMK1(tempState);
      if (tempState.vindicator.vindicatorType === 'mk1') tempState = updateVindicatorToMK2(tempState);
      if (tempState.vindicator.vindicatorType === 'mk2_interceptor') tempState = updateVindicatorToMK3(tempState);
      if (tempState.vindicator.vindicatorType === 'mk3_devastator') tempState = updateVindicatorToMK4(tempState);
      if (tempState.vindicator.vindicatorType === 'mk4_reaper') tempState = updateVindicatorToMK5(tempState);
      if (tempState.vindicator.vindicatorType === 'mk5_aegis') tempState = updateVindicatorToMK6(tempState);
      if (tempState.vindicator.vindicatorType === 'mk6_tempest') tempState = updateVindicatorToMK7(tempState);
      tempState = updateVindicatorToMK8(tempState);

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
      if (tempState.vindicator.vindicatorType === 'base') tempState = updateVindicatorToMK1(tempState);
      if (tempState.vindicator.vindicatorType === 'mk1') tempState = updateVindicatorToMK2(tempState);
      if (tempState.vindicator.vindicatorType === 'mk2_interceptor') tempState = updateVindicatorToMK3(tempState);
      if (tempState.vindicator.vindicatorType === 'mk3_devastator') tempState = updateVindicatorToMK4(tempState);
      if (tempState.vindicator.vindicatorType === 'mk4_reaper') tempState = updateVindicatorToMK5(tempState);
      if (tempState.vindicator.vindicatorType === 'mk5_aegis') tempState = updateVindicatorToMK6(tempState);
      if (tempState.vindicator.vindicatorType === 'mk6_tempest') tempState = updateVindicatorToMK7(tempState);
      if (tempState.vindicator.vindicatorType === 'mk7_wraith') tempState = updateVindicatorToMK8(tempState);
      tempState = updateVindicatorToMK9(tempState);

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
          
                                        if (currentProject.id === 'vindicator_base') {
                        newState.phase2Unlocked = true;
            newState.currentScene = 'phase2Intro';
            newState.vindicator.bodegaResources.barraCombustible = (newState.vindicator.bodegaResources.barraCombustible || 0) + 500;
            newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `vindicator-built-${Date.now()}`, title: '¡Vindicator Construido!', message: 'La Fase 2 está ahora disponible. ¡Accede a la Sala de Batalla!' }
            ];
                                                                                          } else if (currentProject.id === 'vindicator_mk1') {
            newState = updateVindicatorToMK1(newState);
                        newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk1-built-${Date.now()}`, title: '¡Vindicator Mk.I Construido!', message: 'Tu nave ha sido mejorada a un nuevo chasis. El sistema de mejoras anterior ha sido completado.' }
            ];
                    } else if (currentProject.id === 'vindicator_mk2_interceptor') {
            newState = updateVindicatorToMK2(newState);
            newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk2-built-${Date.now()}`, title: '¡Vindicator MK2 "Interceptor" Construido!', message: 'Tu nave ahora es un Interceptor, optimizado para la velocidad y el sigilo.' }
            ];
                    } else if (currentProject.id === 'vindicator_mk3_devastator') {
            newState = updateVindicatorToMK3(newState);
            newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk3-built-${Date.now()}`, title: '¡Vindicator MK3 "Devastator" Construido!', message: 'Tu nave ha sido reconstruida como una plataforma de asalto pesado.' }
            ];
                    } else if (currentProject.id === 'vindicator_mk4_reaper') {
            newState = updateVindicatorToMK4(newState);
            newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk4-built-${Date.now()}`, title: '¡Vindicator MK4 "Reaper" Construido!', message: 'Tu nave ahora es un cañón de cristal, imbuido con poder de singularidad.' }
            ];
                    } else if (currentProject.id === 'vindicator_mk5_aegis') {
            newState = updateVindicatorToMK5(newState);
            newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk5-built-${Date.now()}`, title: '¡Vindicator MK5 "Aegis" Construido!', message: 'Tu nave ha alcanzado la cima de la tecnología defensiva.' }
            ];
          } else if (currentProject.id === 'vindicator_mk6_tempest') {
                        newState = updateVindicatorToMK6(newState);
            newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk6-built-${Date.now()}`, title: '¡Vindicator MK6 "Tempest" Construido!', message: 'Una tormenta de poder inestable está ahora a tu disposición.' }
            ];
          } else if (currentProject.id === 'vindicator_mk7_wraith') {
            newState = updateVindicatorToMK7(newState);
                        newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk7-built-${Date.now()}`, title: '¡Vindicator MK7 "Wraith" Construido!', message: 'Has dominado los ecos del vacío para crear una nave fantasmal.' }
            ];
          } else if (currentProject.id === 'vindicator_mk8_phantom') {
            newState = updateVindicatorToMK8(newState);
                        newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk8-built-${Date.now()}`, title: '¡Vindicator MK8 "Phantom" Construido!', message: 'Tu nave ahora puede caminar entre dimensiones, una verdadera aparición.' }
            ];
          } else if (currentProject.id === 'vindicator_mk9_apex') {
            newState = updateVindicatorToMK9(newState);
            newState.notificationQueue = [
              ...state.notificationQueue,
              { id: `mk9-built-${Date.now()}`, title: '¡Vindicator MK9 "Apex" Construido!', message: 'Has alcanzado la cima de la tecnología. Eres imparable.' }
            ];
          }
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
        if (!expeditionData) {
          console.error(`Expedition data not found for id: ${activeExpedition.id}`);
          return state;
        }
        const remainingExpeditions = state.activeExpeditions.filter(exp => exp.instanceId !== activeExpedition.instanceId); // <-- CORREGIDO
        const wasSuccessful = Math.random() > expeditionData.risk.chance;

        if (wasSuccessful) {
          const newBodegaResources = { ...state.vindicator.bodegaResources };
          
          // Diccionario para nombres de recursos
          const resourceNames: { [key: string]: string } = {
            scrap: 'Chatarra',
            metalRefinado: 'Metal Refinado',
            aceroEstructural: 'Acero Estructural',
            fragmentosPlaca: 'Fragmentos de Placa',
            circuitosDañados: 'Circuitos Dañados',
            aleacionReforzada: 'Aleación Reforzada',
            neuroChipCorrupto: 'Neuro-Chip Corrupto',
          };

          let notificationMessage = "Recompensas obtenidas: ";
                    for (const [resource, range] of Object.entries(expeditionData.rewards)) {
            const [min, max] = range as [number, number];
            const amount = Math.floor(Math.random() * (max - min + 1)) + min;
            const resourceKey = resource as keyof typeof newBodegaResources;
            (newBodegaResources[resourceKey] as number) = (newBodegaResources[resourceKey] || 0) + amount;
            
            const resourceName = resourceNames[resource] || resource;
            notificationMessage += `${amount} de ${resourceName}, `;
          }

          return { ...state, vindicator: { ...state.vindicator, bodegaResources: newBodegaResources }, activeExpeditions: remainingExpeditions, notificationQueue: [...state.notificationQueue, { id: `exp-success-${Date.now()}`, title: `Éxito en ${expeditionData.title}`, message: notificationMessage.slice(0, -2) }] };
                } else {
          const droneSelfRepairLevel = state.techCenter.upgrades.droneSelfRepair || 0;
          const survivalChance = droneSelfRepairLevel * 0.10; // 10% por nivel
          
          const initialDronesLost = Math.ceil(activeExpedition.dronesSent * expeditionData.risk.droneLossPercentage);
          let dronesSurvived = 0;
          
          if (droneSelfRepairLevel > 0) {
            for (let i = 0; i < initialDronesLost; i++) {
              if (Math.random() < survivalChance) {
                dronesSurvived++;
              }
            }
          }

          const finalDronesLost = initialDronesLost - dronesSurvived;
          const droneType = expeditionData.droneType;
          
          let message = `La expedición fracasó. Se han perdido ${finalDronesLost} drones.`;
          if (dronesSurvived > 0) {
            message += ` ¡Pero ${dronesSurvived} lograron regresar gracias a los autómatas de auto-reparación!`;
          }

          return {
            ...state,
            workshop: {
              ...state.workshop,
              drones: {
                ...state.workshop.drones,
                [droneType]: state.workshop.drones[droneType] - finalDronesLost,
              },
            },
            activeExpeditions: remainingExpeditions,
            notificationQueue: [
              ...state.notificationQueue,
              {
                id: `exp-fail-${Date.now()}`,
                title: `Fracaso en ${expeditionData.title}`,
                message: message,
              },
            ],
          };
        }
    }

        case 'SET_VOLUME': {
        return {
            ...state,
            settings: {
                ...state.settings,
                volume: action.payload,
            }
        };
    }
    
    // --- Nuevas Acciones para la Sala de Batalla ---
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
      
      const isMK2Module = 'matrizDeManiobra' in costs;

      const canAfford = isMK2Module
        ? (vindicator.bodegaResources.matrizDeManiobra >= costs.matrizDeManiobra &&
           vindicator.bodegaResources.placasDeSigilo >= costs.placasDeSigilo &&
           vindicator.bodegaResources.planosDeInterceptor >= costs.planosDeInterceptor)
        : (vindicator.bodegaResources.matrizCristalina >= costs.matrizCristalina &&
           vindicator.bodegaResources.IA_Fragmentada >= costs.IA_Fragmentada &&
           vindicator.bodegaResources.planosMK2 >= costs.planosMK2);
      
      if (!canAfford) return state;

      const newBodegaResources = { ...vindicator.bodegaResources };
      if (isMK2Module) {
        newBodegaResources.matrizDeManiobra -= costs.matrizDeManiobra;
        newBodegaResources.placasDeSigilo -= costs.placasDeSigilo;
        newBodegaResources.planosDeInterceptor -= costs.planosDeInterceptor;
      } else {
        newBodegaResources.matrizCristalina -= costs.matrizCristalina;
        newBodegaResources.IA_Fragmentada -= costs.IA_Fragmentada;
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
      if (vindicatorType === 'mk1') type = 'mk1';
      else if (vindicatorType === 'mk2_interceptor') type = 'mk2';
      else if (vindicatorType === 'mk3_devastator') type = 'mk3';
      else if (vindicatorType === 'mk4_reaper') type = 'mk4';
      else if (vindicatorType === 'mk5_aegis') type = 'mk5';
      else if (vindicatorType === 'mk6_tempest') type = 'mk6';
      else if (vindicatorType === 'mk7_wraith') type = 'mk7';
      else if (vindicatorType === 'mk8_phantom') type = 'mk8';
      else if (vindicatorType === 'mk9_apex') type = 'mk9';
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


    default:
      return newState;
  }
}

   


    