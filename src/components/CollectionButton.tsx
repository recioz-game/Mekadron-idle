import React from 'react';
import scrapButtonUrl from '../assets/images/ui/scrap-button.png';
import './CollectionButton.css'; // <-- AÑADIDO

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
    <div className="collection-button-wrapper">
      <button 
        onClick={handleClick}
        className="collection-button"
        style={{
          backgroundImage: `url(${scrapButtonUrl})`,
        }}
        aria-label={`Recolectar +${scrapPerClick} chatarra`}
      />
    </div>
  );
};

export default CollectionButton;