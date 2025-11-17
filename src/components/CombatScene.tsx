import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './CombatScene.css';
import { Bodega } from './Bodega';

const CombatScene: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { vindicator, activeBattle } = gameState;

  const [isAutoCombatActive, setIsAutoCombatActive] = useState(false);
  const [combatSpeed, setCombatSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  if (!activeBattle) {
    // Cuando la batalla termina (activeBattle es null), nos aseguramos de que el combate automático se detenga.
    if (isAutoCombatActive) {
      setIsAutoCombatActive(false);
    }
    return <div>Cargando batalla...</div>;
  }

  const speedIntervals = {
    slow: 2000,
    normal: 1000,
    fast: 500
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isAutoCombatActive) {
      interval = setInterval(() => {
        dispatch({ type: 'PLAYER_ATTACK' });
      }, speedIntervals[combatSpeed]);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoCombatActive, combatSpeed, dispatch]);

  const escapeCombat = () => {
    setIsAutoCombatActive(false);
    dispatch({ type: 'ESCAPE_COMBAT' });
  };


  return (
    <div className="combat-scene">
      {/* Status Indicator */}
      <div className="combat-status">
        <span className={`status-indicator ${isAutoCombatActive ? 'running' : 'paused'}`}>
          Estado: {isAutoCombatActive ? 'En combate' : 'Pausado'}
        </span>
      </div>

      {/* Header with Health Bars - Advance Wars Style */}
      <div className="combat-header">
        {/* Vindicator Header */}
        <div className="vindicator-header">
          <div className="unit-name vindicator-name">VINDICATOR</div>
          <div className="health-display">
            <span className="health-label">VIDA:</span>
            <div className="health-bar-container">
              <div
                className="health-fill vindicator-health"
                style={{ width: `${(vindicator.currentHealth / vindicator.maxHealth) * 100}%` }}
              ></div>
            </div>
            <span className="health-value">
              {Math.round(vindicator.currentHealth)} / {Math.round(vindicator.maxHealth)}
            </span>
          </div>
          <div className="health-display">
            <span className="health-label">ESCUDO:</span>
            <div className="health-bar-container">
              <div
                className="shield-fill"
                style={{ width: `${(vindicator.currentShield / vindicator.maxShield) * 100}%` }}
              ></div>
            </div>
            <span className="health-value">
              {Math.round(vindicator.currentShield)} / {Math.round(vindicator.maxShield)}
            </span>
          </div>
        </div>

        {/* VS Separator */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#ecc94b',
          textShadow: '2px 2px 0px #000'
        }}>
          VS
        </div>

        {/* Enemy Header */}
        <div className="enemy-header">
          <div className="unit-name enemy-name">{activeBattle.enemyName.toUpperCase()}</div>
          <div className="health-display">
            <span className="health-label">VIDA:</span>
            <div className="health-bar-container">
              <div
                className="health-fill enemy-health"
                style={{ width: `${(activeBattle.enemyCurrentHealth / activeBattle.enemyMaxHealth) * 100}%` }}
              ></div>
            </div>
            <span className="health-value">
              {Math.round(activeBattle.enemyCurrentHealth)} / {Math.round(activeBattle.enemyMaxHealth)}
            </span>
          </div>
          <div className="health-display">
            <span className="health-label">ESCUDO:</span>
            <div className="health-bar-container">
              <div
                className="shield-fill"
                style={{ width: `${(activeBattle.enemyCurrentShield / activeBattle.enemyMaxShield) * 100}%` }}
              ></div>
            </div>
            <span className="health-value">
              {Math.round(activeBattle.enemyCurrentShield)} / {Math.round(activeBattle.enemyMaxShield)}
            </span>
          </div>
        </div>
      </div>

      {/* Combat Area - Split Screen */}
      <div className="combat-area">
        {/* Vindicator Side */}
        <div className="combatant vindicator-combatant">
          <div className="unit-sprite">🚀</div>
          <div className="unit-stats">
            <div className="stat-item">DAÑO: {vindicator.damage}</div>
            <div className="stat-item">TIPO: ASALTO</div>
            <div className="stat-item">MOV: 6</div>
            <div className="stat-item">RANGO: 1-2</div>
          </div>
        </div>

        {/* Enemy Side */}
        <div className="combatant enemy-combatant">
          <div className="unit-sprite">👾</div>
          <div className="unit-stats">
            <div className="stat-item">DAÑO: {activeBattle.enemyCurrentHealth > 0 ? '???' : '0'}</div>
            <div className="stat-item">TIPO: ENEMIGO</div>
            <div className="stat-item">MOV: 4</div>
            <div className="stat-item">RANGO: 1</div>
          </div>
        </div>
      </div>

      {/* Central Combat Controls */}
      <div className="combat-controls-center">
        {!isAutoCombatActive ? (
          <button className="central-action-button" onClick={() => setIsAutoCombatActive(true)}>
            ▶️ INICIAR COMBATE AUTOMÁTICO
          </button>
        ) : (
          <button className="central-action-button" onClick={() => setIsAutoCombatActive(false)}>
            ⏸️ PAUSAR COMBATE
          </button>
        )}

        <div className="speed-controls-center">
          <label>Velocidad:</label>
          <select
            value={combatSpeed}
            onChange={(e) => setCombatSpeed(e.target.value as 'slow' | 'normal' | 'fast')}
            disabled={isAutoCombatActive}
          >
            <option value="slow">Lenta</option>
            <option value="normal">Normal</option>
            <option value="fast">Rápida</option>
          </select>
        </div>

        <div className="secondary-actions">
          <button 
            className="secondary-button escape-button" 
            onClick={escapeCombat} 
            disabled={isAutoCombatActive}
          >
            🏃 Escapar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombatScene;
