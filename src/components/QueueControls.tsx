import React from 'react';
import './QueueControls.css'; // Importar el archivo CSS

interface QueueControlsProps {
  itemName: string;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const QueueControls: React.FC<QueueControlsProps> = ({ itemName, onCancel }) => {
  return (
    <div className="cancel-button-group">
      <button onClick={() => onCancel(itemName, 1)} className="cancel-button">
        Cancelar 1
      </button>
      <button onClick={() => onCancel(itemName, 'all')} className="cancel-button">
        Cancelar Todo
      </button>
    </div>
  );
};

export default QueueControls;
