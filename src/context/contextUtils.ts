import { GameState, initialGameState } from '../types/gameState';

// Rehidrata el estado, asegurando que ciertos datos (como Sets) se restauren correctamente
export const rehydrateState = (state: GameState): GameState => {
  // Asegurarse de que shownMessages sea siempre un Set
  if (state.aurora && Array.isArray(state.aurora.shownMessages)) {
    state.aurora.shownMessages = new Set(state.aurora.shownMessages);
  } else if (!state.aurora || !(state.aurora.shownMessages instanceof Set)) {
        // Si la estructura no existe o no es un Set, inicializarla correctamente
    if (!state.aurora) state.aurora = { ...initialGameState.aurora };
    state.aurora.shownMessages = new Set();
  }
  return state;
};

const isObject = (item: any): boolean => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

// Función auxiliar para una fusión profunda de objetos
export const deepMerge = (target: any, source: any): any => {
  if (!isObject(source)) {
    return target;
  }

  const output = { ...target };

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (isObject(targetValue) && isObject(sourceValue)) {
      output[key] = deepMerge(targetValue, sourceValue);
    } else {
      output[key] = sourceValue;
    }
  });

  Object.keys(target).forEach(key => {
    if (!(key in source)) {
      output[key] = target[key];
    }
  });

  return output;
};
