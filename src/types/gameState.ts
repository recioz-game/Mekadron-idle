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
    type: 'scrap' | 'energy' | 'drone' | 'unlock';
    value: number;
  };
}

export interface GameNotification {
  id: string;
  title: string;
  message: string;
}

export interface GameState {
  currentScene: 'startMenu' | 'introScene' | 'main';
  notificationQueue: GameNotification[];
  resources: {
    scrap: number;
    energy: number;
    metalRefinado: number;
    aceroEstructural: number;
    fragmentosPlaca: number;
    circuitosDañados: number;
    nucleoSingularidad: number;
    placasCasco: number; // Componente final
    cableadoSuperconductor: number; // Componente final
    energyProduction: number;
    energyConsumption: number;
    maxEnergy: number;
    maxScrap: number;
  };
  drones: {
    basic: number;
    medium: number;  
    advanced: number;
    reinforcedBasic: number;
    reinforcedMedium: number;
    reinforcedAdvanced: number;
    golem: number;
    expeditionDrone: number;
    wyrm: number; // NUEVO
  };
  workshop: {
    queues: {
      basic: { progress: number; queue: number; time: number };
      medium: { progress: number; queue: number; time: number };
      advanced: { progress: number; queue: number; time: number };
      reinforcedBasic: { progress: number; queue: number; time: number };
      reinforcedMedium: { progress: number; queue: number; time: number };
      reinforcedAdvanced: { progress: number; queue: number; time: number };
      golem: { progress: number; queue: number; time: number };
      expeditionDrone: { progress: number; queue: number; time: number };
      wyrm: { progress: number; queue: number; time: number };
    }
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
    expeditions: boolean; // NUEVO // NUEVO
  };
  energy: {
    solarPanels: number;
    mediumSolarPanels: number;
    advancedSolar: number;
    energyCores: number;
    queues: {
      solarPanels: { progress: number; queue: number; time: number };
      mediumSolarPanels: { progress: number; queue: number; time: number };
      advancedSolar: { progress: number; queue: number; time: number };
      energyCores: { progress: number; queue: number; time: number };
    }
  };
  storage: {
    basicStorage: number;
    mediumStorage: number;
    advancedStorage: number;
    quantumHoardUnit: number;
    lithiumIonBattery: number;
    plasmaAccumulator: number;
    harmonicContainmentField: number;
    queues: {
      basicStorage: { progress: number; queue: number; time: number };
      mediumStorage: { progress: number; queue: number; time: number };
      advancedStorage: { progress: number; queue: number; time: number };
      quantumHoardUnit: { progress: number; queue: number; time: number };
      lithiumIonBattery: { progress: number; queue: number; time: number };
      plasmaAccumulator: { progress: number; queue: number; time: number };
      harmonicContainmentField: { progress: number; queue: number; time: number };
    }
  };
  aurora: {
    currentMessage: string;
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
      droneAssembly: number; // NUEVO
      reinforcedBasicDrones: number;
      reinforcedMediumDrones: number;
      reinforcedAdvancedDrones: number;
      golemChassis: number;
      swarmAI: number;
      // Energia
      powerOptimization: number;
      energyCalibration: number; // NUEVO
      energyEfficiency: number;
      batteryTech: number;
      coreEfficiency: number;
      powerGrid: number;
      geothermalEnergy: number;
      fusionTech: number;
      // Investigacion
      researchEfficiency: number;
      advancedAnalysis: number;
      algorithmOptimization: number;
      constructionEfficiency: number; // NUEVO
      quantumComputing: number;
      globalEfficiency: number;
      singularity: number;
      // Almacenamiento
      storageOptimization: number;
      storageConstruction: number; // NUEVO
      cargoDrones: number;
      energyStorage: number;
      matterCompression: number;
      pocketDimension: number;
      // Fundicion
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
  workshopBuyAmount: number | 'max';
  energyBuyAmount: number | 'max';
  storageBuyAmount: number | 'max';
  foundryBuyAmount: number | 'max';
  foundry: {
    queues: {
      metalRefinado: { progress: number; queue: number; time: number };
      aceroEstructural: { progress: number; queue: number; time: number };
      placasCasco: { progress: number; queue: number; time: number };
      cableadoSuperconductor: { progress: number; queue: number; time: number };
    }
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
}

export const initialGameState: GameState = {
  currentScene: 'startMenu',
  notificationQueue: [],
  resources: {
    scrap: 0,
    energy: 25,
    metalRefinado: 0,
    aceroEstructural: 0,
    energyProduction: 0,
    energyConsumption: 0,
    maxEnergy: 50,
    maxScrap: 150,
    fragmentosPlaca: 0,
    circuitosDañados: 0,
    nucleoSingularidad: 0,
    placasCasco: 0,
    cableadoSuperconductor: 0,
  },
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
    queues: {
      basic: { progress: 0, queue: 0, time: 5 }, // 5 segundos
      medium: { progress: 0, queue: 0, time: 20 }, // 20 segundos
      advanced: { progress: 0, queue: 0, time: 60 }, // 1 minuto
      reinforcedBasic: { progress: 0, queue: 0, time: 45 }, // 45 segundos
      reinforcedMedium: { progress: 0, queue: 0, time: 120 }, // 2 minutos
      reinforcedAdvanced: { progress: 0, queue: 0, time: 300 }, // 5 minutos
      golem: { progress: 0, queue: 0, time: 600 }, // 10 minutos
      expeditionDrone: { progress: 0, queue: 0, time: 150 }, // 2.5 minutos
      wyrm: { progress: 0, queue: 0, time: 1200 } // 20 minutos
    }
  },
  rates: {
    scrapPerClick: 1,
    scrapPerSecond: 0,
  },
  modules: {
    energy: false,
    storage: false,
    missions: true,
    techCenter: false,
    foundry: false,
    shipyard: false,
    expeditions: false // NUEVO
  },
  energy: {
    solarPanels: 0,
    mediumSolarPanels: 0,
    advancedSolar: 0,
    energyCores: 0,
    queues: {
      solarPanels: { progress: 0, queue: 0, time: 8 },
      mediumSolarPanels: { progress: 0, queue: 0, time: 25 },
      advancedSolar: { progress: 0, queue: 0, time: 70 },
      energyCores: { progress: 0, queue: 0, time: 180 }
    }
  },
  storage: {
    basicStorage: 0,
    mediumStorage: 0,
    advancedStorage: 0,
    quantumHoardUnit: 0,
    lithiumIonBattery: 0,
    plasmaAccumulator: 0,
    harmonicContainmentField: 0,
    queues: {
      basicStorage: { progress: 0, queue: 0, time: 10 },
      mediumStorage: { progress: 0, queue: 0, time: 50 },
      advancedStorage: { progress: 0, queue: 0, time: 200 },
      quantumHoardUnit: { progress: 0, queue: 0, time: 900 },
      lithiumIonBattery: { progress: 0, queue: 0, time: 15 },
      plasmaAccumulator: { progress: 0, queue: 0, time: 60 },
      harmonicContainmentField: { progress: 0, queue: 0, time: 450 }
    }
  },
  aurora: {
    currentMessage: '',
    messageQueue: [],
    shownMessages: new Set()
  },
  missions: {
    activeMissions: [
      // --- MISIONES PRINCIPALES ---
      {
        id: 'main_1_unlock_tech',
        title: 'Protocolo de Restauración: Sistemas Críticos',
        description: 'Reactiva los sistemas clave de la estación. Desbloquea el Centro Técnico y la Fundición para empezar a producir materiales avanzados.',
        objective: 'Desbloquear Centro Técnico y Fundición',
        isMain: true,
        target: 2, // 1 para el Tech Center, 1 para la Fundición
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 5000 }
      },
      {
        id: 'main_2_produce_alloys',
        title: 'Protocolo de Restauración: Capacidad de Fabricación',
        description: 'La reconstrucción requiere materiales resistentes. Produce 50 de Metal Refinado y 25 de Acero Estructural.',
        objective: 'Producir Aleaciones',
        isMain: true,
        target: 75, // 50 + 25
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 2500 }
      },
      {
        id: 'main_3_expeditions',
        title: 'Protocolo de Restauración: Recuperación Externa',
        description: 'Ciertos componentes son irrecuperables. Construye un Dron de Expedición y completa tu primera incursión para encontrar materiales exóticos.',
        objective: 'Completar una Expedición',
        isMain: true,
        target: 1,
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 10000 }
      },
      {
        id: 'main_4_fabricate_components',
        title: 'Protocolo de Restauración: Componentes del Vindicator',
        description: 'Usa los materiales recuperados para fabricar las piezas de la nave. Fabrica 10 Placas de Casco y 5 unidades de Cableado Superconductor.',
        objective: 'Fabricar Componentes de Nave',
        isMain: true,
        target: 15, // 10 + 5
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 5000 }
      },
      {
        id: 'main_5_final_assembly',
        title: 'Protocolo de Restauración: Ensamblaje del Vindicator',
        description: 'Todos los sistemas están listos. Desbloquea el Astillero y dona todos los componentes necesarios para reconstruir el "Vindicator".',
        objective: 'Completar la reconstrucción en el Astillero',
        isMain: true,
        target: 1, // Se completará cuando la nave esté lista
        current: 0,
        completed: false,
        reward: { type: 'unlock', value: 0 } // Final del juego de prueba
      },

      // --- MISIONES SECUNDARIAS: FLOTA DE DRONES ---
      {
        id: 'build_basic_drones_1',
        title: 'Flota Básica I',
        description: 'Construye 5 drones básicos para automatizar la recolección.',
        objective: 'Tener 5 drones básicos',
        target: 5,
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 50 }
      },
      {
        id: 'build_medium_drones_1',
        title: 'Flota Media I',
        description: 'Construye 5 drones medios.',
        objective: 'Tener 5 drones medios',
        target: 5,
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 500 }
      },
      {
        id: 'build_advanced_drones_1',
        title: 'Flota Avanzada I',
        description: 'Construye 5 drones avanzados.',
        objective: 'Tener 5 drones avanzados',
        target: 5,
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 1000 }
      },
      {
        id: 'build_reinforced_drones_1',
        title: 'Flota Reforzada',
        description: 'Construye 10 drones reforzados (cualquier tipo).',
        objective: 'Tener 10 drones reforzados',
        target: 10,
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 2500 }
      },
      {
        id: 'build_golem_1',
        title: 'El Primer Golem',
        description: 'Construye tu primer Dron Golem.',
        objective: 'Tener 1 Golem',
        target: 1,
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 10000 }
      },

      // --- MISIONES SECUNDARIAS: ENERGÍA ---
      {
        id: 'build_solar_panels_1',
        title: 'Red de Energía I',
        description: 'Construye 10 paneles solares básicos.',
        objective: 'Tener 10 paneles solares',
        target: 10,
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 100 }
      },
      {
        id: 'build_medium_solar_panels_1',
        title: 'Red de Energía II',
        description: 'Construye 5 paneles solares medios.',
        objective: 'Tener 5 paneles solares medios',
        target: 5,
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 500 }
      },
      {
        id: 'build_energy_cores_1',
        title: 'Núcleo Energético',
        description: 'Construye tu primer Núcleo Energético.',
        objective: 'Tener 1 Núcleo Energético',
        target: 1,
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 1000 }
      },
      
      // --- MISIONES SECUNDARIAS: ALMACENAMIENTO ---
      {
        id: 'build_basic_storage_1',
        title: 'Capacidad de Almacenamiento I',
        description: 'Construye 5 unidades de almacenamiento básico.',
        objective: 'Tener 5 almacenes básicos',
        target: 5,
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 200 }
      },
      {
        id: 'build_lithium_batteries_1',
        title: 'Reserva de Energía I',
        description: 'Construye 10 baterías de iones de litio.',
        objective: 'Tener 10 baterías de litio',
        target: 10,
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 250 }
      },

      // --- MISIONES SECUNDARIAS: HITOS DE PRODUCCIÓN ---
      {
        id: 'prod_scrap_1',
        title: 'Imperio de Chatarra I',
        description: 'Alcanza una producción de 100 chatarra por segundo.',
        objective: 'Producir 100 chatarra/s',
        target: 100,
        current: 0,
        completed: false,
        reward: { type: 'scrap', value: 1000 }
      },
      {
        id: 'prod_energy_1',
        title: 'Horizonte Energético I',
        description: 'Alcanza una producción neta de 50 energía por segundo.',
        objective: 'Producir 50 energía/s netos',
        target: 50,
        current: 0,
        completed: false,
        reward: { type: 'energy', value: 750 }
      },
    ],
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
      selfReplication: 0,
    }
  },
  workshopBuyAmount: 1,
  energyBuyAmount: 1,
  storageBuyAmount: 1,
  foundryBuyAmount: 1,
  foundry: {
    queues: {
      metalRefinado: { progress: 0, queue: 0, time: 5 },
      aceroEstructural: { progress: 0, queue: 0, time: 30 },
      placasCasco: { progress: 0, queue: 0, time: 50 },
      cableadoSuperconductor: { progress: 0, queue: 0, time: 75 },
    }
  },
  currentView: '',
  activeExpeditions: [],
  shipyard: {
    unlocked: false,
    progress: {
      hull: { placasCasco: 0 },
      powerCore: { cableadoSuperconductor: 0 },
      targetingSystem: { researchPoints: 0, cableadoSuperconductor: 0 },
      warpDrive: { nucleoSingularidad: 0 },
    },
    costs: {
      hull: { placasCasco: 50 },
      powerCore: { cableadoSuperconductor: 25 },
      targetingSystem: { researchPoints: 5e5, cableadoSuperconductor: 15 },
      warpDrive: { nucleoSingularidad: 1 },
    }
  }
};