import React from 'react';
import { formatNumber } from '../utils/formatNumber';

interface Phase2ResourceBarProps {
  metalRefinado: number;
  aceroEstructural: number;
  placasCasco: number;
  cableadoSuperconductor: number;
  aleacionReforzada: number;
  neuroChipCorrupto: number;
}

const Phase2ResourceBar: React.FC<Phase2ResourceBarProps> = ({
  metalRefinado,
  aceroEstructural,
  placasCasco,
  cableadoSuperconductor,
  aleacionReforzada,
  neuroChipCorrupto,
}) => {
  return (
    <div style={{
      backgroundColor: '#111827',
      color: '#E5E7EB',
      padding: '1rem',
      borderBottom: '2px solid #1F2937',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        {/* Materiales Industriales (Fase 1) */}
        <div style={{ display: 'flex', alignItems: 'center' }} title="Metal Refinado">
          <span style={{ fontSize: '1.2rem', color: '#F59E0B', marginRight: '0.5rem' }}>🔩</span>
          <span>{formatNumber(metalRefinado)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Acero Estructural">
          <span style={{ fontSize: '1.2rem', color: '#94A3B8', marginRight: '0.5rem' }}>🏗️</span>
          <span>{formatNumber(aceroEstructural)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Placas de Casco">
            <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🧱</span>
            <span>{formatNumber(placasCasco)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Cableado Superconductor">
            <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🔌</span>
            <span>{formatNumber(cableadoSuperconductor)}</span>
        </div>
        
        {/* Separador Visual */}
        <div style={{ borderLeft: '2px solid #374151', height: '24px' }}></div>

        {/* Materiales de Combate (Fase 2) */}
        <div style={{ display: 'flex', alignItems: 'center' }} title="Aleación Reforzada">
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🛡️</span>
          <span>{formatNumber(aleacionReforzada)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} title="Neuro-Chip Corrupto">
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🧠</span>
          <span>{formatNumber(neuroChipCorrupto)}</span>
        </div>
      </div>
    </div>
  );
};

export default Phase2ResourceBar;

