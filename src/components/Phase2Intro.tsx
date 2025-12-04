import React, { useState, useEffect, useRef } from 'react';
import './Phase2Intro.css';

interface Phase2IntroProps {
  onComplete: () => void;
}

const Phase2Intro: React.FC<Phase2IntroProps> = ({ onComplete }) => {
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = `${import.meta.env.BASE_URL}videos/phase2-intro.mp4`;

  useEffect(() => {
    // Mostrar el botón después de un breve delay
    const timer = setTimeout(() => {
        setIsButtonVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

      const handleVideoEnd = () => {
      // Opcional: puedes activar algo cuando termine el video
    };

  return (
    <div className="phase2-intro-container">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        loop={false}
        onEnded={handleVideoEnd}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Mensaje de fallback si el navegador no soporta video */}
        Tu navegador no soporta el elemento video.
      </video>

      {/* Botón de continuar */}
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
