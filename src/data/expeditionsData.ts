import { Expedition } from '../types/gameState';

export const allExpeditionsData: Expedition[] = [
  // --- EXPEDICIONES DE TIER 1 ---
  {
    id: 'chatarreriaOrbital',
    title: 'Chatarrería Orbital',
    description: 'Una densa nube de chatarra de naves antiguas. Ideal para recolección básica.',
    duration: 600, // 10 minutos
    costs: { drones: 1 },
    rewards: {
      circuitosDañados: [3, 6]
    },
    risk: { chance: 0.05, droneLossPercentage: 1 },
    droneType: 'expeditionDrone',
    tier: 1,
  },
  {
    id: 'cinturonAsteroides',
    title: 'Cinturón de Asteroides',
    description: 'Un cinturón rico en minerales, pero inestable. Se requiere equipo más robusto.',
    duration: 1200, // 20 minutos
    costs: { drones: 1 },
    rewards: {
      fragmentosPlaca: [5, 10]
    },
    risk: { chance: 0.1, droneLossPercentage: 0.5 },
    droneType: 'expeditionDrone',
    tier: 1,
  },
  {
    id: 'nebulosaFantasma',
    title: 'Nebulosa Fantasma',
    description: 'Una nebulosa misteriosa que interfiere con los sensores, pero que esconde valiosos depósitos de aleaciones.',
    duration: 1800, // 30 minutos
    costs: { drones: 1 },
    rewards: {
      metalRefinado: [10, 20],
      aceroEstructural: [5, 10]
    },
    risk: { chance: 0.1, droneLossPercentage: 0.5 },
    droneType: 'expeditionDrone',
    tier: 1,
  },
  {
    id: 'cementerioAcorazados',
    title: 'Cementerio de Acorazados',
    description: 'Los restos de una batalla legendaria. Contiene materiales avanzados y peligros desconocidos.',
    duration: 3600, // 1 hora
    costs: { drones: 1, barraCombustible: 1 },
    rewards: {
      scrap: [8000, 15000],
      aceroEstructural: [5, 12],
      circuitosDañados: [3, 10]
    },
    risk: { chance: 0.15, droneLossPercentage: 0.3 },
    droneType: 'expeditionDrone',
    prerequisites: (s) => s.phase2Unlocked,
    tier: 2,
  },

  // --- EXPEDICIONES DE TIER 2 (NUEVA) ---
  {
    id: 'incursionZonaCorrupta',
    title: 'Incursión a Zona Corrupta',
    description: 'Un sector donde las leyes de la física parecen fallar. Se rumorea que contiene componentes anómalos.',
    duration: 3600, // 1 hora
    costs: {
      drones: 1, // 1 Dron v2
      barraCombustible: 5
    },
    rewards: {
      scrap: [10000, 20000],
      aleacionReforzada: [10, 25],
      neuroChipCorrupto: [5, 15]
    },
    risk: { chance: 0.2, droneLossPercentage: 1 }, // 20% de riesgo, se pierde el dron si falla
    droneType: 'expeditionV2Drone',
    prerequisites: (s) => s.phase2Unlocked,
    tier: 2,
  },
];
