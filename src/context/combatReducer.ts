import { GameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { gameChapters } from '../data/battleData';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';

// Aplanamos los destinos de todos los capítulos en una sola lista
const allDestinations = gameChapters.flatMap(chapter => chapter.destinations);


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
      if (state.resources.barraCombustible < 1) {
        console.warn("No hay suficiente combustible para iniciar la batalla.");
        return state;
      }

      if (state.battleRoom.selectedDestination === null) {
        return state;
      }

      const destinationIndex = state.battleRoom.selectedDestination;
      const destination = allDestinations[destinationIndex];
      const battleIndex = state.battleRoom.battlesCompleted[destinationIndex] || 0;

      if (battleIndex >= destination.battles.length) {
        return state;
      }

      const enemy = destination.battles[battleIndex];

      return {
        ...state,
        resources: {
          ...state.resources,
          barraCombustible: state.resources.barraCombustible - 1,
        },
        battleCount: state.battleCount + 1,
        currentScene: 'combatScene',
        activeBattle: {
          destinationIndex,
          battleIndex,
          enemyName: enemy.enemyName,
          enemyMaxHealth: enemy.health,
          enemyCurrentHealth: enemy.health,
          enemyMaxShield: enemy.shield,
          enemyCurrentShield: enemy.shield,
        },
        vindicator: {
          ...state.vindicator,
          currentShield: state.vindicator.maxShield,
        },
      };
    }

    case 'PLAYER_ATTACK': {
      if (!state.activeBattle) {
        return state;
      }
      
      const { activeBattle, vindicator } = state;
      const enemy = allDestinations[activeBattle.destinationIndex].battles[activeBattle.battleIndex];

      // --- INICIO DE LÓGICA DE MÓDULOS ---
      const equippedModules = {
        offensive: allArmoryMK1Modules.find(m => m.id === vindicator.modules.offensive),
        defensive: allArmoryMK1Modules.find(m => m.id === vindicator.modules.defensive),
        tactical: allArmoryMK1Modules.find(m => m.id === vindicator.modules.tactical),
      };

      // --- APLICAR EFECTOS PASIVOS ---
      let enemyDamage = enemy.damage;
      if (equippedModules.tactical?.id === 'mod_frequency_disruptor') {
        enemyDamage *= (1 - equippedModules.tactical.effects.enemyDamageReduction);
      }

      // Función de daño, no cambia
      const applyDamage = (damage: number, targetShield: number, targetHealth: number): { newShield: number; newHealth: number } => {
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

      // --- 1. JUGADOR ATACA ---
      let playerDamage = vindicator.damage;
      if (equippedModules.tactical?.id === 'mod_predictive_targeting') {
        if (Math.random() < equippedModules.tactical.effects.critChance) {
          playerDamage *= equippedModules.tactical.effects.critDamageMultiplier;
        }
      }

      let enemyDamageResult = applyDamage(
        playerDamage,
        activeBattle.enemyCurrentShield,
        activeBattle.enemyCurrentHealth
      );

      // --- 2. ENEMIGO ATACA (SI SIGUE VIVO) ---
      let vindicatorDamageResult = { newShield: vindicator.currentShield, newHealth: vindicator.currentHealth };
      if (enemyDamageResult.newHealth > 0) {
        const shieldBeforeAttack = vindicator.currentShield;
        
        vindicatorDamageResult = applyDamage(
          enemyDamage,
          shieldBeforeAttack,
          vindicator.currentHealth
        );

        // Comprobar "Sobrecarga Reactiva"
        if (vindicator.vindicatorType === 'mk1' && shieldBeforeAttack > 0 && vindicatorDamageResult.newShield <= 0) {
          let overloadMultiplier = 1.5;
          if (equippedModules.offensive?.id === 'mod_overload_amp') {
            overloadMultiplier = equippedModules.offensive.effects.overloadDamageMultiplier;
            // Aquí se podría añadir lógica para el buff de daño post-sobrecarga en el estado
          }
          const overloadDamage = Math.floor(vindicator.damage * overloadMultiplier);
          enemyDamageResult = applyDamage(overloadDamage, enemyDamageResult.newShield, enemyDamageResult.newHealth);
        }
      }
      
      let updatedVindicator = {
        ...vindicator,
        currentShield: vindicatorDamageResult.newShield,
        currentHealth: vindicatorDamageResult.newHealth,
      };

      // --- 3. REGENERACIÓN DE FIN DE TURNO ---
      if (equippedModules.defensive?.id === 'mod_autorepair') {
        const healthToRegen = Math.floor(updatedVindicator.maxHealth * equippedModules.defensive.effects.healthRegenPercentage);
        updatedVindicator.currentHealth = Math.min(updatedVindicator.maxHealth, updatedVindicator.currentHealth + healthToRegen);
      }
      if (equippedModules.defensive?.id === 'mod_shield_condenser') {
        // Suponemos que si el enemigo no atacó, no hubo daño al casco
        const tookHullDamage = updatedVindicator.currentHealth < vindicator.currentHealth;
        if (!tookHullDamage) {
          const shieldToRegen = Math.floor(updatedVindicator.maxShield * equippedModules.defensive.effects.shieldRegenPercentage);
          updatedVindicator.currentShield = Math.min(updatedVindicator.maxShield, updatedVindicator.currentShield + shieldToRegen);
        }
      }

      const updatedActiveBattle = {
        ...activeBattle,
        enemyCurrentShield: enemyDamageResult.newShield,
        enemyCurrentHealth: enemyDamageResult.newHealth,
      };

      // --- 4. RESOLUCIÓN DEL TURNO (VICTORIA/DERROTA) ---
      if (updatedVindicator.currentHealth <= 0) {
        // --- DERROTA ---
        const newBattlesCompleted = [...state.battleRoom.battlesCompleted];
        newBattlesCompleted[activeBattle.destinationIndex] = 0; // Resetea progreso del destino
        
        return {
          ...state,
          currentScene: 'phase2Main',
          activeBattle: null,
          battleRoom: {
            ...state.battleRoom,
            battlesCompleted: newBattlesCompleted,
          },
          vindicator: {
            ...vindicator,
            currentHealth: vindicator.maxHealth,
            currentShield: 0,
          }
        };

      } else if (updatedActiveBattle.enemyCurrentHealth <= 0) {
        // --- VICTORIA (CORREGIDO) ---
        const newBattlesCompleted = [...state.battleRoom.battlesCompleted];
        const currentWins = newBattlesCompleted[activeBattle.destinationIndex] || 0;
        newBattlesCompleted[activeBattle.destinationIndex] = currentWins + 1;

        const destination = allDestinations[activeBattle.destinationIndex];
        const nextBattleIndex = newBattlesCompleted[activeBattle.destinationIndex];

        if (nextBattleIndex < destination.battles.length) {
          // Hay más batallas en este destino
          const nextEnemy = destination.battles[nextBattleIndex];
          
          return {
            ...state,
            resources: {
              ...state.resources,
              scrap: state.resources.scrap + (enemy.reward.scrap || 0),
              aleacionReforzada: state.resources.aleacionReforzada + (enemy.reward.aleacionReforzada || 0),
              neuroChipCorrupto: state.resources.neuroChipCorrupto + (enemy.reward.neuroChipCorrupto || 0)
            },
            blueprints: state.blueprints + (enemy.reward.blueprints || 0),
            battleRoom: {
              ...state.battleRoom,
              battlesCompleted: newBattlesCompleted,
            },
            activeBattle: {
              ...activeBattle,
              battleIndex: nextBattleIndex,
              enemyName: nextEnemy.enemyName,
              enemyMaxHealth: nextEnemy.health,
              enemyCurrentHealth: nextEnemy.health,
              enemyMaxShield: nextEnemy.shield,
              enemyCurrentShield: nextEnemy.shield,
            },
            vindicator: updatedVindicator,
          };
        } else {
          // No hay más batallas - destino completado
          return {
            ...state,
            currentScene: 'phase2Main',
            activeBattle: null,
            resources: {
              ...state.resources,
              scrap: state.resources.scrap + (enemy.reward.scrap ?? 0),
              aleacionReforzada: state.resources.aleacionReforzada + (enemy.reward.aleacionReforzada ?? 0),
              neuroChipCorrupto: state.resources.neuroChipCorrupto + (enemy.reward.neuroChipCorrupto ?? 0),
              matrizCristalina: state.resources.matrizCristalina + (enemy.reward.matrizCristalina ?? 0),
              IA_Fragmentada: state.resources.IA_Fragmentada + (enemy.reward.IA_Fragmentada ?? 0),
              planosMK2: state.resources.planosMK2 + (enemy.reward.planosMK2 ?? 0),
            },
            blueprints: state.blueprints + (enemy.reward.blueprints ?? 0),
            battleRoom: {
              ...state.battleRoom,
              battlesCompleted: newBattlesCompleted,
            },
            vindicator: updatedVindicator,
          };
        }
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
      
      const newBattlesCompleted = [...state.battleRoom.battlesCompleted];
      newBattlesCompleted[state.activeBattle!.destinationIndex] = 0;

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
      return state;
  }
};
