import React from 'react';
import './App.css';
import { useGame } from './context/GameContext';
import StartMenu from './components/StartMenu';
import IntroScene from './components/IntroScene';
import Game from './components/Game';
import Phase2Intro from './components/Phase2Intro';
import Phase2Scene from './components/Phase2Scene';
import CombatScene from './components/CombatScene';
import CreditsScene from './components/CreditsScene'; // <-- Importar CreditsScene
import ErrorBoundary from './components/ErrorBoundary';
import FloatingTextHandler from './components/FloatingTextHandler'; // <-- Importar FloatingTextHandler
import NotificationToast from './components/NotificationToast'; // <-- AÑADIDO
import { useEffect, useRef } from 'react';
import mainThemeAudio from './assets/audio/music/main-theme.mp3';

const App: React.FC = () => {
    const { gameState, dispatch } = useGame();
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- Notification Handler ---
  const currentNotification = gameState.notificationQueue.length > 0 ? gameState.notificationQueue[0] : null;

  // --- Music Director ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Adjust Volume
    const finalVolume = (gameState.settings.masterVolume / 100) * (gameState.settings.musicVolume / 100);
    audio.volume = finalVolume;

    // 2. Play or Pause based on scene
    const shouldPlayMusic = gameState.currentScene === 'main' || gameState.currentScene === 'phase2Main';

    if (shouldPlayMusic && finalVolume > 0) {
      audio.play().catch(error => {
        // La reproducción automática puede fallar, es normal.
        console.log("Music play prevented by browser, will try again after user interaction.");
      });
    } else {
      audio.pause();
    }
    
  }, [gameState.currentScene, gameState.settings.masterVolume, gameState.settings.musicVolume]);

  useEffect(() => {
    const handleResetGame = () => {
      dispatch({ type: 'RESET_GAME' });
    };

    window.addEventListener('resetGame', handleResetGame);
    
    return () => {
      window.removeEventListener('resetGame', handleResetGame);
    };
  }, [dispatch]);

  const renderCurrentScene = () => {
    switch (gameState.currentScene) {
      case 'startMenu':
        return <StartMenu onStartGame={() => dispatch({ type: 'START_GAME' })} />;
      case 'introScene':
        return <IntroScene onComplete={() => dispatch({ type: 'SHOW_MAIN_SCENE' })} />;
                  case 'main':
        return <Game />;
      case 'phase2Intro':
        return <Phase2Intro onComplete={() => dispatch({ type: 'GO_TO_PHASE_2' })} />;
            case 'phase2Main':
        return <Phase2Scene />;
                        case 'combatScene':
        return <CombatScene key={gameState.battleCount} />;
      case 'creditsScene': // <-- Añadir este caso
        return <CreditsScene />;
      default:
        return <StartMenu onStartGame={() => dispatch({ type: 'START_GAME' })} />;
    }
  };

    return (
        <div className="game-container">
      <ErrorBoundary>
        {renderCurrentScene()}
      </ErrorBoundary>
      <NotificationToast 
        notification={currentNotification} 
        onDismiss={() => dispatch({ type: 'DISMISS_NOTIFICATION' })} 
      />
      <audio ref={audioRef} src={mainThemeAudio} loop />
      <FloatingTextHandler />
    </div>
  );
};

export default App;