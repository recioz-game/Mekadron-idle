import React from 'react';
import { useGame } from '../context/GameContext';
import { battleDestinations } from '../data/battleData';
import './BattleRoom.css';
import { formatNumber } from '../utils/formatNumber';

interface BattleRoomProps {
  onClose: () => void;
}

const BattleRoom: React.FC<BattleRoomProps> = ({ onClose }) => {
  const { gameState, dispatch } = useGame();

  const handleSelectDestination = (index: number) => {
    dispatch({ type: 'SELECT_BATTLE_DESTINATION', payload: index });
  };

  const handleStartBattle = () => {
    dispatch({ type: 'START_BATTLE' });
  };

  const selectedDestinationIndex = gameState.battleRoom.selectedDestination;

  return (
    <div className="battle-view">
      <div className="battle-view-header">
        <h2>⚔️ SALA DE BATALLA</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>

      {/* Estado del Vindicator */}
      <div className="vindicator-status">
        <h3>Estado del Vindicator</h3>
        <div className="status-bars">
          <div className="status-bar">
            <span>Vida: {Math.round(gameState.vindicator.currentHealth)} / {Math.round(gameState.vindicator.maxHealth)}</span>
            <div className="bar-container">
              <div 
                className="health-fill" 
                style={{ width: `${(gameState.vindicator.currentHealth / gameState.vindicator.maxHealth) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="status-bar">
            <span>Escudo: {Math.round(gameState.vindicator.currentShield)} / {Math.round(gameState.vindicator.maxShield)}</span>
            <div className="bar-container">
              <div 
                className="shield-fill" 
                style={{ width: `${(gameState.vindicator.currentShield / gameState.vindicator.maxShield) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="vindicator-stats">
          <span>Daño: {gameState.vindicator.damage}</span>
        </div>
      </div>

      <div className="battle-room-content">
        <div className="destination-list">
          {battleDestinations.map((dest, index) => {
            const battlesCompleted = gameState.battleRoom.battlesCompleted[index] || 0;
            const totalBattles = dest.battles.length;
            const isCompleted = battlesCompleted >= totalBattles;
            
            // Lógica de Desbloqueo
            let isLocked = false;
            if (index > 0) {
              const prevDestination = battleDestinations[index - 1];
              const prevBattlesCompleted = gameState.battleRoom.battlesCompleted[index - 1] || 0;
              if (prevBattlesCompleted < prevDestination.battles.length) {
                isLocked = true;
              }
            }

            return (
              <button
                key={dest.name}
                onClick={() => handleSelectDestination(index)}
                disabled={isLocked}
                className={`destination-list-item ${selectedDestinationIndex === index ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
              >
                {isLocked && <span className="lock-icon">🔒</span>}
                {dest.name}
                {!isLocked && (
                  <span className="battle-progress">
                    Progreso: {battlesCompleted} / {totalBattles}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="destination-details">
          {selectedDestinationIndex !== null ? (
            (() => {
              const destination = battleDestinations[selectedDestinationIndex];
              const battlesCompleted = gameState.battleRoom.battlesCompleted[selectedDestinationIndex] || 0;
              const totalBattles = destination.battles.length;

              if (battlesCompleted >= totalBattles) {
                return (
                  <>
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <p className="completed-message">¡Destino completado!</p>
                  </>
                );
              }

              const nextBattle = destination.battles[battlesCompleted];
              return (
                <>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <div className="next-battle-info">
                    <h4>Próxima Batalla: {nextBattle.enemyName}</h4>
                    <div className="enemy-stats">
                      <p>Vida: {formatNumber(nextBattle.health)}</p>
                      <p>Escudo: {formatNumber(nextBattle.shield)}</p>
                      <p>Daño: {formatNumber(nextBattle.damage)}</p>
                    </div>
                    <p>Recompensa: {formatNumber(nextBattle.reward.scrap)} Chatarra</p>
                    
                    <div className="battle-warning">
                      <p>⚠️ Advertencia: El Vindicator mantendrá el daño entre batallas.</p>
                      <p>Si pierdes, el progreso de este destino se reiniciará.</p>
                    </div>
                    
                    <button className="start-battle-btn" onClick={handleStartBattle}>
                      Iniciar Combate {battlesCompleted > 0 ? `(${battlesCompleted + 1}/${totalBattles})` : ''}
                    </button>
                  </div>
                </>
              );
            })()
          ) : (
            <p>Selecciona un destino para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleRoom;