import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext'; // Importar el hook del contexto
import auroraPanelUrl from '../assets/images/ui/buttons/aurora-message-panel.png';

// --- Importación dinámica de todos los audios ---
const audioFiles = import.meta.glob('../assets/audio/aurora/*.mp3', { eager: true, as: 'url' });

// Crear un mapa ordenado para acceder fácilmente
const audioMap = new Map<number, string>();
for (const path in audioFiles) {
  const match = path.match(/aurora_message_(\d+)\.mp3$/);
  if (match) {
    const id = parseInt(match[1], 10);
    audioMap.set(id, audioFiles[path]);
  }
}

interface AuroraMessageProps {
  message: string;
  audioId?: number; // Nueva propiedad
  onClose: () => void;
  autoHide?: boolean;
}

const AuroraMessage: React.FC<AuroraMessageProps> = ({ 
  message, 
  audioId,
  onClose, 
  autoHide = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { gameState } = useGame(); // Acceder al estado del juego

  // Reproducir sonido al montar el componente
  useEffect(() => {
    setIsVisible(true);

        if (audioId && audioMap.has(audioId) && !gameState.settings.voicesMuted) {
      const audioSrc = audioMap.get(audioId);
      if (audioSrc) {
        const audio = new Audio(audioSrc);
        // El volumen de la voz ahora depende del volumen general y el de efectos (SFX)
        const finalVolume = (gameState.settings.masterVolume / 100) * (gameState.settings.sfxVolume / 100);
        audio.volume = finalVolume;
        audio.play().catch(e => console.error("Error al reproducir audio:", e));
      }
    }
  }, []); // El array vacío asegura que esto se ejecute solo una vez
  
  // Controlar el auto-cierre
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000); // 5 segundos
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    
    setTimeout(onClose, 300);
    };

  return (
    <div style={{
      width: '40rem',
      maxWidth: '40rem',
      minHeight: '18rem',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease-in-out',
      
            boxSizing: 'border-box',
      backgroundImage: `url(${auroraPanelUrl})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',

      // --- ESTA ES LA ÚNICA LÍNEA QUE NECESITAS ---
      // Mueve la caja que contiene el texto Y la cruceta JUNTOS.
      padding: '10rem 5rem 3rem 5rem'
    }}>
            {/* Contenido en dos filas separadas */}
      <div>
        {/* Fila 1: Botón */}
        <div style={{ textAlign: 'right', marginBottom: '1rem' /* Espacio entre botón y texto */ }}>
          <button 
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#06B6D4', // Azul fluorescente
              textShadow: '0 0 5px rgba(6, 182, 212, 0.7)', // Efecto de brillo
              cursor: 'pointer',
              fontSize: '2.5rem',
              padding: '0',
              lineHeight: '1'
            }}
          >
            ×
          </button>
        </div>
        
        {/* Fila 2: Texto */}
        <p style={{ 
          margin: 0, 
          lineHeight: '1.4',
          fontSize: '1.4rem',
          color: '#E5E7EB',
        }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default AuroraMessage;