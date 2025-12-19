import { GameState, ActiveExpedition } from '../types/gameState';
import { allExpeditionsData } from '../data/expeditionsData';
import { formatNumber } from '../utils/formatNumber';

export const updateVindicatorToVM01 = (state: GameState): GameState => {
  const newUpgrades = { ...state.vindicatorUpgrades };
  Object.keys(newUpgrades).forEach(key => {
    (newUpgrades as any)[key].currentStars = 0;
  });

  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator, // Preservar todas las propiedades de la bodega
      vindicatorType: 'vm01_origin' as 'vm01_origin',
      maxHealth: 1500,
      currentHealth: 1500,
      maxShield: 750,
      currentShield: 750,
      damage: 150,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK1: { // Inicializar la nueva bodega
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 5000,
          componentesBatalla: 2500,
          materialesExoticos: 500,
        },
      },
    },
    vindicatorUpgrades: newUpgrades,
    vindicatorLevel: 1,
  };

  return newState;
};

export const updateVindicatorToVM02 = (state: GameState): GameState => {
  // Transiciona el estado al Vindicator VM02 "Interceptor"
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator, // Conserva módulos si los hubiera
      vindicatorType: 'vm02_interceptor' as 'vm02_interceptor',
      maxHealth: 5200,
      currentHealth: 5200,
      maxShield: 2600,
      currentShield: 2600,
      damage: 520,
      modules: { // Resetea módulos al cambiar de chasis
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK2: { // Inicializar la nueva bodega
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 10000,
          componentesBatalla: 5000,
          materialesExoticos: 1000,
        },
      },
    },
    vindicatorLevel: 1, // Resetea el nivel para la nueva progresión del MK2
    // Nota: Las 'vindicatorUpgrades' del MK0/MK1 se dejan, pero no se usarán
    // gracias a la lógica en Armory.tsx, que mostrará las del MK2.
  };
  return newState;
};

export const updateVindicatorToVM03 = (state: GameState): GameState => {
  // Transiciona el estado al Vindicator VM03 "Devastator"
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator,
      vindicatorType: 'vm03_devastator' as 'vm03_devastator',
      maxHealth: 15000,
      currentHealth: 15000,
      maxShield: 7500,
      currentShield: 7500,
      damage: 1500,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK3: {
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 20000,
          componentesBatalla: 10000,
          materialesExoticos: 2000,
        },
      },
    },
    vindicatorLevel: 1,
  };
  return newState;
};

export const updateVindicatorToVM04 = (state: GameState): GameState => {
  // Transiciona el estado al Vindicator VM04 "Reaper"
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator,
      vindicatorType: 'vm04_reaper' as 'vm04_reaper',
      maxHealth: 32000,
      currentHealth: 32000,
      maxShield: 16000,
      currentShield: 16000,
      damage: 3200,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK4: {
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 25000,
          componentesBatalla: 15000,
          materialesExoticos: 5000,
        },
      },
    },
    vindicatorLevel: 1,
  };
  return newState;
};

export const updateVindicatorToVM05 = (state: GameState): GameState => {
  // Transiciona el estado al Vindicator VM05 "Aegis"
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator,
      vindicatorType: 'vm05_aegis' as 'vm05_aegis',
      maxHealth: 56000,
      currentHealth: 56000,
      maxShield: 21000,
      currentShield: 21000,
      damage: 7700,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK5: {
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 50000,
          componentesBatalla: 30000,
          materialesExoticos: 10000,
        },
      },
    },
    vindicatorLevel: 1,
  };
  return newState;
};

export const updateVindicatorToVM06 = (state: GameState): GameState => {
  // Transiciona el estado al Vindicator VM06 "Tempest"
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator,
      vindicatorType: 'vm06_tempest' as 'vm06_tempest',
      maxHealth: 105000,
      currentHealth: 105000,
      maxShield: 45000,
      currentShield: 45000,
      damage: 10100,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK6: {
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 60000,
          componentesBatalla: 40000,
          materialesExoticos: 15000,
        },
      },
    },
    vindicatorLevel: 1,
  };
  return newState;
};

export const updateVindicatorToVM07 = (state: GameState): GameState => {
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator,
      vindicatorType: 'vm07_wraith' as 'vm07_wraith',
      maxHealth: 160000,
      currentHealth: 160000,
      maxShield: 72000,
      currentShield: 72000,
      damage: 17500,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK7: {
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 80000,
          componentesBatalla: 60000,
          materialesExoticos: 25000,
        },
      },
    },
    vindicatorLevel: 1,
  };
  return newState;
};

export const updateVindicatorToVM08 = (state: GameState): GameState => {
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator,
      vindicatorType: 'vm08_phantom' as 'vm08_phantom',
      maxHealth: 265000,
      currentHealth: 265000,
      maxShield: 125000,
      currentShield: 125000,
      damage: 32000,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK8: {
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 120000,
          componentesBatalla: 90000,
          materialesExoticos: 40000,
        },
      },
    },
    vindicatorLevel: 1,
  };
  return newState;
};

export const updateVindicatorToVM09 = (state: GameState): GameState => {
  const newState = {
    ...state,
    vindicator: {
      ...state.vindicator,
      vindicatorType: 'vm09_apex' as 'vm09_apex',
      maxHealth: 475000,
      currentHealth: 475000,
      maxShield: 230000,
      currentShield: 230000,
      damage: 61000,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
      bodegaMK9: {
        levels: {
          materialesIndustriales: 1,
          componentesBatalla: 1,
          materialesExoticos: 1,
        },
        capacities: {
          materialesIndustriales: 250000,
          componentesBatalla: 180000,
          materialesExoticos: 80000,
        },
      },
    },
    vindicatorLevel: 1,
  };
  return newState;
};

export const calculateExpeditionResults = (state: GameState, activeExpedition: ActiveExpedition) => {
  const expeditionData = allExpeditionsData.find(e => e.id === activeExpedition.id);
  if (!expeditionData) {
    return {
      dronesLost: 0,
      rewards: {},
      message: "Error: No se encontraron datos de la expedición.",
      audioId: 7,
      droneType: 'expeditionDrone' // Un valor por defecto seguro
    };
  }

  const expeditionCount = activeExpedition.expeditionCount || 1;
  let totalDronesLost = 0;
  const totalRewards: { [key: string]: number } = {};
  let successCount = 0;
  const individualResults: { wasSuccessful: boolean }[] = [];

  for (let i = 0; i < expeditionCount; i++) {
    const wasSuccessful = Math.random() > expeditionData.risk.chance;
    individualResults.push({ wasSuccessful });

    if (wasSuccessful) {
      successCount++;
      for (const [resource, range] of Object.entries(expeditionData.rewards)) {
        if (range) {
          const [min, max] = range;
          const amount = Math.floor(Math.random() * (max - min + 1)) + min;
          if (amount > 0) {
            totalRewards[resource] = (totalRewards[resource] || 0) + amount;
          }
        }
      }
    } else {
      const droneSelfRepairLevel = state.techCenter.upgrades.droneSelfRepair || 0;
      const survivalChance = droneSelfRepairLevel * 0.10;
      const dronesPerSingleExpedition = expeditionData.costs.drones;
      const initialDronesLostInThisRun = Math.ceil(dronesPerSingleExpedition * expeditionData.risk.droneLossPercentage);
      let dronesSurvivedThisRun = 0;

      if (droneSelfRepairLevel > 0) {
        for (let j = 0; j < initialDronesLostInThisRun; j++) {
          if (Math.random() < survivalChance) {
            dronesSurvivedThisRun++;
          }
        }
      }
      totalDronesLost += initialDronesLostInThisRun - dronesSurvivedThisRun;
    }
  }

  let finalMessage = `Convoy de ${expeditionCount} expediciones a "${expeditionData.title}" ha regresado.\n`;
  if (successCount > 0) {
    const rewardStrings = Object.entries(totalRewards).map(([res, amount]) => `${formatNumber(amount, 'abbreviated')} de ${res.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    finalMessage += `Éxitos: ${successCount}. Recompensas: ${rewardStrings.join(', ') || 'ninguna'}.\n`;
  }
  if (totalDronesLost > 0) {
    finalMessage += `Pérdidas: ${totalDronesLost} drones.`;
  }

  return {
    dronesLost: totalDronesLost,
    rewards: totalRewards,
    message: finalMessage.trim(),
    audioId: state.settings.voicesMuted ? undefined : (successCount > 0 ? 6 : 7),
    droneType: expeditionData.droneType,
    individualResults,
  };
};
