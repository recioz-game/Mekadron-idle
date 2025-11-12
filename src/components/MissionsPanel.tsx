import React, { useCallback } from 'react';
import './MissionsPanel.css'; // Importar el archivo CSS
import { Mission } from '../types/gameState';
import { useMissions, useResources } from '../hooks/useSelectors';
import { useGameDispatch } from '../context/GameContext';

interface MissionsPanelProps {
  onClose: () => void;
}

const MissionsPanel: React.FC<MissionsPanelProps> = React.memo(({ onClose }) => {
  const { activeMissions, completedMissions } = useMissions();
  const { scrap, maxScrap, energy, maxEnergy } = useResources();
  const dispatch = useGameDispatch();

  const onClaimReward = useCallback((missionId: string) => {
    dispatch({ type: 'CLAIM_REWARD', payload: missionId });
  }, [dispatch]);

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
        return scrap + mission.reward.value <= maxScrap;
      case 'energy':
        return energy + mission.reward.value <= maxEnergy;
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
      <div className={`mission-item ${isMain ? 'main' : 'secondary'} ${progress >= 100 ? 'completed' : ''}`}>
        <div className="mission-header">
                    <h4 className="mission-title" style={{ color: isMain ? '#D946EF' : (progress >= 100 ? '#22C55E' : '#F59E0B') }}>
            {mission.title}
          </h4>
          <span className="mission-reward">
            {getRewardText(mission.reward)}
          </span>
        </div>
        
        <p className="mission-description">
          {mission.description}
        </p>
        
        <div className="progress-info">
          <div className="progress-text">
            <span>Progreso: {mission.current}/{mission.target}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: progress >= 100 ? '#22C55E' : '#06B6D4',
              }}
            />
          </div>
        </div>
        
        <div className="mission-objective">
          Objetivo: {mission.objective}
        </div>

        {/* Botón de Reclamar */}
        {progress >= 100 && (
          <div className="claim-section">
                        {isCompletedButNotClaimed && (
              <span className="claim-warning">
                Espacio insuficiente
              </span>
            )}
            <button 
              onClick={() => onClaimReward(mission.id)}
              disabled={!canClaim}
              className={`claim-button ${canClaim ? 'can-claim' : ''}`}
            >
              {canClaim ? 'Reclamar' : (isCompletedButNotClaimed ? 'Completar' : 'Esperando')}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="missions-panel-container">
      <div className="missions-panel-header">
        <h2>SISTEMA DE MISIONES</h2>
        <button 
          onClick={onClose}
          className="close-button"
        >
          Cerrar
        </button>
      </div>

      {/* Misiones Principales */}
      {mainMissions.length > 0 && (
                <div className="mission-category">
          <h3 style={{ color: '#D946EF', borderBottom: '1px solid #D946EF' }}>MISIÓN PRINCIPAL</h3>
          {mainMissions.map(mission => renderMission(mission, true))}
        </div>
      )}

      {/* Misiones Secundarias */}
      <div className="mission-category">
        <h3 style={{ color: '#F59E0B' }}>MISIONES SECUNDARIAS</h3>
        
        {secondaryMissions.length === 0 && mainMissions.length === 0 ? (
          <div className="no-missions">
            No hay misiones activas. ¡Excelente trabajo, técnico!
          </div>
        ) : (
          secondaryMissions.map(mission => renderMission(mission, false))
        )}
      </div>

      {/* Misiones Completadas */}
      {completedMissions.length > 0 && (
        <div>
          <h3 style={{ color: '#22C55E' }}>MISIONES COMPLETADAS</h3>
                    <div className="completed-missions">
            <div className="completed-missions-title">
              {completedMissions.length} misión(es) completada(s)
            </div>
            <div className="completed-missions-text">
              Continúa expandiendo la estación para desbloquear nuevas misiones.
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default MissionsPanel;