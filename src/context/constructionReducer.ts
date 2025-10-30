import { GameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { gameData } from '../data/gameData';

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
    console.warn(`Prerequisites not met for ${config.queuePath[2]}`);
    return state;
  }

  // 2. Calcular la cantidad máxima que se puede permitir
  const costEntries = Object.entries(config.costs);
  if (costEntries.length === 0) return state;

  const maxAffordableAmounts = costEntries.map(([resource, cost]) => {
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
  const newState = JSON.parse(JSON.stringify(state));

  for (const [resource, cost] of costEntries) {
    (newState.resources as any)[resource] -= amount * cost;
  }

  // 5. Añadir a la cola de producción
  const [category, queuesProp, itemName] = config.queuePath;
  (newState[category as keyof GameState] as any)[queuesProp][itemName].queue += amount;

  return newState;
};

// Reducer para la construcción
export const constructionReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'BUILD_BASIC_DRONE':
      return handleBuild(state, { ...gameData.drones.basic, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'basic' ] } );
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
    case 'BUILD_EXPEDITION_V2_DRONE':
      return handleBuild(state, { ...gameData.drones.expeditionV2Drone, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'expeditionV2Drone'] });
    case 'BUILD_WYRM':
      return handleBuild(state, { ...gameData.drones.wyrm, buyAmount: state.workshopBuyAmount, queuePath: ['workshop', 'queues', 'wyrm'] });
    case 'BUILD_SOLAR_PANEL':
      return handleBuild(state, { ...gameData.energy.solarPanels, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'solarPanels'] });
    case 'BUILD_MEDIUM_SOLAR':
      return handleBuild(state, { ...gameData.energy.mediumSolarPanels, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'mediumSolarPanels'] });
    case 'BUILD_ADVANCED_SOLAR':
      return handleBuild(state, { ...gameData.energy.advancedSolar, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'advancedSolar'] });
    case 'BUILD_ENERGY_CORE':
      return handleBuild(state, { ...gameData.energy.energyCores, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'energyCores'] });

    case 'BUILD_FUSION_REACTOR':
      return handleBuild(state, { ...gameData.energy.fusionReactor, buyAmount: state.energyBuyAmount, queuePath: ['energy', 'queues', 'fusionReactor'] });
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
    case 'CRAFT_REFINED_METAL':
      return handleBuild(state, { ...gameData.foundry.metalRefinado, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'metalRefinado'] });
    case 'CRAFT_STRUCTURAL_STEEL':
      return handleBuild(state, { ...gameData.foundry.aceroEstructural, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'aceroEstructural'] });
    case 'CRAFT_HULL_PLATE':
      return handleBuild(state, { ...gameData.foundry.placasCasco, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'placasCasco'] });
    case 'CRAFT_SUPERCONDUCTOR_WIRING':
      return handleBuild(state, { ...gameData.foundry.cableadoSuperconductor, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'cableadoSuperconductor'] });

    case 'CRAFT_FUEL_ROD':
      return handleBuild(state, { ...gameData.foundry.barraCombustible, buyAmount: state.foundryBuyAmount, queuePath: ['foundry', 'queues', 'barraCombustible'] });

    case 'CRAFT_PURIFIED_METAL':
      return handleBuild(state, {
        costs: { scrap: 5000, energy: 500 },
        buyAmount: state.foundryBuyAmount,
        queuePath: ['foundry', 'queues', 'metalRefinado'] // Añade a la misma cola que el metal normal
      });

    case 'DISMANTLE_DRONE': {
      const { droneType, amount } = action.payload;
      const droneCount = state.drones[droneType as keyof typeof state.drones];

      if (!droneCount || droneCount <= 0) {
        return state;
      }

      const amountToDismantle = amount === 'max' ? droneCount : Math.min(amount, droneCount);

      const droneCosts = gameData.drones[droneType as keyof typeof gameData.drones]?.costs;
      if (!droneCosts) {
        return state;
      }

      const newState = JSON.parse(JSON.stringify(state));

      // Devolver 75% de los recursos
      for (const resource in droneCosts) {
        const cost = droneCosts[resource as keyof typeof droneCosts] || 0;
        newState.resources[resource as keyof typeof newState.resources] += Math.floor(cost * amountToDismantle * 0.75);
      }

      // Restar drones
      newState.drones[droneType as keyof typeof newState.drones] -= amountToDismantle;

      return newState;
    }

    case 'CANCEL_QUEUE_ITEM': {
      const { category, itemName, amount } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      const queue = (newState[category as keyof GameState] as any)?.queues?.[itemName];

      if (!queue) {
        return state;
      }

      const amountToCancel = amount === 'all' ? queue.queue : Math.min(amount, queue.queue);

      if (amountToCancel <= 0) {
        return state;
      }

      const getItemCosts = (cat: string, item: string): Record<string, number> => {
        const categoryData = (gameData as any)[cat];
        if (categoryData && categoryData[item] && categoryData[item].costs) {
          return categoryData[item].costs;
        }
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

      Object.entries(costs).forEach(([resource, cost]) => {
        if (resource in newState.resources) {
          (newState.resources as any)[resource] += (cost as number) * amountToCancel;
        }
      });

      queue.queue -= amountToCancel;

      if (queue.queue === 0) {
        queue.progress = 0;
      }

      return newState;
    }

    default:
      return state;
  }
};

