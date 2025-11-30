import { GameState } from '../types/gameState';
import { ActionType } from '../types/actions';
import { gameChapters } from '../data/battleData';
import { allArmoryMK1Modules } from '../data/armoryMK1Data';
import { allArmoryMK2Modules } from '../data/armoryMK2Data';

const allModules = [...allArmoryMK1Modules, ...allArmoryMK2Modules];

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
      if (state.vindicator.bodegaResources.barraCombustible < 1) {
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

      const equippedModules = {
        offensive: allModules.find(m => m.id === state.vindicator.modules.offensive),
        defensive: allModules.find(m => m.id === state.vindicator.modules.defensive),
        tactical: allModules.find(m => m.id === state.vindicator.modules.tactical),
      };
      
      const initialCloakTurns = equippedModules.defensive?.effects.cloakTurns || 0;

      return {
        ...state,
        vindicator: {
          ...state.vindicator,
          bodegaResources: {
            ...state.vindicator.bodegaResources,
            barraCombustible: state.vindicator.bodegaResources.barraCombustible - 1,
          },
          currentShield: state.vindicator.maxShield,
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
          cloakTurnsRemaining: initialCloakTurns,
          dodgeBonusNextTurn: false,
        },
      };
    }

    case 'PLAYER_ATTACK': {
      if (!state.activeBattle) {
        return state;
      }
      
      let { activeBattle, vindicator } = state; // 'let' para poder reasignar
      const enemy = allDestinations[activeBattle.destinationIndex].battles[activeBattle.battleIndex];

      const equippedModules = {
        offensive: allModules.find(m => m.id === vindicator.modules.offensive),
        defensive: allModules.find(m => m.id === vindicator.modules.defensive),
        tactical: allModules.find(m => m.id === vindicator.modules.tactical),
      };

      let enemyDamage = enemy.damage;
      if (equippedModules.tactical?.id === 'mod_frequency_disruptor') {
        enemyDamage *= (1 - equippedModules.tactical.effects.enemyDamageReduction);
      }

      const applyDamage = (damage: number, targetShield: number, targetHealth: number, shieldPiercing: number = 0): { newShield: number; newHealth: number } => {
        let remainingDamage = damage;
        let newShield = targetShield;
        let newHealth = targetHealth;
        
        const piercingDamage = remainingDamage * shieldPiercing;
        remainingDamage -= piercingDamage;
        newHealth = Math.max(0, newHealth - piercingDamage);

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
      let critMultiplier = 1.5;

      if (activeBattle.dodgeBonusNextTurn && equippedModules.tactical?.effects.postDodgeDamageBuff) {
        playerDamage *= equippedModules.tactical.effects.postDodgeDamageBuff;
        activeBattle = { ...activeBattle, dodgeBonusNextTurn: false };
      }
      
      if (equippedModules.tactical?.effects.critChance) {
        critMultiplier = equippedModules.tactical.effects.critDamageMultiplier;
      }
      if (equippedModules.offensive?.effects.critDamageMultiplier) {
        critMultiplier = equippedModules.offensive.effects.critDamageMultiplier;
      }

      if (equippedModules.tactical?.effects.critChance && Math.random() < equippedModules.tactical.effects.critChance) {
        playerDamage *= critMultiplier;
      }

      const shieldPiercing = equippedModules.tactical?.effects.shieldPiercingPercentage || 0;
      let enemyDamageResult = applyDamage(
        playerDamage,
        activeBattle.enemyCurrentShield,
        activeBattle.enemyCurrentHealth,
        shieldPiercing
      );

      if (equippedModules.offensive?.effects.doubleTapChance && Math.random() < equippedModules.offensive.effects.doubleTapChance) {
        const secondAttackDamage = playerDamage * equippedModules.offensive.effects.doubleTapDamageMultiplier;
        enemyDamageResult = applyDamage(
          secondAttackDamage,
          enemyDamageResult.newShield,
          enemyDamageResult.newHealth,
          shieldPiercing
        );
      }
      
      // La lógica del enemigo, regeneración y resolución se han movido a ENEMY_RESPONSE
      
      return {
        ...state,
        activeBattle: {
          ...activeBattle,
          enemyCurrentShield: enemyDamageResult.newShield,
          enemyCurrentHealth: enemyDamageResult.newHealth,
        },
      };
    }

    case 'ENEMY_RESPONSE': {
      if (!state.activeBattle) {
        return state;
      }

      let { activeBattle, vindicator } = state;
      const enemy = allDestinations[activeBattle.destinationIndex].battles[activeBattle.battleIndex];

      const equippedModules = {
        offensive: allModules.find(m => m.id === vindicator.modules.offensive),
        defensive: allModules.find(m => m.id === vindicator.modules.defensive),
        tactical: allModules.find(m => m.id === vindicator.modules.tactical),
      };

      let enemyDamage = enemy.damage;
      if (equippedModules.tactical?.id === 'mod_frequency_disruptor') {
        enemyDamage *= (1 - equippedModules.tactical.effects.enemyDamageReduction);
      }

      const applyDamage = (damage: number, targetShield: number, targetHealth: number, shieldPiercing: number = 0): { newShield: number; newHealth: number } => {
        let remainingDamage = damage;
        let newShield = targetShield;
        let newHealth = targetHealth;
        
        const piercingDamage = remainingDamage * shieldPiercing;
        remainingDamage -= piercingDamage;
        newHealth = Math.max(0, newHealth - piercingDamage);

        const shieldDamage = Math.min(newShield, remainingDamage);
        newShield -= shieldDamage;
        remainingDamage -= shieldDamage;
        if (remainingDamage > 0) {
          newHealth = Math.max(0, newHealth - remainingDamage);
        }
        return { newShield, newHealth };
      };

      // --- 2. ENEMIGO ATACA (SI SIGUE VIVO) ---
      let vindicatorDamageResult = { newShield: vindicator.currentShield, newHealth: vindicator.currentHealth };
      let finalEnemyStatus = { newShield: activeBattle.enemyCurrentShield, newHealth: activeBattle.enemyCurrentHealth };
      
      if (activeBattle.enemyCurrentHealth > 0) {
        const shieldBeforeAttack = vindicator.currentShield;
        
        let enemyAttackDamage = state.godMode ? 0 : enemyDamage; // <-- MODO DIOS
        if (activeBattle.cloakTurnsRemaining && activeBattle.cloakTurnsRemaining > 0) {
          enemyAttackDamage = 0;
          activeBattle = { ...activeBattle, cloakTurnsRemaining: activeBattle.cloakTurnsRemaining - 1 };
        } else if (equippedModules.defensive?.effects.dodgeChance && Math.random() < equippedModules.defensive.effects.dodgeChance) {
          enemyAttackDamage = 0;
          if (equippedModules.tactical?.effects.postDodgeDamageBuff) {
            activeBattle = { ...activeBattle, dodgeBonusNextTurn: true };
          }
        }
        
        vindicatorDamageResult = applyDamage(
          enemyAttackDamage,
          shieldBeforeAttack,
          vindicator.currentHealth
        );

        if (vindicator.vindicatorType === 'mk1' && shieldBeforeAttack > 0 && vindicatorDamageResult.newShield <= 0) {
          let overloadMultiplier = 1.5;
          if (equippedModules.offensive?.id === 'mod_overload_amp') {
            overloadMultiplier = equippedModules.offensive.effects.overloadDamageMultiplier;
          }
          const overloadDamage = Math.floor(vindicator.damage * overloadMultiplier);
          const enemyOverloadResult = applyDamage(overloadDamage, activeBattle.enemyCurrentShield, activeBattle.enemyCurrentHealth);
          finalEnemyStatus.newShield = enemyOverloadResult.newShield;
          finalEnemyStatus.newHealth = enemyOverloadResult.newHealth;
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
        const tookHullDamage = updatedVindicator.currentHealth < vindicator.currentHealth;
        if (!tookHullDamage) {
          const shieldToRegen = Math.floor(updatedVindicator.maxShield * equippedModules.defensive.effects.shieldRegenPercentage);
          updatedVindicator.currentShield = Math.min(updatedVindicator.maxShield, updatedVindicator.currentShield + shieldToRegen);
        }
      }

      const updatedActiveBattle = {
        ...activeBattle,
        enemyCurrentShield: finalEnemyStatus.newShield,
        enemyCurrentHealth: finalEnemyStatus.newHealth,
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
        // --- VICTORIA (TEMPORAL) ---
        // Simplemente actualiza el estado para reflejar la victoria, pero no avances.
        // El componente se encargará de despachar ADVANCE_TO_NEXT_BATTLE.
        return {
          ...state,
          vindicator: updatedVindicator,
          activeBattle: updatedActiveBattle,
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

    case 'ADVANCE_TO_NEXT_BATTLE': {
      if (!state.activeBattle) return state;

      const { activeBattle, vindicator } = state;
      const enemy = allDestinations[activeBattle.destinationIndex].battles[activeBattle.battleIndex];

      // --- Lógica de recompensas y avance ---
      const newBattlesCompleted = [...state.battleRoom.battlesCompleted];
      const currentWins = newBattlesCompleted[activeBattle.destinationIndex] || 0;
      newBattlesCompleted[activeBattle.destinationIndex] = currentWins + 1;

      const destination = allDestinations[activeBattle.destinationIndex];
      const nextBattleIndex = newBattlesCompleted[activeBattle.destinationIndex];

      const newBodegaResources = { ...vindicator.bodegaResources };
      const reward = enemy.reward;
      if (reward.aleacionReforzada) newBodegaResources.aleacionReforzada += reward.aleacionReforzada;
      if (reward.neuroChipCorrupto) newBodegaResources.neuroChipCorrupto += reward.neuroChipCorrupto;
      if (reward.matrizCristalina) newBodegaResources.matrizCristalina += reward.matrizCristalina;
      if (reward.IA_Fragmentada) newBodegaResources.IA_Fragmentada += reward.IA_Fragmentada;
      if (reward.planosMK2) newBodegaResources.planosMK2 += reward.planosMK2;
      if (reward.matrizDeManiobra) newBodegaResources.matrizDeManiobra += reward.matrizDeManiobra;
      if (reward.placasDeSigilo) newBodegaResources.placasDeSigilo += reward.placasDeSigilo;
      if (reward.planosDeInterceptor) newBodegaResources.planosDeInterceptor += reward.planosDeInterceptor;
      
      const newState = {
        ...state,
        resources: {
          ...state.resources,
          scrap: state.resources.scrap + (enemy.reward.scrap ?? 0),
        },
        vindicator: { 
          ...vindicator,
          bodegaResources: newBodegaResources,
        },
        blueprints: state.blueprints + (enemy.reward.blueprints ?? 0),
        battleRoom: {
          ...state.battleRoom,
          battlesCompleted: newBattlesCompleted,
        },
      };

      if (nextBattleIndex < destination.battles.length) {
        // Cargar siguiente enemigo
        const nextEnemy = destination.battles[nextBattleIndex];
        return {
          ...newState,
          battleCount: state.battleCount + 1, // Forzamos un re-renderizado de la escena de combate
          activeBattle: {
            ...activeBattle,
            battleIndex: nextBattleIndex,
            enemyName: nextEnemy.enemyName,
            enemyMaxHealth: nextEnemy.health,
            enemyCurrentHealth: nextEnemy.health,
            enemyMaxShield: nextEnemy.shield,
            enemyCurrentShield: nextEnemy.shield,
          },
        };
      } else {
        // Destino completado
        return {
          ...newState,
          currentScene: 'phase2Main',
          activeBattle: null,
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
        // Se elimina la restauración de vida y escudo para que se mantenga el estado actual.
      };
    }

    default:
      return state;
  }
};
