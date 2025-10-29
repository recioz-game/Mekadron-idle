import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import './CombatScene.css';

const CombatScene: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { vindicator, activeBattle } = gameState;

  const [combatState, setCombatState] = useState<'idle' | 'running' | 'paused' | 'finished'>('idle');
  const [combatSpeed, setCombatSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [combatLog, setCombatLog] = useState<string[]>([]);
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

  const addToCombatLog = useCallback((message: string) => {
    setCombatLog(prev => [...prev.slice(-9), message]); // Mantener solo los últimos 10 mensajes
  }, []);

  // NOTA: Se eliminó la dependencia de 'combatState' para evitar "stale closures".
  // La existencia del intervalo es la única condición necesaria para atacar.
  const executeCombatTurn = useCallback(() => {
    dispatch({ type: 'PLAYER_ATTACK' });
  }, [dispatch]);

  const startAutoCombat = () => {
    setCombatState('running');
    addToCombatLog('⚔️ Combate automático iniciado');

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
    addToCombatLog('⏸️ Combate pausado');
  };

  const resumeAutoCombat = () => {
    setCombatState('running');
    addToCombatLog('▶️ Combate reanudado');

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
    addToCombatLog('⏹️ Combate detenido');
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
      addToCombatLog('🏁 Batalla finalizada');
    }
  }, [activeBattle, combatState, stopAutoCombat, addToCombatLog]);

  return (
    <div className="combat-scene">
      {/* Controles de Combate */}
      <div className="combat-controls">
        <div className="speed-controls">
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

        <div className="action-buttons">
          {combatState === 'idle' && (
            <button className="start-button" onClick={startAutoCombat}>
              🚀 INICIAR COMBATE AUTOMÁTICO
            </button>
          )}

          {combatState === 'running' && (
            <button className="pause-button" onClick={pauseAutoCombat}>
              ⏸️ PAUSAR
            </button>
          )}

          {combatState === 'paused' && (
            <>
              <button className="resume-button" onClick={resumeAutoCombat}>
                ▶️ REANUDAR
              </button>
              <button className="stop-button" onClick={stopAutoCombat}>
                ⏹️ DETENER
              </button>
            </>
          )}

          <button className="escape-button" onClick={escapeCombat} disabled={combatState === 'running'}>
            🏃 ESCAPAR
          </button>
        </div>
      </div>

      {/* Estado del Combate */}
      <div className="combat-status">
        <span className={`status-indicator ${combatState}`}>
          Estado: {
            combatState === 'idle' ? 'Listo' :
            combatState === 'running' ? 'En combate' :
            combatState === 'paused' ? 'Pausado' : 'Finalizado'
          }
        </span>
      </div>

      {/* Enemigo Arriba */}
      <div className="combatant enemy">
        <h2>{activeBattle.enemyName}</h2>
        <div className="health-bars">
          <div className="health-bar">
            <span>Vida: {Math.round(activeBattle.enemyCurrentHealth)} / {Math.round(activeBattle.enemyMaxHealth)}</span>
            <div className="bar-container">
              <div
                className="health-fill"
                style={{ width: `${(activeBattle.enemyCurrentHealth / activeBattle.enemyMaxHealth) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="shield-bar">
            <span>Escudo: {Math.round(activeBattle.enemyCurrentShield)} / {Math.round(activeBattle.enemyMaxShield)}</span>
            <div className="bar-container">
              <div
                className="shield-fill"
                style={{ width: `${(activeBattle.enemyCurrentShield / activeBattle.enemyMaxShield) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Registro de Combate */}
      <div className="combat-log">
        <h3>📜 Registro de Combate</h3>
        <div className="log-entries">
          {combatLog.map((entry, index) => (
            <div key={index} className="log-entry">{entry}</div>
          ))}
        </div>
      </div>

      {/* Vindicator Abajo */}
      <div className="combatant vindicator">
        <h2>Vindicator</h2>
        <div className="health-bars">
          <div className="health-bar">
            <span>Vida: {Math.round(vindicator.currentHealth)} / {Math.round(vindicator.maxHealth)}</span>
            <div className="bar-container">
              <div
                className="health-fill"
                style={{ width: `${(vindicator.currentHealth / vindicator.maxHealth) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="shield-bar">
            <span>Escudo: {Math.round(vindicator.currentShield)} / {Math.round(vindicator.maxShield)}</span>
            <div className="bar-container">
              <div
                className="shield-fill"
                style={{ width: `${(vindicator.currentShield / vindicator.maxShield) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatScene;
