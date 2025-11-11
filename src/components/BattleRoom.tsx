import React from 'react';
import { useGame } from '../context/GameContext';
import { gameChapters } from '../data/battleData'; // Cambiado
import './BattleRoom.css';
import { formatNumber } from '../utils/formatNumber';

interface BattleRoomProps {
  onClose: () => void;
}

const BattleRoom: React.FC<BattleRoomProps> = ({ onClose }) => {
  const { gameState, dispatch } = useGame();
  const { battleRoom } = gameState;

  // --- NUEVA LÓGICA DE SELECCIÓN DE CAPÍTULO ---
  const handleSelectChapter = (chapterIndex: number) => {
    dispatch({ type: 'SELECT_CHAPTER', payload: chapterIndex });
  };

  const handleBackToChapters = () => {
    dispatch({ type: 'BACK_TO_CHAPTER_SELECT' });
  };
  
  const handleSelectDestination = (destinationIndex: number) => {
    dispatch({ type: 'SELECT_BATTLE_DESTINATION', payload: destinationIndex });
  };

  const handleStartBattle = () => {
    dispatch({ type: 'START_BATTLE' });
  };

  // --- VISTA DE SELECCIÓN DE CAPÍTULOS ---
  const renderChapterSelection = () => (
    <div className="chapter-selection">
      <h3>Selecciona un Capítulo</h3>
      <div className="chapter-list">
        {gameChapters.map((chapter, index) => {
          // Lógica de desbloqueo de capítulos (temporalmente desactivada para pruebas)
          const isLocked = false;
          /*
          const bossDestination = gameChapters[0].destinations.find(d => d.isBoss);
          const bossDestinationIndex = bossDestination ? gameChapters[0].destinations.indexOf(bossDestination) : -1;
          
          let isLocked = false;
          if (index > 0) { // Si no es el primer capítulo
            if (bossDestinationIndex !== -1) {
              const bossBattlesCompleted = gameState.battleRoom.battlesCompleted[bossDestinationIndex] || 0;
              const totalBossBattles = bossDestination?.battles.length || 0;
              if (bossBattlesCompleted < totalBossBattles) {
                isLocked = true;
              }
            } else {
              isLocked = true; // Si no hay jefe en el cap 1, los siguientes están bloqueados
            }
          }
          */

          const chapterProgress = chapter.destinations.reduce((acc, _, destIndex) => {
            return acc + (gameState.battleRoom.battlesCompleted[destIndex] || 0);
          }, 0);
          const totalBattlesInChapter = chapter.destinations.reduce((acc, dest) => acc + dest.battles.length, 0);

          return (
            <button
              key={chapter.name}
              className={`chapter-button ${isLocked ? 'locked' : ''}`}
              onClick={() => !isLocked && handleSelectChapter(index)}
              disabled={isLocked}
            >
              <span className="chapter-title">{chapter.name}</span>
              {!isLocked && totalBattlesInChapter > 0 && (
                 <span className="chapter-progress">Progreso: {Math.floor((chapterProgress / totalBattlesInChapter) * 100)}%</span>
              )}
               {!isLocked && totalBattlesInChapter === 0 && (
                 <span className="chapter-progress">(Próximamente)</span>
              )}
              {isLocked && <span className="lock-icon">🔒 Requiere completar el Capítulo 1</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  // --- VISTA DE DESTINOS DE UN CAPÍTULO ---
  const renderDestinationSelection = () => {
    if (battleRoom.selectedChapterIndex === null) return null;
    
    const chapter = gameChapters[battleRoom.selectedChapterIndex];
    const selectedDestinationIndex = battleRoom.selectedDestination;

    return (
      <div className="battle-room-content">
        <div className="destination-list-header">
           <button onClick={handleBackToChapters} className="back-button">‹ Volver a Capítulos</button>
        </div>
        <div className="destination-list">
          {chapter.destinations.map((dest, index) => {
            const battlesCompleted = gameState.battleRoom.battlesCompleted[index] || 0;
            const totalBattles = dest.battles.length;
            const isCompleted = battlesCompleted >= totalBattles;
            
            let isLocked = false;
            if (index > 0) {
              const prevDestination = chapter.destinations[index - 1];
              const prevBattlesCompleted = gameState.battleRoom.battlesCompleted[index - 1] || 0;
              
              if (prevBattlesCompleted < prevDestination.battles.length) {
                isLocked = true;
              }
            }
            
            // Lógica específica para el jefe final (índice 5)
            if (dest.isBoss && index === 5) {
              const allPreviousCompleted = chapter.destinations
                .slice(0, 5)
                .every((prevDest, prevIndex) => {
                  const prevBattlesDone = gameState.battleRoom.battlesCompleted[prevIndex] || 0;
                  return prevBattlesDone >= prevDest.battles.length;
                });
              if (!allPreviousCompleted) {
                isLocked = true;
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
              const destination = chapter.destinations[selectedDestinationIndex];
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
                        <h4>🎉 ¡Has completado {chapter.name}!</h4>
                        <p>Recompensas desbloqueadas:</p>
                        <ul>
                          <li>Siguiente Capítulo</li>
                        </ul>
                      </div>
                    )}
                  </>
                );
              }

              const nextBattle = destination.battles[battlesCompleted];

              // Diccionario de metadatos de recompensas
              const rewardMetadata: { [key: string]: { name: string; icon: string } } = {
                scrap: { name: 'Chatarra', icon: '💰' },
                aleacionReforzada: { name: 'Aleación Reforzada', icon: '🛡️' },
                neuroChipCorrupto: { name: 'Neuro-Chip Corrupto', icon: '🧠' },
                matrizCristalina: { name: 'Matriz Cristalina', icon: '💎' },
                IA_Fragmentada: { name: 'IA Fragmentada', icon: '💾' },
                planosMK2: { name: 'Planos MK2', icon: '📜' },
                blueprints: { name: 'Planos', icon: ' blueprint-icon-class' }, // Puedes usar una clase para un icono de imagen
              };

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
                    
                    <div className="battle-rewards">
                      <h5>🎁 Recompensas de Victoria:</h5>
                      <div className="rewards-list">
                        {Object.entries(nextBattle.reward).map(([key, value]) => {
                          if (!value || value <= 0) return null;
                          const meta = rewardMetadata[key];
                          if (!meta) return null;

                          return (
                            <div className="reward-item" key={key}>
                              <span className="reward-icon">{meta.icon}</span>
                              <span className="reward-amount">{formatNumber(value)}</span>
                              <span className="reward-name">{meta.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="fuel-cost">
                      <span className="fuel-icon">⛽</span>
                      Coste: 1 Barra de Combustible
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
    );
  };

  return (
    <div className="battle-view">
      <div className="battle-view-header">
        <h2>SALA DE BATALLA</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>
      
      {battleRoom.selectedChapterIndex !== null && (
        <h3 className="battle-view-subtitle">
          {gameChapters[battleRoom.selectedChapterIndex].name}
        </h3>
      )}
      
      {battleRoom.selectedChapterIndex === null 
        ? renderChapterSelection() 
        : renderDestinationSelection()
      }
    </div>
  );
};

export default BattleRoom;