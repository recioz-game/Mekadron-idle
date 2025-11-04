import React from 'react';
import './QueueControls.css'; // Importar el archivo CSS

interface QueueControlsProps {
  queue: { progress: number; queue: number; time: number };
  itemName: string;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
  <div className="progress-bar-container">
    <div 
      className="progress-bar"
      style={{ width: `${(progress / time) * 100}%` }} 
    />
  </div>
);

const QueueControls: React.FC<QueueControlsProps> = ({ queue, itemName, onCancel }) => {
  if (queue.queue === 0) {
    return null;
  }

  return (
    <div className="queue-controls-container">
      <div className="button-group">
        <button onClick={() => onCancel(itemName, 1)} className="cancel-button">Cancelar 1</button>
        <button onClick={() => onCancel(itemName, 'all')} className="cancel-button">Cancelar Todo</button>
      </div>
      <p className="time-info">⏱️ T/U: {queue.time}s</p>
      <ProgressBar progress={queue.progress} time={queue.time} />
    </div>
  );
};

export default QueueControls;
