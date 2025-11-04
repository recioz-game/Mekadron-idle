import React from 'react';
import scrapButtonUrl from '../assets/scrap-button.png';

interface CollectionButtonProps {
  onCollectScrap: (event: React.MouseEvent<HTMLButtonElement>) => void;
  scrapPerClick: number;
}

const CollectionButton: React.FC<CollectionButtonProps> = ({ 
  onCollectScrap, 
  scrapPerClick 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Llama a la lógica original del juego
    onCollectScrap(e);

    // Crea y dispara el evento personalizado para el texto flotante
    const event = new CustomEvent('showFloatingText', {
      detail: {
        text: `+${scrapPerClick}`,
        originalEvent: e.nativeEvent, // Usamos el evento nativo del navegador
      }
    });
    document.dispatchEvent(event);
  };

      return (
    <div style={{
      position: 'absolute',
      bottom: '5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <button 
        onClick={handleClick}
        style={{
          background: `url(${scrapButtonUrl}) no-repeat center center`,
          backgroundSize: 'contain',
          width: '24.2rem', /* Aumentado otro 10% */
          height: '24.2rem', /* Aumentado otro 10% */
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          position: 'relative'
        }}
        aria-label={`Recolectar +${scrapPerClick} chatarra`}
      />
    </div>
  );
};

export default CollectionButton;