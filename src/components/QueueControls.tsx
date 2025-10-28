import React from 'react';

interface QueueControlsProps {
  queue: { progress: number; queue: number; time: number };
  itemName: string;
  onCancel: (itemName: string, amount: number | 'all') => void;
}

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
  <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '4px', marginTop: '0.5rem' }}>
    <div style={{ 
      width: `${(progress / time) * 100}%`, 
      backgroundColor: '#22C55E', 
      height: '5px', 
      borderRadius: '4px' 
    }} />
  </div>
);

const QueueControls: React.FC<QueueControlsProps> = ({ queue, itemName, onCancel }) => {
  if (queue.queue === 0) {
    return null;
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button onClick={() => onCancel(itemName, 1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
        <button onClick={() => onCancel(itemName, 'all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
      </div>
      <p>⏱️ T/U: {queue.time}s</p>
      <ProgressBar progress={queue.progress} time={queue.time} />
    </>
  );
};

export default QueueControls;
