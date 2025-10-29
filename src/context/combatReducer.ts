import { GameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { battleDestinations } from '../data/battleData';

export const combatReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'SELECT_BATTLE_DESTINATION':
      return {
        ...state,
        battleRoom: {
          ...state.battleRoom,
          selectedDestination: action.payload,
        },
      };

    case 'START_BATTLE': {
      // Requisito: Comprobar si hay combustible
      if (state.resources.barraCombustible < 1) {
        // Opcional: Podríamos enviar una notificación al jugador aquí
        console.warn("No hay suficiente combustible para iniciar la batalla.");
        return state;
      }

      if (state.battleRoom.selectedDestination === null) {
        return state;
      }

      const destinationIndex = state.battleRoom.selectedDestination;
      const destination = battleDestinations[destinationIndex];
      const battleIndex = state.battleRoom.battlesCompleted[destinationIndex || 0];

      if (battleIndex >= destination.battles.length) {
        return state; // Todas las batallas en este destino ya están completadas
      }

      const enemy = destination.battles[battleIndex];

      return {
        ...state,
        resources: {
          ...state.resources,
          barraCombustible: state.resources.barraCombustible - 1,
        },
        battleCount: state.battleCount + 1,
        currentScene: 'combatScene', // ¡Cambiamos a la nueva escena de combate!
        activeBattle: {
          destinationIndex,
          battleIndex,
          enemyName: enemy.enemyName,
          enemyMaxHealth: enemy.health,
          enemyCurrentHealth: enemy.health,
          enemyMaxShield: enemy.shield,
          enemyCurrentShield: enemy.shield,
        },
        // Opcional: Regenerar completamente el escudo del Vindicator al empezar una batalla
        vindicator: {
          ...state.vindicator,
          currentShield: state.vindicator.maxShield,
        },
      };
    }

    case 'PLAYER_ATTACK': {
      if (!state.activeBattle) {
        return state; // No se puede atacar si no hay batalla
      }
      
      const { activeBattle, vindicator } = state;
      const enemy = battleDestinations[activeBattle.destinationIndex].battles[activeBattle.battleIndex];

      const applyDamage = (
        damage: number,
        targetShield: number,
        targetHealth: number
      ): { newShield: number; newHealth: number } => {
        let remainingDamage = damage;
        let newShield = targetShield;
        let newHealth = targetHealth;

        const shieldDamage = Math.min(newShield, remainingDamage);
        newShield -= shieldDamage;
        remainingDamage -= shieldDamage;

        if (remainingDamage > 0) {
          newHealth = Math.max(0, newHealth - remainingDamage);
        }
        return { newShield, newHealth };
      };

      // Vindicator ataca al enemigo
      const enemyDamageResult = applyDamage(
        vindicator.damage,
        activeBattle.enemyCurrentShield,
        activeBattle.enemyCurrentHealth
      );

      // Si el enemigo sobrevive al ataque, contraataca
      let vindicatorDamageResult = { newShield: vindicator.currentShield, newHealth: vindicator.currentHealth };
      if (enemyDamageResult.newHealth > 0) {
        vindicatorDamageResult = applyDamage(
          enemy.damage,
          vindicator.currentShield,
          vindicator.currentHealth
        );
      }
      
      const updatedVindicator = {
        ...vindicator,
        currentShield: vindicatorDamageResult.newShield,
        currentHealth: vindicatorDamageResult.newHealth,
      };

      const updatedActiveBattle = {
        ...activeBattle,
        enemyCurrentShield: enemyDamageResult.newShield,
        enemyCurrentHealth: enemyDamageResult.newHealth,
      };

      // Comprobar fin de la batalla
      if (updatedVindicator.currentHealth <= 0) {
        // --- DERROTA ---
        return {
          ...state,
          currentScene: 'phase2Main',
          activeBattle: null,
          vindicator: {
            ...vindicator,
            currentHealth: vindicator.maxHealth,
            currentShield: 0,
          }
        };
      } else if (updatedActiveBattle.enemyCurrentHealth <= 0) {
        // --- VICTORIA ---
        const newBattlesCompleted = [...state.battleRoom.battlesCompleted];
        newBattlesCompleted[activeBattle.destinationIndex]++;

        return {
          ...state,
          currentScene: 'phase2Main',
          activeBattle: null,
          resources: {
            ...state.resources,
            scrap: state.resources.scrap + (enemy.reward.scrap || 0),
            aleacionReforzada: state.resources.aleacionReforzada + (enemy.reward.aleacionReforzada || 0),
            neuroChipCorrupto: state.resources.neuroChipCorrupto + (enemy.reward.neuroChipCorrupto || 0),
          },
          battleRoom: {
            ...state.battleRoom,
            battlesCompleted: newBattlesCompleted,
          },
          vindicator: updatedVindicator,
        };
      } else {
        // --- LA BATALLA CONTINÚA ---
        return {
          ...state,
          vindicator: updatedVindicator,
          activeBattle: updatedActiveBattle,
        };
      }
    }
    
    case 'ESCAPE_COMBAT': {
      if (!state.activeBattle) {
        return state;
      }

      // Penalización por escapar: perder progreso en el destino actual
      const newBattlesCompleted = [...state.battleRoom.battlesCompleted];
      newBattlesCompleted[state.activeBattle.destinationIndex] = 0;

      return {
        ...state,
        currentScene: 'phase2Main',
        activeBattle: null,
        battleRoom: {
          ...state.battleRoom,
          battlesCompleted: newBattlesCompleted,
        },
        vindicator: {
          ...state.vindicator,
          currentHealth: state.vindicator.maxHealth,
          currentShield: 0,
        }
      };
    }

    default:
      // Si la acción no es de combate, devolvemos el estado sin cambios.
      return state;
  }
};

