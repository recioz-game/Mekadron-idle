import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { gameChapters } from '../data/battleData'; // Cambiado
import { resourceMetadata as rewardMetadata } from '../data/resourceMetadata';
import './BattleRoom.css';
import { formatNumber } from '../utils/formatNumber';
import chapter1Image from '../assets/images/chapters/chapters_cap_1.png';
import chapter2Image from '../assets/images/chapters/chapters_cap_2.png';
import chapter3Image from '../assets/images/chapters/chapters_cap_3.png';
import chapter4Image from '../assets/images/chapters/chapters_cap_4.png';
import chapter5Image from '../assets/images/chapters/chapters_cap_5.png';
import fuelRodIcon from '../assets/images/ui/fuel-rod-icon.png';
import navArrowLeft from '../assets/images/ui/buttons/nav-arrow-left.png';
import navArrowRight from '../assets/images/ui/buttons/nav-arrow-right.png';
import enterButton from '../assets/images/ui/buttons/enter-button.png';

interface BattleRoomProps {
  onClose: () => void;
}

const BattleRoom: React.FC<BattleRoomProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { gameState, dispatch } = useGame();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);
  const { battleRoom } = gameState;

  // --- NUEVA LÓGICA DE SELECCIÓN DE CAPÍTULO ---
  const [currentChapterIndex, setCurrentChapterIndex] = React.useState(0);

  const chapterImages = [
  chapter1Image, // Cap 1
  chapter2Image, // Cap 2
  chapter3Image, // Cap 3
  chapter4Image, // Cap 4
  chapter5Image, // Cap 5
  chapter1Image, // Cap 6 (Difícil 1)
  chapter2Image, // Cap 7 (Difícil 2)
  chapter3Image, // Cap 8 (Difícil 3)
  chapter4Image, // Cap 9 (Difícil 4)
  chapter5Image, // Cap 10 (Difícil 5)
];

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
    dispatch({ 
      type: 'SELECT_BATTLE_DESTINATION', 
      payload: { 
        chapterIndex: gameState.battleRoom.selectedChapterIndex!, 
        destinationIndex 
      } 
    });
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
        <button onClick={handlePrevChapter} className="nav-arrow prev-arrow"><img src={navArrowLeft} alt="Anterior" /></button>
        <div className={`chapter-card ${isLocked ? 'locked' : ''}`}>
        <div className="chapter-card-content">
          <h3 className="chapter-card-title">{chapter.name}</h3>
          <div className="chapter-card-body">
            <img src={chapterImages[currentChapterIndex] || 'https://via.placeholder.com/200'} alt={chapter.name} className="chapter-image" />
            <p className="chapter-card-lore">{chapter.lore}</p>
          </div>
          <div className="chapter-card-footer">
            {isLocked ? (
              <p className="chapter-locked-text">Bloqueado</p>
            ) : (
              <button onClick={handleSelectChapter} className="select-chapter-button">
                <img src={enterButton} alt="Entrar" />
              </button>
            )}
          </div>
        </div>
      </div>
        <button onClick={handleNextChapter} className="nav-arrow next-arrow"><img src={navArrowRight} alt="Siguiente" /></button>
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
            
            let isLocked = false;
            if (index > 0) {
              const prevDestination = chapter.destinations[index - 1];
              const prevBattlesCompleted = gameState.battleRoom.battlesCompleted[index - 1] || 0;
              
              if (prevBattlesCompleted < prevDestination.battles.length) {
                isLocked = true;
              }
            }
            
            // Lógica específica para el jefe final (índice 5)
            if (dest.isBoss && index === 5) { // Assuming index 5 is always the boss based on the current data structure
              const allPreviousCompleted = chapter.destinations
                .slice(0, 5) // Check completion for destinations from index 0 to 4 (i.e., the first 5 destinations)
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
                const totalRewards = destination.battles.reduce((acc, battle) => {
                  for (const [resource, amount] of Object.entries(battle.reward)) {
                    if (amount && amount > 0) {
                      acc[resource] = (acc[resource] || 0) + amount;
                    }
                  }
                  return acc;
                }, {} as { [key: string]: number });

                return (
                  <>
                    <h3 className={destination.isBoss ? 'boss-title' : ''}>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <p className="completed-message">
                      {destination.isBoss ? '¡Jefe final derrotado! Capítulo completado.' : '¡Destino completado!'}
                    </p>
                    {destination.isBoss ? (
                      <div className="chapter-rewards">
                        <h4>🎉 ¡Has completado {chapter.name}!</h4>
                        <p>Recompensas desbloqueadas:</p>
                        <ul>
                          <li>Siguiente Capítulo</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="battle-rewards">
                        <h5>Recompensas Totales de la Zona:</h5>
                        <div className="rewards-list">
                          {Object.entries(totalRewards).map(([resource, amount]) => {
                            const meta = rewardMetadata[resource as keyof typeof rewardMetadata];
                            if (!meta) return null;
                            return (
                              <div className="reward-item" key={resource}>
                                <span className="reward-icon">
                                  <img src={meta.icon} alt={meta.name} style={{ width: '32px', height: '32px' }} />
                                </span>
                                <span className="reward-amount">{formatNumber(amount, gameState.settings.numberFormat)}</span>
                                <span className="reward-name">{meta.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                );
              }

              const nextBattle = destination.battles[battlesCompleted];

              // Sumar las barras de combustible de ambas fuentes para evitar problemas de estado inconsistente
              const totalFuelRods = (gameState.resources.barraCombustible || 0) + (gameState.vindicator.bodegaResources.barraCombustible || 0);
              const canAffordFuel = totalFuelRods >= 1;

              return (
                <>
                  <h3 className={destination.isBoss ? 'boss-title' : ''}>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <div className="next-battle-info">
                    <h4>Próxima Batalla: {nextBattle.enemyName}</h4>
                    
                    <div className="battle-rewards">
                      <h5>Recompensas de Victoria:</h5>
                      <div className="rewards-list">
                        {Object.entries(nextBattle.reward).map(([key, value]) => {
                          if (!value || value <= 0) return null;
                          const meta = rewardMetadata[key];
                          if (!meta) return null;

                          return (
                            <div className="reward-item" key={key}>
                              <span className="reward-icon">
                                <img src={meta.icon} alt={meta.name} style={{ width: '32px', height: '32px' }} />
                              </span>
                              <span className="reward-amount">{formatNumber(value, gameState.settings.numberFormat)}</span>
                              <span className="reward-name">{meta.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="fuel-cost">
                      <img src={fuelRodIcon} alt="Barra de Combustible" className="fuel-icon" style={{ width: '32px', height: '32px' }} />
                      Coste: 1 Barra de Combustible
                    </div>
                    
                    <div className="battle-warning">
                      <p>⚠️ Advertencia: El Vindicator mantendrá el daño entre batallas.</p>
                      <p>Si pierdes, el progreso de este destino se reiniciará.</p>
                    </div>
                    
                    <button 
                      className={`start-battle-btn ${destination.isBoss ? 'boss-battle-btn' : ''}`} 
                      onClick={handleStartBattle}
                      disabled={!canAffordFuel}
                    >
                      {destination.isBoss ? '🔥 ' : ''}
                      Iniciar Combate {battlesCompleted > 0 ? `(${battlesCompleted + 1}/${totalBattles})` : ''}
                      {destination.isBoss ? ' 🔥' : ''}
                    </button>
                    {!canAffordFuel && (
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
    <div className={`battle-view ${gameState.settings.uiAnimationsEnabled ? 'view-fade-in' : ''} ${isVisible ? 'visible' : ''}`}>
      <div className="battle-view-header">
        <h2></h2>
        <button onClick={onClose} className="view-close-button red">×</button>
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