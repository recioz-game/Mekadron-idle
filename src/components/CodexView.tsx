// src/components/CodexView.tsx
import React from 'react';
import { useGame, useGameDispatch } from '../context/GameContext';
import { codexData, resourceNameMap } from '../data/codexData';
import './CodexView.css';

interface CodexViewProps {
  resourceId?: string;
  isEmbedded?: boolean;
  theme?: 'phase1' | 'phase2'; // <-- AÑADIDO
}

const CodexView: React.FC<CodexViewProps> = ({ resourceId, isEmbedded = false, theme = 'phase1' }) => {
  const { gameState } = useGame();
  const dispatch = useGameDispatch();
  // Si se proporciona un resourceId, úsalo. Si no, usa el del estado global.
  const codexSelectedResource = resourceId || gameState.codexSelectedResource;

  if (!codexSelectedResource) {
    return null;
  }

  const entry = codexData[codexSelectedResource];
  const displayName = resourceNameMap[codexSelectedResource] || codexSelectedResource.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase());

  const handleClose = () => {
    dispatch({ type: 'CLOSE_CODEX_VIEW' });
  };

  const handleGoTo = (view: string) => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: view });
    handleClose(); // Cierra el códice después de navegar
  };

  const content = (
    <>
      {entry ? (
          <>
            <h2>{displayName}</h2>
            <p className="codex-description">{entry.description}</p>

            <div className="codex-section">
              <h3>Orígenes</h3>
              <ul>
                {entry.origins.map((origin, index) => (
                  <li key={index}>
                    <strong>{origin.type}:</strong> {origin.label}
                    {origin.view && !isEmbedded && (
                      <button onClick={() => handleGoTo(origin.view!)} className="goto-button">
                        Ir a...
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="codex-section">
              <h3>Usos Comunes</h3>
              <ul>
                {entry.uses.map((use, index) => (
                  <li key={index}>
                    <strong>{use.type}:</strong> {use.label}
                    {use.view && !isEmbedded && (
                      <button onClick={() => handleGoTo(use.view!)} className="goto-button">
                        Ir a...
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
      ) : (
        <>
          <h2>{displayName}</h2>
          <p>No hay datos disponibles para este recurso en el Códice.</p>
        </>
      )}
    </>
  );

  if (isEmbedded) {
    return (
      <div className="codex-container embedded">
        {content}
      </div>
    );
  }
  
  const containerClasses = `codex-overlay ${theme === 'phase2' ? 'theme-phase2' : ''}`;

  return (
    <div className={containerClasses} onClick={handleClose}>
      <div className="codex-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="close-button">&times;</button>
        {content}
      </div>
    </div>
  );
};

export default CodexView;
