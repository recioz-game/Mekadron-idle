import { GameState } from './gameState';

export interface BuildableItem {
  costs: Partial<Record<keyof GameState['resources'], number>>;
  time: number;
  prerequisites?: (state: GameState) => boolean;
}
