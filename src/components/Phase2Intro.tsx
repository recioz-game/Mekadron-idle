import React, { useState, useEffect } from 'react';

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
        <p style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0, textAlign: 'center' }}>
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

export default Phase2Intro;
