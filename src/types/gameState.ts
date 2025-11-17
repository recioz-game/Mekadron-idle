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
  instanceId: number; // <-- AÑADIDO
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

// Tipo para definir explícitamente todos los nombres de recursos
export type ResourceType = keyof GameState['resources'];
export type DroneType = keyof GameState['workshop']['drones'];

export interface GameState {
  currentScene: 'startMenu' | 'introScene' | 'main' | 'phase2Intro' | 'phase2Main' | 'combatScene';
  phase2Unlocked: boolean;
  notificationQueue: GameNotification[];
  battleCount: number;
  currentBackground: number; // <-- NUEVA PROP: Fondo actual (1-4)
    resources: {
    scrap: number;
    energy: number;
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
    workshop: boolean; // <-- AÑADIDO
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
      droneScrapCost: number;
      droneSelfRepair: number;
      droneRetrofitting: number;
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
    vindicatorType: 'base' | 'mk1' | 'mk2_interceptor' | 'mk3_devastator' | 'mk4_reaper' | 'mk5_aegis' | 'mk6_tempest' | 'mk7_wraith' | 'mk8_phantom' | 'mk9_apex';
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
        bodegaResources: {
      metalRefinado: number;
      aceroEstructural: number;
      fragmentosPlaca: number;
      circuitosDañados: number;
      nucleoSingularidad: number;
      placasCasco: number;
      cableadoSuperconductor: number;
      aleacionReforzada: number;
      neuroChipCorrupto: number;
      matrizCristalina: number;
      IA_Fragmentada: number;
      planosMK2: number;
      // --- CAPITULO 3 ---
      matrizDeManiobra: number;
            placasDeSigilo: number;
        planosDeInterceptor: number;
        // --- FIN CAPITULO 3 ---
        // --- CAPITULO 4 ---
        nucleoDatosArcano: number;
        placasAdamantioReforzado: number;
                planosMK3: number;
        // --- FIN CAPITULO 4 ---
        // --- CAPITULO 5 ---
        tejidoEspaciotemporal: number;
        singularidadEmbotellada: number;
                planosMK4: number;
        // --- FIN CAPITULO 5 ---
        // --- CAPITULO 6 ---
        esquirlasDeReliquia: number;
        codexAncestral: number;
                planosMK5: number;
        // --- FIN CAPITULO 6 ---
        // --- CAPITULO 7 ---
        fragmentoHorizonteSucesos: number;
        energiaPuntoCero: number;
        planosMK6: number;
        // --- FIN CAPITULO 7 ---
        // --- CAPITULO 8 ---
        esenciaDelVacio: number;
        reliquiaCorrupta: number;
                planosMK7: number;
        // --- FIN CAPITULO 8 ---
        // --- CAPITULO 9 ---
        nucleoEspectral: number;
        conexionFantasmal: number;
                planosMK8: number;
        // --- FIN CAPITULO 9 ---
        // --- CAPITULO 10 ---
        fragmentoDeCiudadela: number;
        matrizDeOverlord: number;
        planosMK9: number;
        // --- FIN CAPITULO 10 ---
        barraCombustible: number;
    };
            bodegaBase: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK1: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK2: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
        componentesBatalla: number;
                materialesExoticos: number;
      };
    };
    bodegaMK3: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
                componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK4: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
                componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK5: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
                componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK6: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK7: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
            capacities: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK8: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
            capacities: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
    };
    bodegaMK9: {
      levels: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
      capacities: {
        materialesIndustriales: number;
        componentesBatalla: number;
        materialesExoticos: number;
      };
    };
  };
  // Nuevas propiedades para el sistema de mejoras del Vindicator
      vindicatorUpgrades: {
    reinforcedArmor: VindicatorUpgrade;
    shieldGenerator: VindicatorUpgrade;
    improvedCannons: VindicatorUpgrade;
  };
  vindicatorMK2Upgrades: {
    adaptiveChassis: VindicatorUpgrade;
    phasicShieldGenerator: VindicatorUpgrade;
        pulseIonCannons: VindicatorUpgrade;
  };
  vindicatorMK3Upgrades: {
    cascoDeAdamantio: VindicatorUpgrade;
    nucleoArcano: VindicatorUpgrade;
        canonesDeAsedio: VindicatorUpgrade;
  };
  vindicatorMK4Upgrades: {
    cascoEspaciotemporal: VindicatorUpgrade;
    singularidadContenida: VindicatorUpgrade;
        lanzaderaOmega: VindicatorUpgrade;
  };
  vindicatorMK5Upgrades: {
    blindajeDeReliquia: VindicatorUpgrade;
    esquirlasRegenerativas: VindicatorUpgrade;
        codexPotenciado: VindicatorUpgrade;
  };
  vindicatorMK6Upgrades: {
    blindajeDeHorizonte: VindicatorUpgrade;
        reactorDePuntoCero: VindicatorUpgrade;
    canonesTempest: VindicatorUpgrade;
  };
  vindicatorMK7Upgrades: {
    cascoEspectral: VindicatorUpgrade;
    nucleoDelVacio: VindicatorUpgrade;
    canonesCorruptos: VindicatorUpgrade;
  };
  vindicatorMK8Upgrades: {
    cascoFantasma: VindicatorUpgrade;
        conexionEspectral: VindicatorUpgrade;
    armasEtéreas: VindicatorUpgrade;
  };
  vindicatorMK9Upgrades: {
    blindajeDeCiudadela: VindicatorUpgrade;
    matrizDefensiva: VindicatorUpgrade;
    canonOverlord: VindicatorUpgrade;
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
    cloakTurnsRemaining?: number;
    dodgeBonusNextTurn?: boolean;
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
    workshop: false, // <-- AÑADIDO
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
      droneScrapCost: 0,
      droneSelfRepair: 0,
      droneRetrofitting: 0,
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
    bodegaResources: {
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
      // --- CAPITULO 3 ---
      matrizDeManiobra: 0,
              placasDeSigilo: 0,
        planosDeInterceptor: 0,
        // --- FIN CAPITULO 3 ---
        // --- CAPITULO 4 ---
        nucleoDatosArcano: 0,
        placasAdamantioReforzado: 0,
                planosMK3: 0,
        // --- FIN CAPITULO 4 ---
        // --- CAPITULO 5 ---
        tejidoEspaciotemporal: 0,
        singularidadEmbotellada: 0,
                planosMK4: 0,
        // --- FIN CAPITULO 5 ---
        // --- CAPITULO 6 ---
        esquirlasDeReliquia: 0,
        codexAncestral: 0,
                planosMK5: 0,
        // --- FIN CAPITULO 6 ---
        // --- CAPITULO 7 ---
        fragmentoHorizonteSucesos: 0,
        energiaPuntoCero: 0,
        planosMK6: 0,
        // --- FIN CAPITULO 7 ---
        // --- CAPITULO 8 ---
        esenciaDelVacio: 0,
        reliquiaCorrupta: 0,
                planosMK7: 0,
        // --- FIN CAPITULO 8 ---
        // --- CAPITULO 9 ---
        nucleoEspectral: 0,
        conexionFantasmal: 0,
                planosMK8: 0,
        // --- FIN CAPITULO 9 ---
        // --- CAPITULO 10 ---
        fragmentoDeCiudadela: 0,
        matrizDeOverlord: 0,
        planosMK9: 0,
        // --- FIN CAPITULO 10 ---
        barraCombustible: 0,
    },
            bodegaBase: {
      levels: {
        materialesIndustriales: 1,
        componentesBatalla: 1,
        materialesExoticos: 1,
      },
      capacities: {
        materialesIndustriales: 1000,
        componentesBatalla: 500,
        materialesExoticos: 100,
      },
    },
    bodegaMK1: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
      capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK2: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
            capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK3: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
            capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK4: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
            capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK5: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
            capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK6: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
      capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK7: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
            capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK8: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
            capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
    },
    bodegaMK9: {
      levels: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
      capacities: {
        materialesIndustriales: 0,
        componentesBatalla: 0,
        materialesExoticos: 0,
      },
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
  vindicatorMK2Upgrades: {
    adaptiveChassis: {
      id: 'adaptive_chassis',
      name: 'Chasis Adaptativo',
      description: 'Aumenta la vida máxima del Interceptor.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { matrizDeManiobra: 50 }, phase2Resources: { placasDeSigilo: 25 } },
      statIncreasePerStar: { health: 500 }
    },
    phasicShieldGenerator: {
      id: 'phasic_shield_generator',
      name: 'Generador de Escudo Fásico',
      description: 'Aumenta el escudo máximo del Interceptor.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { matrizDeManiobra: 40 }, phase2Resources: { placasDeSigilo: 35 } },
      statIncreasePerStar: { shield: 250 }
    },
    pulseIonCannons: {
      id: 'pulse_ion_cannons',
      name: 'Cañones de Pulso Iónicos',
      description: 'Aumenta el daño del Interceptor.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { matrizDeManiobra: 60 }, phase2Resources: { placasDeSigilo: 20 } },
            statIncreasePerStar: { damage: 50 }
    }
  },
  vindicatorMK3Upgrades: {
    cascoDeAdamantio: {
      id: 'casco_adamantio',
      name: 'Casco de Adamantio',
      description: 'Aumenta la vida máxima del Devastator.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { placasAdamantioReforzado: 50 }, phase2Resources: {} },
      statIncreasePerStar: { health: 1000 }
    },
    nucleoArcano: {
      id: 'nucleo_arcano',
      name: 'Núcleo Arcano',
      description: 'Aumenta el escudo máximo del Devastator.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { nucleoDatosArcano: 50 }, phase2Resources: {} },
      statIncreasePerStar: { shield: 500 }
    },
    canonesDeAsedio: {
      id: 'canones_asedio',
      name: 'Cañones de Asedio',
      description: 'Aumenta el daño del Devastator.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { nucleoDatosArcano: 25, placasAdamantioReforzado: 25 }, phase2Resources: {} },
            statIncreasePerStar: { damage: 100 }
    }
  },
  vindicatorMK4Upgrades: {
    cascoEspaciotemporal: {
      id: 'casco_espaciotemporal',
      name: 'Casco Espaciotemporal',
      description: 'Aumenta la vida máxima del Reaper.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { tejidoEspaciotemporal: 50 }, phase2Resources: {} },
      statIncreasePerStar: { health: 1500 }
    },
    singularidadContenida: {
      id: 'singularidad_contenida',
      name: 'Singularidad Contenida',
      description: 'Aumenta el escudo máximo del Reaper.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { singularidadEmbotellada: 25 }, phase2Resources: {} },
      statIncreasePerStar: { shield: 250 }
    },
    lanzaderaOmega: {
      id: 'lanzadera_omega',
      name: 'Lanzadera Omega',
      description: 'Aumenta el daño del Reaper.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { singularidadEmbotellada: 50 }, phase2Resources: {} },
            statIncreasePerStar: { damage: 250 }
    }
  },
  vindicatorMK5Upgrades: {
    blindajeDeReliquia: {
      id: 'blindaje_reliquia',
      name: 'Blindaje de Reliquia',
      description: 'Aumenta la vida máxima del Aegis.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { esquirlasDeReliquia: 50 }, phase2Resources: {} },
      statIncreasePerStar: { health: 3000 }
    },
    esquirlasRegenerativas: {
      id: 'esquirlas_regenerativas',
      name: 'Esquirlas Regenerativas',
      description: 'Aumenta el escudo máximo del Aegis.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { esquirlasDeReliquia: 25, codexAncestral: 25 }, phase2Resources: {} },
      statIncreasePerStar: { shield: 1500 }
    },
    codexPotenciado: {
      id: 'codex_potenciado',
      name: 'Codex Potenciado',
      description: 'Aumenta el daño del Aegis.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { codexAncestral: 50 }, phase2Resources: {} },
            statIncreasePerStar: { damage: 150 }
    }
  },
  vindicatorMK6Upgrades: {
    blindajeDeHorizonte: {
      id: 'blindaje_horizonte',
      name: 'Blindaje de Horizonte',
      description: 'Aumenta la vida máxima del Tempest.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { fragmentoHorizonteSucesos: 50 }, phase2Resources: {} },
      statIncreasePerStar: { health: 2000 }
    },
    reactorDePuntoCero: {
      id: 'reactor_cero',
      name: 'Reactor de Punto Cero',
      description: 'Aumenta el escudo máximo del Tempest.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { energiaPuntoCero: 25 }, phase2Resources: {} },
      statIncreasePerStar: { shield: 1000 }
    },
    canonesTempest: {
      id: 'canones_tempest',
      name: 'Cañones Tempest',
      description: 'Aumenta el daño del Tempest.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { energiaPuntoCero: 50 }, phase2Resources: {} },
      statIncreasePerStar: { damage: 400 }
    }
  },
  vindicatorMK7Upgrades: {
    cascoEspectral: {
      id: 'casco_espectral',
      name: 'Casco Espectral',
      description: 'Aumenta la vida máxima del Wraith.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { esenciaDelVacio: 50 }, phase2Resources: {} },
      statIncreasePerStar: { health: 4000 }
    },
    nucleoDelVacio: {
      id: 'nucleo_vacio',
      name: 'Núcleo del Vacío',
      description: 'Aumenta el escudo máximo del Wraith.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { reliquiaCorrupta: 25 }, phase2Resources: {} },
      statIncreasePerStar: { shield: 2000 }
    },
    canonesCorruptos: {
      id: 'canones_corruptos',
      name: 'Cañones Corruptos',
      description: 'Aumenta el daño del Wraith.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { reliquiaCorrupta: 50 }, phase2Resources: {} },
            statIncreasePerStar: { damage: 800 }
    }
  },
  vindicatorMK8Upgrades: {
    cascoFantasma: {
      id: 'casco_fantasma',
      name: 'Casco Fantasma',
      description: 'Aumenta la vida máxima del Phantom.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { nucleoEspectral: 50 }, phase2Resources: {} },
      statIncreasePerStar: { health: 8000 }
    },
    conexionEspectral: {
      id: 'conexion_espectral',
      name: 'Conexión Espectral',
      description: 'Aumenta el escudo máximo del Phantom.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { conexionFantasmal: 25 }, phase2Resources: {} },
      statIncreasePerStar: { shield: 4000 }
    },
    armasEtéreas: {
      id: 'armas_etereas',
      name: 'Armas Etéreas',
      description: 'Aumenta el daño del Phantom.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { conexionFantasmal: 50 }, phase2Resources: {} },
            statIncreasePerStar: { damage: 1600 }
    }
  },
  vindicatorMK9Upgrades: {
    blindajeDeCiudadela: {
      id: 'blindaje_ciudadela',
      name: 'Blindaje de Ciudadela',
      description: 'Aumenta la vida máxima del Apex.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { fragmentoDeCiudadela: 50 }, phase2Resources: {} },
      statIncreasePerStar: { health: 15000 }
    },
    matrizDefensiva: {
      id: 'matriz_defensiva',
      name: 'Matriz Defensiva',
      description: 'Aumenta el escudo máximo del Apex.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { matrizDeOverlord: 25 }, phase2Resources: {} },
      statIncreasePerStar: { shield: 7500 }
    },
    canonOverlord: {
      id: 'canon_overlord',
      name: 'Cañón Overlord',
      description: 'Aumenta el daño del Apex.',
      maxStars: 10,
      currentStars: 0,
      costPerStar: { phase1Resources: { matrizDeOverlord: 50 }, phase2Resources: {} },
      statIncreasePerStar: { damage: 3000 }
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


