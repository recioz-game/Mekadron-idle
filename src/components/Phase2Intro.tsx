import React, { useState, useEffect } from 'react';
import './Phase2Intro.css'; // Importar el archivo CSS

interface Phase2IntroProps {
  onComplete: () => void;
}

const Phase2Intro: React.FC<Phase2IntroProps> = ({ onComplete }) => {
  const fullText = "Vindicator activo. La Fase 2 comienza.";
  const [displayedText, setDisplayedText] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // Efecto de máquina de escribir
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.substring(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
        // Hacemos visible el botón justo al terminar de escribir
        setIsButtonVisible(true);
      }
    }, 100); // Una velocidad de escritura un poco más rápida

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="phase2-intro-container">
      <div className="text-box">
        <p className="intro-text">
          {displayedText}
          <span className="blinking-cursor">_</span>
        </p>
      </div>

      {isButtonVisible && (
        <button
          onClick={onComplete}
          className="continue-button"
        >
          [ CONTINUAR ]
        </button>
      )}
    </div>
  );
};

export default Phase2Intro;
