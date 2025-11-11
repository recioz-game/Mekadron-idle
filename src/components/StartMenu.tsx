import React from 'react';
import './StartMenu.css'; // Importar el archivo CSS
import coverImageUrl from '../assets/images/ui/cover.png';
import playButtonUrl from '../assets/images/ui/play-button.png';

interface StartMenuProps {
  onStartGame: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onStartGame }) => {
  return (
    <div 
      className="start-menu-container"
      style={{ backgroundImage: `url(${coverImageUrl})` }}
    >
      <button 
        onClick={onStartGame}
        className="play-button"
        style={{ backgroundImage: `url(${playButtonUrl})` }}
        aria-label="Jugar"
      />
    </div>
  );
};

export default StartMenu;