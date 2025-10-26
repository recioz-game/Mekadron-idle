import React from 'react';
import { useGame } from './context/GameContext';
import StartMenu from './components/StartMenu';
import IntroScene from './components/IntroScene';
import Game from './components/Game';

const App: React.FC = () => {
  const { gameState, dispatch } = useGame();

  const renderCurrentScene = () => {
    switch (gameState.currentScene) {
      case 'startMenu':
        return <StartMenu onStartGame={() => dispatch({ type: 'START_GAME' })} />;
      case 'introScene':
        return <IntroScene onComplete={() => dispatch({ type: 'SHOW_MAIN_SCENE' })} />;
      case 'main':
        return <Game />;
      default:
        return <StartMenu onStartGame={() => dispatch({ type: 'START_GAME' })} />;
    }
  };

  return renderCurrentScene();
};

export default App;