import { useEffect } from 'react';
import { ActionType } from '../types/actions';

export const useGameLoop = (dispatch: React.Dispatch<ActionType>) => {
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'GAME_TICK' });
      dispatch({ type: 'UPDATE_MISSION_PROGRESS' });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
};
