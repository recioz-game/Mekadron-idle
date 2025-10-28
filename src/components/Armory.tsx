import React from 'react';
import './Armory.css'; // Crearemos este archivo para los estilos

interface ArmoryProps {
  onClose: () => void;
}

const Armory: React.FC<ArmoryProps> = ({ onClose }) => {
  return (
    <div className="armory-view">
      <div className="armory-view-header">
        <h2>🛡️ ARMERÍA</h2>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>
      <div className="armory-content">
        <p>Contenido de la armería.</p>
        {/* Aquí irá el contenido futuro de la Armería */}
      </div>
    </div>
  );
};

export default Armory;