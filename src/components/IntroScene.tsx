import React, { useState, useEffect } from 'react';
import './IntroScene.css'; // Importar el archivo CSS

interface IntroSceneProps {
  onComplete: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const fullText = `«…Sistema de vida restaurado. Iniciando conciencia…»

Despiertas sobresaltado. Luces parpadeantes iluminan brevemente pasillos metálicos cubiertos de polvo y chispas. Todo está en silencio… salvo un susurro mecánico que resuena en los altavoces:

«Mantenimiento crítico. Fallo estructural inminente.»

No recuerdas quién eres ni cuánto tiempo llevas aquí. Solo percibes el latido distante de los motores apagándose y el eco de algo moviéndose entre las sombras de la estación.

La voz vuelve a sonar, más urgente, casi humana: «Restaura los sistemas esenciales… o todo terminará.»

A tu alrededor, pantallas rotas, herramientas abandonadas, y una sensación persistente de que no estás solo. Algo espera. Algo observa. Y depende de ti reactivar lo que queda… antes de que sea demasiado tarde.`;
  const [displayedText, setDisplayedText] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // Efecto de máquina de escribir (versión corregida)
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.substring(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 50); // Velocidad de escritura

    return () => clearInterval(interval);
  }, [fullText]);

  // Efecto para mostrar el botón después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="intro-scene-container">
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

export default IntroScene;
