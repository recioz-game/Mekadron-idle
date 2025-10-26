import React from 'react';

interface CollectionButtonProps {
  onCollectScrap: () => void;
  scrapPerClick: number;
}

const CollectionButton: React.FC<CollectionButtonProps> = ({ 
  onCollectScrap, 
  scrapPerClick 
}) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '2rem',
      left: '2rem'
    }}>
          <button 
      id="collection-button"
      onClick={onCollectScrap}
        style={{
          padding: '2rem 3rem',
          fontSize: '1.5rem',
          backgroundColor: '#F59E0B',
          color: '#0F172A',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
      >
        RECOLECTAR<br />+{scrapPerClick}
      </button>
    </div>
  );
};

export default CollectionButton;