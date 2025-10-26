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

  useEffect(() => {
    // Solo mostrar si hay un mensaje
    if (message) {
      setIsVisible(true);
      
      if (autoHide) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Esperar a que termine la animación
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [message, autoHide, onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px', // CAMBIADO: de top a bottom
      right: '20px',
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
      zIndex: 1000,
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
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
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