// src/data/gameData.ts
import { BuildableItem } from '../types/gameData';

export type GameData = {
  workshop: Record<string, BuildableItem>;
  energy: Record<string, BuildableItem>;
  storage: Record<string, BuildableItem>;
  foundry: Record<string, BuildableItem>;
};

export const gameData: GameData = {
  workshop: {
    basic: { costs: { scrap: 15 }, time: 5 },
    medium: { costs: { scrap: 250 }, time: 20, prerequisites: (s) => s.workshop.drones.basic >= 5 },
    advanced: { costs: { scrap: 1500 }, time: 60, prerequisites: (s) => s.workshop.drones.medium >= 3 },
    reinforcedBasic: { costs: { scrap: 600, metalRefinado: 5 }, time: 45, prerequisites: (s) => s.techCenter.upgrades.reinforcedBasicDrones > 0 },
    reinforcedMedium: { costs: { scrap: 2500, metalRefinado: 15 }, time: 120, prerequisites: (s) => s.techCenter.upgrades.reinforcedMediumDrones > 0 },
    reinforcedAdvanced: { costs: { scrap: 7000, metalRefinado: 30 }, time: 300, prerequisites: (s) => s.techCenter.upgrades.reinforcedAdvancedDrones > 0 },
    golem: { costs: { scrap: 75000, aceroEstructural: 5 }, time: 600, prerequisites: (s) => s.techCenter.upgrades.golemChassis > 0 && s.workshop.drones.reinforcedAdvanced >= 5 },
    expeditionDrone: { costs: { scrap: 3000, metalRefinado: 20 }, time: 150, prerequisites: (s) => s.workshop.drones.advanced >= 2 },
    expeditionV2Drone: { costs: { scrap: 15000, metalRefinado: 100 }, time: 300, prerequisites: (s) => s.workshop.drones.expeditionDrone >= 5 }, // Nuevo dron v2
    wyrm: { costs: { scrap: 250000, aceroEstructural: 25 }, time: 1200, prerequisites: (s) => s.workshop.drones.golem >= 1 },
  },
  energy: {
    solarPanels: { costs: { scrap: 50 }, time: 8 },
    mediumSolarPanels: { costs: { scrap: 200 }, time: 25, prerequisites: (s) => s.energy.solarPanels >= 5 },
    advancedSolar: { costs: { scrap: 500 }, time: 70, prerequisites: (s) => s.energy.mediumSolarPanels >= 1 },
    energyCores: { costs: { scrap: 2000 }, time: 180, prerequisites: (s) => s.energy.advancedSolar >= 3 },
    stabilizedEnergyCores: { costs: { scrap: 10000 }, time: 300, prerequisites: (s) => s.energy.energyCores >= 3 },
    empoweredEnergyCores: { costs: { scrap: 20000 }, time: 600, prerequisites: (s) => s.energy.stabilizedEnergyCores >= 3 },
    fusionReactor: { costs: { scrap: 10000, metalRefinado: 25 }, time: 1200, prerequisites: (s) => (s.techCenter.upgrades as any).fusionTech > 0 && s.energy.energyCores >= 10 },
  },
  storage: {
    basicStorage: { costs: { scrap: 100 }, time: 10 },
    mediumStorage: { costs: { scrap: 1000 }, time: 40, prerequisites: (s) => s.storage.basicStorage >= 3 },
    advancedStorage: { costs: { scrap: 10000 }, time: 170, prerequisites: (s) => s.storage.mediumStorage >= 1 },
    quantumHoardUnit: { costs: { scrap: 75000, metalRefinado: 50 }, time: 900, prerequisites: (s) => s.storage.advancedStorage >= 3 },
    lithiumIonBattery: { costs: { scrap: 150 }, time: 15 },
    plasmaAccumulator: { costs: { scrap: 750 }, time: 60, prerequisites: (s) => s.storage.lithiumIonBattery >= 5 },
    harmonicContainmentField: { costs: { scrap: 3000, metalRefinado: 10 }, time: 450, prerequisites: (s) => s.storage.plasmaAccumulator >= 3 },
  },
  foundry: {
    metalRefinado: { costs: { scrap: 1000, energy: 100 }, time: 5, produces: { resource: 'metalRefinado' } },
    aceroEstructural: { costs: { scrap: 1000, metalRefinado: 10, energy: 250 }, time: 30, produces: { resource: 'aceroEstructural' } },
    placasCasco: { costs: { fragmentosPlaca: 10, aceroEstructural: 5, energy: 500 }, time: 50, produces: { resource: 'placasCasco' } },
    cableadoSuperconductor: { costs: { circuitosDañados: 10, metalRefinado: 25, energy: 1000 }, time: 75, produces: { resource: 'cableadoSuperconductor' } },
    barraCombustible: { costs: { metalRefinado: 10, aceroEstructural: 5, energy: 1500 }, time: 120, produces: { resource: 'barraCombustible' } },
  },
};

