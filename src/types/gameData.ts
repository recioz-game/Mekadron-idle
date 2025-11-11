import { GameState } from './gameState';

export interface BuildableItem {
  costs: Partial<Record<keyof GameState['resources'], number>>;
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
