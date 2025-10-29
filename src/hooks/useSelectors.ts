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
