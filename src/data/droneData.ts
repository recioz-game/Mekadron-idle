// src/data/droneData.ts
import { ResourceType } from '../types/gameState';

type DroneCost = Partial<Record<ResourceType, number>>;

export const droneData: Record<string, { cost: DroneCost }> = {
  basic: { 
    cost: { scrap: 15 } 
  },
  medium: { 
    cost: { scrap: 250 } 
  },
  advanced: { 
    cost: { scrap: 1500 } 
  },
  reinforcedBasic: { 
    cost: { scrap: 600, metalRefinado: 5 } 
  },
  reinforcedMedium: { 
    cost: { scrap: 2500, metalRefinado: 15 } 
  },
  reinforcedAdvanced: { 
    cost: { scrap: 7000, metalRefinado: 30 } 
  },
  expeditionDrone: { 
    cost: { scrap: 3000, metalRefinado: 20 } 
  },
  expeditionV2Drone: { 
    cost: { scrap: 15000, metalRefinado: 100 } 
  },
  golem: { 
    cost: { scrap: 75000, aceroEstructural: 5 } 
  },
  wyrm: { 
    cost: { scrap: 250000, aceroEstructural: 25 } 
  },
};
