import { GameState } from '../types/gameState';

export const updateVindicatorToMK1 = (state: GameState): GameState => {
  const newUpgrades = { ...state.vindicatorUpgrades };
  Object.keys(newUpgrades).forEach(key => {
    (newUpgrades as any)[key].currentStars = 0;
  });

  const newState = {
    ...state,
    vindicator: {
      vindicatorType: 'mk1' as 'mk1',
      maxHealth: 1500,
      currentHealth: 1500,
      maxShield: 750,
      currentShield: 750,
      damage: 150,
      modules: {
        offensive: null,
        defensive: null,
        tactical: null,
      },
    },
    vindicatorUpgrades: newUpgrades,
    vindicatorLevel: 1,
  };

  return newState;
};
