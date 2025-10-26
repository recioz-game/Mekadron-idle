import { GameState, ExpeditionId, initialGameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { expeditionsData } from '../data/expeditions';

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

    case 'BUILD_BASIC_DRONE': {
      const cost = 15;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          workshop: {
            ...state.workshop,
            queues: {
              ...state.workshop.queues,
              basic: { ...state.workshop.queues.basic, queue: state.workshop.queues.basic.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_MEDIUM_DRONE': {
      const cost = 250;
      if (state.drones.basic < 5) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          workshop: {
            ...state.workshop,
            queues: {
              ...state.workshop.queues,
              medium: { ...state.workshop.queues.medium, queue: state.workshop.queues.medium.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_ADVANCED_DRONE': {
      const cost = 1500;
      if (state.drones.medium < 3) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          workshop: {
            ...state.workshop,
            queues: {
              ...state.workshop.queues,
              advanced: { ...state.workshop.queues.advanced, queue: state.workshop.queues.advanced.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_REINFORCED_BASIC': {
        const scrapCost = 600;
        const metalCost = 5;
        if (state.techCenter.upgrades.reinforcedBasicDrones === 0) return state;

        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByMetal);

        const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);
  
        if (amount > 0) {
          return {
            ...state,
            resources: { 
              ...state.resources, 
              scrap: state.resources.scrap - (amount * scrapCost),
              metalRefinado: state.resources.metalRefinado - (amount * metalCost)
            },
            workshop: {
              ...state.workshop,
              queues: {
                ...state.workshop.queues,
                reinforcedBasic: { ...state.workshop.queues.reinforcedBasic, queue: state.workshop.queues.reinforcedBasic.queue + amount }
              }
            }
          };
        }
        return state;
    }

    case 'BUILD_REINFORCED_MEDIUM': {
        const scrapCost = 2500;
        const metalCost = 15;
        if (state.techCenter.upgrades.reinforcedMediumDrones === 0) return state;

        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByMetal);

        const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);
  
        if (amount > 0) {
          return {
            ...state,
            resources: { 
              ...state.resources, 
              scrap: state.resources.scrap - (amount * scrapCost),
              metalRefinado: state.resources.metalRefinado - (amount * metalCost)
            },
            workshop: {
              ...state.workshop,
              queues: {
                ...state.workshop.queues,
                reinforcedMedium: { ...state.workshop.queues.reinforcedMedium, queue: state.workshop.queues.reinforcedMedium.queue + amount }
              }
            }
          };
        }
        return state;
    }

    case 'BUILD_REINFORCED_ADVANCED': {
        const scrapCost = 7000;
        const metalCost = 30;
        if (state.techCenter.upgrades.reinforcedAdvancedDrones === 0) return state;

        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByMetal);

        const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);
  
        if (amount > 0) {
          return {
            ...state,
            resources: { 
              ...state.resources, 
              scrap: state.resources.scrap - (amount * scrapCost),
              metalRefinado: state.resources.metalRefinado - (amount * metalCost)
            },
            workshop: {
              ...state.workshop,
              queues: {
                ...state.workshop.queues,
                reinforcedAdvanced: { ...state.workshop.queues.reinforcedAdvanced, queue: state.workshop.queues.reinforcedAdvanced.queue + amount }
              }
            }
          };
        }
        return state;
    }

    case 'BUILD_GOLEM_DRONE': {
        const scrapCost = 75000;
        const steelCost = 5;
        if (state.techCenter.upgrades.golemChassis === 0 || state.drones.reinforcedAdvanced < 5) return state;
  
        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableBySteel = Math.floor(state.resources.aceroEstructural / steelCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableBySteel);
        
        const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);
  
        if (amount > 0) {
          return {
            ...state,
            resources: { 
              ...state.resources, 
              scrap: state.resources.scrap - (amount * scrapCost),
              aceroEstructural: state.resources.aceroEstructural - (amount * steelCost)
            },
            workshop: {
              ...state.workshop,
              queues: {
                ...state.workshop.queues,
                golem: { ...state.workshop.queues.golem, queue: state.workshop.queues.golem.queue + amount }
              }
            }
          };
        }
        return state;
    }

    case 'BUILD_EXPEDITION_DRONE': {
        const scrapCost = 3000;
        const metalCost = 20;
        if (state.drones.reinforcedMedium < 3) return state;
  
        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByMetal);
        
        const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);
  
        if (amount > 0) {
          return {
            ...state,
            resources: { 
              ...state.resources, 
              scrap: state.resources.scrap - (amount * scrapCost),
              metalRefinado: state.resources.metalRefinado - (amount * metalCost)
            },
            workshop: {
              ...state.workshop,
              queues: {
                ...state.workshop.queues,
                expeditionDrone: { ...state.workshop.queues.expeditionDrone, queue: state.workshop.queues.expeditionDrone.queue + amount }
              }
            }
          };
        }
        return state;
    }

    case 'BUILD_WYRM': {
        const scrapCost = 250000;
        const steelCost = 25;
        if (state.drones.golem < 1) return state;
  
        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableBySteel = Math.floor(state.resources.aceroEstructural / steelCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableBySteel);
        
        const amount = state.workshopBuyAmount === 'max' ? maxAffordable : Math.min(state.workshopBuyAmount, maxAffordable);
  
        if (amount > 0) {
          return {
            ...state,
            resources: { 
              ...state.resources, 
              scrap: state.resources.scrap - (amount * scrapCost),
              aceroEstructural: state.resources.aceroEstructural - (amount * steelCost)
            },
            workshop: {
              ...state.workshop,
              queues: {
                ...state.workshop.queues,
                wyrm: { ...state.workshop.queues.wyrm, queue: state.workshop.queues.wyrm.queue + amount }
              }
            }
          };
        }
        return state;
    }

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

    case 'BUILD_SOLAR_PANEL': {
      const cost = 50;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.energyBuyAmount === 'max' ? maxAffordable : Math.min(state.energyBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          energy: { 
            ...state.energy,
            queues: {
              ...state.energy.queues,
              solarPanels: { ...state.energy.queues.solarPanels, queue: state.energy.queues.solarPanels.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_MEDIUM_SOLAR': {
      const cost = 200;
      if (state.energy.solarPanels < 5) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.energyBuyAmount === 'max' ? maxAffordable : Math.min(state.energyBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          energy: { 
            ...state.energy,
            queues: {
              ...state.energy.queues,
              mediumSolarPanels: { ...state.energy.queues.mediumSolarPanels, queue: state.energy.queues.mediumSolarPanels.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_ADVANCED_SOLAR': {
      const cost = 500;
      if (state.energy.mediumSolarPanels < 1) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.energyBuyAmount === 'max' ? maxAffordable : Math.min(state.energyBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          energy: { 
            ...state.energy,
            queues: {
              ...state.energy.queues,
              advancedSolar: { ...state.energy.queues.advancedSolar, queue: state.energy.queues.advancedSolar.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_ENERGY_CORE': {
      const cost = 2000;
      if (state.energy.advancedSolar < 3) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.energyBuyAmount === 'max' ? maxAffordable : Math.min(state.energyBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          energy: { 
            ...state.energy,
            queues: {
              ...state.energy.queues,
              energyCores: { ...state.energy.queues.energyCores, queue: state.energy.queues.energyCores.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_BASIC_STORAGE': {
      const cost = 100;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.storageBuyAmount === 'max' ? maxAffordable : Math.min(state.storageBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          storage: {
            ...state.storage,
            queues: {
              ...state.storage.queues,
              basicStorage: { ...state.storage.queues.basicStorage, queue: state.storage.queues.basicStorage.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_MEDIUM_STORAGE': {
      const cost = 1000;
      if (state.storage.basicStorage < 3) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.storageBuyAmount === 'max' ? maxAffordable : Math.min(state.storageBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          storage: {
            ...state.storage,
            queues: {
              ...state.storage.queues,
              mediumStorage: { ...state.storage.queues.mediumStorage, queue: state.storage.queues.mediumStorage.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_ADVANCED_STORAGE': {
      const cost = 10000;
      if (state.storage.mediumStorage < 1) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.storageBuyAmount === 'max' ? maxAffordable : Math.min(state.storageBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          storage: {
            ...state.storage,
            queues: {
              ...state.storage.queues,
              advancedStorage: { ...state.storage.queues.advancedStorage, queue: state.storage.queues.advancedStorage.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_QUANTUM_HOARD_UNIT': {
      const scrapCost = 75000;
      const metalCost = 50;
      if (state.storage.advancedStorage < 3) return state;

      const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
      const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
      const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByMetal);

      const amount = state.storageBuyAmount === 'max' ? maxAffordable : Math.min(state.storageBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { 
            ...state.resources, 
            scrap: state.resources.scrap - (amount * scrapCost),
            metalRefinado: state.resources.metalRefinado - (amount * metalCost)
          },
          storage: {
            ...state.storage,
            queues: {
              ...state.storage.queues,
              quantumHoardUnit: { ...state.storage.queues.quantumHoardUnit, queue: state.storage.queues.quantumHoardUnit.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_LITHIUM_ION_BATTERY': {
      const cost = 150;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.storageBuyAmount === 'max' ? maxAffordable : Math.min(state.storageBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          storage: {
            ...state.storage,
            queues: {
              ...state.storage.queues,
              lithiumIonBattery: { ...state.storage.queues.lithiumIonBattery, queue: state.storage.queues.lithiumIonBattery.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_PLASMA_ACCUMULATOR': {
      const cost = 750;
      if (state.storage.lithiumIonBattery < 5) return state;
      const maxAffordable = Math.floor(state.resources.scrap / cost);
      const amount = state.storageBuyAmount === 'max' ? maxAffordable : Math.min(state.storageBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { ...state.resources, scrap: state.resources.scrap - (amount * cost) },
          storage: {
            ...state.storage,
            queues: {
              ...state.storage.queues,
              plasmaAccumulator: { ...state.storage.queues.plasmaAccumulator, queue: state.storage.queues.plasmaAccumulator.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'BUILD_HARMONIC_CONTAINMENT_FIELD': {
      const scrapCost = 3000;
      const metalCost = 10;
      if (state.storage.plasmaAccumulator < 3) return state;

      const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
      const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
      const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByMetal);

      const amount = state.storageBuyAmount === 'max' ? maxAffordable : Math.min(state.storageBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { 
            ...state.resources, 
            scrap: state.resources.scrap - (amount * scrapCost),
            metalRefinado: state.resources.metalRefinado - (amount * metalCost)
          },
          storage: {
            ...state.storage,
            queues: {
              ...state.storage.queues,
              harmonicContainmentField: { ...state.storage.queues.harmonicContainmentField, queue: state.storage.queues.harmonicContainmentField.queue + amount }
            }
          }
        };
      }
      return state;
    }

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

    case 'CRAFT_REFINED_METAL': {
        const scrapCost = 1000;
        const energyCost = 100;
        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableByEnergy = Math.floor(state.resources.energy / energyCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByEnergy);
        
        const amount = state.foundryBuyAmount === 'max' ? maxAffordable : Math.min(state.foundryBuyAmount, maxAffordable);

        if (amount > 0) {
            return {
                ...state,
                resources: { 
                    ...state.resources, 
                    scrap: state.resources.scrap - (amount * scrapCost),
                    energy: state.resources.energy - (amount * energyCost),
                },
                foundry: {
                    ...state.foundry,
                    queues: {
                        ...state.foundry.queues,
                        metalRefinado: { ...state.foundry.queues.metalRefinado, queue: state.foundry.queues.metalRefinado.queue + amount }
                    }
                }
            };
        }
        return state;
    }

    case 'CLAIM_EXPEDITION_REWARDS': {
      const expeditionId = action.payload;
      const activeExpedition = state.activeExpeditions.find(e => e.id === expeditionId);
      
      if (!activeExpedition || activeExpedition.completionTimestamp > Date.now()) {
        return state;
      }

      const expeditionData = Object.values(expeditionsData).find(exp => exp.id === expeditionId);
      if (!expeditionData) return state;

      const newResources = { ...state.resources };
      let newDrones = { ...state.drones };

      // Calcular el multiplicador de recompensa basado en los drones enviados
      const rewardMultiplier = activeExpedition.dronesSent / expeditionData.costs.drones;

      // Calcular recompensas aleatorias escaladas
      for (const key in expeditionData.rewards) {
        const resource = key as keyof typeof expeditionData.rewards;
        const rewardRange = expeditionData.rewards[resource];
        if (rewardRange) {
          const [min, max] = rewardRange;
          // Aplicar multiplicador a la recompensa base
          const scaledMin = Math.floor(min * rewardMultiplier);
          const scaledMax = Math.floor(max * rewardMultiplier);
          const amount = Math.floor(Math.random() * (scaledMax - scaledMin + 1)) + scaledMin;
          (newResources as any)[resource] += amount;
        }
      }
      
      // Calcular riesgo y pérdida de drones
      let dronesLost = 0;
      if (Math.random() < expeditionData.risk.chance) {
        dronesLost = Math.floor(activeExpedition.dronesSent * expeditionData.risk.droneLossPercentage);
        newDrones.expeditionDrone = Math.max(0, newDrones.expeditionDrone - dronesLost);
      }

      // Actualizar misión de expedición si existe
      const newMissions = { ...state.missions };
      const expeditionMission = newMissions.activeMissions.find(m => m.id === 'main_3_expeditions');
      if (expeditionMission) {
        expeditionMission.current = 1;
      }

      return {
        ...state,
        resources: newResources,
        drones: newDrones,
        activeExpeditions: state.activeExpeditions.filter(e => e.id !== expeditionId),
        missions: newMissions,
      };
    }

    case 'START_EXPEDITION': {
      const { expeditionId, droneCount } = action.payload;
      
      const expeditionData = Object.values(expeditionsData).find(exp => exp.id === expeditionId);
      if (!expeditionData) return state;
      
      const totalExpeditionDronesInUse = state.activeExpeditions.reduce((sum, exp) => sum + exp.dronesSent, 0);
      const availableDrones = state.drones.expeditionDrone - totalExpeditionDronesInUse;

      // Verificar costes y requisitos de drones
      const minDronesRequired = expeditionData.costs.drones;
      const costMetal = expeditionData.costs.metalRefinado ?? 0;
      const costAcero = expeditionData.costs.aceroEstructural ?? 0;

      if (
        droneCount < minDronesRequired || // No se envían los drones mínimos
        availableDrones < droneCount || // No se tienen suficientes drones disponibles
        state.resources.metalRefinado < costMetal ||
        state.resources.aceroEstructural < costAcero
      ) {
        return state;
      }

      const newActiveExpedition = {
        id: expeditionId,
        completionTimestamp: Date.now() + expeditionData.duration * 1000,
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

    case 'CRAFT_STRUCTURAL_STEEL': {
        const scrapCost = 1000;
        const metalCost = 10;
        const energyCost = 250;
        
        const maxAffordableByScrap = Math.floor(state.resources.scrap / scrapCost);
        const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
        const maxAffordableByEnergy = Math.floor(state.resources.energy / energyCost);
        const maxAffordable = Math.min(maxAffordableByScrap, maxAffordableByMetal, maxAffordableByEnergy);
        
        const amount = state.foundryBuyAmount === 'max' ? maxAffordable : Math.min(state.foundryBuyAmount, maxAffordable);

        if (amount > 0) {
            return {
                ...state,
                resources: { 
                    ...state.resources, 
                    scrap: state.resources.scrap - (amount * scrapCost),
                    metalRefinado: state.resources.metalRefinado - (amount * metalCost),
                    energy: state.resources.energy - (amount * energyCost),
                },
                foundry: {
                    ...state.foundry,
                    queues: {
                        ...state.foundry.queues,
                        aceroEstructural: { ...state.foundry.queues.aceroEstructural, queue: state.foundry.queues.aceroEstructural.queue + amount }
                    }
                }
            };
        }
        return state;
    }

    case 'CRAFT_HULL_PLATE': {
      const fragmentosCost = 10;
      const aceroCost = 5;
      const energyCost = 500;

      const maxAffordableByFragmentos = Math.floor(state.resources.fragmentosPlaca / fragmentosCost);
      const maxAffordableByAcero = Math.floor(state.resources.aceroEstructural / aceroCost);
      const maxAffordableByEnergy = Math.floor(state.resources.energy / energyCost);
      const maxAffordable = Math.min(maxAffordableByFragmentos, maxAffordableByAcero, maxAffordableByEnergy);
      
      const amount = state.foundryBuyAmount === 'max' ? maxAffordable : Math.min(state.foundryBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { 
            ...state.resources, 
            fragmentosPlaca: state.resources.fragmentosPlaca - (amount * fragmentosCost),
            aceroEstructural: state.resources.aceroEstructural - (amount * aceroCost),
            energy: state.resources.energy - (amount * energyCost),
          },
          foundry: {
            ...state.foundry,
            queues: {
              ...state.foundry.queues,
              placasCasco: { ...state.foundry.queues.placasCasco, queue: state.foundry.queues.placasCasco.queue + amount }
            }
          }
        };
      }
      return state;
    }

    case 'CRAFT_SUPERCONDUCTOR_WIRING': {
      const circuitosCost = 10;
      const metalCost = 25;
      const energyCost = 1000;
      
      const maxAffordableByCircuitos = Math.floor(state.resources.circuitosDañados / circuitosCost);
      const maxAffordableByMetal = Math.floor(state.resources.metalRefinado / metalCost);
      const maxAffordableByEnergy = Math.floor(state.resources.energy / energyCost);
      const maxAffordable = Math.min(maxAffordableByCircuitos, maxAffordableByMetal, maxAffordableByEnergy);
      
      const amount = state.foundryBuyAmount === 'max' ? maxAffordable : Math.min(state.foundryBuyAmount, maxAffordable);

      if (amount > 0) {
        return {
          ...state,
          resources: { 
            ...state.resources, 
            circuitosDañados: state.resources.circuitosDañados - (amount * circuitosCost),
            metalRefinado: state.resources.metalRefinado - (amount * metalCost),
            energy: state.resources.energy - (amount * energyCost),
          },
          foundry: {
            ...state.foundry,
            queues: {
              ...state.foundry.queues,
              cableadoSuperconductor: { ...state.foundry.queues.cableadoSuperconductor, queue: state.foundry.queues.cableadoSuperconductor.queue + amount }
            }
          }
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

    case 'UPDATE_MISSION_PROGRESS': {
      const { resources, drones, energy, storage, techCenter, modules, shipyard } = state;
      const totalReinforcedDrones = drones.reinforcedBasic + drones.reinforcedMedium + drones.reinforcedAdvanced;

      const shipyardProgress = (Object.keys(state.shipyard.progress) as Array<keyof GameState['shipyard']['progress']>).every(componentKey => {
        const progress = state.shipyard.progress[componentKey];
        const costs = state.shipyard.costs[componentKey];
        return (Object.keys(costs) as Array<keyof typeof costs>).every(
            resourceKey => (progress as any)[resourceKey] >= (costs as any)[resourceKey]
        );
      }) ? 1 : 0;

      const updatedMissions = state.missions.activeMissions.map(mission => {
        if (mission.completed) return mission;

        let current = mission.current;
        
        switch (mission.id) {
          // Misiones Principales
          case 'main_1_unlock_tech':
            current = (techCenter.unlocked ? 1 : 0) + (modules.foundry ? 1 : 0);
            break;
          case 'main_2_produce_alloys':
            current = resources.metalRefinado + resources.aceroEstructural;
            break;
          case 'main_3_expeditions':
            // Este se completará cuando se reclame la recompensa de una expedición.
            // Necesitaremos añadir una lógica en 'CLAIM_EXPEDITION_REWARDS'
            break;
          case 'main_4_fabricate_components':
            current = resources.placasCasco + resources.cableadoSuperconductor;
            break;

          case 'main_5_final_assembly':
              current = shipyardProgress;
              break;

          // Drones
          case 'build_basic_drones_1':
            current = drones.basic;
            break;
          case 'build_medium_drones_1':
            current = drones.medium;
            break;
          case 'build_advanced_drones_1':
            current = drones.advanced;
            break;
          case 'build_reinforced_drones_1':
            current = totalReinforcedDrones;
            break;
          case 'build_golem_1':
            current = drones.golem;
            break;

          // Energía
          case 'build_solar_panels_1':
            current = energy.solarPanels;
            break;
          case 'build_medium_solar_panels_1':
            current = energy.mediumSolarPanels;
            break;
          case 'build_energy_cores_1':
            current = energy.energyCores;
            break;

          // Almacenamiento
          case 'build_basic_storage_1':
            current = storage.basicStorage;
            break;
          case 'build_lithium_batteries_1':
            current = storage.lithiumIonBattery;
            break;

          // Producción
          case 'prod_scrap_1':
            current = state.rates.scrapPerSecond;
            break;
          case 'prod_energy_1':
            current = resources.energyProduction - resources.energyConsumption;
            break;

          default:
            break;
        }

        return {
          ...mission,
          current: Math.min(current, mission.target),
        };
      });

      return {
        ...state,
        missions: {
          ...state.missions,
          activeMissions: updatedMissions
        }
      };
    }

    case 'CLAIM_REWARD': {
      const missionId = action.payload;
      const mission = state.missions.activeMissions.find(m => m.id === missionId);
      if (!mission || mission.completed || mission.current < mission.target) return state;

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
      }

      const updatedMissions = state.missions.activeMissions.map(m => 
        m.id === missionId ? { ...m, completed: true } : m
      );

      return {
        ...state,
        resources: newResources,
        missions: {
          ...state.missions,
          activeMissions: updatedMissions.filter(m => !m.completed),
          completedMissions: [...state.missions.completedMissions, missionId]
        }
      };
    }

    case 'RESEARCH_UPGRADE': {
      const { upgradeName, cost } = action.payload;
      if (state.techCenter.researchPoints >= cost) {
        const newUpgrades = { ...state.techCenter.upgrades };
        let newModules = { ...state.modules };
        
        if (upgradeName in newUpgrades && typeof newUpgrades[upgradeName as keyof typeof newUpgrades] === 'number') {
          (newUpgrades[upgradeName as keyof typeof newUpgrades] as number) += 1;
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
        acc[key as keyof typeof newState.storage.queues] = newState.storage[key as keyof typeof newState.storage] as number;
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
              metalRefinado: Math.max(state.resources.metalRefinado, 5000)
            }
        };

    case 'DONATE_TO_SHIPYARD': {
      const { component, resource, amount } = action.payload as { 
        component: keyof GameState['shipyard']['costs'], 
        resource: string, 
        amount: number 
      };
      
      if (!(component in state.shipyard.costs)) {
        return state;
      }
      
      const cost = (state.shipyard.costs[component] as any)[resource];
      const progress = (state.shipyard.progress[component] as any)[resource];

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
      } else if (resource in state.resources) {
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
      return state;
  }
};