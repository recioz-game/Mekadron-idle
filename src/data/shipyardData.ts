// src/data/shipyardData.ts
import { ShipyardProject } from '../types/gameData';

export const allShipyardProjects: ShipyardProject[] = [
  {
    id: 'vindicator_base',
    name: 'Vindicator (Base)',
    description: 'Construye el casco base del Vindicator.',
    costs: {
      hull: { placasCasco: 50 },
      powerCore: { cableadoSuperconductor: 50 },
      targetingSystem: { researchPoints: 1000, cableadoSuperconductor: 25 },
      warpDrive: { nucleoSingularidad: 1 }
    },
  },
  {
    id: 'vindicator_mk1',
    name: 'Vindicator Mk.I',
    description: 'Mejora el Vindicator a la versión Mk.I "Acorazado". Requiere tecnología avanzada de Fase 1 y materiales exóticos recuperados de la zona corrupta.',
    costs: {
      chasisReforzado: { aceroEstructural: 25000, aleacionReforzada: 250 },
      nucleoSingularidad: { cableadoSuperconductor: 5000, neuroChipCorrupto: 100 },
      sistemaArmamento: { aleacionReforzada: 150, neuroChipCorrupto: 75 },
      ensamblajeFinal: { blueprints: 50 }
    },
  },
];
