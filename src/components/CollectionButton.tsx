import React from 'react';

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
      bottom: '2rem',
      left: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <button 
                onClick={handleClick}
                        style={{
          background: `url(/assets/scrap-button.png) no-repeat center center`,
          backgroundSize: 'contain',
          width: '400px',
          height: '400px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          position: 'relative'
                        }}
        aria-label={`Recolectar +${scrapPerClick} chatarra`}
      />
            <div style={{
        marginTop: '-1rem',
        color: '#E5E7EB', // Un color de texto claro y legible
        fontSize: '1rem',
        fontWeight: 'bold',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
        textAlign: 'center'
      }}>
        Recolecta Chatarra
      </div>
    </div>
  );
};

export default CollectionButton;