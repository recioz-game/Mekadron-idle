import { expeditionsData } from '../data/expeditions';
import { constructionReducer } from './constructionReducer';
import { missionsReducer } from './missionsReducer';
import { combatReducer } from './combatReducer';
import { processGameTick } from '../gameLogic/tickLogic';
import { GameState, ExpeditionId, initialGameState, Mission, ActiveExpedition } from '../types/gameState';
import { ActionType } from '../types/actions';



export const gameReducer = (state: GameState, action: ActionType): GameState => {
  let newState = { ...state };

  // Llamamos a los sub-reducers
  newState = combatReducer(newState, action);
  newState = missionsReducer(newState, action);
  newState = constructionReducer(newState, action);

  // El resto del switch maneja las acciones que no son de combate
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
    const nextMessage = state.aurora.messageQueue.length > 0 
        ? state.aurora.messageQueue[0] 
        : null;
    
    return {
        ...state,
        aurora: {
            ...state.aurora,
            currentMessage: nextMessage ? nextMessage.message : null,
            messageQueue: nextMessage 
                ? state.aurora.messageQueue.slice(1) 
                : state.aurora.messageQueue
        }
    };

    case 'ADD_AURORA_MESSAGE': {
    const { message, messageKey } = action.payload;
    
    // Si ya se mostró este mensaje, no hacer nada
    if (state.aurora.shownMessages.has(messageKey)) {
        return state;
    }

    const newShownMessages = new Set(state.aurora.shownMessages);
    newShownMessages.add(messageKey);

    // Si ya hay un mensaje actual, agregar a la cola
    if (state.aurora.currentMessage !== null) {
        return {
            ...state,
            aurora: {
                ...state.aurora,
                messageQueue: [...state.aurora.messageQueue, { message, key: messageKey }],
                shownMessages: newShownMessages,
            }
        };
    }

    // Si no hay mensaje actual, mostrarlo directamente
    return {
        ...state,
        aurora: {
            ...state.aurora,
            currentMessage: message,
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
            currentView: ''
        };

    case 'START_EXPEDITION': {
      const { expeditionId, droneCount } = action.payload;
      const expedition = expeditionsData[expeditionId];

      if (!expedition) {
        console.error(`Expedition data not found for id: ${expeditionId}`);
        return state;
      }

      const totalExpeditionDronesInUse = state.activeExpeditions.reduce((sum, exp) => sum + exp.dronesSent, 0);
      const availableDrones = state.drones.expeditionDrone - totalExpeditionDronesInUse;

      const costMetal = expedition.costs.metalRefinado ?? 0;
      const costAcero = expedition.costs.aceroEstructural ?? 0;

      // --- VALIDACIÓN ---
      if (droneCount < expedition.costs.drones) {
        console.warn("Attempted to start expedition with fewer than min drones.");
        return state;
      }
      if (availableDrones < droneCount) {
        console.warn("Attempted to start expedition with more drones than available.");
        return state;
      }
      if (state.resources.metalRefinado < costMetal) {
        console.warn("Not enough metal for expedition.");
        return state;
      }
      if (state.resources.aceroEstructural < costAcero) {
        console.warn("Not enough steel for expedition.");
        return state;
      }
      if (state.activeExpeditions.some(exp => exp.id === expeditionId)) {
        console.warn("Attempted to start an already active expedition.");
        return state;
      }

      const newActiveExpedition: ActiveExpedition = {
        id: expeditionId,
        completionTimestamp: Date.now() + expedition.duration * 1000,
        dronesSent: droneCount,
      };

      return {
        ...state,
        resources: {
          ...state.resources,
          metalRefinado: state.resources.metalRefinado - costMetal,
          aceroEstructural: state.resources.aceroEstructural - costAcero,
        },
        activeExpeditions: [...state.activeExpeditions, newActiveExpedition],
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

        case 'GAME_TICK':
      return processGameTick(state);
    
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

    

                default:
          return newState;
  }
}
