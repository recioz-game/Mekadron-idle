import React from 'react';
import { Mission } from '../types/gameState';

interface MissionsPanelProps {
  activeMissions: Mission[];
  completedMissions: string[];
  currentScrap: number;
  maxScrap: number;
  currentEnergy: number;
  maxEnergy: number;
  onClaimReward: (missionId: string) => void;
  onClose: () => void;
}

const MissionsPanel: React.FC<MissionsPanelProps> = React.memo(({ 
  activeMissions,
  completedMissions,
  currentScrap,
  maxScrap,
  currentEnergy,
  maxEnergy,
    onClaimReward, 
  onClose 
}) => {

  const getMissionProgress = (mission: Mission) => {
    return Math.min((mission.current / mission.target) * 100, 100);
  };

  const getRewardText = (reward: Mission['reward']) => {
    switch (reward.type) {
      case 'scrap':
        return `+${reward.value} Chatarra`;
      case 'energy':
        return `+${reward.value} Energía`;
      case 'drone':
        return `Dron Básico`;
      case 'unlock':
        return `Desbloqueo de ${reward.value}`;
      default:
        return 'Recompensa';
    }
  };

  const canClaimReward = (mission: Mission) => {
    if (mission.completed) return false;
    
    switch (mission.reward.type) {
      case 'scrap':
        return currentScrap + mission.reward.value <= maxScrap;
      case 'energy':
        return currentEnergy + mission.reward.value <= maxEnergy;
      case 'drone':
      case 'unlock':
        return true;
      default:
        return true;
    }
  };

  const mainMissions = activeMissions.filter(m => m.isMain && !m.completed);
  const secondaryMissions = activeMissions.filter(m => !m.isMain && !m.completed);

  const renderMission = (mission: Mission, isMain: boolean) => {
            const progress = getMissionProgress(mission);
    const canClaim = progress >= 100 && canClaimReward(mission);
    const isCompletedButNotClaimed = progress >= 100 && !canClaim;

    return (
      <div 
        key={mission.id}
        style={{
          padding: '1rem',
          backgroundColor: '#1F2937',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: isMain ? `2px solid ${progress >= 100 ? '#22C55E' : '#D946EF'}` : `1px solid ${progress >= 100 ? '#22C55E' : '#374151'}`
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.5rem'
        }}>
          <h4 style={{ 
            color: isMain ? '#D946EF' : (progress >= 100 ? '#22C55E' : '#F59E0B'),
            margin: 0 
          }}>
            {isMain && '★ '} {mission.title}
          </h4>
          <span style={{
            color: '#06B6D4',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            {getRewardText(mission.reward)}
          </span>
        </div>
        
        <p style={{ 
          margin: '0.5rem 0',
          fontSize: '0.9rem',
          color: '#D1D5DB'
        }}>
          {mission.description}
        </p>
        
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#9CA3AF',
            marginBottom: '0.25rem'
          }}>
            <span>Progreso: {mission.current}/{mission.target}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#374151',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div 
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: progress >= 100 ? '#22C55E' : '#06B6D4',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
        
        <div style={{
          fontSize: '0.8rem',
          color: '#9CA3AF',
          marginBottom: '0.5rem'
        }}>
          Objetivo: {mission.objective}
        </div>

        {/* Botón de Reclamar */}
        {progress >= 100 && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {isCompletedButNotClaimed && (
              <span style={{
                color: '#EF4444',
                fontSize: '0.8rem'
              }}>
                ⚠️ Espacio insuficiente
              </span>
            )}
            <button 
                            onClick={() => onClaimReward(mission.id)}
              disabled={!canClaim}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: canClaim ? '#22C55E' : '#9CA3AF',
                color: canClaim ? '#1F2937' : '#0F172A',
                border: 'none',
                borderRadius: '4px',
                cursor: canClaim ? 'pointer' : 'not-allowed',
                fontWeight: 'bold',
                fontSize: '0.8rem'
              }}
            >
              {canClaim ? '🎁 Reclamar' : (isCompletedButNotClaimed ? 'Completar' : '⏳ Esperando')}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#111827',
      color: '#E5E7EB',
      minHeight: '100vh',
      padding: '1rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>🎯 SISTEMA DE MISIONES</h2>
        <button 
          onClick={onClose}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cerrar
        </button>
      </div>

            {/* Misiones Principales */}
      {mainMissions.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#D946EF', marginBottom: '1rem', borderBottom: '1px solid #D946EF', paddingBottom: '0.5rem' }}>★ MISIÓN PRINCIPAL</h3>
          {mainMissions.map(mission => renderMission(mission, true))}
        </div>
      )}

      {/* Misiones Secundarias */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#F59E0B', marginBottom: '1rem' }}>MISIONES SECUNDARIAS</h3>
        
        {secondaryMissions.length === 0 && mainMissions.length === 0 ? (
          <div style={{
            padding: '1rem',
            backgroundColor: '#1F2937',
            borderRadius: '4px',
            textAlign: 'center',
            color: '#9CA3AF'
          }}>
            No hay misiones activas. ¡Excelente trabajo, técnico!
          </div>
        ) : (
          secondaryMissions.map(mission => renderMission(mission, false))
        )}
      </div>

      {/* Misiones Completadas */}
      {completedMissions.length > 0 && (
        <div>
          <h3 style={{ color: '#22C55E', marginBottom: '1rem' }}>MISIONES COMPLETADAS</h3>
          <div style={{
            padding: '1rem',
            backgroundColor: '#1F2937',
            borderRadius: '4px',
            border: '2px solid #22C55E'
          }}>
            <div style={{ color: '#22C55E', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ✅ {completedMissions.length} misión(es) completada(s)
            </div>
            <div style={{ fontSize: '0.9rem', color: '#9CA3AF' }}>
              Continúa expandiendo la estación para desbloquear nuevas misiones.
            </div>
          </div>
                </div>
      )}
    </div>
  );
});

export default MissionsPanel;