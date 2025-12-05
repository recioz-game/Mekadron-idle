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
import { useEffect } from 'react';

const App: React.FC = () => {
  const { gameState, dispatch } = useGame();

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
    </div>
  );
};

export default App;