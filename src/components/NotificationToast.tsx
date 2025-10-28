import React, { useEffect, useState } from 'react';
import { GameNotification } from '../types/gameState';

interface NotificationToastProps {
  notification: GameNotification | null;
  onDismiss: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setVisible(true);
      const timer = setTimeout(() => {
        handleDismiss();
      }, 6000); // La notificación dura 6 segundos

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [notification]);

  const handleDismiss = () => {
    setVisible(false);
    // Esperar a que la animación de salida termine antes de llamar a onDismiss
    setTimeout(() => {
      onDismiss();
    }, 300); 
  };

  if (!notification) {
    return null;
  }

  const toastStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: `translate(-50%, ${visible ? '0' : '-100px'})`,
    backgroundColor: '#1F2937',
    color: '#E5E7EB',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '2px solid #F59E0B',
    zIndex: 1000,
    textAlign: 'center',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    opacity: visible ? 1 : 0,
    maxWidth: '500px',
  };

  const titleStyle: React.CSSProperties = {
    color: '#F59E0B',
    marginTop: 0,
    marginBottom: '0.5rem',
    fontSize: '1.5rem',
  };

  const messageStyle: React.CSSProperties = {
    margin: 0,
    color: '#D1D5DB',
  };

  return (
    <div style={toastStyle} onClick={handleDismiss}>
      <h2 style={titleStyle}>{notification.title}</h2>
      <p style={messageStyle}>{notification.message}</p>
    </div>
  );
};

export default NotificationToast;