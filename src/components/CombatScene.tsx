import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import './CombatScene.css';

const CombatScene: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { vindicator, activeBattle } = gameState;

  const [combatState, setCombatState] = useState<'idle' | 'running' | 'paused' | 'finished'>('idle');
  const [combatSpeed, setCombatSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [autoCombatInterval, setAutoCombatInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  if (!activeBattle) {
    return <div>Cargando batalla...</div>;
  }

  // Velocidades de combate (milisegundos entre turnos)
  const speedIntervals = {
    slow: 2000,
    normal: 1000,
    fast: 500
  };

  const executeCombatTurn = useCallback(() => {
    dispatch({ type: 'PLAYER_ATTACK' });
  }, [dispatch]);

  const startAutoCombat = () => {
    setCombatState('running');

    const interval = setInterval(() => {
      executeCombatTurn();
    }, speedIntervals[combatSpeed]);

    setAutoCombatInterval(interval);
  };

  const pauseAutoCombat = () => {
    setCombatState('paused');
    if (autoCombatInterval) {
      clearInterval(autoCombatInterval);
      setAutoCombatInterval(null);
    }
  };

  const resumeAutoCombat = () => {
    setCombatState('running');

    const interval = setInterval(() => {
      executeCombatTurn();
    }, speedIntervals[combatSpeed]);

    setAutoCombatInterval(interval);
  };

  const stopAutoCombat = () => {
    setCombatState('finished');
    if (autoCombatInterval) {
      clearInterval(autoCombatInterval);
      setAutoCombatInterval(null);
    }
  };

  const escapeCombat = () => {
    stopAutoCombat();
    dispatch({ type: 'ESCAPE_COMBAT' });
  };

  // Efecto para limpiar el intervalo al desmontar
  useEffect(() => {
    return () => {
      if (autoCombatInterval) {
        clearInterval(autoCombatInterval);
      }
    };
  }, [autoCombatInterval]);

  // Efecto para detectar fin de batalla
  useEffect(() => {
    if (!activeBattle && combatState === 'running') {
      stopAutoCombat();
    }
  }, [activeBattle, combatState, stopAutoCombat]);

  return (
    <div className="combat-scene">
      {/* Status Indicator */}
      <div className="combat-status">
        <span className={`status-indicator ${combatState}`}>
          Estado: {
            combatState === 'idle' ? 'Listo' :
            combatState === 'running' ? 'En combate' :
            combatState === 'paused' ? 'Pausado' : 'Finalizado'
          }
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
        {combatState === 'idle' && (
          <button className="central-action-button" onClick={startAutoCombat}>
            🚀 INICIAR COMBATE AUTOMÁTICO
          </button>
        )}

        {combatState === 'running' && (
          <button className="central-action-button" onClick={pauseAutoCombat}>
            ⏸️ PAUSAR COMBATE
          </button>
        )}

        {combatState === 'paused' && (
          <button className="central-action-button" onClick={resumeAutoCombat}>
            ▶️ REANUDAR COMBATE
          </button>
        )}

        <div className="speed-controls-center">
          <label>Velocidad:</label>
          <select
            value={combatSpeed}
            onChange={(e) => setCombatSpeed(e.target.value as 'slow' | 'normal' | 'fast')}
            disabled={combatState === 'running'}
          >
            <option value="slow">Lenta</option>
            <option value="normal">Normal</option>
            <option value="fast">Rápida</option>
          </select>
        </div>

        <div className="secondary-actions">
          {(combatState === 'paused' || combatState === 'idle') && (
            <button className="secondary-button stop-button" onClick={stopAutoCombat}>
              ⏹️ Detener
            </button>
          )}
          <button 
            className="secondary-button escape-button" 
            onClick={escapeCombat} 
            disabled={combatState === 'running'}
          >
            🏃 Escapar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombatScene;
