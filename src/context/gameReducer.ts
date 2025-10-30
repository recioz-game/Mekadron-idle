import { allExpeditionsData } from '../data/expeditionsData';
import { constructionReducer } from './constructionReducer';
import { missionsReducer } from './missionsReducer';
import { combatReducer } from './combatReducer';
import { processGameTick } from '../gameLogic/tickLogic';
import { GameState, initialGameState, ActiveExpedition } from '../types/gameState';
import { vindicatorLevelData } from '../data/battleData';
import { ActionType } from '../types/actions';

export const gameReducer = (state: GameState, action: ActionType): GameState => {
  let newState = { ...state };

  // Call sub-reducers
  newState = combatReducer(newState, action);
  newState = missionsReducer(newState, action);
  newState = constructionReducer(newState, action);

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

        case 'CLOSE_AURORA_MESSAGE': {
        const nextMessage = state.aurora.messageQueue.length > 0 ? state.aurora.messageQueue[0] : null;
        return {
            ...state,
            aurora: {
                ...state.aurora,
                currentMessage: nextMessage ? nextMessage.message : null,
                messageQueue: nextMessage ? state.aurora.messageQueue.slice(1) : [],
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
        const availableDrones = state.drones[droneType] - dronesInUse;
        if (availableDrones < dronesRequired) {
          console.warn(`Not enough ${droneType} available.`);
          return state;
        }
        const newResources = { ...state.resources };
        let canAfford = true;
        for (const [resource, cost] of Object.entries(expedition.costs)) {
          if (resource === 'drones') continue;
          if ((newResources as any)[resource] < cost) {
            canAfford = false;
            console.warn(`Not enough ${resource} for expedition.`);
            break;
          }
          (newResources as any)[resource] -= cost;
        }
        if (!canAfford) {
          return state;
        }
        if (state.activeExpeditions.some(exp => exp.id === expeditionId)) {
          console.warn("Attempted to start an already active expedition.");
          return state;
        }
        const newActiveExpedition: ActiveExpedition = {
          id: expeditionId,
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
        return {
          ...state,
          modules: { ...state.modules, ...(upgradeName === 'foundryProtocols' && { foundry: true }) },
          techCenter: { ...state.techCenter, researchPoints: state.techCenter.researchPoints - cost, upgrades: newUpgrades }
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
            techCenter: { ...state.techCenter, unlocked: true, upgrades: { ...state.techCenter.upgrades, collectionEfficiency: 1, droneAssembly: 1, reinforcedBasicDrones: 1, reinforcedMediumDrones: 1, reinforcedAdvancedDrones: 1, golemChassis: 1, } },
            shipyard: { ...state.shipyard, unlocked: true },
            drones: { ...state.drones, medium: Math.max(state.drones.medium, 3), reinforcedMedium: Math.max(state.drones.reinforcedMedium, 3), reinforcedAdvanced: Math.max(state.drones.reinforcedAdvanced, 5), golem: Math.max(state.drones.golem, 1), expeditionDrone: Math.max(state.drones.expeditionDrone, 1) },
            energy: { ...state.energy, advancedSolar: Math.max(state.energy.advancedSolar, 1) },
            resources: { ...state.resources, scrap: Math.max(state.resources.scrap, 150000), metalRefinado: Math.max(state.resources.metalRefinado, 5000) }
        };
    case 'DEBUG_COMPLETE_VINDICATOR': {
      const newProgress = { ...state.shipyard.costs };
      return { ...state, shipyard: { ...state.shipyard, progress: newProgress }, resources: { ...state.resources, barraCombustible: state.resources.barraCombustible + 100 } };
    }
    case 'DEBUG_FINISH_EXPEDITIONS': {
      const finishedExpeditions = state.activeExpeditions.map(exp => ({ ...exp, completionTimestamp: Date.now() }));
      return { ...state, activeExpeditions: finishedExpeditions };
    }

    case 'DONATE_TO_SHIPYARD': {
        const { component, resource, amount } = action.payload as { component: keyof GameState['shipyard']['costs'], resource: string, amount: number };
        if (!state.shipyard.costs[component] || !(resource in (state.shipyard.costs[component] as Record<string, number>))) return state;
        const cost = (state.shipyard.costs[component] as Record<string, number>)[resource];
        const progress = (state.shipyard.progress[component] as Record<string, number>)[resource];
        if (cost === undefined || progress === undefined) return state;
        const currentResourceAmount = resource === 'researchPoints' ? state.techCenter.researchPoints : (state.resources as any)[resource] || 0;
        const amountToDonate = Math.min(amount, currentResourceAmount, cost - progress);
        if (amountToDonate <= 0) return state;
        return { ...state, resources: resource !== 'researchPoints' ? { ...state.resources, [(resource as keyof GameState['resources'])]: currentResourceAmount - amountToDonate } : state.resources, techCenter: resource === 'researchPoints' ? { ...state.techCenter, researchPoints: currentResourceAmount - amountToDonate } : state.techCenter, shipyard: { ...state.shipyard, progress: { ...state.shipyard.progress, [component]: { ...(state.shipyard.progress[component] as Record<string, number>), [resource]: progress + amountToDonate } } } };
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
        const hasEnoughResources = Object.entries(phase1Resources).every(([resource, amount]) => (state.resources as any)[resource] >= amount) && Object.entries(phase2Resources).every(([resource, amount]) => (state.resources as any)[resource] >= amount);
        if (!hasEnoughResources) return state;
        const newResources = { ...state.resources };
        Object.entries(phase1Resources).forEach(([resource, amount]) => { (newResources as any)[resource] -= amount; });
        Object.entries(phase2Resources).forEach(([resource, amount]) => { (newResources as any)[resource] -= amount; });
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
        const remainingExpeditions = state.activeExpeditions.filter(exp => exp.id !== activeExpedition.id);
        const wasSuccessful = Math.random() > expeditionData.risk.chance;
        if (wasSuccessful) {
          const newResources = { ...state.resources };
          let notificationMessage = "Recompensas obtenidas: ";
          for (const [resource, range] of Object.entries(expeditionData.rewards)) {
            const [min, max] = range as [number, number];
            const amount = Math.floor(Math.random() * (max - min + 1)) + min;
            (newResources as any)[resource] = ((newResources as any)[resource] || 0) + amount;
            notificationMessage += `${amount} de ${resource}, `;
          }
          return { ...state, resources: newResources, activeExpeditions: remainingExpeditions, notificationQueue: [...state.notificationQueue, { id: `exp-success-${Date.now()}`, title: `Éxito en ${expeditionData.title}`, message: notificationMessage.slice(0, -2) }] };
        } else {
          const dronesLost = Math.ceil(activeExpedition.dronesSent * expeditionData.risk.droneLossPercentage);
          const droneType = expeditionData.droneType;
          const newDrones = { ...state.drones };
          newDrones[droneType] -= dronesLost;
          return { ...state, drones: newDrones, activeExpeditions: remainingExpeditions, notificationQueue: [...state.notificationQueue, { id: `exp-fail-${Date.now()}`, title: `Fracaso en ${expeditionData.title}`, message: `La expedición fracasó. Se han perdido ${dronesLost} drones.` }] };
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

    default:
      return newState;
  }
}

   


    