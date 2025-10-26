// src/context/GameContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { GameState, initialGameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { gameReducer } from './gameReducer';

interface GameContextProps {
  gameState: GameState;
  dispatch: React.Dispatch<ActionType>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

// Carga el estado inicial, intentando recuperarlo de localStorage
const loadState = (): GameState => {
  try {
    const serializedState = localStorage.getItem('mekadron-savegame');
    if (serializedState === null) {
      return initialGameState;
    }
    const storedState = JSON.parse(serializedState);
    
    // Fusionar el estado guardado con el inicial para asegurar compatibilidad
    const mergedState = { ...initialGameState, ...storedState };

    // Recuperar el Set de mensajes de Aurora que no es serializable por defecto
    mergedState.aurora.shownMessages = new Set(storedState.aurora.shownMessages || []);
    
    return mergedState;
  } catch (err) {
    console.error("No se pudo cargar la partida guardada:", err);
    return initialGameState;
  }
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, loadState());

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
