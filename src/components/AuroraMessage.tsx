import React, { useEffect, useState } from 'react';

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
      maxWidth: '400px',
      backgroundColor: '#111827',
      color: '#E5E7EB',
      padding: '1rem',
      borderRadius: '8px',
      border: '2px solid #06B6D4',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease-in-out',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#06B6D4',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          A
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem'
          }}>
            <strong style={{ color: '#06B6D4' }}>AURORA</strong>
            <button 
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0 0.25rem',
                marginLeft: '1rem'
              }}
            >
              ×
            </button>
          </div>
          <p style={{ 
            margin: 0, 
            lineHeight: '1.4',
            fontSize: '0.9rem'
          }}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuroraMessage;