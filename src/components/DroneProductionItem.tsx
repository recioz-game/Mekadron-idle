import React from 'react';
import BotonConTooltip from './BotonConTooltip';
import { formatNumber } from '../utils/formatNumber';

interface DroneProductionItemProps {
  title: string;
  production: string;
  consumption: number;
  cost: string;
  flota: number;
  queue: { progress: number; queue: number; time: number };
  requirements?: string;
  isUnlocked: boolean;
  canAfford: boolean;
  onBuild: () => void;
  onCancel: (amount: number | 'all') => void;
  buyAmount: number | 'max';
  maxAffordable: number;
  tooltipText: string;
  color: string;
}

const ProgressBar = ({ progress, time }: { progress: number; time: number }) => (
  <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '4px', marginTop: '0.5rem' }}>
    <div style={{ width: `${(progress / time) * 100}%`, backgroundColor: '#22C55E', height: '5px', borderRadius: '4px' }} />
  </div>
);

const DroneProductionItem: React.FC<DroneProductionItemProps> = ({
  title, production, consumption, cost, flota, queue, requirements,
  isUnlocked, canAfford, onBuild, onCancel, buyAmount, maxAffordable, tooltipText, color
}) => {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#111827',
      borderRadius: '4px',
      marginBottom: '1rem',
      border: canAfford && isUnlocked ? '2px solid #22C55E' : '2px solid #374151',
      opacity: isUnlocked ? 1 : 0.6
    }}>
      <h4 style={{ color, marginTop: 0 }}>{title}</h4>
      <p>📊 Producción: {production}</p>
      <p>⚡ Consumo: {formatNumber(consumption)} energía</p>
      <p>💰 Coste: {cost}</p>
      <p>🏗️ Flota: {flota} | 📦 En cola: {queue.queue}</p>
      {queue.queue > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <button onClick={() => onCancel(1)} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar 1</button>
          <button onClick={() => onCancel('all')} style={{ flexGrow: 1, backgroundColor: '#FBBF24', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', color: '#1F2937' }}>Cancelar Todo</button>
        </div>
      )}
      <p>⏱️ T/U: {queue.time}s</p>
      {requirements && <p>📋 Requisitos: {requirements}</p>}
      
      {queue.queue > 0 && <ProgressBar progress={queue.progress} time={queue.time} />}
      
      <BotonConTooltip
        onClick={onBuild}
        disabled={!canAfford || !isUnlocked}
        tooltipText={tooltipText}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: canAfford && isUnlocked ? '#22C55E' : '#9CA3AF',
          color: '#0F172A',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          marginTop: '0.5rem',
          width: '100%'
        }}
      >
        Encargar {title.split('(')[0].trim()} {buyAmount === 'max' && `(${maxAffordable})`}
      </BotonConTooltip>
      {!isUnlocked && requirements && (
        <p style={{ color: '#F59E0B', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          ⚠️ Necesitas {requirements} para desbloquear
        </p>
      )}
    </div>
  );
};

export default DroneProductionItem;
