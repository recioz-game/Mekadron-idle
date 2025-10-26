import { Expedition, ExpeditionId } from '../types/gameState';

export const expeditionsData: Record<ExpeditionId, Expedition> = {
  chatarreriaOrbital: {
    id: 'chatarreriaOrbital',
    title: 'Incursión a la Chatarrería Orbital',
    description: 'Una expedición segura para recolectar grandes cantidades de chatarra de los restos orbitales cercanos.',
    duration: 300, // 5 minutos
    costs: {
      drones: 1,
    },
    rewards: {
      scrap: [10000, 15000],
      fragmentosPlaca: [1, 5], 
    },
    risk: {
      chance: 0,
      droneLossPercentage: 0,
    },
  },
  cinturonAsteroides: {
    id: 'cinturonAsteroides',
    title: 'Recuperación en el Cinturón de Asteroides',
    description: 'Navega por un campo de asteroides denso en busca de materiales de construcción y componentes estructurales.',
    duration: 1800, // 30 minutos
    costs: {
      drones: 5,
      metalRefinado: 50,
    },
    rewards: {
      metalRefinado: [50, 75],
      aceroEstructural: [5, 10],
      fragmentosPlaca: [10, 20],
      circuitosDañados: [1, 5],
    },
    risk: {
      chance: 0.25,
      droneLossPercentage: 0.1, // Pierde el 10% de los drones enviados
    },
  },
  cementerioAcorazados: {
    id: 'cementerioAcorazados',
    title: 'El Cementerio de Acorazados',
    description: 'Explora los restos de una antigua batalla espacial. Un lugar peligroso, pero lleno de tecnología de valor incalculable.',
    duration: 7200, // 2 horas
    costs: {
      drones: 10,
      aceroEstructural: 25,
    },
    rewards: {
      aceroEstructural: [20, 30],
      circuitosDañados: [10, 20],
      nucleoSingularidad: [1, 1],
    },
    risk: {
      chance: 0.5,
      droneLossPercentage: 0.3, // Pierde el 30% de los drones enviados
    },
  },
};
