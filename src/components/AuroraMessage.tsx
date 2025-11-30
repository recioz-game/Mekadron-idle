import React, { useEffect, useState } from 'react';
import auroraPanelUrl from '../assets/images/ui/buttons/aurora-message-panel.png';

interface AuroraMessageProps {
  message: string;
  onClose: () => void;
  autoHide?: boolean;
}

const AuroraMessage: React.FC<AuroraMessageProps> = ({ 
  message, 
  onClose, 
  autoHide = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Animar la entrada al montar el componente
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    // Esperar a que termine la animación de salida antes de llamar a onClose
    setTimeout(onClose, 300);
    };

  return (
    <div style={{
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