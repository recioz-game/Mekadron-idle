import React, { useState, useEffect } from 'react';

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
    <div style={{
      backgroundColor: '#000',
      color: '#00FF41', // Verde fósforo, estilo terminal antiguo
      fontFamily: '"Courier New", Courier, monospace',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        border: '2px solid #00FF41',
        padding: '2rem',
        boxShadow: '0 0 15px #00FF41',
      }}>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          {displayedText}
          <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
        </p>
      </div>

      {isButtonVisible && (
        <button
          onClick={onComplete}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '1.2rem',
            backgroundColor: 'transparent',
            color: '#00FF41',
            border: '2px solid #00FF41',
            cursor: 'pointer',
            animation: 'pulse 2s infinite'
          }}
        >
          [ CONTINUAR ]
        </button>
      )}

      {/* Estilos para las animaciones inyectados directamente */}
      <style>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 5px #00FF41; }
          50% { box-shadow: 0 0 20px #00FF41; }
          100% { box-shadow: 0 0 5px #00FF41; }
        }
      `}</style>
    </div>
  );
};

export default IntroScene;
