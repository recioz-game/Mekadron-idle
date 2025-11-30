// src/data/armoryMK1Data.ts

export type ModuleSlot = 'offensive' | 'defensive' | 'tactical';

export interface MK1ModuleCosts {
  matrizQuitinaCristal: number;
  nucleoSinapticoFracturado: number;
  planosMK2: number;
}

export interface MK2ModuleCosts {
  moduloManiobrasTácticas: number;
  placasCamuflajeActivo: number;
  planosDeInterceptor: number;
}

export interface VindicatorModule {
  id: string;
  name: string;
  description: string;
  slot: ModuleSlot;
  costs: MK1ModuleCosts | MK2ModuleCosts;
  // Los efectos específicos serán interpretados por el combatReducer
  effects: {
    // Ejemplo: { type: 'CRITICAL_CHANCE', value: 0.2 }
    [key: string]: any;
  };
}

export const allArmoryMK1Modules: VindicatorModule[] = [
  // --- Módulo Ofensivo ---
  {
    id: 'mod_overload_amp',
    name: 'Núcleo de Sobrecarga Amplificado',
    slot: 'offensive',
    description: 'Aumenta el daño de Sobrecarga Reactiva al 300% y potencia el daño del Vindicator un 25% durante 3 turnos tras la activación.',
    costs: { matrizQuitinaCristal: 100, nucleoSinapticoFracturado: 25, planosMK2: 10 },
    effects: {
      overloadDamageMultiplier: 3.0,
      postOverloadDamageBuff: 0.25,
      postOverloadBuffDuration: 3,
    },
  },

  // --- Módulos Defensivos ---
  {
    id: 'mod_autorepair',
    name: 'Placas de Casco Auto-regenerativas',
    slot: 'defensive',
    description: 'Al final de cada turno de combate, el Vindicator repara un 2% de su vida máxima.',
    costs: { matrizQuitinaCristal: 150, nucleoSinapticoFracturado: 10, planosMK2: 10 },
    effects: {
      healthRegenPercentage: 0.02,
    },
  },
  {
    id: 'mod_shield_condenser',
    name: 'Condensador de Escudo Rápido',
    slot: 'defensive',
    description: 'Al final de cada turno, si el Vindicator no ha recibido daño en el casco, regenera un 10% de su escudo máximo.',
    costs: { matrizQuitinaCristal: 125, nucleoSinapticoFracturado: 15, planosMK2: 10 },
    effects: {
      shieldRegenPercentage: 0.10,
    },
  },

  // --- Módulos Tácticos ---
  {
    id: 'mod_predictive_targeting',
    name: 'Sistema de Puntería Predictiva',
    slot: 'tactical',
    description: 'Los ataques del Vindicator tienen un 20% de probabilidad de asestar un golpe crítico, infligiendo un 50% de daño adicional.',
    costs: { matrizQuitinaCristal: 75, nucleoSinapticoFracturado: 50, planosMK2: 10 },
    effects: {
      critChance: 0.20,
      critDamageMultiplier: 1.5,
    },
  },
  {
    id: 'mod_frequency_disruptor',
    name: 'Disruptor de Frecuencia',
    slot: 'tactical',
    description: 'Reduce el daño de todos los enemigos en un 15% de forma pasiva.',
    costs: { matrizQuitinaCristal: 100, nucleoSinapticoFracturado: 20, planosMK2: 10 },
    effects: {
      enemyDamageReduction: 0.15,
    },
  },
];
