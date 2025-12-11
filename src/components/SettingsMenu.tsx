import React, { useState } from 'react';
import './SettingsMenu.css'; // Importar el archivo CSS
import { useGame } from '../context/GameContext';
import settingsButtonIcon from '../assets/images/ui/settings-button.png';
import settingsButtonPhase2Icon from '../assets/images/ui/settings-button-phase2.png';
import LZString from 'lz-string';

import CodexHub from './CodexHub';

type ActiveTab = 'sound' | 'visuals' | 'gameplay' | 'save' | 'dev' | 'codex';

const SettingsMenu: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<ActiveTab>('sound');
  const [exportData, setExportData] = useState('');
  const [importData, setImportData] = useState('');

  const { masterVolume, musicVolume, sfxVolume, voiceVolume, uiAnimationsEnabled, floatingTextEnabled, numberFormat, auroraNotificationsEnabled, actionConfirmationsEnabled } = gameState.settings;

  const isPhase2 = gameState.currentScene === 'phase2Main';
  const currentIcon = isPhase2 ? settingsButtonPhase2Icon : settingsButtonIcon;

  // --- Funciones de Desarrollo (limpiadas) ---
  const handleDebugUnlock = () => {
    const event = new CustomEvent('debugUnlockTechCenter');
    window.dispatchEvent(event);
  };
  const handleDebugCompleteVindicator = () => {
    const event = new CustomEvent('debugCompleteVindicator');
    window.dispatchEvent(event);
  };
  const handleDebugFinishExpeditions = () => {
    const event = new CustomEvent('debugFinishExpeditions');
    window.dispatchEvent(event);
  };
  const handleDebugUnlockMK1 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK1' });
  const handleDebugUnlockMK2 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK2' });
  const handleDebugUnlockMK3 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK3' });
  const handleDebugUnlockMK4 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK4' });
  const handleDebugUnlockMK5 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK5' });
  const handleDebugUnlockMK6 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK6' });
  const handleDebugUnlockMK7 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK7' });
  const handleDebugUnlockMK8 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK8' });
    const handleDebugUnlockMK9 = () => dispatch({ type: 'DEBUG_UNLOCK_VINDICATOR_MK9' });

  const handleExport = () => {
    try {
      const stateToSave = {
        ...gameState,
        aurora: {
          ...gameState.aurora,
          shownMessages: Array.from(gameState.aurora.shownMessages),
        },
      };
            const jsonString = JSON.stringify(stateToSave);
      const compressedString = LZString.compressToBase64(jsonString);
      setExportData(compressedString);
    } catch (error) {
      console.error("Error al exportar la partida:", error);
      setExportData("Error al generar el código.");
    }
  };

    const handleImport = () => {
    if (!importData) {
      alert("Pega tu código de guardado en el cuadro de texto antes de importar.");
      return;
    }

    // --- CÓDIGO DE ACTIVACIÓN DE DEBUG ---
    if (importData.trim() === 'modo_debug_mekadron') {
      dispatch({ type: 'ENABLE_DEV_TOOLS' });
      alert("Modo de desarrollo activado.");
      setIsOpen(false);
      return;
    }

    if (window.confirm("¿Estás seguro? Esto sobreescribirá tu progreso actual.")) {
      try {
        const decompressedString = LZString.decompressFromBase64(importData);
        if (!decompressedString) {
          throw new Error("El código de guardado está corrupto o es inválido.");
        }
        const newState = JSON.parse(decompressedString);
        dispatch({ type: 'LOAD_STATE', payload: newState });
        setIsOpen(false);
      } catch (error) {
        console.error("Error al importar la partida:", error);
        alert("El código de guardado no es válido. La partida no se ha podido cargar.");
      }
    }
  };

  const handleResetGame = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo el progreso? Esta acción no se puede deshacer.')) {
      const event = new CustomEvent('resetGame');
      window.dispatchEvent(event);
      setIsOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'sound':
        return (
          <div className="sound-settings">
            <strong className="settings-section-title">SONIDO</strong>
            <div className="volume-control">
              <label>Volumen General: {masterVolume}%</label>
              <input type="range" min="0" max="100" value={masterVolume} onChange={(e) => dispatch({ type: 'SET_MASTER_VOLUME', payload: Number(e.target.value) })} />
            </div>
            <div className="volume-control">
              <label>Música (BSO): {musicVolume}%</label>
              <input type="range" min="0" max="100" value={musicVolume} onChange={(e) => dispatch({ type: 'SET_MUSIC_VOLUME', payload: Number(e.target.value) })} />
            </div>
                        <div className="volume-control">
              <label>Efectos (SFX): {sfxVolume}%</label>
              <input type="range" min="0" max="100" value={sfxVolume} onChange={(e) => dispatch({ type: 'SET_SFX_VOLUME', payload: Number(e.target.value) })} />
            </div>
            <div className="volume-control">
              <label>Voces (Aurora): {voiceVolume}%</label>
              <input type="range" min="0" max="100" value={voiceVolume} onChange={(e) => dispatch({ type: 'SET_VOICE_VOLUME', payload: Number(e.target.value) })} />
            </div>
          </div>
        );
            case 'visuals':
        return (
          <div className="visual-settings">
            <strong className="settings-section-title">VISUALES</strong>
            <div className="toggle-control">
              <label>Animaciones de Interfaz</label>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_UI_ANIMATIONS' })}
                className={`toggle-button ${uiAnimationsEnabled ? 'on' : 'off'}`}
              >
                {uiAnimationsEnabled ? 'Activadas' : 'Desactivadas'}
              </button>
            </div>
            <div className="toggle-control">
              <label>Textos Flotantes (+Recursos)</label>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_FLOATING_TEXT' })}
                className={`toggle-button ${floatingTextEnabled ? 'on' : 'off'}`}
              >
                {floatingTextEnabled ? 'Activados' : 'Desactivados'}
              </button>
            </div>
          </div>
        );
                  case 'gameplay':
        return (
          <div className="gameplay-settings">
            <strong className="settings-section-title">JUGABILIDAD</strong>
            
            <div className="setting-option-vertical">
              <label>Formato de Números</label>
              
              <div className="button-choice">
                <button 
                  onClick={() => dispatch({ type: 'SET_NUMBER_FORMAT', payload: 'full' })}
                  className={`toggle-button ${numberFormat === 'full' ? 'active' : ''}`}
                >
                  Completo
                </button>
                <div className="choice-description">
                  <p>Muestra los números enteros.</p>
                  <span>Ej: 1.250.000</span>
                </div>
              </div>

              <div className="button-choice">
                <button 
                  onClick={() => dispatch({ type: 'SET_NUMBER_FORMAT', payload: 'abbreviated' })}
                  className={`toggle-button ${numberFormat === 'abbreviated' ? 'active' : ''}`}
                >
                  Abreviado
                </button>
                <div className="choice-description">
                  <p>Usa sufijos para miles (K), millones (M), etc.</p>
                  <span>Ej: 1.25M</span>
                </div>
              </div>

              <div className="button-choice">
                <button 
                  onClick={() => dispatch({ type: 'SET_NUMBER_FORMAT', payload: 'scientific' })}
                  className={`toggle-button ${numberFormat === 'scientific' ? 'active' : ''}`}
                >
                  Científico
                </button>
                <div className="choice-description">
                  <p>Usa notación científica para números grandes.</p>
                  <span>Ej: 1.25e6</span>
                </div>
              </div>
            </div>

            <div className="button-choice">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_AURORA_NOTIFICATIONS' })}
                className={`toggle-button ${auroraNotificationsEnabled ? 'on' : 'off'}`}
              >
                {auroraNotificationsEnabled ? 'Activadas' : 'Desactivadas'}
              </button>
              <div className="choice-description">
                <p>Muestra notificaciones informativas de Aurora.</p>
                <span>Ej: "Nuevo módulo desbloqueado". El tutorial no se verá afectado.</span>
              </div>
            </div>

            <div className="button-choice">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_ACTION_CONFIRMATIONS' })}
                className={`toggle-button ${actionConfirmationsEnabled ? 'on' : 'off'}`}
              >
                {actionConfirmationsEnabled ? 'Activadas' : 'Desactivadas'}
              </button>
              <div className="choice-description">
                <p>Pide confirmación antes de realizar acciones destructivas.</p>
                <span>Ej: Desmantelar drones.</span>
              </div>
            </div>
          </div>
        );
            case 'save':
        return (
          <div className="save-settings">
            <strong className="settings-section-title">GESTIÓN DE PARTIDA</strong>
            
            <div className="setting-option-vertical">
              <label>Exportar Partida</label>
              <div className="save-description">
                <p>Copia este código y guárdalo en un lugar seguro para tener una copia de seguridad de tu progreso.</p>
              </div>
              <button onClick={handleExport} className="action-button">Generar Código de Exportación</button>
              {exportData && <textarea readOnly value={exportData} className="save-textarea" />}
            </div>

            <div className="setting-option-vertical">
              <label>Importar Partida</label>
              <div className="save-description">
                <p>Pega un código de guardado en el cuadro de abajo y pulsa "Cargar Partida".</p>
                <strong>¡Atención! Esto sobreescribirá tu progreso actual.</strong>
              </div>
              <textarea 
                value={importData} 
                onChange={(e) => setImportData(e.target.value)} 
                placeholder="Pega tu código aquí..."
                className="save-textarea"
              />
              <button onClick={handleImport} className="action-button import">Cargar Partida</button>
            </div>

            <div className="setting-option-vertical">
              <label>Reiniciar Partida</label>
              <div className="save-description">
                <p>Borra permanentemente todo tu progreso y empieza el juego desde el principio.</p>
                <strong>¡Esta acción no se puede deshacer!</strong>
              </div>
              <button onClick={handleResetGame} className="action-button reset">Reiniciar Juego</button>
            </div>
          </div>
        );
      case 'codex':
        return <CodexHub />;
      case 'dev':
        return (
          <div className="dev-settings">
            <strong className="dev-section-title">AJUSTES DE DESARROLLO</strong>
            <button onClick={() => dispatch({ type: 'TOGGLE_GOD_MODE' })} className={`dev-button ${gameState.godMode ? 'god-mode-active' : ''}`}>Modo Dios: {gameState.godMode ? 'Activado' : 'Desactivado'}</button>
            <button onClick={handleDebugUnlock} className="dev-button">Desbloquear Módulos</button>
            <button onClick={handleDebugCompleteVindicator} className="dev-button">Completar Vindicator</button>
            <button onClick={handleDebugFinishExpeditions} className="dev-button">Finalizar Expediciones</button>
            <button onClick={handleDebugUnlockMK1} className="dev-button">Desbloquear VM01 — Origin</button>
            <button onClick={handleDebugUnlockMK2} className="dev-button">Desbloquear VM02 — Interceptor</button>
            <button onClick={handleDebugUnlockMK3} className="dev-button">Desbloquear VM03 — Devastator</button>
            <button onClick={handleDebugUnlockMK4} className="dev-button">Desbloquear VM04 — Reaper</button>
            <button onClick={handleDebugUnlockMK5} className="dev-button">Desbloquear VM05 — Aegis</button>
            <button onClick={handleDebugUnlockMK6} className="dev-button">Desbloquear VM06 — Tempest</button>
            <button onClick={handleDebugUnlockMK7} className="dev-button">Desbloquear VM07 — Wraith</button>
            <button onClick={handleDebugUnlockMK8} className="dev-button">Desbloquear VM08 — Phantom</button>
            <button onClick={handleDebugUnlockMK9} className="dev-button">Desbloquear VM09 — Apex</button>
            <button onClick={handleResetGame} className="dev-button reset-button">Reiniciar Juego</button>
          </div>
        );
      default:
        return null;
    }
  };

    const settingsContainerClass = `settings-panel-container ${isPhase2 ? 'theme-phase2' : ''}`;

    return (
    <div className="settings-menu-container">
      {isOpen && (
        <div className={settingsContainerClass} onClick={() => setIsOpen(false)}>
          <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
            <div className="settings-sidebar">
              <button onClick={() => setActiveTab('sound')} className={activeTab === 'sound' ? 'active' : ''}>Sonido</button>
              <button onClick={() => setActiveTab('visuals')} className={activeTab === 'visuals' ? 'active' : ''}>Visuales</button>
              <button onClick={() => setActiveTab('gameplay')} className={activeTab === 'gameplay' ? 'active' : ''}>Jugabilidad</button>
              <button onClick={() => setActiveTab('codex')} className={activeTab === 'codex' ? 'active' : ''}>Códice</button>
              <button onClick={() => setActiveTab('save')} className={activeTab === 'save' ? 'active' : ''}>Partida</button>
              <button onClick={() => dispatch({ type: 'SHOW_CREDITS' })}>Créditos</button>
              {(import.meta.env.DEV || gameState.settings.devToolsEnabled) && (
                <button onClick={() => setActiveTab('dev')} className={activeTab === 'dev' ? 'active' : ''}>Desarrollo</button>
              )}
            </div>
            <div className="settings-content">
              <button onClick={() => setIsOpen(false)} className="view-close-button red">×</button>
              {renderContent()}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Ajustes"
        className="settings-toggle-button"
      >
        <img src={currentIcon} alt="Ajustes" />
      </button>
    </div>
  );
};

export default SettingsMenu;



