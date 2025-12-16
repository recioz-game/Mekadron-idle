import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import './CombatScene.css';
import { enemyAssets, vindicatorAssets } from '../data/assetMap';
import UnitDisplay from './UnitDisplay';
import laserVindicatorSfx from '../assets/audio/sfx/Laser vindicator.ogg';
import laserEnemySfx from '../assets/audio/sfx/laser.mp3';

type AnimationPhase = 'idle' | 'playerAttack' | 'enemyDamage' | 'enemyAttack' | 'playerDamage' | 'victory' | 'defeat' | 'transition';

const CombatScene: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { vindicator, activeBattle, battleRoom } = gameState;

  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [playerShake, setPlayerShake] = useState(false);
  const [enemyShake, setEnemyShake] = useState(false);

  // Busca los assets del enemigo y del vindicator en el mapa
      const enemySprite = activeBattle ? enemyAssets[activeBattle.enemyName] : null;
    const vindicatorSprite = vindicatorAssets[vindicator.vindicatorType];
  
    useEffect(() => {
      if (activeBattle) {
        console.log('Active Battle Enemy Name:', activeBattle.enemyName);
        if (enemySprite) {
          console.log('Enemy Sprite Path:', enemySprite.idle);
        } else {
          console.log('Enemy Sprite is null or undefined.');
        }
      }
    }, [activeBattle, enemySprite]); // Log whenever activeBattle or enemySprite changes
    // Determina el fondo de combate dinámicamente
    const getBackgroundPath = () => {
      let path = '/src/assets/images/enemies/Capitulo 1/fondo combate 1.webp'; // Default fallback
      if (battleRoom.selectedChapterIndex !== null) {
        const chapterIndex = battleRoom.selectedChapterIndex;
        // Hay 5 fondos únicos (1-5). Los modos difíciles (índice 5+) los reutilizan.
        const backgroundChapterNumber = (chapterIndex % 5) + 1;
        path = `/src/assets/images/enemies/Capitulo ${backgroundChapterNumber}/fondo combate ${backgroundChapterNumber}.webp`;
      }
      // Usa new URL() para que Vite procese la ruta del asset
      return new URL(path, import.meta.url).href;
    };
    const backgroundPath = getBackgroundPath();

  const [audioVindicator] = useState(new Audio(laserVindicatorSfx));
  const [audioEnemy] = useState(new Audio(laserEnemySfx));

  useEffect(() => {
    const finalSfxVolume = (gameState.settings.masterVolume / 100) * (gameState.settings.sfxVolume / 100);
    audioVindicator.volume = finalSfxVolume;
    audioEnemy.volume = finalSfxVolume;
  }, [gameState.settings.masterVolume, gameState.settings.sfxVolume, audioVindicator, audioEnemy]);



  const runCombatTurn = useCallback(() => {
    if (animationPhase !== 'idle' || !activeBattle) return;
    setAnimationPhase('playerAttack');
  }, [animationPhase, activeBattle]);

  // Efecto principal que actúa como una máquina de estados para la animación.
  // Se dispara cada vez que cambia la fase de la animación o el estado de la batalla.
  useEffect(() => {
    if (!activeBattle) return;

    // Chequeos de victoria/derrota al inicio de cada evaluación
    if (activeBattle.enemyCurrentHealth <= 0) {
      if (animationPhase !== 'victory') setAnimationPhase('victory');
      return; // Detiene la secuencia
    }
    if (vindicator.currentHealth <= 0) {
      if (animationPhase !== 'defeat') {
        setAnimationPhase('defeat');
      }
      return; // Detiene la secuencia
    }

    let timeoutId: number;

    switch (animationPhase) {
      case 'idle':
        timeoutId = setTimeout(runCombatTurn, 1000); // Pausa entre turnos
        break;

      case 'playerAttack':
        audioVindicator.play();
        setPlayerShake(true);
        setTimeout(() => setPlayerShake(false), 300); // Duración de la animación de shake
        timeoutId = setTimeout(() => {
          dispatch({ type: 'PLAYER_ATTACK' });
          setAnimationPhase('enemyDamage');
        }, 500);
        break;

      case 'enemyDamage':
        // La comprobación de victoria se hace arriba, aquí solo esperamos para el contraataque
        timeoutId = setTimeout(() => setAnimationPhase('enemyAttack'), 500);
        break;

      case 'enemyAttack':
        audioEnemy.play();
        setEnemyShake(true);
        setTimeout(() => setEnemyShake(false), 300); // Duración de la animación de shake
        timeoutId = setTimeout(() => {
          dispatch({ type: 'ENEMY_RESPONSE' });
          setAnimationPhase('playerDamage');
        }, 500);
        break;

      case 'playerDamage':
        // La comprobación de derrota se hace arriba, aquí solo esperamos para el fin de turno
        timeoutId = setTimeout(() => setAnimationPhase('idle'), 500);
        break;
    }

    return () => clearTimeout(timeoutId);
  }, [animationPhase, activeBattle, vindicator.currentHealth, dispatch, runCombatTurn]);

  // Efecto para iniciar el combate solo una vez cuando la batalla cambia
  useEffect(() => {
    if (activeBattle) {
      setAnimationPhase('idle');
    }
  }, [activeBattle?.battleIndex, gameState.battleCount]);


  const handleNextBattle = () => {
    dispatch({ type: 'ADVANCE_TO_NEXT_BATTLE' });
    setAnimationPhase('transition'); // Previene bucles y espera a que el estado se actualice
  }
  
  if (!activeBattle) {
    return <div className="combat-scene"><div>Cargando...</div></div>;
  }

  return (
    <div className="combat-scene" style={{ backgroundImage: `url(${backgroundPath})` }}>
      <div className="combat-area">
        <div className={`combatant vindicator-combatant ${playerShake || animationPhase === 'playerDamage' ? 'shake' : ''} ${animationPhase === 'playerDamage' ? 'flash' : ''}`}>
          {vindicatorSprite && (
            <img 
              src={vindicatorSprite.idle} 
              alt="Vindicator" 
              className="unit-sprite" 
            />
          )}
        </div>

        <div className={`combatant enemy-combatant ${enemyShake || animationPhase === 'enemyDamage' ? 'shake' : ''} ${animationPhase === 'enemyDamage' ? 'flash' : ''}`}>
          {enemySprite && (
            <img 
              src={enemySprite.idle} 
              alt={activeBattle.enemyName} 
              className="unit-sprite" 
            />
          )}
        </div>
      </div>

      <UnitDisplay
        name={vindicator.vindicatorType === 'base' ? 'VINDICATOR' : vindicator.vindicatorType.includes('_') ? vindicator.vindicatorType.split('_')[1].toUpperCase() : vindicator.vindicatorType.toUpperCase()}
        currentHealth={vindicator.currentHealth}
        maxHealth={vindicator.maxHealth}
        currentShield={vindicator.currentShield}
        maxShield={vindicator.maxShield}
        alignment="left"
      />

      <UnitDisplay
        name={activeBattle.enemyName.toUpperCase()}
        currentHealth={activeBattle.enemyCurrentHealth}
        maxHealth={activeBattle.enemyMaxHealth}
        currentShield={activeBattle.enemyCurrentShield}
        maxShield={activeBattle.enemyMaxShield}
        alignment="right"
      />

      {animationPhase === 'victory' && (
        <>
          <div className="victory-message">
            <h2>VICTORIA</h2>
          </div>
          <button 
            className="combat-button secondary victory-button-left" 
            onClick={() => dispatch({ type: 'ESCAPE_COMBAT' })}
          >
            Volver al Hangar
          </button>
          <button 
            className="combat-button primary victory-button-right" 
            onClick={handleNextBattle}
          >
            Siguiente Combate
          </button>
        </>
      )}

      {animationPhase === 'defeat' && (
        <>
          <div className="victory-message defeat-message">
            <h2>DERROTA</h2>
          </div>
          <div className="combat-controls-center" style={{ position: 'absolute', bottom: '5%' }}>
            <button 
              className="secondary-button escape-button" 
              onClick={() => dispatch({ type: 'ESCAPE_COMBAT' })}
            >
              Volver al Hangar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CombatScene;
