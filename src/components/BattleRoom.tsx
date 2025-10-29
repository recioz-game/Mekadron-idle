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
        <h2>⚔️ SALA DE BATALLA - Capítulo 1</h2>
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
            const battlesCompleted = gameState.battleRoom.battlesCompleted[index || 0];
            const totalBattles = dest.battles.length;
            const isCompleted = battlesCompleted >= totalBattles;
            
            // Lógica de Desbloqueo mejorada para 6 destinos
            let isLocked = false;
            if (index > 0) {
              const prevDestination = battleDestinations[index - 1];
              const prevBattlesCompleted = gameState.battleRoom.battlesCompleted[index - 1 || 0];
              
              // Para destinos normales (no jefes), requieren completar el anterior
              if (!dest.isBoss && prevBattlesCompleted < prevDestination.battles.length) {
                isLocked = true;
              }
              
              // Para el jefe final (índice 5), requiere completar todos los destinos anteriores
              if (dest.isBoss && index === 5) {
                const allPreviousCompleted = battleDestinations
                  .slice(0, 5)
                  .every((prevDest, prevIndex) => {
                    const prevBattlesDone = gameState.battleRoom.battlesCompleted[prevIndex] || 0;
                    return prevBattlesDone >= prevDest.battles.length;
                  });
                if (!allPreviousCompleted) {
                  isLocked = true;
                }
              }
            }

            return (
              <button
                key={dest.name}
                onClick={() => handleSelectDestination(index)}
                disabled={isLocked}
                className={`destination-list-item ${selectedDestinationIndex === index ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''} ${dest.isBoss ? 'boss-destination' : ''}`}
              >
                {isLocked && <span className="lock-icon">🔒</span>}
                {dest.isBoss && <span className="boss-icon">👑</span>}
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
                    <h3 className={destination.isBoss ? 'boss-title' : ''}>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <p className="completed-message">
                      {destination.isBoss ? '¡Jefe final derrotado! Capítulo completado.' : '¡Destino completado!'}
                    </p>
                    {destination.isBoss && (
                      <div className="chapter-rewards">
                        <h4>🎉 ¡Has completado el Capítulo 1!</h4>
                        <p>Recompensas desbloqueadas:</p>
                        <ul>
                          <li>Vindicator Mk.II disponible</li>
                          <li>Tecnología Avanzada x1</li>
                          <li>Núcleo de Singularidad x5</li>
                        </ul>
                      </div>
                    )}
                  </>
                );
              }

              const nextBattle = destination.battles[battlesCompleted];
              return (
                <>
                  <h3 className={destination.isBoss ? 'boss-title' : ''}>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <div className="next-battle-info">
                    <h4>Próxima Batalla: {nextBattle.enemyName}</h4>
                    <div className="enemy-stats">
                      <p>Vida: {formatNumber(nextBattle.health)}</p>
                      <p>Escudo: {formatNumber(nextBattle.shield)}</p>
                      <p>Daño: {formatNumber(nextBattle.damage)}</p>
                    </div>
                    <p>Recompensa: {formatNumber(nextBattle.reward.scrap)} Chatarra</p>
                    
                    <div className="fuel-cost">
                      Coste: 1 ⛽ Barra de Combustible
                    </div>
                    
                    <div className="battle-warning">
                      <p>⚠️ Advertencia: El Vindicator mantendrá el daño entre batallas.</p>
                      <p>Si pierdes, el progreso de este destino se reiniciará.</p>
                    </div>
                    
                    <button 
                      className={`start-battle-btn ${destination.isBoss ? 'boss-battle-btn' : ''}`} 
                      onClick={handleStartBattle}
                      disabled={gameState.resources.barraCombustible < 1}
                    >
                      {destination.isBoss ? '🔥 ' : ''}
                      Iniciar Combate {battlesCompleted > 0 ? `(${battlesCompleted + 1}/${totalBattles})` : ''}
                      {destination.isBoss ? ' 🔥' : ''}
                    </button>
                    {gameState.resources.barraCombustible < 1 && (
                      <p className="fuel-warning">No tienes suficiente combustible. Fabrica más en la Fundición.</p>
                    )}
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