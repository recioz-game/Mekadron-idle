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
  const [currentChapterIndex, setCurrentChapterIndex] = React.useState(0);

  const handleNextChapter = () => {
    setCurrentChapterIndex((prevIndex) => (prevIndex + 1) % gameChapters.length);
  };

  const handlePrevChapter = () => {
    setCurrentChapterIndex((prevIndex) => (prevIndex - 1 + gameChapters.length) % gameChapters.length);
  };

  const handleSelectChapter = () => {
    dispatch({ type: 'SELECT_CHAPTER', payload: currentChapterIndex });
  };
  
  const handleSelectDestination = (destinationIndex: number) => {
    dispatch({ type: 'SELECT_BATTLE_DESTINATION', payload: destinationIndex });
  };


  const handleStartBattle = () => {
    dispatch({ type: 'START_BATTLE' });
  };

  // --- VISTA DE SELECCIÓN DE CAPÍTULOS ---
  const renderChapterSelection = () => {
    const chapter = gameChapters[currentChapterIndex];
    // Aquí puedes agregar la lógica para deshabilitar botones si el capítulo está bloqueado
    const isLocked = false; 

    return (
      <div className="chapter-carousel">
        <button onClick={handlePrevChapter} className="nav-arrow prev-arrow">◀</button>
        <div className={`chapter-card ${isLocked ? 'locked' : ''}`}>
          {/* Aquí iría la imagen del capítulo */}
          {/* <img src={chapter.imageUrl} alt={chapter.name} className="chapter-image" /> */}
          <div className="chapter-card-content">
            <h3 className="chapter-card-title">{chapter.name}</h3>
            <p className="chapter-card-lore">{chapter.lore}</p>
            {isLocked ? (
              <p className="chapter-locked-text">Bloqueado</p>
            ) : (
              <button onClick={handleSelectChapter} className="select-chapter-button">
                Entrar
              </button>
            )}
          </div>
        </div>
        <button onClick={handleNextChapter} className="nav-arrow next-arrow">▶</button>
      </div>
  );
  };

  // --- VISTA DE DESTINOS DE UN CAPÍTULO ---
  const renderDestinationSelection = () => {
    if (battleRoom.selectedChapterIndex === null) return null;
    
    const chapter = gameChapters[battleRoom.selectedChapterIndex];
    const selectedDestinationIndex = battleRoom.selectedDestination;

    return (
      <div className="battle-room-content">
        <div className="destination-list-header">
        </div>
        <div className="destination-list">
          {chapter.destinations.map((dest, index) => {
            const battlesCompleted = gameState.battleRoom.battlesCompleted[index] || 0;
            const totalBattles = dest.battles.length;
            const isCompleted = totalBattles > 0 && battlesCompleted >= totalBattles;
            
            // Lógica de bloqueo de destinos desactivada para pruebas
            let isLocked = false;
            /*
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
            */

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
                      disabled={gameState.vindicator.bodegaResources.barraCombustible < 1}
                    >
                      {destination.isBoss ? '🔥 ' : ''}
                      Iniciar Combate {battlesCompleted > 0 ? `(${battlesCompleted + 1}/${totalBattles})` : ''}
                      {destination.isBoss ? ' 🔥' : ''}
                    </button>
                    {gameState.vindicator.bodegaResources.barraCombustible < 1 && (
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
        <div className="chapter-header">
          <button onClick={() => dispatch({ type: 'BACK_TO_CHAPTER_SELECT' })} className="back-button">‹ Volver</button>
          <h3 className="battle-view-subtitle">
            {gameChapters[battleRoom.selectedChapterIndex].name}
          </h3>
        </div>
      )}
      
      {battleRoom.selectedChapterIndex === null 
        ? renderChapterSelection() 
        : renderDestinationSelection()
      }
    </div>
  );
};

export default BattleRoom;