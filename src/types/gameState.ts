import { gameData } from '../data/gameData';
import { allMissions } from '../data/missionsData';

// Interfaz para los objetos de cola
interface QueueItem {
  progress: number;
  queue: number;
  time: number;
}
// Función para generar colas dinámicamente desde gameData
const createQueues = <T extends keyof typeof gameData>(category: T): Record<string, QueueItem> => {
  const queues: Record<string, QueueItem> = {};
  const categoryData = gameData[category] as Record<string, { time: number }>;
  
  for (const key in categoryData) {
    queues[key] = {
      progress: 0, 
      queue: 0, 
      time: categoryData[key].time
    };
  }
  return queues;
};

export type ExpeditionId = 'chatarreriaOrbital' | 'cinturonAsteroides' | 'cementerioAcorazados';

export interface Expedition {
  id: ExpeditionId;
  title: string;
  description: string;
  duration: number; // en segundos
  costs: {
    drones: number;
    metalRefinado?: number;
    aceroEstructural?: number;
  };
  rewards: {
    scrap?: [min: number, max: number];
        metalRefinado?: [min: number, max: number];
    aceroEstructural?: [min: number, max: number];
        fragmentosPlaca?: [min: number, max: number];
    circuitosDañados?: [min: number, max: number];
    nucleoSingularidad?: [min: number, max: number];
    aleacionReforzada?: [min: number, max: number];
    neuroChipCorrupto?: [min: number, max: number];
  };
  risk: {
    chance: number; // 0 to 1
    droneLossPercentage: number; // 0 to 1
  };
}

export interface ActiveExpedition {
  id: ExpeditionId;
  completionTimestamp: number;
  dronesSent: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  objective: string;
  isMain?: boolean;
  target: number;
  current: number;
    completed: boolean;
  reward: {
    type: 'scrap' | 'energy' | 'drone' | 'unlock' | 'nucleoSingularidad';
    value: number;
  };
  locked?: boolean;
}

export interface GameNotification {
  id: string;
  title: string;
  message: string;
}

export interface GameState {
  currentScene: 'startMenu' | 'introScene' | 'main' | 'phase2Intro' | 'phase2Main' | 'combatScene';
  phase2Unlocked: boolean;
  notificationQueue: GameNotification[];
  battleCount: number;
  resources: {
    scrap: number;
    energy: number;
    metalRefinado: number;
    aceroEstructural: number;
    fragmentosPlaca: number;
    circuitosDañados: number;
        nucleoSingularidad: number;
    placasCasco: number;
    cableadoSuperconductor: number;
    aleacionReforzada: number;
    neuroChipCorrupto: number;
    barraCombustible: number;
    energyProduction: number;
    energyConsumption: number;
    maxEnergy: number;
    maxScrap: number;
  };
  battleRoom: {
    selectedDestination: number | null; // Indice del destino seleccionado (0-4) o null si no hay ninguno
    battlesCompleted: number[]; // Array de booleanos, uno por cada combate completado
  };
  workshopBuyAmount: number | 'max';
  drones: {
    basic: number;
    medium: number;
    advanced: number;
    reinforcedBasic: number;
    reinforcedMedium: number;
    reinforcedAdvanced: number;
    golem: number;
    expeditionDrone: number;
    wyrm: number;
  };
  workshop: {
    queues: ReturnType<typeof createQueues<'drones'>>;
  };
  rates: {
    scrapPerClick: number;
    scrapPerSecond: number;
  };
  modules: {
    energy: boolean;
    storage: boolean;
    missions: boolean;
    techCenter: boolean;
    foundry: boolean;
    shipyard: boolean;
    expeditions: boolean;
  };
  energy: {
    solarPanels: number;
    mediumSolarPanels: number;
    advancedSolar: number;
    energyCores: number;
    fusionReactor: number; // Nueva propiedad
    queues: ReturnType<typeof createQueues<'energy'>>;
  };
  storage: {
    basicStorage: number;
    mediumStorage: number;
    advancedStorage: number;
    quantumHoardUnit: number;
    lithiumIonBattery: number;
    plasmaAccumulator: number;
    harmonicContainmentField: number;
    queues: ReturnType<typeof createQueues<'storage'>>;
  };
  aurora: {
    currentMessage: string | null;
    messageQueue: Array<{ message: string; key: string }>;
    shownMessages: Set<string>;
  };
  missions: {
    activeMissions: Mission[];
    completedMissions: string[];
    currentMissionIndex: number;
  };
  techCenter: {
    unlocked: boolean;
    researchPoints: number;
    upgrades: {
      collectionEfficiency: number;
      droneAssembly: number;
      reinforcedBasicDrones: number;
      reinforcedMediumDrones: number;
      reinforcedAdvancedDrones: number;
      golemChassis: number;
      swarmAI: number;
      powerOptimization: number;
      energyCalibration: number;
      energyEfficiency: number;
      batteryTech: number;
      coreEfficiency: number;
      powerGrid: number;
            geothermalEnergy: number;
      fusionTech: number;
      poweredFabricators: number; // No estaba en la lista de upgrades
      researchEfficiency: number;
      advancedAnalysis: number;
      algorithmOptimization: number;
      constructionEfficiency: number;
      quantumComputing: number;
      globalEfficiency: number;
      singularity: number;
      storageOptimization: number;
      storageConstruction: number;
      cargoDrones: number;
      energyStorage: number;
      matterCompression: number;
      pocketDimension: number;
      foundryProtocols: number;
      metalSmeltingSpeed: number;
      steelProductionSpeed: number;
      smeltingEfficiency: number;
      foundryEnergy: number;
      alloyCreation: number;
      automatedFabrication: number;
      selfReplication: number;
    };
  };
  energyBuyAmount: number | 'max';
  storageBuyAmount: number | 'max';
  foundryBuyAmount: number | 'max';
  foundry: {
    queues: ReturnType<typeof createQueues<'foundry'>>;
  };
  currentView: string;
  activeExpeditions: ActiveExpedition[];
    shipyard: {
    unlocked: boolean;
    progress: {
      hull: { placasCasco: number };
      powerCore: { cableadoSuperconductor: number };
      targetingSystem: { researchPoints: number; cableadoSuperconductor: number };
      warpDrive: { nucleoSingularidad: number };
    };
    costs: {
      hull: { placasCasco: number };
      powerCore: { cableadoSuperconductor: number };
      targetingSystem: { researchPoints: number; cableadoSuperconductor: number };
      warpDrive: { nucleoSingularidad: number };
    };
  };
  vindicator: {
    maxHealth: number;
    currentHealth: number;
    maxShield: number;
    currentShield: number;
    damage: number;
  };
  activeBattle: {
    destinationIndex: number;
    battleIndex: number;
    enemyName: string;
    enemyMaxHealth: number;
    enemyCurrentHealth: number;
    enemyMaxShield: number;
    enemyCurrentShield: number;
  } | null;
  lastSaveTimestamp?: number;
}

export const initialGameState: GameState = {
  currentScene: 'startMenu',
  phase2Unlocked: false,
  notificationQueue: [],
  battleCount: 0,
  resources: {
    scrap: 0,
    energy: 25,
    metalRefinado: 0,
    aceroEstructural: 0,
    fragmentosPlaca: 0,
    circuitosDañados: 0,
        nucleoSingularidad: 0,
    placasCasco: 0,
    cableadoSuperconductor: 0,
    aleacionReforzada: 0,
    neuroChipCorrupto: 0,
    barraCombustible: 0,
    energyProduction: 0,
    energyConsumption: 0,
    maxEnergy: 50,
    maxScrap: 150
  },
      battleRoom: {
    selectedDestination: null,
    battlesCompleted: Array(6).fill(0)
  },
  workshopBuyAmount: 1,
  drones: {
    basic: 0,
    medium: 0,
    advanced: 0,
    reinforcedBasic: 0,
    reinforcedMedium: 0,
    reinforcedAdvanced: 0,
    golem: 0,
    expeditionDrone: 0,
    wyrm: 0
  },
  workshop: {
    queues: createQueues('drones')
  },
  rates: {
    scrapPerClick: 1,
    scrapPerSecond: 0
  },
  modules: {
    energy: false,
    storage: false,
    missions: false,
    techCenter: false,
    foundry: false,
    shipyard: false,
    expeditions: false
  },
  energy: {
    solarPanels: 0,
    mediumSolarPanels: 0,
    advancedSolar: 0,
    energyCores: 0,
    fusionReactor: 0,
    queues: createQueues('energy')
  },
  storage: {
    basicStorage: 0,
    mediumStorage: 0,
    advancedStorage: 0,
    quantumHoardUnit: 0,
    lithiumIonBattery: 0,
    plasmaAccumulator: 0,
    harmonicContainmentField: 0,
    queues: createQueues('storage')
  },
  aurora: {
    currentMessage: null,
    messageQueue: [],
    shownMessages: new Set()
  },
        missions: {
    activeMissions: allMissions.map(mission => ({
      ...mission,
      current: 0,
      completed: false
    })),
    completedMissions: [],
    currentMissionIndex: 0
  },
  techCenter: {
    unlocked: false,
    researchPoints: 0,
    upgrades: {
      collectionEfficiency: 0,
      droneAssembly: 0,
      reinforcedBasicDrones: 0,
      reinforcedMediumDrones: 0,
      reinforcedAdvancedDrones: 0,
      golemChassis: 0,
      swarmAI: 0,
      powerOptimization: 0,
      energyCalibration: 0,
      energyEfficiency: 0,
      batteryTech: 0,
      coreEfficiency: 0,
      powerGrid: 0,
            geothermalEnergy: 0,
      fusionTech: 0,
      poweredFabricators: 0,
      researchEfficiency: 0,
      advancedAnalysis: 0,
      algorithmOptimization: 0,
      constructionEfficiency: 0,
      quantumComputing: 0,
      globalEfficiency: 0,
      singularity: 0,
      storageOptimization: 0,
      storageConstruction: 0,
      cargoDrones: 0,
      energyStorage: 0,
      matterCompression: 0,
      pocketDimension: 0,
      foundryProtocols: 0,
      metalSmeltingSpeed: 0,
      steelProductionSpeed: 0,
      smeltingEfficiency: 0,
      foundryEnergy: 0,
      alloyCreation: 0,
      automatedFabrication: 0,
      selfReplication: 0
    }
  },
  energyBuyAmount: 1,
  storageBuyAmount: 1,
  foundryBuyAmount: 1,
  foundry: {
    queues: createQueues('foundry')
  },
  currentView: '',
  activeExpeditions: [],
  shipyard: {
    unlocked: false,
    progress: {
      hull: { placasCasco: 0 },
      powerCore: { cableadoSuperconductor: 0 },
      targetingSystem: { researchPoints: 0, cableadoSuperconductor: 0 },
      warpDrive: { nucleoSingularidad: 0 }
    },
        costs: {
      hull: { placasCasco: 50 },
      powerCore: { cableadoSuperconductor: 25 },
      targetingSystem: { researchPoints: 500000, cableadoSuperconductor: 15 },
      warpDrive: { nucleoSingularidad: 1 }
    }
  },
  vindicator: {
    maxHealth: 500,  // Reducido de 1000 a 500 (50%)
    currentHealth: 500,  // Reducido de 1000 a 500 (50%)
    maxShield: 250,  // Reducido de 500 a 250 (50%)
    currentShield: 250,  // Reducido de 500 a 250 (50%)
    damage: 50,
  },
  activeBattle: null,
  lastSaveTimestamp: undefined
};