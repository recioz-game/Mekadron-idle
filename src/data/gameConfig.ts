// src/data/gameConfig.ts

// Intervalo del bucle de juego principal en milisegundos.
export const TICK_INTERVAL = 1000; // 1 tick por segundo

export const gameConfig = {
  repair: {
    healthCostPerPoint: 50, // Coste en Chatarra por cada punto de vida reparado
    shieldCostPerPoint: 0.2, // Coste en Barras de Combustible por cada punto de escudo reparado
    
    // Multiplicadores de coste de reparación según el modelo del Vindicator
    repairCostMultipliers: {
      base: 1,
      vm01_origin: 1.25,
      vm02_interceptor: 1.5,
      // Se pueden añadir futuros multiplicadores aquí
    }
  },
  // Otros valores de configuración del juego pueden ir aquí en el futuro
};
