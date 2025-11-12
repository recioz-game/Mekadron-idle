import { allExpeditionsData } from '../data/expeditionsData';
import { allShipyardProjects } from '../data/shipyardData';
import { constructionReducer } from './constructionReducer';
import { missionsReducer } from './missionsReducer';
import { combatReducer } from './combatReducer';
import { processGameTick } from '../gameLogic/tickLogic';
import { GameState, initialGameState, ActiveExpedition, ResourceType } from '../types/gameState';
import { vindicatorLevelData } from '../data/battleData';
import { ActionType } from '../types/actions';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { droneData } from '../data/droneData';
import { updateVindicatorToMK1 } from '../gameLogic/utils';

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
        const newResources = { ...state.resources };
        let canAfford = true;
                for (const [resource, cost] of Object.entries(expedition.costs)) {
          if (resource === 'drones') continue;
          if (newResources[resource as ResourceType] < cost) {
            canAfford = false;
            console.warn(`Not enough ${resource} for expedition.`);
            break;
          }
          newResources[resource as ResourceType] -= cost;
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
          resources: newResources,
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
            resources: { ...state.resources, scrap: Math.max(state.resources.scrap, 150000), metalRefinado: Math.max(state.resources.metalRefinado, 5000) }
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
          currentProjectIndex: 2, // Asumimos que el MK1 es el índice 1, el siguiente es el 2
          progress: {}, // Limpiamos el progreso para el nuevo proyecto
        },
      };
    }

                    case 'DONATE_TO_SHIPYARD': {
      const { component, resource, amount } = action.payload;
      const { shipyard, resources, techCenter } = state;
      const currentProject = allShipyardProjects[shipyard.currentProjectIndex];

      if (!currentProject || !currentProject.costs[component] || !currentProject.costs[component][resource]) {
        return state;
      }

      const cost = currentProject.costs[component][resource];
      const progress = shipyard.progress[component]?.[resource] || 0;
      
            const currentResourceAmount = resource === 'researchPoints' 
        ? techCenter.researchPoints 
        : resources[resource as ResourceType] || 0;

      const amountToDonate = Math.min(amount, currentResourceAmount, cost - progress);

      if (amountToDonate <= 0 && amount !== 0) { // Permitir donación de 0 para el modo debug
        return state;
      }

      let newState = { ...state };

      if (resource === 'researchPoints') {
        newState.techCenter = { ...techCenter, researchPoints: techCenter.researchPoints - amountToDonate };
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
            newState.resources = {
              ...newState.resources,
              barraCombustible: (newState.resources.barraCombustible || 0) + 500,
            };
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
      if (state.resources.barraCombustible >= fuelCost && state.vindicator.currentShield < state.vindicator.maxShield) {
        return { ...state, resources: { ...state.resources, barraCombustible: state.resources.barraCombustible - fuelCost }, vindicator: { ...state.vindicator, currentShield: state.vindicator.maxShield } };
      }
      return state;
    }

    case 'UPGRADE_VINDICATOR_STAR': {
        const { upgradeId } = action.payload;
        const upgrade = state.vindicatorUpgrades[upgradeId as keyof typeof state.vindicatorUpgrades];
        if (!upgrade || upgrade.currentStars >= upgrade.maxStars) return state;
        const { phase1Resources, phase2Resources } = upgrade.costPerStar;
                const hasEnoughResources = Object.entries(phase1Resources).every(([resource, amount]) => state.resources[resource as ResourceType] >= amount) && Object.entries(phase2Resources).every(([resource, amount]) => state.resources[resource as ResourceType] >= amount);
        if (!hasEnoughResources) return state;
        const newResources = { ...state.resources };
        Object.entries(phase1Resources).forEach(([resource, amount]) => { newResources[resource as ResourceType] -= amount; });
        Object.entries(phase2Resources).forEach(([resource, amount]) => { newResources[resource as ResourceType] -= amount; });
        const { health, shield, damage } = upgrade.statIncreasePerStar;
        return { ...state, resources: newResources, vindicatorUpgrades: { ...state.vindicatorUpgrades, [upgradeId]: { ...upgrade, currentStars: upgrade.currentStars + 1 } }, vindicator: { ...state.vindicator, maxHealth: state.vindicator.maxHealth + (health || 0), maxShield: state.vindicator.maxShield + (shield || 0), damage: state.vindicator.damage + (damage || 0), } };
    }

    case 'LEVEL_UP_VINDICATOR': {
        const currentLevel = state.vindicatorLevel;
        const nextLevelData = vindicatorLevelData.find(level => level.level === currentLevel + 1);
        if (!nextLevelData || state.blueprints < nextLevelData.blueprintCost) return state;
        const { statBonus } = nextLevelData;
        return { ...state, blueprints: state.blueprints - nextLevelData.blueprintCost, vindicatorLevel: currentLevel + 1, vindicator: { ...state.vindicator, maxHealth: state.vindicator.maxHealth + statBonus.health, currentHealth: state.vindicator.currentHealth + statBonus.health, maxShield: state.vindicator.maxShield + statBonus.shield, currentShield: state.vindicator.currentShield + statBonus.shield, damage: state.vindicator.damage + statBonus.damage, } };
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
          const newResources = { ...state.resources };
          
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
            const resourceKey = resource as ResourceType;
            (newResources[resourceKey] as number) = (newResources[resourceKey] || 0) + amount;
            
            const resourceName = resourceNames[resource] || resource;
            notificationMessage += `${amount} de ${resourceName}, `;
          }

          return { ...state, resources: newResources, activeExpeditions: remainingExpeditions, notificationQueue: [...state.notificationQueue, { id: `exp-success-${Date.now()}`, title: `Éxito en ${expeditionData.title}`, message: notificationMessage.slice(0, -2) }] };
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
      const moduleData = allArmoryMK1Modules.find(m => m.id === moduleId);

      // 1. Comprobaciones
      if (!moduleData) return state; // El módulo no existe
      // Aquí se añadiría la lógica para comprobar si ya se posee el módulo

      // 2. Comprobar recursos
      const { resources } = state;
      const costs = moduleData.costs;
      const canAfford = 
        (resources.matrizCristalina >= costs.matrizCristalina) &&
        (resources.IA_Fragmentada >= costs.IA_Fragmentada) &&
        (resources.planosMK2 >= costs.planosMK2);
      
      if (!canAfford) return state;

      // 3. Deducir recursos y añadir el módulo (lógica de inventario futura)
      const newResources = { ...resources };
      newResources.matrizCristalina -= costs.matrizCristalina;
      newResources.IA_Fragmentada -= costs.IA_Fragmentada;
      newResources.planosMK2 -= costs.planosMK2;

      // Por ahora, lo equipamos directamente al fabricarlo.
      const slot = moduleData.slot;
      return {
        ...state,
        resources: newResources,
        vindicator: {
          ...state.vindicator,
          modules: {
            ...state.vindicator.modules,
            [slot]: moduleId,
          }
        }
            };
    }

        case 'RETROFIT_DRONE': {
      const { fromDrone, toDrone } = action.payload;
      const { workshop, resources } = state;

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
        if (resources[key] < (retrofitCost[key] || 0)) {
          canAfford = false;
        }
      });

      if (workshop.drones[fromDrone] > 0 && canAfford) {
        const newResources = { ...resources };
        Object.keys(retrofitCost).forEach(resource => {
          const key = resource as ResourceType;
          newResources[key] -= retrofitCost[key] || 0;
        });

        return {
          ...state,
          resources: newResources,
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

    default:
      return newState;
  }
}

   


    