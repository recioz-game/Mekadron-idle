// src/components/CodexHub.tsx
import React, { useState } from 'react';
import { codexData, resourceNameMap } from '../data/codexData';
import CodexView from './CodexView'; // Importar el componente de vista
import './CodexHub.css';

const CodexHub: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const resourceKeys = Object.keys(codexData);

  const handleSelectResource = (resourceKey: string) => {
    setSelectedResource(resourceKey);
  };

  return (
    <div className="codex-hub-container">
      <div className="codex-resource-list">
        <h3>Recursos</h3>
        <ul>
          {resourceKeys.map((key) => (
            <li key={key}>
              <button
                className={`resource-button ${selectedResource === key ? 'active' : ''}`}
                onClick={() => handleSelectResource(key)}
              >
                {resourceNameMap[key] || key}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="codex-details-view">
        {selectedResource ? (
          <CodexView resourceId={selectedResource} isEmbedded={true} />
        ) : (
          <p className="codex-placeholder">Selecciona un recurso de la lista para ver sus detalles.</p>
        )}
      </div>
    </div>
  );
};

export default CodexHub;
