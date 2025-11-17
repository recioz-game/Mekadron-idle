import { useGameState } from '../context/GameContext';
import { GameState } from '../types/gameState';

// Este hook se suscribe al contexto de estado, pero solo devuelve la parte de 'resources'.
// En una implementación más avanzada, se podría usar la librería 'use-context-selector'
// para que el componente solo se re-renderice si 'state.resources' cambia realmente.
// Por ahora, esto sirve como una buena práctica de separación de lógica.
export const useResources = (): GameState['resources'] => {
  const gameState = useGameState();
  return gameState.resources;
};

export const useMissions = (): GameState['missions'] => {
  const gameState = useGameState();
  return gameState.missions;
}

export const useWorkshop = (): GameState['workshop'] => {
  const gameState = useGameState();
  return gameState.workshop;
}

export const useModules = (): GameState['modules'] => {
  const gameState = useGameState();
  return gameState.modules;
}

export const useRates = (): GameState['rates'] => {
  const gameState = useGameState();
  return gameState.rates;
}

export const useShipyard = (): GameState['shipyard'] => {
  const gameState = useGameState();
  return gameState.shipyard;
}

export const useVindicator = (): GameState['vindicator'] => {
  const gameState = useGameState();
  return gameState.vindicator;
};
