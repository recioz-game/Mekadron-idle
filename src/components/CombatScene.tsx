import React from 'react';
import { useGame } from '../context/GameContext';
import './CombatScene.css';

const CombatScene: React.FC = () => {
  const { gameState, dispatch } = useGame(); // Necesitamos dispatch
  const { vindicator, activeBattle } = gameState;

  if (!activeBattle) {
    return <div>Cargando batalla...</div>;
  }

  const handleAttack = () => {
    dispatch({ type: 'PLAYER_ATTACK' });
  };

  return (
    <div className="combat-scene">
      {/* Enemigo Arriba */}
      <div className="combatant enemy">
        <h2>{activeBattle.enemyName}</h2>
        <p>Vida: {Math.round(activeBattle.enemyCurrentHealth)} / {Math.round(activeBattle.enemyMaxHealth)}</p>
        <p>Escudo: {Math.round(activeBattle.enemyCurrentShield)} / {Math.round(activeBattle.enemyMaxShield)}</p>
      </div>

      {/* Botón de Atacar en el Medio */}
      <button className="attack-button" onClick={handleAttack}>
        ATACAR
      </button>

      {/* Vindicator Abajo */}
      <div className="combatant vindicator">
        <h2>Vindicator</h2>
        <p>Vida: {Math.round(vindicator.currentHealth)} / {Math.round(vindicator.maxHealth)}</p>
        <p>Escudo: {Math.round(vindicator.currentShield)} / {Math.round(vindicator.maxShield)}</p>
      </div>
    </div>
  );
};

export default CombatScene;