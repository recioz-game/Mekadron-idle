import { GameState } from './gameState';

export interface BuildableItem {
  costs: Partial<Record<keyof GameState['resources'], number>>;
  time: number;
  prerequisites?: (state: GameState) => boolean;
  produces?: {
    resource: keyof GameState['resources'] | keyof GameState['drones'] | keyof GameState['energy'] | keyof GameState['storage'];
    amount?: number; // Por defecto es 1
  };
}
