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

export type ExpeditionId = 'chatarreriaOrbital' | 'cinturonAsteroides' | 'cementerioAcorazados' | 'incursionZonaCorrupta';

export interface Expedition {
  id: ExpeditionId;
  title: string;
  description: string;
  duration: number; // en segundos
  droneType: 'expeditionDrone' | 'expeditionV2Drone'; // Tipo de dron requerido
  costs: {
    drones: number;
        metalRefinado?: number;
    aceroEstructural?: number;
    barraCombustible?: number;
  };
  rewards: {
    scrap?: [min: number, max: number];
    metalRefinado?: [min: number, max: number],
    aceroEstructural?: [min: number, max: number];
        fragmentosPlaca?: [min: number, max: number];
    circuitosDañados?: [min: number, max: number];
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

export interface VindicatorUpgrade {
  id: string;
  name: string;
  description: string;
  maxStars: number;
  currentStars: number;
  costPerStar: {
    phase1Resources: Record<string, number>;
    phase2Resources: Record<string, number>;
  };
  statIncreasePerStar: {
    health?: number;
    shield?: number;
    damage?: number;
  };
}

// Nueva interfaz para un mensaje de Aurora
export interface AuroraMessageState {
  id: number;
  text: string;
  key: string;
}

export interface GameState {
  currentScene: 'startMenu' | 'introScene' | 'main' | 'phase2Intro' | 'phase2Main' | 'combatScene';
  phase2Unlocked: boolean;
  notificationQueue: GameNotification[];
  battleCount: number;
  currentBackground: number; // <-- NUEVA PROP: Fondo actual (1-4)
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
    matrizCristalina: number; // <-- NUEVO
    IA_Fragmentada: number; // <-- NUEVO
    planosMK2: number; // <-- NUEVO
    barraCombustible: number;
    energyProduction: number;
    energyConsumption: number;
    maxEnergy: number;
    maxScrap: number;
  };
              battleRoom: {
    selectedDestination: number | null;
    selectedChapterIndex: number | null; // <-- NUEVA PROP
    battlesCompleted: number[];
  };
  workshopBuyAmount: number | 'max';
    workshop: {
    drones: {
      basic: number;
      medium: number;
      advanced: number;
      reinforcedBasic: number;
      reinforcedMedium: number;
      reinforcedAdvanced: number;
      golem: number;
      expeditionDrone: number;
      expeditionV2Drone: number;
      wyrm: number;
    };
    queues: ReturnType<typeof createQueues<'workshop'>>;
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
    stabilizedEnergyCores: number;
    empoweredEnergyCores: number;
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
    activeMessages: AuroraMessageState[];
    pendingMessages: Array<{ message: string; key: string }>;
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

      fusionTech: number;
      poweredFabricators: number; // No estaba en la lista de upgrades
      researchEfficiency: number;
      advancedAnalysis: number;
      algorithmOptimization: number;
      constructionEfficiency: number;
      quantumComputing: number;
      globalEfficiency: number;

      storageOptimization: number;
      storageConstruction: number;
      cargoDrones: number;
      energyStorage: number;
      matterCompression: number;

      foundryProtocols: number;
      metalSmeltingSpeed: number;
      steelProductionSpeed: number;
      hullPlateProduction: number;
      wiringProduction: number;
      fuelRodProduction: number;
      smeltingEfficiency: number;
      foundryEnergy: number;
      
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
    currentProjectIndex: number; // Índice del proyecto actual en allShipyardProjects
    // El progreso se adapta a cualquier proyecto. { [componentId]: { [resourceId]: number } }
    progress: Record<string, Record<string, number>>;
  };
    vindicator: {
    vindicatorType: 'base' | 'mk1';
    maxHealth: number;
    currentHealth: number;
    maxShield: number;
    currentShield: number;
    damage: number;
    modules: {
      offensive: string | null;
      defensive: string | null;
      tactical: string | null;
    };
};
  // Nuevas propiedades para el sistema de mejoras del Vindicator
  vindicatorUpgrades: {
    reinforcedArmor: VindicatorUpgrade;     // Blindaje Reforzado - Aumenta vida
    shieldGenerator: VindicatorUpgrade;     // Generador de Escudos - Aumenta escudo
    improvedCannons: VindicatorUpgrade;     // Cañones Mejorados - Aumenta daño
  };
  blueprints: number; // Planos para subir de estrella
  vindicatorLevel: number; // Nivel general del Vindicator
    activeBattle: {
    destinationIndex: number;
    battleIndex: number;
    enemyName: string;
    enemyMaxHealth: number;
    enemyCurrentHealth: number;
    enemyMaxShield: number;
    enemyCurrentShield: number;
  } | null;
  settings: {
    volume: number; // 0-100
  };
    lastSaveTimestamp?: number;
}


  export const initialGameState: GameState = {
  currentScene: 'startMenu',
  phase2Unlocked: false,
  notificationQueue: [],
  battleCount: 0,
  currentBackground: 1, // <-- NUEVA PROP: Fondo inicial (1)
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
    matrizCristalina: 0,
    IA_Fragmentada: 0,
    planosMK2: 0,
    barraCombustible: 0,
    energyProduction: 0,
    energyConsumption: 0,
    maxEnergy: 50,
    maxScrap: 150
  },
  battleRoom: {
    selectedDestination: null,
    selectedChapterIndex: null, // <-- NUEVA PROP
    battlesCompleted: []
  },
  workshopBuyAmount: 1,
  workshop: {
    drones: {
      basic: 0,
      medium: 0,
      advanced: 0,
      reinforcedBasic: 0,
      reinforcedMedium: 0,
      reinforcedAdvanced: 0,
      golem: 0,
      expeditionDrone: 0,
      expeditionV2Drone: 0,
      wyrm: 0
    },
    queues: createQueues('workshop')
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
    stabilizedEnergyCores: 0,
    empoweredEnergyCores: 0,
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
    activeMessages: [],
    pendingMessages: [],
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
      fusionTech: 0,
      poweredFabricators: 0,
      researchEfficiency: 0,
      advancedAnalysis: 0,
      algorithmOptimization: 0,
      constructionEfficiency: 0,
      quantumComputing: 0,
      globalEfficiency: 0,
      storageOptimization: 0,
      storageConstruction: 0,
      cargoDrones: 0,
      energyStorage: 0,
      matterCompression: 0,
      foundryProtocols: 0,
      metalSmeltingSpeed: 0,
      steelProductionSpeed: 0,
      hullPlateProduction: 0,
      wiringProduction: 0,
      fuelRodProduction: 0,
      smeltingEfficiency: 0,
      foundryEnergy: 0,
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
    currentProjectIndex: 0,
    progress: {
      hull: { placasCasco: 0 },
      powerCore: { cableadoSuperconductor: 0 },
      targetingSystem: { researchPoints: 0, cableadoSuperconductor: 0 },
      warpDrive: { nucleoSingularidad: 0 }
    }
  },
      vindicator: {
    vindicatorType: 'base',
    maxHealth: 500,
    currentHealth: 500,
    maxShield: 250,
    currentShield: 250,
    damage: 50,
    modules: {
      offensive: null,
      defensive: null,
      tactical: null,
    },
  },
  vindicatorUpgrades: {
    reinforcedArmor: {
      id: 'reinforced_armor',
      name: 'Blindaje Reforzado',
      description: 'Aumenta la vida máxima del Vindicator',
      maxStars: 10,
      currentStars: 0,
      costPerStar: {
        phase1Resources: { aleacionReforzada: 50, neuroChipCorrupto: 25 },
        phase2Resources: { fragmentosPlaca: 100, circuitosDañados: 50 },
      },
      statIncreasePerStar: { health: 100 }
    },
    shieldGenerator: {
      id: 'shield_generator',
      name: 'Generador de Escudos',
      description: 'Aumenta el escudo máximo del Vindicator',
      maxStars: 10,
      currentStars: 0,
      costPerStar: {
        phase1Resources: { aleacionReforzada: 40, neuroChipCorrupto: 30 },
        phase2Resources: { fragmentosPlaca: 80, circuitosDañados: 60 },
      },
      statIncreasePerStar: { shield: 50 }
    },
    improvedCannons: {
      id: 'improved_cannons',
      name: 'Cañones Mejorados',
      description: 'Aumenta el daño del Vindicator',
      maxStars: 10,
      currentStars: 0,
      costPerStar: {
        phase1Resources: { aleacionReforzada: 60, neuroChipCorrupto: 20 },
        phase2Resources: { fragmentosPlaca: 120, circuitosDañados: 40 },
      },
      statIncreasePerStar: { damage: 10 }
    }
  },
  blueprints: 0,
  vindicatorLevel: 1,
  activeBattle: null,
  settings: {
    volume: 75
  },
  lastSaveTimestamp: undefined
};


