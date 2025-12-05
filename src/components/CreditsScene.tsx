// src/components/CreditsScene.tsx
import React from 'react';
import { useGame } from '../context/GameContext';
import './CreditsScene.css';

const CreditsScene: React.FC = () => {
  const { dispatch } = useGame();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_CREDITS' });
  };

  return (
    <div className="credits-scene">
      <div className="credits-scroll-container">
        <div className="credits-section">
          <h2>Dirección / Creación</h2>
          <p><span>Un juego de</span>Jesús Martínez (Recioz)</p>
          <p><span>Diseño de</span>Jesús Martínez (Recioz)</p>
          <p><span>Programación</span>Diferentes agentes como Gamini 2.5, Qwen y DeepSeek Coder</p>
        </div>

        <div className="credits-section">
          <h2>Arte y Gráficos</h2>
          <p><span>Arte y Diseño Visual</span>Jesús Martínez (Recioz)</p>
          <p><span>Diseños creados con</span>Qwen, Gemini nano banana</p>
        </div>

        <div className="credits-section">
          <h2>Sonido y Música</h2>
          <p><span>Música por</span>Pixabay</p>
          <p><span>Efectos de Sonido por</span>Pixabay, Itch.io</p>
        </div>

        <div className="credits-section">
          <h2>Reparto de Voces (Casting)</h2>
          <p><span>Voz de Aurora interpretada por</span>Estefania Guillén</p>
        </div>

        <div className="credits-section">
          <h2>Agradecimientos Especiales</h2>
          <p><span>A</span>Ricardo Hernández, por su paciencia y colaboración.</p>
        </div>
        
        <div className="credits-section">
          <h2>Playtesters / QA (Control de Calidad)</h2>
          <p>Ricardo Hernández, Alexei Kramanenco, </p>
        </div>

        <div className="credits-section">
          <h2>Secciones Técnicas</h2>
          <p><span>Hecho con</span>React, TypeScript y Vite</p>
          <p><span>Tipografía por</span>Orbitron e Inter (Google Fonts)</p>
        </div>
        
        <div className="credits-final-thanks">
          <h2>¡Gracias por jugar!</h2>
        </div>
      </div>
      <button onClick={handleClose} className="credits-close-button">
        Volver
      </button>
    </div>
  );
};

export default CreditsScene;
