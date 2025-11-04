import React, { useEffect, useState } from 'react';
import './NotificationToast.css'; // Importar el archivo CSS
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

  return (
    <div className={`notification-toast ${visible ? 'visible' : ''}`} onClick={handleDismiss}>
      <h2 className="notification-title">{notification.title}</h2>
      <p className="notification-message">{notification.message}</p>
    </div>
  );
};

export default NotificationToast;