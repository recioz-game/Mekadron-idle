import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const AuroraMessageHandler: React.FC = () => {
  const { gameState, dispatch } = useGame();

  // Sistema de mensajes basado en el progreso
  useEffect(() => {
    const { aurora, drones, resources, energy, storage, techCenter, currentScene } = gameState;
    const { shownMessages, currentMessage } = aurora;

    // Verificación defensiva: asegurar que shownMessages sea un Set
    const safeShownMessages = shownMessages instanceof Set ? shownMessages : new Set();

    if (currentMessage) {
      return;
    }

    const addAuroraMessage = (message: string, key: string) => {
      dispatch({ type: 'ADD_AURORA_MESSAGE', payload: { message, messageKey: key } });
    };

    if (currentScene === 'main' && drones.basic === 0 && resources.scrap < 10 && !safeShownMessages.has("initial")) {
      addAuroraMessage("Sistema de reactivación iniciado. Consulta las Misiones para tus primeros objetivos.", "initial");
    }
    if (drones.basic === 1 && !safeShownMessages.has("first_drone")) {
        addAuroraMessage("Unidad de reparación funcional. Eficiencia: 12%. Buen inicio, técnico.", "first_drone");
    }
    if (energy.solarPanels === 1 && !safeShownMessages.has("first_solar")) {
        addAuroraMessage("Suministro energético estabilizado. Los sistemas de soporte vuelven a responder.", "first_solar");
    }
    if (drones.basic >= 5 && !safeShownMessages.has("unlock_medium")) {
        addAuroraMessage("Red de drones básicos operativa. Protocolos de ensamblaje medio disponibles en el Taller.", "unlock_medium");
    }
    if (drones.medium === 1 && !safeShownMessages.has("first_medium")) {
        addAuroraMessage("Eficiencia de recolección incrementada. Continué con la expansión de la flota.", "first_medium");
    }
    if (resources.energy < 5 && !safeShownMessages.has("low_energy")) {
        addAuroraMessage("Advertencia: Reservas energéticas críticas. Priorice la construcción de generadores.", "low_energy");
    }
    if (resources.scrap >= resources.maxScrap * 0.95 && !safeShownMessages.has("storage_full")) {
        addAuroraMessage("Capacidad de almacenamiento al 95%. Considere expandir las instalaciones de almacenamiento.", "storage_full");
    }
    if (storage.basicStorage === 1 && !safeShownMessages.has("first_storage")) {
        addAuroraMessage("Depósitos restaurados. Capacidad de almacenamiento incrementada.", "first_storage");
    }
    if (drones.medium >= 3 && energy.advancedSolar >= 1 && 
        !techCenter.unlocked && !safeShownMessages.has("tech_center_available")) {
        addAuroraMessage("He detectado que cumples los requisitos para reactivar el Centro Técnico. Podríamos optimizar todos nuestros sistemas desde allí.", "tech_center_available");
    }
    if (techCenter.upgrades.reinforcedBasicDrones === 1 && !safeShownMessages.has("reinforced_basic_unlocked")) {
        addAuroraMessage("Protocolos de drones reforzados básicos desbloqueados. Ahora podemos construir unidades más resistentes en el Taller.", "reinforced_basic_unlocked");
    }
    if (techCenter.upgrades.reinforcedMediumDrones === 1 && !safeShownMessages.has("reinforced_medium_unlocked")) {
        addAuroraMessage("Tecnología de drones reforzados medios disponible. La eficiencia de recolección aumentará significativamente.", "reinforced_medium_unlocked");
    }
    if (techCenter.upgrades.reinforcedAdvancedDrones === 1 && !safeShownMessages.has("reinforced_advanced_unlocked")) {
        addAuroraMessage("Drones reforzados avanzados desbloqueados. Hemos alcanzado la cúspide de la automatización de reciclado.", "reinforced_advanced_unlocked");
    }
    if (techCenter.upgrades.researchEfficiency === 1 && !safeShownMessages.has("research_efficiency_unlocked")) {
        addAuroraMessage("Algoritmos de investigación optimizados. La generación base de puntos de investigación ha aumentado.", "research_efficiency_unlocked");
    }
    if (techCenter.upgrades.advancedAnalysis === 1 && !safeShownMessages.has("advanced_analysis_unlocked")) {
        addAuroraMessage("Sistemas de análisis avanzado activados. Los drones ahora contribuyen más a la investigación.", "advanced_analysis_unlocked");
    }
    if (techCenter.upgrades.algorithmOptimization === 1 && !safeShownMessages.has("algorithm_optimization_unlocked")) {
        addAuroraMessage("Optimización algorítmica completada. La energía sobrante genera significativamente más puntos de investigación.", "algorithm_optimization_unlocked");
    }
  }, [gameState, dispatch]);

  // Procesador de la cola de mensajes de Aurora
  useEffect(() => {
    const { aurora } = gameState;
    if (aurora.messageQueue.length > 0 && !aurora.currentMessage) {
      const { message, key } = aurora.messageQueue[0];
      dispatch({ type: 'ADD_AURORA_MESSAGE', payload: { message, messageKey: key } });
    }
  }, [gameState.aurora, dispatch]);

  return null;
};

export default AuroraMessageHandler;
