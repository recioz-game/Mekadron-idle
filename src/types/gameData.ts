import { GameState } from './gameState';

// Definir explícitamente los tipos de costos para más claridad
type Costs = {
  scrap?: number;
  metalRefinado?: number;
  aceroEstructural?: number;
  fragmentosPlaca?: number;
  circuitosDañados?: number;
  energy?: number;
};

export interface BuildableItem {
  costs: Costs;
  time: number;
  prerequisites?: (state: GameState) => boolean;
  produces?: {
    resource: keyof GameState['resources'] | keyof GameState['workshop']['drones'] | keyof GameState['energy'] | keyof GameState['storage'];
    amount?: number; // Por defecto es 1
  };
}

export interface ShipyardProject {
  id: string;
  name: string;
  description: string;
  costs: Record<string, Record<string, number>>;
}
