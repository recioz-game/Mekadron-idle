import { useEffect, useRef } from 'react';
import { ActionType } from '../types/actions';

export const useGameLoop = (dispatch: React.Dispatch<ActionType>) => {
  const lastTick = useRef<number | null>(null);
  const tickInterval = 1000; // 1 tick por segundo

  useEffect(() => {
    let frameId: number;

    const gameLoop = (timestamp: number) => {
      if (lastTick.current === null) {
        lastTick.current = timestamp;
      }

      const delta = timestamp - lastTick.current;

      if (delta >= tickInterval) {
        const ticksToProcess = Math.floor(delta / tickInterval);
        lastTick.current = timestamp - (delta % tickInterval);

        // Procesar todos los ticks que han pasado
                for (let i = 0; i < ticksToProcess; i++) {
          dispatch({ type: 'GAME_TICK' });
        }
      }

      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameId);
  }, [dispatch]);
};

