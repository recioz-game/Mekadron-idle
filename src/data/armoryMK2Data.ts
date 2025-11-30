// src/data/armoryMK2Data.ts

import { VindicatorModule } from './armoryMK1Data'; // Reutilizamos la interfaz

export const allArmoryMK2Modules: VindicatorModule[] = [
  // --- Módulos Ofensivos ---
  {
    id: 'mod_mk2_crit_cannon',
    name: 'Cañón de Precisión "Aguijón"',
    slot: 'offensive',
    description: 'Aumenta el multiplicador de daño crítico en un 100% (del 150% base al 250%).',
    costs: {
      moduloManiobrasTácticas: 100,
      placasCamuflajeActivo: 50,
      planosDeInterceptor: 10,
    },
    effects: {
      critDamageMultiplier: 2.5,
    },
  },
  {
    id: 'mod_mk2_rapid_fire',
    name: 'Secuenciador de Fuego Rápido',
    slot: 'offensive',
    description: 'Otorga un 25% de probabilidad de atacar una segunda vez en el mismo turno con un 50% del daño normal.',
    costs: {
      moduloManiobrasTácticas: 150,
      placasCamuflajeActivo: 25,
      planosDeInterceptor: 10,
    },
    effects: {
      doubleTapChance: 0.25,
      doubleTapDamageMultiplier: 0.5,
    },
  },

  // --- Módulos Defensivos ---
  {
    id: 'mod_mk2_evasion_matrix',
    name: 'Matriz de Evasión',
    slot: 'defensive',
    description: 'Otorga un 20% de probabilidad de esquivar por completo un ataque enemigo.',
    costs: {
      moduloManiobrasTácticas: 50,
      placasCamuflajeActivo: 150,
      planosDeInterceptor: 10,
    },
    effects: {
      dodgeChance: 0.20,
    },
  },
  {
    id: 'mod_mk2_cloak_generator',
    name: 'Generador de Camuflaje',
    slot: 'defensive',
    description: 'Al inicio del combate, el Vindicator es invisible durante 2 turnos. El primer ataque recibido en este estado falla garantizado.',
    costs: {
      moduloManiobrasTácticas: 75,
      placasCamuflajeActivo: 125,
      planosDeInterceptor: 10,
    },
    effects: {
      cloakTurns: 2,
    },
  },

  // --- Módulos Tácticos ---
  {
    id: 'mod_mk2_weak_point_analyzer',
    name: 'Analizador de Puntos Débiles',
    slot: 'tactical',
    description: 'Cada ataque ignora un 25% del escudo enemigo, dañando directamente el casco.',
    costs: {
      moduloManiobrasTácticas: 125,
      placasCamuflajeActivo: 75,
      planosDeInterceptor: 10,
    },
    effects: {
      shieldPiercingPercentage: 0.25,
    },
  },
  {
    id: 'mod_mk2_post_dodge_charge',
    name: 'Sistema de Recarga de Armas',
    slot: 'tactical',
    description: 'Si el Vindicator esquiva un ataque, su siguiente ataque inflige un 50% más de daño.',
    costs: {
      moduloManiobrasTácticas: 100,
      placasCamuflajeActivo: 100,
      planosDeInterceptor: 10,
    },
    effects: {
      postDodgeDamageBuff: 1.5,
    },
  },
];
