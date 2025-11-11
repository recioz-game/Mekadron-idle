import React from 'react';
import './IntroScene.css'; // Importar el archivo CSS

interface IntroSceneProps {
  onComplete: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  return (
    <div className="intro-scene-container">
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="intro-video"
        src={`${import.meta.env.BASE_URL}videos/intro-video.mp4`} // Ruta corregida para producción
      />
      <button
        onClick={onComplete}
        className="skip-intro-button"
      >
        [ SALTAR INTRO ]
      </button>
    </div>
  );
};

export default IntroScene;
