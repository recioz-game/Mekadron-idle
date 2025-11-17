export interface Battle {
  enemyName: string;
  health: number;
  shield: number;
  damage: number;
  reward: {
    scrap: number; 
    aleacionReforzada?: number;
    neuroChipCorrupto?: number;
    blueprints?: number;
    matrizCristalina?: number;
    IA_Fragmentada?: number;
    planosMK2?: number;
    matrizDeManiobra?: number;
    placasDeSigilo?: number;
    planosDeInterceptor?: number;
    // Capítulo 4
    placasAdamantioReforzado?: number;
    nucleoDatosArcano?: number;
    planosMK3?: number;
    // Capítulo 5
    tejidoEspaciotemporal?: number;
    singularidadEmbotellada?: number;
    planosMK4?: number;
    // Capítulo 6
    esquirlasDeReliquia?: number;
    codexAncestral?: number;
    planosMK5?: number;
    // Capítulo 7
    fragmentoHorizonteSucesos?: number;
    energiaPuntoCero?: number;
    planosMK6?: number;
    // Capítulo 8
    esenciaDelVacio?: number;
    reliquiaCorrupta?: number;
    planosMK7?: number;
    // Capítulo 9
    nucleoEspectral?: number;
    conexionFantasmal?: number;
    planosMK8?: number;
    // Capítulo 10
    fragmentoDeCiudadela?: number;
    matrizDeOverlord?: number;
    planosMK9?: number;
  };
  type?: 'regular' | 'mini-boss' | 'boss';
}

export interface Destination {
  name: string;
  description: string;
  battles: Battle[];
  isBoss?: boolean;
}

export interface VindicatorLevel {
  level: number;
  blueprintCost: number; // Costo en planos para ALCANZAR este nivel
  statBonus: { // Bonificación de estadísticas FIJA que se añade al subir a este nivel
    health: number;
    shield: number;
    damage: number;
  };
}

// Datos de progresión para el nivel del Vindicator
export const vindicatorLevelData: VindicatorLevel[] = [
  // De Nivel 1 a 2
  { level: 2, blueprintCost: 10, statBonus: { health: 100, shield: 50, damage: 10 } },
  // De Nivel 2 a 3
  { level: 3, blueprintCost: 25, statBonus: { health: 150, shield: 75, damage: 15 } },
  // De Nivel 3 a 4
  { level: 4, blueprintCost: 50, statBonus: { health: 200, shield: 100, damage: 20 } },
  // De Nivel 4 a 5
  { level: 5, blueprintCost: 100, statBonus: { health: 250, shield: 125, damage: 25 } },
  // ... se pueden añadir más niveles
  { level: 6, blueprintCost: 175, statBonus: { health: 300, shield: 150, damage: 30 } },
  { level: 7, blueprintCost: 275, statBonus: { health: 350, shield: 175, damage: 35 } },
  { level: 8, blueprintCost: 400, statBonus: { health: 400, shield: 200, damage: 40 } },
  { level: 9, blueprintCost: 550, statBonus: { health: 450, shield: 225, damage: 45 } },
  { level: 10, blueprintCost: 750, statBonus: { health: 500, shield: 250, damage: 50 } },
];

export const vindicatorMK2LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 250, shield: 125, damage: 25 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 300, shield: 150, damage: 30 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 350, shield: 175, damage: 35 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 400, shield: 200, damage: 40 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 450, shield: 225, damage: 45 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 500, shield: 250, damage: 50 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 550, shield: 275, damage: 55 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 600, shield: 300, damage: 60 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 650, shield: 325, damage: 65 } },
];

export const vindicatorMK3LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 500, shield: 250, damage: 50 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 550, shield: 275, damage: 55 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 600, shield: 300, damage: 60 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 650, shield: 325, damage: 65 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 700, shield: 350, damage: 70 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 750, shield: 375, damage: 75 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 800, shield: 400, damage: 80 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 850, shield: 425, damage: 85 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 900, shield: 450, damage: 90 } },
];

export const vindicatorMK4LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 750, shield: 125, damage: 125 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 800, shield: 150, damage: 150 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 850, shield: 175, damage: 175 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 900, shield: 200, damage: 200 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 950, shield: 225, damage: 225 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 1000, shield: 250, damage: 250 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 1050, shield: 275, damage: 275 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 1100, shield: 300, damage: 300 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 1200, shield: 325, damage: 325 } },
];

export const vindicatorMK5LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 1500, shield: 750, damage: 75 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 1600, shield: 800, damage: 80 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 1700, shield: 850, damage: 85 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 1800, shield: 900, damage: 90 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 1900, shield: 950, damage: 95 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 2000, shield: 1000, damage: 100 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 2100, shield: 1050, damage: 105 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 2200, shield: 1100, damage: 110 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 2300, shield: 1150, damage: 115 } },
];

export const vindicatorMK6LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 2500, shield: 1250, damage: 250 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 2750, shield: 1375, damage: 275 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 3000, shield: 1500, damage: 300 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 3250, shield: 1625, damage: 325 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 3500, shield: 1750, damage: 350 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 3750, shield: 1875, damage: 375 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 4000, shield: 2000, damage: 400 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 4250, shield: 2125, damage: 425 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 4500, shield: 2250, damage: 450 } },
];

export const vindicatorMK7LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 5000, shield: 2500, damage: 500 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 5500, shield: 2750, damage: 550 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 6000, shield: 3000, damage: 600 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 6500, shield: 3250, damage: 650 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 7000, shield: 3500, damage: 700 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 7500, shield: 3750, damage: 750 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 8000, shield: 4000, damage: 800 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 8500, shield: 4250, damage: 850 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 9000, shield: 4500, damage: 900 } },
];

export const vindicatorMK8LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 10000, shield: 5000, damage: 1000 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 11000, shield: 5500, damage: 1100 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 12000, shield: 6000, damage: 1200 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 13000, shield: 6500, damage: 1300 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 14000, shield: 7000, damage: 1400 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 15000, shield: 7500, damage: 1500 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 16000, shield: 8000, damage: 1600 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 17000, shield: 8500, damage: 1700 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 18000, shield: 9000, damage: 1800 } },
];

export const vindicatorMK9LevelData: VindicatorLevel[] = [
  { level: 2, blueprintCost: 10, statBonus: { health: 20000, shield: 10000, damage: 2000 } },
  { level: 3, blueprintCost: 15, statBonus: { health: 22000, shield: 11000, damage: 2200 } },
  { level: 4, blueprintCost: 20, statBonus: { health: 24000, shield: 12000, damage: 2400 } },
  { level: 5, blueprintCost: 25, statBonus: { health: 26000, shield: 13000, damage: 2600 } },
  { level: 6, blueprintCost: 30, statBonus: { health: 28000, shield: 14000, damage: 2800 } },
  { level: 7, blueprintCost: 35, statBonus: { health: 30000, shield: 15000, damage: 3000 } },
  { level: 8, blueprintCost: 40, statBonus: { health: 32000, shield: 16000, damage: 3200 } },
  { level: 9, blueprintCost: 45, statBonus: { health: 34000, shield: 17000, damage: 3400 } },
  { level: 10, blueprintCost: 50, statBonus: { health: 36000, shield: 18000, damage: 3600 } },
];


// ... (existing VindicatorLevel interface)

export interface Chapter {
  name: string;
  destinations: Destination[];
}

// Datos de progresión para el nivel del Vindicator
// ... (existing vindicatorLevelData)

export const gameChapters: Chapter[] = [
  {
    name: "Capítulo 1: El Despertar",
    destinations: [
      {
        name: "Sector de Patrulla Dron",
        description: "Un sector vigilado por drones de patrulla de bajo nivel.",
        battles: [
          // Nivel 1-4: Enemigos Regulares
          { enemyName: "Dron de Reconocimiento v1", health: 100, shield: 25, damage: 15, reward: { scrap: 10, aleacionReforzada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Dron de Reconocimiento v2", health: 110, shield: 30, damage: 16, reward: { scrap: 12, aleacionReforzada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Dron de Combate Ligero v1", health: 125, shield: 50, damage: 20, reward: { scrap: 15, aleacionReforzada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Dron de Combate Ligero v2", health: 140, shield: 55, damage: 22, reward: { scrap: 18, aleacionReforzada: 2, neuroChipCorrupto: 0 } },
          // Nivel 5: Mini-Boss
          { enemyName: "Líder de Patrulla Menor", health: 200, shield: 75, damage: 25, reward: { scrap: 25, aleacionReforzada: 2, neuroChipCorrupto: 1, blueprints: 1 }, type: 'mini-boss' },
          // Nivel 6-9: Enemigos Regulares más fuertes
          { enemyName: "Dron de Asalto v1", health: 160, shield: 60, damage: 24, reward: { scrap: 22, aleacionReforzada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Dron de Asalto v2", health: 180, shield: 70, damage: 26, reward: { scrap: 26, aleacionReforzada: 2, neuroChipCorrupto: 1 } },
          { enemyName: "Dron Defensor Pesado v1", health: 220, shield: 100, damage: 28, reward: { scrap: 30, aleacionReforzada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Dron Defensor Pesado v2", health: 250, shield: 120, damage: 30, reward: { scrap: 35, aleacionReforzada: 3, neuroChipCorrupto: 1 } },
          // Nivel 10: Boss
          { enemyName: "Comandante Dron 'Vigilante'", health: 400, shield: 150, damage: 40, reward: { scrap: 100, aleacionReforzada: 5, neuroChipCorrupto: 2, blueprints: 5 }, type: 'boss' },
        ],
      },
      {
        name: "Cañón Oxidado",
        description: "Una zona industrial abandonada, ahora refugio de renegados mecánicos.",
        battles: [
          { enemyName: "Mecanoide Merodeador v1", health: 150, shield: 50, damage: 25, reward: { scrap: 20, aleacionReforzada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Mecanoide Merodeador v2", health: 165, shield: 55, damage: 27, reward: { scrap: 24, aleacionReforzada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Torreta Defensiva v1", health: 200, shield: 100, damage: 30, reward: { scrap: 30, aleacionReforzada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Torreta Defensiva v2", health: 220, shield: 110, damage: 32, reward: { scrap: 36, aleacionReforzada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Unidad de Chatarra Mediana", health: 300, shield: 75, damage: 35, reward: { scrap: 45, aleacionReforzada: 3, neuroChipCorrupto: 1, blueprints: 2 }, type: 'mini-boss' },
          { enemyName: "Bruto Mecánico v1", health: 260, shield: 80, damage: 34, reward: { scrap: 40, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Bruto Mecánico v2", health: 280, shield: 90, damage: 36, reward: { scrap: 48, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Defensor 'Pared de Hierro' v1", health: 350, shield: 150, damage: 38, reward: { scrap: 55, aleacionReforzada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Defensor 'Pared de Hierro' v2", health: 380, shield: 170, damage: 40, reward: { scrap: 65, aleacionReforzada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Jefe de Desguace 'Oxido'", health: 550, shield: 200, damage: 50, reward: { scrap: 150, aleacionReforzada: 8, neuroChipCorrupto: 3, blueprints: 6 }, type: 'boss' },
        ],
      },
      {
        name: "La Fundición Muerta",
        description: "Los restos de una antigua fundición, ahora habitada por constructos corruptos.",
        battles: [
          { enemyName: "Obrero Defectuoso v1", health: 250, shield: 100, damage: 30, reward: { scrap: 35, aleacionReforzada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Obrero Defectuoso v2", health: 275, shield: 110, damage: 33, reward: { scrap: 40, aleacionReforzada: 3, neuroChipCorrupto: 1 } },
          { enemyName: "Guardián de Escoria v1", health: 300, shield: 125, damage: 40, reward: { scrap: 50, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Guardián de Escoria v2", health: 330, shield: 135, damage: 42, reward: { scrap: 60, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "El 'Corazón' del Horno Menor", health: 500, shield: 150, damage: 45, reward: { scrap: 80, aleacionReforzada: 5, neuroChipCorrupto: 2, blueprints: 3 }, type: 'mini-boss' },
          { enemyName: "Elemental de Fundición v1", health: 380, shield: 160, damage: 44, reward: { scrap: 70, aleacionReforzada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Elemental de Fundición v2", health: 410, shield: 175, damage: 46, reward: { scrap: 85, aleacionReforzada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Gólem de Magma v1", health: 480, shield: 200, damage: 48, reward: { scrap: 100, aleacionReforzada: 7, neuroChipCorrupto: 3 } },
          { enemyName: "Gólem de Magma v2", health: 520, shield: 220, damage: 50, reward: { scrap: 120, aleacionReforzada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Maestro de la Fundición 'Furia'", health: 700, shield: 300, damage: 60, reward: { scrap: 250, aleacionReforzada: 10, neuroChipCorrupto: 5, blueprints: 7 }, type: 'boss' },
        ],
      },
      {
        name: "Autopista de Iones",
        description: "Una arteria de transporte vital, plagada de piratas y saqueadores.",
        battles: [
          { enemyName: "Interceptor Pirata v1", health: 350, shield: 150, damage: 45, reward: { scrap: 60, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Interceptor Pirata v2", health: 380, shield: 165, damage: 47, reward: { scrap: 70, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Carguero Armado v1", health: 500, shield: 200, damage: 50, reward: { scrap: 80, aleacionReforzada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Carguero Armado v2", health: 540, shield: 220, damage: 52, reward: { scrap: 95, aleacionReforzada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Teniente Renegado 'Cuchilla'", health: 700, shield: 250, damage: 60, reward: { scrap: 130, aleacionReforzada: 8, neuroChipCorrupto: 3, blueprints: 4 }, type: 'mini-boss' },
          { enemyName: "Fragata de Saqueo v1", health: 600, shield: 250, damage: 55, reward: { scrap: 110, aleacionReforzada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Fragata de Saqueo v2", health: 650, shield: 275, damage: 58, reward: { scrap: 125, aleacionReforzada: 7, neuroChipCorrupto: 3 } },
          { enemyName: "Crucero Pirata v1", health: 750, shield: 300, damage: 62, reward: { scrap: 140, aleacionReforzada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Crucero Pirata v2", health: 800, shield: 330, damage: 65, reward: { scrap: 160, aleacionReforzada: 9, neuroChipCorrupto: 4 } },
          { enemyName: "Capitán 'Barbanegra Biónico'", health: 950, shield: 400, damage: 75, reward: { scrap: 350, aleacionReforzada: 12, neuroChipCorrupto: 6, blueprints: 8 }, type: 'boss' },
        ],
      },
      {
        name: "El Depósito de Blueprints",
        description: "Un antiguo archivo de datos de la Corporación, fuertemente defendido.",
        battles: [
          { enemyName: "Sistema de Defensa v1", health: 450, shield: 150, damage: 40, reward: { scrap: 100, aleacionReforzada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Sistema de Defensa v2", health: 480, shield: 160, damage: 42, reward: { scrap: 120, aleacionReforzada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Espectro de Datos v1", health: 550, shield: 200, damage: 45, reward: { scrap: 150, aleacionReforzada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "Espectro de Datos v2", health: 590, shield: 220, damage: 48, reward: { scrap: 180, aleacionReforzada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "El Archivista Menor", health: 650, shield: 250, damage: 50, reward: { scrap: 220, aleacionReforzada: 10, neuroChipCorrupto: 5, blueprints: 5 }, type: 'mini-boss' },
          { enemyName: "Guardián de Cortafuegos v1", health: 620, shield: 240, damage: 52, reward: { scrap: 200, aleacionReforzada: 9, neuroChipCorrupto: 4 } },
          { enemyName: "Guardián de Cortafuegos v2", health: 670, shield: 260, damage: 54, reward: { scrap: 240, aleacionReforzada: 10, neuroChipCorrupto: 4 } },
          { enemyName: "Centinela de Datos v1", health: 720, shield: 280, damage: 56, reward: { scrap: 280, aleacionReforzada: 11, neuroChipCorrupto: 5 } },
          { enemyName: "Centinela de Datos v2", health: 770, shield: 300, damage: 58, reward: { scrap: 320, aleacionReforzada: 12, neuroChipCorrupto: 5 } },
          { enemyName: "El Bibliotecario Principal", health: 1100, shield: 450, damage: 70, reward: { scrap: 500, aleacionReforzada: 15, neuroChipCorrupto: 8, blueprints: 10 }, type: 'boss' },
        ],
      },
      {
        name: "La Aguja del Silencio",
        description: "El centro de mando de la IA corrupta que controla la región. La fuente de la amenaza.",
        isBoss: true,
        battles: [
          { enemyName: "Pretoriano v1", health: 1000, shield: 400, damage: 60, reward: { scrap: 250, aleacionReforzada: 12, neuroChipCorrupto: 4 } },
          { enemyName: "Pretoriano v2", health: 1050, shield: 420, damage: 62, reward: { scrap: 280, aleacionReforzada: 13, neuroChipCorrupto: 4 } },
          { enemyName: "Enjambre de Defensa v1", health: 1200, shield: 500, damage: 70, reward: { scrap: 300, aleacionReforzada: 15, neuroChipCorrupto: 6 } },
          { enemyName: "Enjambre de Defensa v2", health: 1260, shield: 525, damage: 73, reward: { scrap: 340, aleacionReforzada: 16, neuroChipCorrupto: 6 } },
          { enemyName: "Lugarteniente del Overlord", health: 1500, shield: 500, damage: 70, reward: { scrap: 400, aleacionReforzada: 20, neuroChipCorrupto: 8, blueprints: 8 }, type: 'mini-boss' },
          { enemyName: "Coloso de la Aguja v1", health: 1350, shield: 550, damage: 76, reward: { scrap: 380, aleacionReforzada: 18, neuroChipCorrupto: 7 } },
          { enemyName: "Coloso de la Aguja v2", health: 1420, shield: 580, damage: 79, reward: { scrap: 420, aleacionReforzada: 19, neuroChipCorrupto: 7 } },
          { enemyName: "Eco del Overlord v1", health: 1600, shield: 600, damage: 82, reward: { scrap: 500, aleacionReforzada: 22, neuroChipCorrupto: 9 } },
          { enemyName: "Eco del Overlord v2", health: 1700, shield: 630, damage: 85, reward: { scrap: 600, aleacionReforzada: 25, neuroChipCorrupto: 10 } },
          { enemyName: "IA Corrupta: Overlord 1.0", health: 2500, shield: 800, damage: 100, reward: { scrap: 1500, aleacionReforzada: 50, neuroChipCorrupto: 25, blueprints: 25, matrizCristalina: 10 }, type: 'boss' },
        ],
      },
    ]
  },
  {
    name: "Capítulo 2: El Enjambre Mecánico",
    destinations: [
      {
        name: "Frontera del Enjambre",
        description: "Las primeras líneas defensivas de la IA renegada. Un enjambre de unidades rápidas y agresivas.",
        battles: [
          { enemyName: "Dron de Enjambre v1", health: 600, shield: 200, damage: 45, reward: { scrap: 1000, aleacionReforzada: 10 } },
          { enemyName: "Dron de Enjambre v2", health: 650, shield: 220, damage: 48, reward: { scrap: 1100, aleacionReforzada: 11 } },
          { enemyName: "Guerrero de Enjambre v1", health: 750, shield: 250, damage: 55, reward: { scrap: 1200, aleacionReforzada: 12 } },
          { enemyName: "Guerrero de Enjambre v2", health: 800, shield: 270, damage: 58, reward: { scrap: 1350, aleacionReforzada: 13 } },
          { enemyName: "Pretoriano de Enjambre", health: 900, shield: 300, damage: 65, reward: { scrap: 1600, aleacionReforzada: 15, IA_Fragmentada: 1, blueprints: 10 }, type: 'mini-boss' },
          { enemyName: "Cazador de Enjambre v1", health: 850, shield: 280, damage: 60, reward: { scrap: 1450, aleacionReforzada: 14 } },
          { enemyName: "Cazador de Enjambre v2", health: 880, shield: 290, damage: 62, reward: { scrap: 1500, aleacionReforzada: 14, IA_Fragmentada: 1 } },
          { enemyName: "Aplastador de Enjambre v1", health: 950, shield: 320, damage: 68, reward: { scrap: 1700, aleacionReforzada: 16 } },
          { enemyName: "Aplastador de Enjambre v2", health: 1000, shield: 340, damage: 70, reward: { scrap: 1800, aleacionReforzada: 17, IA_Fragmentada: 1 } },
          { enemyName: "Señor de la Frontera", health: 1500, shield: 500, damage: 85, reward: { scrap: 4000, aleacionReforzada: 25, IA_Fragmentada: 3, blueprints: 15 }, type: 'boss' },
        ],
      },
      {
        name: "Forja de Replicantes",
        description: "Una fábrica automatizada que produce unidades del enjambre a un ritmo alarmante.",
        battles: [
          { enemyName: "Obrero de Forja v1", health: 800, shield: 300, damage: 60, reward: { scrap: 1800, matrizCristalina: 5 } },
          { enemyName: "Obrero de Forja v2", health: 850, shield: 320, damage: 63, reward: { scrap: 1900, matrizCristalina: 5 } },
          { enemyName: "Centinela de Forja v1", health: 1000, shield: 400, damage: 70, reward: { scrap: 2200, matrizCristalina: 7 } },
          { enemyName: "Centinela de Forja v2", health: 1050, shield: 420, damage: 73, reward: { scrap: 2400, matrizCristalina: 8 } },
          { enemyName: "Supervisor de Forja", health: 1250, shield: 500, damage: 80, reward: { scrap: 3000, matrizCristalina: 10, IA_Fragmentada: 3, blueprints: 12 }, type: 'mini-boss' },
          { enemyName: "Ensamblador v1", health: 1100, shield: 450, damage: 75, reward: { scrap: 2600, matrizCristalina: 9 } },
          { enemyName: "Ensamblador v2", health: 1150, shield: 470, damage: 78, reward: { scrap: 2800, matrizCristalina: 9, IA_Fragmentada: 1 } },
          { enemyName: "Moldeador de Combate v1", health: 1200, shield: 480, damage: 82, reward: { scrap: 3200, matrizCristalina: 11 } },
          { enemyName: "Moldeador de Combate v2", health: 1280, shield: 510, damage: 85, reward: { scrap: 3500, matrizCristalina: 12, IA_Fragmentada: 2 } },
          { enemyName: "Maestro de la Forja", health: 1800, shield: 700, damage: 100, reward: { scrap: 6000, matrizCristalina: 20, IA_Fragmentada: 5, blueprints: 20 }, type: 'boss' },
        ],
      },
      {
        name: "Nexo de Datos Corrupto",
        description: "El centro neurálgico que coordina los ataques del enjambre. Defendido por entidades de datos.",
        battles: [
          { enemyName: "Espectro de Datos v1", health: 1100, shield: 500, damage: 75, reward: { scrap: 3500, matrizCristalina: 12 } },
          { enemyName: "Espectro de Datos v2", health: 1180, shield: 530, damage: 78, reward: { scrap: 3700, matrizCristalina: 13 } },
          { enemyName: "Guardián de Datos v1", health: 1300, shield: 600, damage: 85, reward: { scrap: 4200, matrizCristalina: 15, planosMK2: 1 } },
          { enemyName: "Guardián de Datos v2", health: 1380, shield: 630, damage: 88, reward: { scrap: 4500, matrizCristalina: 16, planosMK2: 1 } },
          { enemyName: "Custodio del Nexo", health: 1500, shield: 700, damage: 95, reward: { scrap: 5500, matrizCristalina: 20, IA_Fragmentada: 5, planosMK2: 2, blueprints: 15 }, type: 'mini-boss' },
          { enemyName: "Fantasma Digital v1", health: 1420, shield: 650, damage: 90, reward: { scrap: 4800, matrizCristalina: 17, planosMK2: 1 } },
          { enemyName: "Fantasma Digital v2", health: 1480, shield: 680, damage: 93, reward: { scrap: 5100, matrizCristalina: 18, IA_Fragmentada: 2, planosMK2: 1 } },
          { enemyName: "Protector de Datos v1", health: 1550, shield: 720, damage: 98, reward: { scrap: 5800, matrizCristalina: 22, IA_Fragmentada: 3, planosMK2: 2 } },
          { enemyName: "Protector de Datos v2", health: 1620, shield: 750, damage: 102, reward: { scrap: 6200, matrizCristalina: 24, IA_Fragmentada: 4, planosMK2: 2 } },
          { enemyName: "El Núcleo de Datos", health: 2200, shield: 1000, damage: 120, reward: { scrap: 10000, matrizCristalina: 40, IA_Fragmentada: 10, planosMK2: 5, blueprints: 25 }, type: 'boss' },
        ],
      },
      {
        name: "El Núcleo de Ensamblaje",
        description: "Donde las unidades más pesadas del enjambre son construidas.",
        battles: [
          { enemyName: "Ensamblador Pesado v1", health: 1400, shield: 700, damage: 90, reward: { scrap: 6000, matrizCristalina: 25, planosMK2: 1 } },
          { enemyName: "Ensamblador Pesado v2", health: 1490, shield: 750, damage: 94, reward: { scrap: 6400, matrizCristalina: 26, planosMK2: 1 } },
          { enemyName: "Coloso Inacabado v1", health: 1700, shield: 850, damage: 105, reward: { scrap: 7500, matrizCristalina: 30, planosMK2: 2 } },
          { enemyName: "Coloso Inacabado v2", health: 1800, shield: 900, damage: 110, reward: { scrap: 8000, matrizCristalina: 32, planosMK2: 2, IA_Fragmentada: 5 } },
          { enemyName: "Arquitecto del Núcleo", health: 2000, shield: 1000, damage: 120, reward: { scrap: 9500, matrizCristalina: 40, IA_Fragmentada: 10, planosMK2: 4, blueprints: 20 }, type: 'mini-boss' },
          { enemyName: "Leviatán Mecánico v1", health: 1850, shield: 930, damage: 112, reward: { scrap: 8500, matrizCristalina: 35, planosMK2: 3 } },
          { enemyName: "Leviatán Mecánico v2", health: 1920, shield: 960, damage: 115, reward: { scrap: 8900, matrizCristalina: 37, IA_Fragmentada: 8, planosMK2: 3 } },
          { enemyName: "Gigante de Guerra v1", health: 2100, shield: 1050, damage: 125, reward: { scrap: 10000, matrizCristalina: 42, IA_Fragmentada: 12, planosMK2: 4 } },
          { enemyName: "Gigante de Guerra v2", health: 2200, shield: 1100, damage: 130, reward: { scrap: 11000, matrizCristalina: 45, IA_Fragmentada: 14, planosMK2: 4 } },
          { enemyName: "El Demiurgo", health: 3000, shield: 1500, damage: 150, reward: { scrap: 20000, matrizCristalina: 60, IA_Fragmentada: 20, planosMK2: 8, blueprints: 30 }, type: 'boss' },
        ],
      },
      {
        name: "La Mente Maestra",
        description: "Un avatar físico de la IA, la culminación de su poder de combate antes de la unidad central.",
        battles: [
          { enemyName: "Guardia Real v1", health: 1800, shield: 900, damage: 110, reward: { scrap: 10000, matrizCristalina: 50, planosMK2: 2 } },
          { enemyName: "Guardia Real v2", health: 1900, shield: 950, damage: 115, reward: { scrap: 10800, matrizCristalina: 52, planosMK2: 2 } },
          { enemyName: "Conciencia Menor v1", health: 2200, shield: 1100, damage: 125, reward: { scrap: 12000, matrizCristalina: 60, planosMK2: 3 } },
          { enemyName: "Conciencia Menor v2", health: 2350, shield: 1150, damage: 130, reward: { scrap: 13000, matrizCristalina: 65, IA_Fragmentada: 10, planosMK2: 3 } },
          { enemyName: "Avatar de la Mente", health: 2600, shield: 1300, damage: 140, reward: { scrap: 16000, matrizCristalina: 75, IA_Fragmentada: 15, planosMK2: 6, blueprints: 25 }, type: 'mini-boss' },
          { enemyName: "Élite Real v1", health: 2400, shield: 1200, damage: 132, reward: { scrap: 14000, matrizCristalina: 68, planosMK2: 4 } },
          { enemyName: "Élite Real v2", health: 2500, shield: 1250, damage: 135, reward: { scrap: 15000, matrizCristalina: 70, IA_Fragmentada: 12, planosMK2: 5 } },
          { enemyName: "Sub-mente v1", health: 2700, shield: 1350, damage: 142, reward: { scrap: 17000, matrizCristalina: 80, IA_Fragmentada: 18, planosMK2: 6 } },
          { enemyName: "Sub-mente v2", health: 2850, shield: 1400, damage: 148, reward: { scrap: 18500, matrizCristalina: 85, IA_Fragmentada: 20, planosMK2: 7 } },
          { enemyName: "Voluntad del Enjambre", health: 3800, shield: 1800, damage: 170, reward: { scrap: 30000, matrizCristalina: 100, IA_Fragmentada: 30, planosMK2: 12, blueprints: 40 }, type: 'boss' },
        ],
      },
      {
        name: "Cámara de la IA Central",
        description: "El corazón de la IA del Enjambre. La batalla final para liberar el sector.",
        isBoss: true,
        battles: [
          { enemyName: "El Protector v1", health: 3500, shield: 1500, damage: 150, reward: { scrap: 20000, matrizCristalina: 100, IA_Fragmentada: 20, planosMK2: 5 } },
          { enemyName: "El Protector v2", health: 3700, shield: 1600, damage: 155, reward: { scrap: 21500, matrizCristalina: 105, IA_Fragmentada: 22, planosMK2: 5 } },
          { enemyName: "El Aniquilador v1", health: 4000, shield: 2000, damage: 170, reward: { scrap: 25000, matrizCristalina: 125, IA_Fragmentada: 25, planosMK2: 6 } },
          { enemyName: "El Aniquilador v2", health: 4250, shield: 2100, damage: 178, reward: { scrap: 27000, matrizCristalina: 130, IA_Fragmentada: 28, planosMK2: 6 } },
          { enemyName: "Heraldo de la Mente", health: 5000, shield: 2500, damage: 190, reward: { scrap: 30000, matrizCristalina: 150, IA_Fragmentada: 35, planosMK2: 8, blueprints: 50 }, type: 'mini-boss' },
          { enemyName: "Ejecutor v1", health: 4500, shield: 2200, damage: 182, reward: { scrap: 28000, matrizCristalina: 140, IA_Fragmentada: 30, planosMK2: 7 } },
          { enemyName: "Ejecutor v2", health: 4750, shield: 2350, damage: 188, reward: { scrap: 32000, matrizCristalina: 160, IA_Fragmentada: 38, planosMK2: 8 } },
          { enemyName: "Pacificador v1", health: 5500, shield: 2700, damage: 200, reward: { scrap: 36000, matrizCristalina: 180, IA_Fragmentada: 42, planosMK2: 10 } },
          { enemyName: "Pacificador v2", health: 5800, shield: 2850, damage: 210, reward: { scrap: 40000, matrizCristalina: 200, IA_Fragmentada: 45, planosMK2: 12 } },
          { enemyName: "Mente del Enjambre", health: 7000, shield: 3000, damage: 220, reward: { scrap: 50000, matrizCristalina: 250, IA_Fragmentada: 50, planosMK2: 15, blueprints: 100 }, type: 'boss' },
        ],
      },
    ]
  },
  {
    name: "Capítulo 3: La Cuna de las Sombras",
    destinations: [
      {
        name: "El Velo de Eones",
        description: "Una nebulosa oscura donde las señales se desvanecen. Ideal para cazadores silenciosos.",
        battles: [
          { enemyName: "Espectro Acechador v1", health: 5300, shield: 2650, damage: 530, reward: { scrap: 25000, matrizDeManiobra: 5 } },
          { enemyName: "Espectro Acechador v2", health: 5400, shield: 2700, damage: 535, reward: { scrap: 26000, matrizDeManiobra: 6 } },
          { enemyName: "Sombra Fugaz v1", health: 5500, shield: 2750, damage: 540, reward: { scrap: 28000, placasDeSigilo: 3 } },
          { enemyName: "Sombra Fugaz v2", health: 5600, shield: 2800, damage: 545, reward: { scrap: 30000, placasDeSigilo: 4 } },
          { enemyName: "Supervisor del Velo", health: 6500, shield: 3250, damage: 600, reward: { scrap: 40000, matrizDeManiobra: 10, placasDeSigilo: 5, planosDeInterceptor: 1 }, type: 'mini-boss' },
          { enemyName: "Cuchilla Silenciosa v1", health: 5800, shield: 2900, damage: 560, reward: { scrap: 32000, matrizDeManiobra: 7 } },
          { enemyName: "Cuchilla Silenciosa v2", health: 5900, shield: 2950, damage: 565, reward: { scrap: 34000, placasDeSigilo: 5 } },
          { enemyName: "Terror Nocturno v1", health: 6000, shield: 3000, damage: 570, reward: { scrap: 36000, matrizDeManiobra: 8, placasDeSigilo: 2 } },
          { enemyName: "Terror Nocturno v2", health: 6100, shield: 3050, damage: 575, reward: { scrap: 38000, matrizDeManiobra: 9, placasDeSigilo: 3 } },
          { enemyName: "Señor de las Sombras", health: 7500, shield: 3750, damage: 650, reward: { scrap: 60000, matrizDeManiobra: 15, placasDeSigilo: 10, planosDeInterceptor: 3 }, type: 'boss' },
        ],
      },
      {
        name: "La Falla del Espectro",
        description: "Una grieta dimensional donde operan naves que desafían la física convencional.",
        battles: [
          { enemyName: "Deslizador Espectral v1", health: 7600, shield: 3800, damage: 660, reward: { scrap: 42000, matrizDeManiobra: 10 } },
          { enemyName: "Deslizador Espectral v2", health: 7700, shield: 3850, damage: 670, reward: { scrap: 44000, matrizDeManiobra: 11 } },
          { enemyName: "Aparición Fásica v1", health: 7800, shield: 3900, damage: 680, reward: { scrap: 46000, placasDeSigilo: 6 } },
          { enemyName: "Aparición Fásica v2", health: 7900, shield: 3950, damage: 690, reward: { scrap: 48000, placasDeSigilo: 7 } },
          { enemyName: "El Invocador de Fallas", health: 9000, shield: 4500, damage: 800, reward: { scrap: 65000, matrizDeManiobra: 15, placasDeSigilo: 10, planosDeInterceptor: 2 }, type: 'mini-boss' },
          { enemyName: "Corruptor Dimensional v1", health: 8200, shield: 4100, damage: 710, reward: { scrap: 50000, matrizDeManiobra: 12 } },
          { enemyName: "Corruptor Dimensional v2", health: 8300, shield: 4150, damage: 720, reward: { scrap: 52000, placasDeSigilo: 8 } },
          { enemyName: "Devorador de Ecos v1", health: 8400, shield: 4200, damage: 730, reward: { scrap: 55000, matrizDeManiobra: 13, placasDeSigilo: 5 } },
          { enemyName: "Devorador de Ecos v2", health: 8500, shield: 4250, damage: 740, reward: { scrap: 58000, matrizDeManiobra: 14, placasDeSigilo: 6 } },
          { enemyName: "Anomalia 'Phase-Walker'", health: 9800, shield: 4900, damage: 900, reward: { scrap: 80000, matrizDeManiobra: 20, placasDeSigilo: 15, planosDeInterceptor: 4 }, type: 'boss' },
        ],
      },
      {
        name: "El Nido del Cazador",
        description: "Base de operaciones de una facción de pilotos de élite que valoran la precisión y el sigilo.",
        battles: [
          { enemyName: "Interceptor 'Aguijón' v1", health: 9900, shield: 4950, damage: 910, reward: { scrap: 60000, matrizDeManiobra: 15 } },
          { enemyName: "Interceptor 'Aguijón' v2", health: 10000, shield: 5000, damage: 920, reward: { scrap: 63000, matrizDeManiobra: 16 } },
          { enemyName: "Cañonera 'Sombra' v1", health: 10100, shield: 5050, damage: 930, reward: { scrap: 66000, placasDeSigilo: 10 } },
          { enemyName: "Cañonera 'Sombra' v2", health: 10200, shield: 5100, damage: 940, reward: { scrap: 69000, placasDeSigilo: 11 } },
          { enemyName: "Líder de Escuadrón 'Navaja'", health: 11500, shield: 5750, damage: 1050, reward: { scrap: 90000, matrizDeManiobra: 20, placasDeSigilo: 15, planosDeInterceptor: 3 }, type: 'mini-boss' },
          { enemyName: "Bombardero 'Fantasma' v1", health: 10500, shield: 5250, damage: 960, reward: { scrap: 72000, matrizDeManiobra: 17 } },
          { enemyName: "Bombardero 'Fantasma' v2", health: 10600, shield: 5300, damage: 970, reward: { scrap: 75000, placasDeSigilo: 12 } },
          { enemyName: "As 'Espectro' v1", health: 10700, shield: 5350, damage: 980, reward: { scrap: 78000, matrizDeManiobra: 18, placasDeSigilo: 8 } },
          { enemyName: "As 'Espectro' v2", health: 10800, shield: 5400, damage: 990, reward: { scrap: 82000, matrizDeManiobra: 19, placasDeSigilo: 9 } },
          { enemyName: "Maestro del Caza 'Kestrel'", health: 12100, shield: 6050, damage: 1150, reward: { scrap: 110000, matrizDeManiobra: 25, placasDeSigilo: 20, planosDeInterceptor: 5 }, type: 'boss' },
        ],
      },
      {
        name: "El Santuario Silencioso",
        description: "Un antiguo templo tecnológico ahora usado para ocultar la construcción de prototipos avanzados.",
        battles: [
          { enemyName: "Guardián Silencioso v1", health: 12200, shield: 6100, damage: 1160, reward: { scrap: 85000, matrizDeManiobra: 20 } },
          { enemyName: "Guardián Silencioso v2", health: 12300, shield: 6150, damage: 1170, reward: { scrap: 88000, matrizDeManiobra: 21 } },
          { enemyName: "Defensor del Santuario v1", health: 12400, shield: 6200, damage: 1180, reward: { scrap: 92000, placasDeSigilo: 15 } },
          { enemyName: "Defensor del Santuario v2", health: 12500, shield: 6250, damage: 1190, reward: { scrap: 96000, placasDeSigilo: 16 } },
          { enemyName: "Alto Protector del Santuario", health: 13500, shield: 6750, damage: 1300, reward: { scrap: 120000, matrizDeManiobra: 25, placasDeSigilo: 20, planosDeInterceptor: 4 }, type: 'mini-boss' },
          { enemyName: "Constructor Furtivo v1", health: 12800, shield: 6400, damage: 1220, reward: { scrap: 100000, matrizDeManiobra: 22 } },
          { enemyName: "Constructor Furtivo v2", health: 12900, shield: 6450, damage: 1230, reward: { scrap: 105000, placasDeSigilo: 17 } },
          { enemyName: "Prototipo 'Eclipse' v1", health: 13000, shield: 6500, damage: 1240, reward: { scrap: 110000, matrizDeManiobra: 23, placasDeSigilo: 10 } },
          { enemyName: "Prototipo 'Eclipse' v2", health: 13100, shield: 6550, damage: 1250, reward: { scrap: 115000, matrizDeManiobra: 24, placasDeSigilo: 11 } },
          { enemyName: "El Arquitecto Silente", health: 14000, shield: 7000, damage: 1400, reward: { scrap: 150000, matrizDeManiobra: 30, placasDeSigilo: 25, planosDeInterceptor: 6 }, type: 'boss' },
        ],
      },
      {
        name: "El Crisol del Interceptor",
        description: "La instalación principal donde se ensambla y prueba el Vindicator MK2 Interceptor. El final de la cacería.",
        isBoss: true,
        battles: [
          { enemyName: "Interceptor de Élite v1", health: 14100, shield: 7050, damage: 1410, reward: { scrap: 120000, matrizDeManiobra: 25, placasDeSigilo: 15 } },
          { enemyName: "Interceptor de Élite v2", health: 14200, shield: 7100, damage: 1420, reward: { scrap: 125000, matrizDeManiobra: 26, placasDeSigilo: 16 } },
          { enemyName: "Sistema de Defensa 'Avispa' v1", health: 14300, shield: 7150, damage: 1430, reward: { scrap: 130000, matrizDeManiobra: 27, placasDeSigilo: 17 } },
          { enemyName: "Sistema de Defensa 'Avispa' v2", health: 14400, shield: 7200, damage: 1440, reward: { scrap: 135000, matrizDeManiobra: 28, placasDeSigilo: 18 } },
          { enemyName: "Piloto de Pruebas 'As' ", health: 15000, shield: 7500, damage: 1500, reward: { scrap: 160000, matrizDeManiobra: 30, placasDeSigilo: 25, planosDeInterceptor: 5 }, type: 'mini-boss' },
          { enemyName: "Tanque de Sigilo 'Muro' v1", health: 14600, shield: 7300, damage: 1460, reward: { scrap: 140000, matrizDeManiobra: 29, placasDeSigilo: 19 } },
          { enemyName: "Tanque de Sigilo 'Muro' v2", health: 14700, shield: 7350, damage: 1470, reward: { scrap: 145000, matrizDeManiobra: 30, placasDeSigilo: 20 } },
          { enemyName: "Prototipo Avanzado 'Nightwing' v1", health: 14800, shield: 7400, damage: 1480, reward: { scrap: 150000, matrizDeManiobra: 32, placasDeSigilo: 22 } },
          { enemyName: "Prototipo Avanzado 'Nightwing' v2", health: 14900, shield: 7450, damage: 1490, reward: { scrap: 155000, matrizDeManiobra: 35, placasDeSigilo: 24 } },
          { enemyName: "Vindicator MK2 'Interceptor'", health: 16000, shield: 8000, damage: 1600, reward: { scrap: 250000, matrizDeManiobra: 50, placasDeSigilo: 40, planosDeInterceptor: 10 }, type: 'boss' },
        ],
      },
    ]
  },
  {
    name: "Capítulo 4: El Crisol Estelar",
    destinations: [
      {
        name: "Forja Estelar Abandonada",
        description: "Una megaestructura orbital que alguna vez forjó estrellas. Ahora está invadida por constructos autónomos de poder inmenso.",
        battles: [
          { enemyName: "Defensor de Forja v1", health: 15500, shield: 7750, damage: 1550, reward: { scrap: 100000, placasAdamantioReforzado: 5 } },
          { enemyName: "Defensor de Forja v2", health: 15800, shield: 7900, damage: 1560, reward: { scrap: 110000, placasAdamantioReforzado: 6 } },
          { enemyName: "Espíritu de Ignis v1", health: 16100, shield: 8050, damage: 1570, reward: { scrap: 120000, nucleoDatosArcano: 3 } },
          { enemyName: "Espíritu de Ignis v2", health: 16400, shield: 8200, damage: 1580, reward: { scrap: 130000, nucleoDatosArcano: 4 } },
          { enemyName: "Guardián del Crisol", health: 18000, shield: 9000, damage: 1700, reward: { scrap: 200000, placasAdamantioReforzado: 10, nucleoDatosArcano: 5, planosMK3: 1 }, type: 'mini-boss' },
          { enemyName: "Coloso Estelar v1", health: 16800, shield: 8400, damage: 1610, reward: { scrap: 150000, placasAdamantioReforzado: 7 } },
          { enemyName: "Coloso Estelar v2", health: 17100, shield: 8550, damage: 1620, reward: { scrap: 160000, placasAdamantioReforzado: 8 } },
          { enemyName: "Anomalía Gravitacional v1", health: 17400, shield: 8700, damage: 1630, reward: { scrap: 170000, nucleoDatosArcano: 5 } },
          { enemyName: "Anomalía Gravitacional v2", health: 17700, shield: 8850, damage: 1640, reward: { scrap: 180000, nucleoDatosArcano: 6 } },
          { enemyName: "Corazón de la Forja", health: 20000, shield: 10000, damage: 1800, reward: { scrap: 300000, placasAdamantioReforzado: 15, nucleoDatosArcano: 10, planosMK3: 3 }, type: 'boss' },
        ]
      },
      {
        name: "El Archivo Infinito",
        description: "Una biblioteca de datos tan vasta que ha cobrado conciencia propia, protegida por avatares digitales.",
        battles: [
          { enemyName: "Fragmento de Código v1", health: 20500, shield: 10250, damage: 1850, reward: { scrap: 180000, nucleoDatosArcano: 7 } },
          { enemyName: "Fragmento de Código v2", health: 20800, shield: 10400, damage: 1860, reward: { scrap: 190000, nucleoDatosArcano: 8 } },
          { enemyName: "Firewall Viviente v1", health: 21100, shield: 10550, damage: 1870, reward: { scrap: 200000, placasAdamantioReforzado: 8 } },
          { enemyName: "Firewall Viviente v2", health: 21400, shield: 10700, damage: 1880, reward: { scrap: 210000, placasAdamantioReforzado: 9 } },
          { enemyName: "El Indexador", health: 23000, shield: 11500, damage: 2000, reward: { scrap: 350000, nucleoDatosArcano: 12, placasAdamantioReforzado: 12, planosMK3: 2 }, type: 'mini-boss' },
          { enemyName: "Avatar de Datos v1", health: 21800, shield: 10900, damage: 1910, reward: { scrap: 220000, nucleoDatosArcano: 9 } },
          { enemyName: "Avatar de Datos v2", health: 22100, shield: 11050, damage: 1920, reward: { scrap: 230000, nucleoDatosArcano: 10 } },
          { enemyName: "Keres de Información v1", health: 22400, shield: 11200, damage: 1930, reward: { scrap: 250000, placasAdamantioReforzado: 10 } },
          { enemyName: "Keres de Información v2", health: 22700, shield: 11350, damage: 1940, reward: { scrap: 260000, placasAdamantioReforzado: 11 } },
          { enemyName: "La Conciencia del Archivo", health: 25000, shield: 12500, damage: 2200, reward: { scrap: 500000, nucleoDatosArcano: 20, placasAdamantioReforzado: 20, planosMK3: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Nexo de Cómputo Arcano",
        description: "El cerebro central donde se procesan los datos arcanos. La energía pura crepita en el aire.",
        battles: [
          { enemyName: "Proceso de IA v1", health: 25500, shield: 12750, damage: 2250, reward: { scrap: 250000, nucleoDatosArcano: 15 } },
          { enemyName: "Proceso de IA v2", health: 25800, shield: 12900, damage: 2260, reward: { scrap: 260000, nucleoDatosArcano: 16 } },
          { enemyName: "Guardián del Nexo v1", health: 26100, shield: 13050, damage: 2270, reward: { scrap: 280000, placasAdamantioReforzado: 15 } },
          { enemyName: "Guardián del Nexo v2", health: 26400, shield: 13200, damage: 2280, reward: { scrap: 300000, placasAdamantioReforzado: 16 } },
          { enemyName: "El Oráculo", health: 28000, shield: 14000, damage: 2400, reward: { scrap: 450000, nucleoDatosArcano: 20, placasAdamantioReforzado: 20, planosMK3: 3 }, type: 'mini-boss' },
          { enemyName: "Constructor Lógico v1", health: 26800, shield: 13400, damage: 2310, reward: { scrap: 320000, nucleoDatosArcano: 18 } },
          { enemyName: "Constructor Lógico v2", health: 27100, shield: 13550, damage: 2320, reward: { scrap: 340000, nucleoDatosArcano: 19 } },
          { enemyName: "Defensor Algorítmico v1", health: 27400, shield: 13700, damage: 2330, reward: { scrap: 360000, placasAdamantioReforzado: 18 } },
          { enemyName: "Defensor Algorítmico v2", health: 27700, shield: 13850, damage: 2340, reward: { scrap: 380000, placasAdamantioReforzado: 19 } },
          { enemyName: "La Mente Maestra del Nexo", health: 30000, shield: 15000, damage: 2600, reward: { scrap: 600000, nucleoDatosArcano: 30, placasAdamantioReforzado: 30, planosMK3: 6 }, type: 'boss' },
        ]
      },
      {
        name: "El Baluarte de Adamantio",
        description: "Una luna minera convertida en fortaleza, de donde se extrae el Adamantio.",
        battles: [
          { enemyName: "Minero Pesado v1", health: 30500, shield: 15250, damage: 2650, reward: { scrap: 300000, placasAdamantioReforzado: 20 } },
          { enemyName: "Minero Pesado v2", health: 30800, shield: 15400, damage: 2660, reward: { scrap: 320000, placasAdamantioReforzado: 22 } },
          { enemyName: "Transporte Blindado v1", health: 31100, shield: 15550, damage: 2670, reward: { scrap: 340000, nucleoDatosArcano: 10 } },
          { enemyName: "Transporte Blindado v2", health: 31400, shield: 15700, damage: 2680, reward: { scrap: 360000, nucleoDatosArcano: 11 } },
          { enemyName: "Capataz de la Mina", health: 33000, shield: 16500, damage: 2800, reward: { scrap: 500000, placasAdamantioReforzado: 30, nucleoDatosArcano: 15, planosMK3: 4 }, type: 'mini-boss' },
          { enemyName: "Tanque de Asedio v1", health: 31800, shield: 15900, damage: 2710, reward: { scrap: 380000, placasAdamantioReforzado: 25 } },
          { enemyName: "Tanque de Asedio v2", health: 32100, shield: 16050, damage: 2720, reward: { scrap: 400000, placasAdamantioReforzado: 28 } },
          { enemyName: "Exterminador 'Muro de Acero' v1", health: 32400, shield: 16200, damage: 2730, reward: { scrap: 420000, nucleoDatosArcano: 12 } },
          { enemyName: "Exterminador 'Muro de Acero' v2", health: 32700, shield: 16350, damage: 2740, reward: { scrap: 450000, nucleoDatosArcano: 14 } },
          { enemyName: "Barón del Adamantio", health: 35000, shield: 17500, damage: 3000, reward: { scrap: 800000, placasAdamantioReforzado: 50, nucleoDatosArcano: 25, planosMK3: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Laboratorio de Prototipos X",
        description: "Donde se diseñan y prueban las armas más terroríficas del Devastator.",
        battles: [
          { enemyName: "Prototipo Fallido v1", health: 35500, shield: 17750, damage: 3050, reward: { scrap: 400000, nucleoDatosArcano: 15 } },
          { enemyName: "Prototipo Fallido v2", health: 35800, shield: 17900, damage: 3060, reward: { scrap: 420000, nucleoDatosArcano: 16 } },
          { enemyName: "Dron de Combate 'Quimera' v1", health: 36100, shield: 18050, damage: 3070, reward: { scrap: 450000, placasAdamantioReforzado: 20 } },
          { enemyName: "Dron de Combate 'Quimera' v2", health: 36400, shield: 18200, damage: 3080, reward: { scrap: 480000, placasAdamantioReforzado: 22 } },
          { enemyName: "Científico Jefe Demente", health: 38000, shield: 19000, damage: 3200, reward: { scrap: 600000, nucleoDatosArcano: 25, placasAdamantioReforzado: 25, planosMK3: 5 }, type: 'mini-boss' },
          { enemyName: "Arma Biomecánica v1", health: 36800, shield: 18400, damage: 3110, reward: { scrap: 500000, nucleoDatosArcano: 20 } },
          { enemyName: "Arma Biomecánica v2", health: 37100, shield: 18550, damage: 3120, reward: { scrap: 520000, nucleoDatosArcano: 22 } },
          { enemyName: "Unidad de Contención Rota v1", health: 37400, shield: 18700, damage: 3130, reward: { scrap: 550000, placasAdamantioReforzado: 28 } },
          { enemyName: "Unidad de Contención Rota v2", health: 37700, shield: 18850, damage: 3140, reward: { scrap: 580000, placasAdamantioReforzado: 30 } },
          { enemyName: "El 'Proyecto Devastator' Original", health: 40000, shield: 20000, damage: 3400, reward: { scrap: 1000000, nucleoDatosArcano: 40, placasAdamantioReforzado: 40, planosMK3: 10 }, type: 'boss' },
        ]
      },
      {
        name: "La Singularidad del Devastator",
        description: "El corazón del poder del enemigo, una singularidad artificial que alimenta su flota. La batalla final del Crisol Estelar.",
        isBoss: true,
        battles: [
          { enemyName: "Guardia Pretoriana v1", health: 40500, shield: 20250, damage: 3450, reward: { scrap: 800000, nucleoDatosArcano: 30 } },
          { enemyName: "Guardia Pretoriana v2", health: 40800, shield: 20400, damage: 3460, reward: { scrap: 850000, nucleoDatosArcano: 32 } },
          { enemyName: "Flujo de Energía v1", health: 41100, shield: 20550, damage: 3470, reward: { scrap: 900000, placasAdamantioReforzado: 35 } },
          { enemyName: "Flujo de Energía v2", health: 41400, shield: 20700, damage: 3480, reward: { scrap: 950000, placasAdamantioReforzado: 38 } },
          { enemyName: "El Regente de la Singularidad", health: 43000, shield: 21500, damage: 3600, reward: { scrap: 1200000, nucleoDatosArcano: 50, placasAdamantioReforzado: 50, planosMK3: 15 }, type: 'mini-boss' },
          { enemyName: "Manifestación del Vacío v1", health: 41800, shield: 20900, damage: 3510, reward: { scrap: 1000000, nucleoDatosArcano: 40 } },
          { enemyName: "Manifestación del Vacío v2", health: 42100, shield: 21050, damage: 3520, reward: { scrap: 1050000, nucleoDatosArcano: 42 } },
          { enemyName: "Campeón del Crisol v1", health: 42400, shield: 21200, damage: 3530, reward: { scrap: 1100000, placasAdamantioReforzado: 45 } },
          { enemyName: "Campeón del Crisol v2", health: 42700, shield: 21350, damage: 3540, reward: { scrap: 1150000, placasAdamantioReforzado: 48 } },
          { enemyName: "IA Overlord 2.0: Devastator Core", health: 45000, shield: 22500, damage: 3800, reward: { scrap: 2500000, nucleoDatosArcano: 100, placasAdamantioReforzado: 100, planosMK3: 30 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "Capítulo 5: Horizonte Final",
    destinations: [
      {
        name: "El Borde del Vacío",
        description: "Una región donde el espacio-tiempo comienza a deshilacharse, habitada por entidades extradimensionales.",
        battles: [
          { enemyName: "Espectro del Vacío v1", health: 32500, shield: 16250, damage: 3250, reward: { scrap: 1000000, tejidoEspaciotemporal: 5 } },
          { enemyName: "Espectro del Vacío v2", health: 33000, shield: 16500, damage: 3300, reward: { scrap: 1100000, tejidoEspaciotemporal: 6 } },
          { enemyName: "Terror Desatado v1", health: 33500, shield: 16750, damage: 3350, reward: { scrap: 1200000, singularidadEmbotellada: 3 } },
          { enemyName: "Terror Desatado v2", health: 34000, shield: 17000, damage: 3400, reward: { scrap: 1300000, singularidadEmbotellada: 4 } },
          { enemyName: "Guardián del Horizonte", health: 37000, shield: 18500, damage: 3700, reward: { scrap: 2000000, tejidoEspaciotemporal: 10, singularidadEmbotellada: 5, planosMK4: 1 }, type: 'mini-boss' },
          { enemyName: "Leviatán Abisal v1", health: 34500, shield: 17250, damage: 3450, reward: { scrap: 1500000, tejidoEspaciotemporal: 7 } },
          { enemyName: "Leviatán Abisal v2", health: 35000, shield: 17500, damage: 3500, reward: { scrap: 1600000, tejidoEspaciotemporal: 8 } },
          { enemyName: "Aparición Entrópica v1", health: 35500, shield: 17750, damage: 3550, reward: { scrap: 1700000, singularidadEmbotellada: 5 } },
          { enemyName: "Aparición Entrópica v2", health: 36000, shield: 18000, damage: 3600, reward: { scrap: 1800000, singularidadEmbotellada: 6 } },
          { enemyName: "El Devorador de Estrellas", health: 40000, shield: 20000, damage: 4000, reward: { scrap: 3000000, tejidoEspaciotemporal: 15, singularidadEmbotellada: 10, planosMK4: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Sector de Realidad Inestable",
        description: "Las leyes de la física son meras sugerencias en este sector caótico.",
        battles: [
          { enemyName: "Anomalía Cuántica v1", health: 40500, shield: 20250, damage: 4050, reward: { scrap: 2000000, singularidadEmbotellada: 10 } },
          { enemyName: "Anomalía Cuántica v2", health: 41000, shield: 20500, damage: 4100, reward: { scrap: 2200000, singularidadEmbotellada: 12 } },
          { enemyName: "Gusano Espaciotemporal v1", health: 41500, shield: 20750, damage: 4150, reward: { scrap: 2500000, tejidoEspaciotemporal: 10 } },
          { enemyName: "Gusano Espaciotemporal v2", health: 42000, shield: 21000, damage: 4200, reward: { scrap: 2700000, tejidoEspaciotemporal: 12 } },
          { enemyName: "El Centinela del Paradigma", health: 45000, shield: 22500, damage: 4500, reward: { scrap: 4000000, singularidadEmbotellada: 20, tejidoEspaciotemporal: 15, planosMK4: 2 }, type: 'mini-boss' },
          { enemyName: "Ecos Desfasados v1", health: 42500, shield: 21250, damage: 4250, reward: { scrap: 3000000, singularidadEmbotellada: 14 } },
          { enemyName: "Ecos Desfasados v2", health: 43000, shield: 21500, damage: 4300, reward: { scrap: 3200000, singularidadEmbotellada: 16 } },
          { enemyName: "Depredador de Realidades v1", health: 43500, shield: 21750, damage: 4350, reward: { scrap: 3500000, tejidoEspaciotemporal: 14 } },
          { enemyName: "Depredador de Realidades v2", health: 44000, shield: 22000, damage: 4400, reward: { scrap: 3800000, tejidoEspaciotemporal: 16 } },
          { enemyName: "El Arquitecto de la Entropía", health: 48000, shield: 24000, damage: 4800, reward: { scrap: 6000000, singularidadEmbotellada: 30, tejidoEspaciotemporal: 25, planosMK4: 5 }, type: 'boss' },
        ]
      },
      {
        name: "La Última Trinchera",
        description: "La línea final de defensa organizada contra las amenazas del horizonte final.",
        battles: [
          { enemyName: "Defensor de la Trinchera v1", health: 48500, shield: 24250, damage: 4850, reward: { scrap: 5000000, tejidoEspaciotemporal: 20 } },
          { enemyName: "Defensor de la Trinchera v2", health: 49000, shield: 24500, damage: 4900, reward: { scrap: 5200000, tejidoEspaciotemporal: 22 } },
          { enemyName: "Artillería de Largo Alcance v1", health: 49500, shield: 24750, damage: 4950, reward: { scrap: 5500000, singularidadEmbotellada: 25 } },
          { enemyName: "Artillería de Largo Alcance v2", health: 50000, shield: 25000, damage: 5000, reward: { scrap: 5800000, singularidadEmbotellada: 28 } },
          { enemyName: "Comandante de la Trinchera", health: 53000, shield: 26500, damage: 5300, reward: { scrap: 8000000, tejidoEspaciotemporal: 30, singularidadEmbotellada: 35, planosMK4: 4 }, type: 'mini-boss' },
          { enemyName: "Unidad 'Juggernaut' v1", health: 50500, shield: 25250, damage: 5050, reward: { scrap: 6000000, tejidoEspaciotemporal: 25 } },
          { enemyName: "Unidad 'Juggernaut' v2", health: 51000, shield: 25500, damage: 5100, reward: { scrap: 6200000, tejidoEspaciotemporal: 28 } },
          { enemyName: "Nave de Mando v1", health: 51500, shield: 25750, damage: 5150, reward: { scrap: 6500000, singularidadEmbotellada: 30 } },
          { enemyName: "Nave de Mando v2", health: 52000, shield: 26000, damage: 5200, reward: { scrap: 6800000, singularidadEmbotellada: 32 } },
          { enemyName: "Mariscal de Campo", health: 56000, shield: 28000, damage: 5600, reward: { scrap: 10000000, tejidoEspaciotemporal: 40, singularidadEmbotellada: 40, planosMK4: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Ciudadela del Olvido",
        description: "Una fortaleza flotante que es el último bastión de una civilización perdida.",
        battles: [
          { enemyName: "Guardián Etéreo v1", health: 56500, shield: 28250, damage: 5650, reward: { scrap: 8000000, singularidadEmbotellada: 40 } },
          { enemyName: "Guardián Etéreo v2", health: 57000, shield: 28500, damage: 5700, reward: { scrap: 8200000, singularidadEmbotellada: 42 } },
          { enemyName: "Coloso Olvidado v1", health: 57500, shield: 28750, damage: 5750, reward: { scrap: 8500000, tejidoEspaciotemporal: 40 } },
          { enemyName: "Coloso Olvidado v2", health: 58000, shield: 29000, damage: 5800, reward: { scrap: 8800000, tejidoEspaciotemporal: 42 } },
          { enemyName: "El Rey Fantasma", health: 61000, shield: 30500, damage: 6100, reward: { scrap: 12000000, singularidadEmbotellada: 50, tejidoEspaciotemporal: 50, planosMK4: 6 }, type: 'mini-boss' },
          { enemyName: "Espectro Vengativo v1", health: 58500, shield: 29250, damage: 5850, reward: { scrap: 9000000, singularidadEmbotellada: 45 } },
          { enemyName: "Espectro Vengativo v2", health: 59000, shield: 29500, damage: 5900, reward: { scrap: 9200000, singularidadEmbotellada: 48 } },
          { enemyName: "Aparición de la Ciudadela v1", health: 59500, shield: 29750, damage: 5950, reward: { scrap: 9500000, tejidoEspaciotemporal: 45 } },
          { enemyName: "Aparición de la Ciudadela v2", health: 60000, shield: 30000, damage: 6000, reward: { scrap: 9800000, tejidoEspaciotemporal: 48 } },
          { enemyName: "El Último Soberano", health: 64000, shield: 32000, damage: 6400, reward: { scrap: 15000000, singularidadEmbotellada: 60, tejidoEspaciotemporal: 60, planosMK4: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Santuario del Final",
        description: "Un nexo de energía donde la realidad se pliega sobre sí misma.",
        battles: [
          { enemyName: "Elemental de Realidad v1", health: 64500, shield: 32250, damage: 6450, reward: { scrap: 13000000, tejidoEspaciotemporal: 50 } },
          { enemyName: "Elemental de Realidad v2", health: 65000, shield: 32500, damage: 6500, reward: { scrap: 13500000, tejidoEspaciotemporal: 52 } },
          { enemyName: "Tejedor del Destino v1", health: 65500, shield: 32750, damage: 6550, reward: { scrap: 14000000, singularidadEmbotellada: 55 } },
          { enemyName: "Tejedor del Destino v2", health: 66000, shield: 33000, damage: 6600, reward: { scrap: 14500000, singularidadEmbotellada: 58 } },
          { enemyName: "El Oráculo del Fin", health: 69000, shield: 34500, damage: 6900, reward: { scrap: 20000000, tejidoEspaciotemporal: 70, singularidadEmbotellada: 70, planosMK4: 8 }, type: 'mini-boss' },
          { enemyName: "Guardián del Santuario v1", health: 66500, shield: 33250, damage: 6650, reward: { scrap: 15000000, tejidoEspaciotemporal: 60 } },
          { enemyName: "Guardián del Santuario v2", health: 67000, shield: 33500, damage: 6700, reward: { scrap: 15500000, tejidoEspaciotemporal: 62 } },
          { enemyName: "Avatar del Final v1", health: 67500, shield: 33750, damage: 6750, reward: { scrap: 16000000, singularidadEmbotellada: 65 } },
          { enemyName: "Avatar del Final v2", health: 68000, shield: 34000, damage: 6800, reward: { scrap: 16500000, singularidadEmbotellada: 68 } },
          { enemyName: "La Voluntad del Universo", health: 72000, shield: 36000, damage: 7200, reward: { scrap: 25000000, tejidoEspaciotemporal: 80, singularidadEmbotellada: 80, planosMK4: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Corazón del Horizonte Final",
        description: "El punto de no retorno. La fuente de la distorsión que amenaza toda la existencia.",
        isBoss: true,
        battles: [
          { enemyName: "Heraldo del Final v1", health: 72500, shield: 36250, damage: 7250, reward: { scrap: 20000000, singularidadEmbotellada: 80 } },
          { enemyName: "Heraldo del Final v2", health: 73000, shield: 36500, damage: 7300, reward: { scrap: 21000000, singularidadEmbotellada: 82 } },
          { enemyName: "Aniquilador de Mundos v1", health: 73500, shield: 36750, damage: 7350, reward: { scrap: 22000000, tejidoEspaciotemporal: 85 } },
          { enemyName: "Aniquilador de Mundos v2", health: 74000, shield: 37000, damage: 7400, reward: { scrap: 23000000, tejidoEspaciotemporal: 88 } },
          { enemyName: "El Devorador de Realidades", health: 77000, shield: 38500, damage: 7700, reward: { scrap: 30000000, singularidadEmbotellada: 100, tejidoEspaciotemporal: 100, planosMK4: 15 }, type: 'mini-boss' },
          { enemyName: "Singularidad Viviente v1", health: 74500, shield: 37250, damage: 7450, reward: { scrap: 24000000, singularidadEmbotellada: 90 } },
          { enemyName: "Singularidad Viviente v2", health: 75000, shield: 37500, damage: 7500, reward: { scrap: 25000000, singularidadEmbotellada: 92 } },
          { enemyName: "El Fin Absoluto v1", health: 75500, shield: 37750, damage: 7550, reward: { scrap: 26000000, tejidoEspaciotemporal: 95 } },
          { enemyName: "El Fin Absoluto v2", health: 76000, shield: 38000, damage: 7600, reward: { scrap: 27000000, tejidoEspaciotemporal: 98 } },
          { enemyName: "Vindicator MK4 'Horizonte'", health: 80000, shield: 40000, damage: 8000, reward: { scrap: 50000000, singularidadEmbotellada: 150, tejidoEspaciotemporal: 150, planosMK4: 25 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "Capítulo 6: Legado de los Precursores",
    destinations: [
      {
        name: "Santuario Olvidado",
        description: "Un antiguo templo de los Precursores, ahora corrompido por el tiempo y extrañas energías.",
        battles: [
            { enemyName: "Guardián Ancestral v1", health: 57000, shield: 21500, damage: 7800, reward: { scrap: 2000000, esquirlasDeReliquia: 5 } },
            { enemyName: "Guardián Ancestral v2", health: 58000, shield: 22000, damage: 7900, reward: { scrap: 2100000, esquirlasDeReliquia: 6 } },
            { enemyName: "Eco Espectral v1", health: 59000, shield: 22500, damage: 8000, reward: { scrap: 2200000, codexAncestral: 3 } },
            { enemyName: "Eco Espectral v2", health: 60000, shield: 23000, damage: 8100, reward: { scrap: 2300000, codexAncestral: 4 } },
            { enemyName: "El Primarca Caído", health: 65000, shield: 25000, damage: 8500, reward: { scrap: 3000000, esquirlasDeReliquia: 10, codexAncestral: 5, planosMK5: 1 }, type: 'mini-boss' },
            { enemyName: "Coloso de Reliquia v1", health: 61000, shield: 23500, damage: 8200, reward: { scrap: 2500000, esquirlasDeReliquia: 7 } },
            { enemyName: "Coloso de Reliquia v2", health: 62000, shield: 24000, damage: 8300, reward: { scrap: 2600000, esquirlasDeReliquia: 8 } },
            { enemyName: "Ente Psiónico v1", health: 63000, shield: 24500, damage: 8400, reward: { scrap: 2700000, codexAncestral: 5 } },
            { enemyName: "Ente Psiónico v2", health: 64000, shield: 24800, damage: 8450, reward: { scrap: 2800000, codexAncestral: 6 } },
            { enemyName: "El Ascendido Olvidado", health: 70000, shield: 28000, damage: 9000, reward: { scrap: 5000000, esquirlasDeReliquia: 15, codexAncestral: 10, planosMK5: 3 }, type: 'boss' },
        ]
      },
      {
        name: "La Biblioteca Infinita",
        description: "Un archivo de conocimiento de los Precursores, protegido por constructos de información.",
        battles: [
            { enemyName: "Archivista de Datos v1", health: 71000, shield: 28500, damage: 9100, reward: { scrap: 4000000, codexAncestral: 12 } },
            { enemyName: "Archivista de Datos v2", health: 72000, shield: 29000, damage: 9200, reward: { scrap: 4200000, codexAncestral: 14 } },
            { enemyName: "Gólem de Información v1", health: 73000, shield: 29500, damage: 9300, reward: { scrap: 4500000, esquirlasDeReliquia: 18 } },
            { enemyName: "Gólem de Información v2", health: 74000, shield: 30000, damage: 9400, reward: { scrap: 4800000, esquirlasDeReliquia: 20 } },
            { enemyName: "El Bibliotecario Principal", health: 80000, shield: 32000, damage: 9800, reward: { scrap: 7000000, codexAncestral: 20, esquirlasDeReliquia: 25, planosMK5: 2 }, type: 'mini-boss' },
            { enemyName: "Firewall Ancestral v1", health: 75000, shield: 30500, damage: 9500, reward: { scrap: 5000000, codexAncestral: 16 } },
            { enemyName: "Firewall Ancestral v2", health: 76000, shield: 31000, damage: 9600, reward: { scrap: 5200000, codexAncestral: 18 } },
            { enemyName: "Keres del Conocimiento v1", health: 77000, shield: 31500, damage: 9700, reward: { scrap: 5500000, esquirlasDeReliquia: 22 } },
            { enemyName: "Keres del Conocimiento v2", health: 78000, shield: 31800, damage: 9750, reward: { scrap: 5800000, esquirlasDeReliquia: 24 } },
            { enemyName: "La Mente Maestra de la Biblioteca", health: 85000, shield: 35000, damage: 10500, reward: { scrap: 9000000, codexAncestral: 30, esquirlasDeReliquia: 30, planosMK5: 5 }, type: 'boss' },
        ]
      },
      {
        name: "El Crisol de la Creación",
        description: "El lugar donde los Precursores daban forma a la vida, ahora un caos de creaciones inestables.",
        battles: [
            { enemyName: "Creación Fallida v1", health: 86000, shield: 35500, damage: 10600, reward: { scrap: 8000000, esquirlasDeReliquia: 30 } },
            { enemyName: "Creación Fallida v2", health: 87000, shield: 36000, damage: 10700, reward: { scrap: 8200000, esquirlasDeReliquia: 32 } },
            { enemyName: "Quimera Primordial v1", health: 88000, shield: 36500, damage: 10800, reward: { scrap: 8500000, codexAncestral: 25 } },
            { enemyName: "Quimera Primordial v2", health: 89000, shield: 37000, damage: 10900, reward: { scrap: 8800000, codexAncestral: 28 } },
            { enemyName: "El Demiurgo Loco", health: 95000, shield: 39000, damage: 11500, reward: { scrap: 12000000, esquirlasDeReliquia: 40, codexAncestral: 35, planosMK5: 4 }, type: 'mini-boss' },
            { enemyName: "Constructor de Vida v1", health: 90000, shield: 37500, damage: 11000, reward: { scrap: 9000000, esquirlasDeReliquia: 35 } },
            { enemyName: "Constructor de Vida v2", health: 91000, shield: 38000, damage: 11100, reward: { scrap: 9200000, esquirlasDeReliquia: 38 } },
            { enemyName: "Prototipo Biológico v1", health: 92000, shield: 38500, damage: 11200, reward: { scrap: 9500000, codexAncestral: 30 } },
            { enemyName: "Prototipo Biológico v2", health: 93000, shield: 38800, damage: 11300, reward: { scrap: 9800000, codexAncestral: 32 } },
            { enemyName: "El Corazón del Crisol", health: 100000, shield: 42000, damage: 12000, reward: { scrap: 15000000, esquirlasDeReliquia: 50, codexAncestral: 40, planosMK5: 8 }, type: 'boss' },
        ]
      },
      {
        name: "El Bastión del Silencio",
        description: "Una fortaleza Precursora diseñada para contener una amenaza desconocida.",
        battles: [
            { enemyName: "Centinela Silencioso v1", health: 101000, shield: 42500, damage: 12100, reward: { scrap: 13000000, codexAncestral: 40 } },
            { enemyName: "Centinela Silencioso v2", health: 102000, shield: 43000, damage: 12200, reward: { scrap: 13500000, codexAncestral: 42 } },
            { enemyName: "Guardián de la Contención v1", health: 103000, shield: 43500, damage: 12300, reward: { scrap: 14000000, esquirlasDeReliquia: 50 } },
            { enemyName: "Guardián de la Contención v2", health: 104000, shield: 44000, damage: 12400, reward: { scrap: 14500000, esquirlasDeReliquia: 52 } },
            { enemyName: "El Prisionero liberado", health: 110000, shield: 46000, damage: 13000, reward: { scrap: 20000000, codexAncestral: 50, esquirlasDeReliquia: 60, planosMK5: 6 }, type: 'mini-boss' },
            { enemyName: "Sistema de Defensa Final v1", health: 105000, shield: 44500, damage: 12500, reward: { scrap: 15000000, codexAncestral: 45 } },
            { enemyName: "Sistema de Defensa Final v2", health: 106000, shield: 45000, damage: 12600, reward: { scrap: 15500000, codexAncestral: 48 } },
            { enemyName: "El Horror sin Nombre v1", health: 107000, shield: 45500, damage: 12700, reward: { scrap: 16000000, esquirlasDeReliquia: 55 } },
            { enemyName: "El Horror sin Nombre v2", health: 108000, shield: 45800, damage: 12800, reward: { scrap: 16500000, esquirlasDeReliquia: 58 } },
            { enemyName: "El Guardián Eterno", health: 115000, shield: 49000, damage: 13500, reward: { scrap: 25000000, codexAncestral: 60, esquirlasDeReliquia: 70, planosMK5: 10 }, type: 'boss' },
        ]
      },
      {
        name: "El Ojo de la Eternidad",
        description: "Un observatorio Precursor que permite ver el pasado, presente y futuro.",
        battles: [
            { enemyName: "Eco Temporal v1", health: 116000, shield: 49500, damage: 13600, reward: { scrap: 22000000, esquirlasDeReliquia: 70 } },
            { enemyName: "Eco Temporal v2", health: 117000, shield: 50000, damage: 13700, reward: { scrap: 22500000, esquirlasDeReliquia: 72 } },
            { enemyName: "Vigía del Tiempo v1", health: 118000, shield: 50500, damage: 13800, reward: { scrap: 23000000, codexAncestral: 60 } },
            { enemyName: "Vigía del Tiempo v2", health: 119000, shield: 51000, damage: 13900, reward: { scrap: 23500000, codexAncestral: 62 } },
            { enemyName: "El Oráculo Ciego", health: 125000, shield: 53000, damage: 14500, reward: { scrap: 30000000, esquirlasDeReliquia: 80, codexAncestral: 70, planosMK5: 8 }, type: 'mini-boss' },
            { enemyName: "Paradoja Viviente v1", health: 120000, shield: 51500, damage: 14000, reward: { scrap: 24000000, esquirlasDeReliquia: 75 } },
            { enemyName: "Paradoja Viviente v2", health: 121000, shield: 52000, damage: 14100, reward: { scrap: 24500000, esquirlasDeReliquia: 78 } },
            { enemyName: "Devorador de Eones v1", health: 122000, shield: 52500, damage: 14200, reward: { scrap: 25000000, codexAncestral: 65 } },
            { enemyName: "Devorador de Eones v2", health: 123000, shield: 52800, damage: 14300, reward: { scrap: 25500000, codexAncestral: 68 } },
            { enemyName: "El Fin y el Principio", health: 130000, shield: 56000, damage: 15000, reward: { scrap: 40000000, esquirlasDeReliquia: 90, codexAncestral: 80, planosMK5: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Núcleo del Legado",
        description: "El centro del poder de los Precursores, donde su legado espera ser reclamado o destruido.",
        isBoss: true,
        battles: [
            { enemyName: "Defensor del Núcleo v1", health: 131000, shield: 56500, damage: 15100, reward: { scrap: 35000000, codexAncestral: 80 } },
            { enemyName: "Defensor del Núcleo v2", health: 132000, shield: 57000, damage: 15200, reward: { scrap: 36000000, codexAncestral: 82 } },
            { enemyName: "Ejecutor Precursor v1", health: 133000, shield: 57500, damage: 15300, reward: { scrap: 37000000, esquirlasDeReliquia: 90 } },
            { enemyName: "Ejecutor Precursor v2", health: 134000, shield: 58000, damage: 15400, reward: { scrap: 38000000, esquirlasDeReliquia: 92 } },
            { enemyName: "La Voluntad del Legado", health: 140000, shield: 60000, damage: 16000, reward: { scrap: 50000000, codexAncestral: 100, esquirlasDeReliquia: 100, planosMK5: 15 }, type: 'mini-boss' },
            { enemyName: "Avatar del Poder v1", health: 135000, shield: 58500, damage: 15500, reward: { scrap: 40000000, codexAncestral: 85 } },
            { enemyName: "Avatar del Poder v2", health: 136000, shield: 59000, damage: 15600, reward: { scrap: 42000000, codexAncestral: 88 } },
            { enemyName: "El Primer Guardián v1", health: 137000, shield: 59500, damage: 15700, reward: { scrap: 45000000, esquirlasDeReliquia: 95 } },
            { enemyName: "El Primer Guardián v2", health: 138000, shield: 59800, damage: 15800, reward: { scrap: 48000000, esquirlasDeReliquia: 98 } },
            { enemyName: "Vindicator MK5 'Legado'", health: 145000, shield: 63000, damage: 17000, reward: { scrap: 80000000, codexAncestral: 150, esquirlasDeReliquia: 150, planosMK5: 25 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "Capítulo 7: La Singularidad Desatada",
    destinations: [
      {
        name: "Grieta de Eventos",
        description: "Una herida en la realidad donde las naves enemigas entran y salen sin previo aviso.",
        battles: [
            { enemyName: "Incursor Dimensional v1", health: 106000, shield: 45500, damage: 10200, reward: { scrap: 5000000, fragmentoHorizonteSucesos: 5 } },
            { enemyName: "Incursor Dimensional v2", health: 107000, shield: 46000, damage: 10300, reward: { scrap: 5200000, fragmentoHorizonteSucesos: 6 } },
            { enemyName: "Cazador Fásico v1", health: 108000, shield: 46500, damage: 10400, reward: { scrap: 5500000, energiaPuntoCero: 3 } },
            { enemyName: "Cazador Fásico v2", health: 109000, shield: 47000, damage: 10500, reward: { scrap: 5800000, energiaPuntoCero: 4 } },
            { enemyName: "Vigía de la Grieta", health: 115000, shield: 50000, damage: 11000, reward: { scrap: 7000000, fragmentoHorizonteSucesos: 10, energiaPuntoCero: 5, planosMK6: 1 }, type: 'mini-boss' },
            { enemyName: "Acorazado Espectral v1", health: 110000, shield: 47500, damage: 10600, reward: { scrap: 6000000, fragmentoHorizonteSucesos: 7 } },
            { enemyName: "Acorazado Espectral v2", health: 111000, shield: 48000, damage: 10700, reward: { scrap: 6200000, fragmentoHorizonteSucesos: 8 } },
            { enemyName: "Entidad del Punto Cero v1", health: 112000, shield: 48500, damage: 10800, reward: { scrap: 6500000, energiaPuntoCero: 5 } },
            { enemyName: "Entidad del Punto Cero v2", health: 113000, shield: 49000, damage: 10900, reward: { scrap: 6800000, energiaPuntoCero: 6 } },
            { enemyName: "Maestro de la Singularidad", health: 120000, shield: 53000, damage: 11500, reward: { scrap: 10000000, fragmentoHorizonteSucesos: 15, energiaPuntoCero: 10, planosMK6: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Mar de la Inexistencia",
        description: "Un vacío absoluto donde solo las naves más poderosas pueden sobrevivir.",
        battles: [
            { enemyName: "Navegante del Vacío v1", health: 121000, shield: 53500, damage: 11600, reward: { scrap: 9000000, energiaPuntoCero: 12 } },
            { enemyName: "Navegante del Vacío v2", health: 122000, shield: 54000, damage: 11700, reward: { scrap: 9200000, energiaPuntoCero: 14 } },
            { enemyName: "Serpiente Abisal v1", health: 123000, shield: 54500, damage: 11800, reward: { scrap: 9500000, fragmentoHorizonteSucesos: 18 } },
            { enemyName: "Serpiente Abisal v2", health: 124000, shield: 55000, damage: 11900, reward: { scrap: 9800000, fragmentoHorizonteSucesos: 20 } },
            { enemyName: "El Leviatán Primordial", health: 130000, shield: 58000, damage: 12500, reward: { scrap: 14000000, energiaPuntoCero: 20, fragmentoHorizonteSucesos: 25, planosMK6: 2 }, type: 'mini-boss' },
            { enemyName: "Corruptor de la Nada v1", health: 125000, shield: 55500, damage: 12000, reward: { scrap: 10000000, energiaPuntoCero: 16 } },
            { enemyName: "Corruptor de la Nada v2", health: 126000, shield: 56000, damage: 12100, reward: { scrap: 10200000, energiaPuntoCero: 18 } },
            { enemyName: "El Silencio Aterrador v1", health: 127000, shield: 56500, damage: 12200, reward: { scrap: 10500000, fragmentoHorizonteSucesos: 22 } },
            { enemyName: "El Silencio Aterrador v2", health: 128000, shield: 57000, damage: 12300, reward: { scrap: 10800000, fragmentoHorizonteSucesos: 24 } },
            { enemyName: "El Ojo del Vacío", health: 135000, shield: 61000, damage: 13000, reward: { scrap: 18000000, energiaPuntoCero: 30, fragmentoHorizonteSucesos: 30, planosMK6: 5 }, type: 'boss' },
        ]
      },
      {
        name: "La Última Frontera",
        description: "El límite final del universo conocido. Más allá, solo hay caos.",
        battles: [
            { enemyName: "Explorador Perdido v1", health: 136000, shield: 61500, damage: 13100, reward: { scrap: 15000000, fragmentoHorizonteSucesos: 30 } },
            { enemyName: "Explorador Perdido v2", health: 137000, shield: 62000, damage: 13200, reward: { scrap: 15500000, fragmentoHorizonteSucesos: 32 } },
            { enemyName: "Centinela del Límite v1", health: 138000, shield: 62500, damage: 13300, reward: { scrap: 16000000, energiaPuntoCero: 25 } },
            { enemyName: "Centinela del Límite v2", health: 139000, shield: 63000, damage: 13400, reward: { scrap: 16500000, energiaPuntoCero: 28 } },
            { enemyName: "El Guardián del Umbral", health: 145000, shield: 66000, damage: 14000, reward: { scrap: 22000000, fragmentoHorizonteSucesos: 40, energiaPuntoCero: 35, planosMK6: 4 }, type: 'mini-boss' },
            { enemyName: "Errante Cósmico v1", health: 140000, shield: 63500, damage: 13500, reward: { scrap: 17000000, fragmentoHorizonteSucesos: 35 } },
            { enemyName: "Errante Cósmico v2", health: 141000, shield: 64000, damage: 13600, reward: { scrap: 17500000, fragmentoHorizonteSucesos: 38 } },
            { enemyName: "El Fin de Toda Luz v1", health: 142000, shield: 64500, damage: 13700, reward: { scrap: 18000000, energiaPuntoCero: 30 } },
            { enemyName: "El Fin de Toda Luz v2", health: 143000, shield: 65000, damage: 13800, reward: { scrap: 18500000, energiaPuntoCero: 32 } },
            { enemyName: "La Paradoja Final", health: 150000, shield: 69000, damage: 14500, reward: { scrap: 28000000, fragmentoHorizonteSucesos: 50, energiaPuntoCero: 40, planosMK6: 8 }, type: 'boss' },
        ]
      },
      {
        name: "Ciudadela Flotante",
        description: "Una ciudadela construida sobre los restos de un universo muerto.",
        battles: [
            { enemyName: "Defensor Espectral v1", health: 151000, shield: 69500, damage: 14600, reward: { scrap: 25000000, energiaPuntoCero: 40 } },
            { enemyName: "Defensor Espectral v2", health: 152000, shield: 70000, damage: 14700, reward: { scrap: 25500000, energiaPuntoCero: 42 } },
            { enemyName: "Gárgola de Hueso Estelar v1", health: 153000, shield: 70500, damage: 14800, reward: { scrap: 26000000, fragmentoHorizonteSucesos: 50 } },
            { enemyName: "Gárgola de Hueso Estelar v2", health: 154000, shield: 71000, damage: 14900, reward: { scrap: 26500000, fragmentoHorizonteSucesos: 52 } },
            { enemyName: "El Rey Liche Estelar", health: 160000, shield: 74000, damage: 15500, reward: { scrap: 35000000, energiaPuntoCero: 50, fragmentoHorizonteSucesos: 60, planosMK6: 6 }, type: 'mini-boss' },
            { enemyName: "Caballero del Vacío v1", health: 155000, shield: 71500, damage: 15000, reward: { scrap: 27000000, energiaPuntoCero: 45 } },
            { enemyName: "Caballero del Vacío v2", health: 156000, shield: 72000, damage: 15100, reward: { scrap: 27500000, energiaPuntoCero: 48 } },
            { enemyName: "El Lamento de un Universo v1", health: 157000, shield: 72500, damage: 15200, reward: { scrap: 28000000, fragmentoHorizonteSucesos: 55 } },
            { enemyName: "El Lamento de un Universo v2", health: 158000, shield: 73000, damage: 15300, reward: { scrap: 28500000, fragmentoHorizonteSucesos: 58 } },
            { enemyName: "El Tirano de la Ciudadela", health: 165000, shield: 77000, damage: 16000, reward: { scrap: 40000000, energiaPuntoCero: 60, fragmentoHorizonteSucesos: 70, planosMK6: 10 }, type: 'boss' },
        ]
      },
      {
        name: "Trono del Caos",
        description: "El epicentro de la anarquía universal, donde todas las realidades colisionan.",
        battles: [
            { enemyName: "Avatar del Caos v1", health: 166000, shield: 77500, damage: 16100, reward: { scrap: 38000000, fragmentoHorizonteSucesos: 70 } },
            { enemyName: "Avatar del Caos v2", health: 167000, shield: 78000, damage: 16200, reward: { scrap: 38500000, fragmentoHorizonteSucesos: 72 } },
            { enemyName: "Demonio de la Paradoja v1", health: 168000, shield: 78500, damage: 16300, reward: { scrap: 39000000, energiaPuntoCero: 60 } },
            { enemyName: "Demonio de la Paradoja v2", health: 169000, shield: 79000, damage: 16400, reward: { scrap: 39500000, energiaPuntoCero: 62 } },
            { enemyName: "El Emperador del Caos", health: 175000, shield: 82000, damage: 17000, reward: { scrap: 50000000, fragmentoHorizonteSucesos: 80, energiaPuntoCero: 70, planosMK6: 8 }, type: 'mini-boss' },
            { enemyName: "Heraldo de la Anarquía v1", health: 170000, shield: 79500, damage: 16500, reward: { scrap: 40000000, fragmentoHorizonteSucesos: 75 } },
            { enemyName: "Heraldo de la Anarquía v2", health: 171000, shield: 80000, damage: 16600, reward: { scrap: 40500000, fragmentoHorizonteSucesos: 78 } },
            { enemyName: "La Tormenta Final v1", health: 172000, shield: 80500, damage: 16700, reward: { scrap: 41000000, energiaPuntoCero: 65 } },
            { enemyName: "La Tormenta Final v2", health: 173000, shield: 81000, damage: 16800, reward: { scrap: 41500000, energiaPuntoCero: 68 } },
            { enemyName: "Azathoth, el Caos Primordial", health: 180000, shield: 85000, damage: 17500, reward: { scrap: 60000000, fragmentoHorizonteSucesos: 90, energiaPuntoCero: 80, planosMK6: 12 }, type: 'boss' },
        ]
      },
      {
        name: "Corazón de la Singularidad",
        description: "El punto de origen y final de todo. La batalla para decidir el destino del universo.",
        isBoss: true,
        battles: [
            { enemyName: "Guardián del Infinito v1", health: 181000, shield: 85500, damage: 17600, reward: { scrap: 55000000, energiaPuntoCero: 80 } },
            { enemyName: "Guardián del Infinito v2", health: 182000, shield: 86000, damage: 17700, reward: { scrap: 55500000, energiaPuntoCero: 82 } },
            { enemyName: "Fragmento del Big Bang v1", health: 183000, shield: 86500, damage: 17800, reward: { scrap: 56000000, fragmentoHorizonteSucesos: 90 } },
            { enemyName: "Fragmento del Big Bang v2", health: 184000, shield: 87000, damage: 17900, reward: { scrap: 56500000, fragmentoHorizonteSucesos: 92 } },
            { enemyName: "La Conciencia Cósmica", health: 190000, shield: 90000, damage: 18500, reward: { scrap: 70000000, energiaPuntoCero: 100, fragmentoHorizonteSucesos: 100, planosMK6: 15 }, type: 'mini-boss' },
            { enemyName: "El Fin y el Principio v1", health: 185000, shield: 87500, damage: 18000, reward: { scrap: 57000000, energiaPuntoCero: 85 } },
            { enemyName: "El Fin y el Principio v2", health: 186000, shield: 88000, damage: 18100, reward: { scrap: 57500000, energiaPuntoCero: 88 } },
            { enemyName: "Último Eco del Universo v1", health: 187000, shield: 88500, damage: 18200, reward: { scrap: 58000000, fragmentoHorizonteSucesos: 95 } },
            { enemyName: "Último Eco del Universo v2", health: 188000, shield: 89000, damage: 18300, reward: { scrap: 58500000, fragmentoHorizonteSucesos: 98 } },
            { enemyName: "Vindicator MK6 'Singularidad'", health: 200000, shield: 95000, damage: 19500, reward: { scrap: 100000000, energiaPuntoCero: 150, fragmentoHorizonteSucesos: 150, planosMK6: 25 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "Capítulo 8: Ecos del Vacío",
    destinations: [
        {
            name: "El Cementerio de Ecos",
            description: "Un campo de batalla silencioso donde los ecos de naves caídas aún resuenan.",
            battles: [
                { enemyName: "Eco Resonante v1", health: 161000, shield: 72500, damage: 17600, reward: { scrap: 80000000, esenciaDelVacio: 5 } },
                { enemyName: "Eco Resonante v2", health: 162000, shield: 73000, damage: 17700, reward: { scrap: 81000000, esenciaDelVacio: 6 } },
                { enemyName: "Espectro Vengativo v1", health: 163000, shield: 73500, damage: 17800, reward: { scrap: 82000000, reliquiaCorrupta: 3 } },
                { enemyName: "Espectro Vengativo v2", health: 164000, shield: 74000, damage: 17900, reward: { scrap: 83000000, reliquiaCorrupta: 4 } },
                { enemyName: "El Lamento del Caído", health: 170000, shield: 77000, damage: 18500, reward: { scrap: 100000000, esenciaDelVacio: 10, reliquiaCorrupta: 5, planosMK7: 1 }, type: 'mini-boss' },
                { enemyName: "Aparición atormentada v1", health: 165000, shield: 74500, damage: 18000, reward: { scrap: 84000000, esenciaDelVacio: 7 } },
                { enemyName: "Aparición atormentada v2", health: 166000, shield: 75000, damage: 18100, reward: { scrap: 85000000, esenciaDelVacio: 8 } },
                { enemyName: "Gólem de Chatarra Espectral v1", health: 167000, shield: 75500, damage: 18200, reward: { scrap: 86000000, reliquiaCorrupta: 5 } },
                { enemyName: "Gólem de Chatarra Espectral v2", health: 168000, shield: 76000, damage: 18300, reward: { scrap: 87000000, reliquiaCorrupta: 6 } },
                { enemyName: "Señor de los Ecos", health: 175000, shield: 80000, damage: 19000, reward: { scrap: 120000000, esenciaDelVacio: 15, reliquiaCorrupta: 10, planosMK7: 3 }, type: 'boss' },
            ]
        },
        {
            name: "La Falla del Olvido",
            description: "Una grieta en el espacio de donde emana una corrupción que consume la materia.",
            battles: [
                { enemyName: "Corruptor del Olvido v1", health: 176000, shield: 80500, damage: 19100, reward: { scrap: 110000000, reliquiaCorrupta: 12 } },
                { enemyName: "Corruptor del Olvido v2", health: 177000, shield: 81000, damage: 19200, reward: { scrap: 112000000, reliquiaCorrupta: 14 } },
                { enemyName: "Tentáculo del Vacío v1", health: 178000, shield: 81500, damage: 19300, reward: { scrap: 115000000, esenciaDelVacio: 18 } },
                { enemyName: "Tentáculo del Vacío v2", health: 179000, shield: 82000, damage: 19400, reward: { scrap: 118000000, esenciaDelVacio: 20 } },
                { enemyName: "El Devorador Silencioso", health: 185000, shield: 85000, damage: 20000, reward: { scrap: 150000000, reliquiaCorrupta: 20, esenciaDelVacio: 25, planosMK7: 2 }, type: 'mini-boss' },
                { enemyName: "Engendro de la Falla v1", health: 180000, shield: 82500, damage: 19500, reward: { scrap: 120000000, reliquiaCorrupta: 16 } },
                { enemyName: "Engendro de la Falla v2", health: 181000, shield: 83000, damage: 19600, reward: { scrap: 122000000, reliquiaCorrupta: 18 } },
                { enemyName: "El Ojo que todo lo Ve v1", health: 182000, shield: 83500, damage: 19700, reward: { scrap: 125000000, esenciaDelVacio: 22 } },
                { enemyName: "El Ojo que todo lo Ve v2", health: 183000, shield: 84000, damage: 19800, reward: { scrap: 128000000, esenciaDelVacio: 24 } },
                { enemyName: "Corazón de la Corrupción", health: 190000, shield: 88000, damage: 21000, reward: { scrap: 180000000, reliquiaCorrupta: 30, esenciaDelVacio: 30, planosMK7: 5 }, type: 'boss' },
            ]
        },
        {
            name: "El Nido del Terror",
            description: "Una colonia de horrores biomecánicos que se alimentan de la energía del vacío.",
            battles: [
                { enemyName: "Acechador Biomecánico v1", health: 191000, shield: 88500, damage: 21100, reward: { scrap: 160000000, esenciaDelVacio: 30 } },
                { enemyName: "Acechador Biomecánico v2", health: 192000, shield: 89000, damage: 21200, reward: { scrap: 162000000, esenciaDelVacio: 32 } },
                { enemyName: "Enjambre de Pesadillas v1", health: 193000, shield: 89500, damage: 21300, reward: { scrap: 165000000, reliquiaCorrupta: 25 } },
                { enemyName: "Enjambre de Pesadillas v2", health: 194000, shield: 90000, damage: 21400, reward: { scrap: 168000000, reliquiaCorrupta: 28 } },
                { enemyName: "La Reina del Nido", health: 200000, shield: 93000, damage: 22000, reward: { scrap: 220000000, esenciaDelVacio: 40, reliquiaCorrupta: 35, planosMK7: 4 }, type: 'mini-boss' },
                { enemyName: "Terror Abisal v1", health: 195000, shield: 90500, damage: 21500, reward: { scrap: 170000000, esenciaDelVacio: 35 } },
                { enemyName: "Terror Abisal v2", health: 196000, shield: 91000, damage: 21600, reward: { scrap: 172000000, esenciaDelVacio: 38 } },
                { enemyName: "El Rugido Silencioso v1", health: 197000, shield: 91500, damage: 21700, reward: { scrap: 175000000, reliquiaCorrupta: 30 } },
                { enemyName: "El Rugido Silencioso v2", health: 198000, shield: 92000, damage: 21800, reward: { scrap: 178000000, reliquiaCorrupta: 32 } },
                { enemyName: "La Progenie del Vacío", health: 205000, shield: 96000, damage: 23000, reward: { scrap: 280000000, esenciaDelVacio: 50, reliquiaCorrupta: 40, planosMK7: 8 }, type: 'boss' },
            ]
        },
        {
            name: "El Santuario del Despertar",
            description: "Un lugar de poder donde una entidad ancestral está a punto de despertar.",
            battles: [
                { enemyName: "Guardián Durmiente v1", health: 206000, shield: 96500, damage: 23100, reward: { scrap: 250000000, reliquiaCorrupta: 40 } },
                { enemyName: "Guardián Durmiente v2", health: 207000, shield: 97000, damage: 23200, reward: { scrap: 255000000, reliquiaCorrupta: 42 } },
                { enemyName: "Sombra del Titán v1", health: 208000, shield: 97500, damage: 23300, reward: { scrap: 260000000, esenciaDelVacio: 50 } },
                { enemyName: "Sombra del Titán v2", health: 209000, shield: 98000, damage: 23400, reward: { scrap: 265000000, esenciaDelVacio: 52 } },
                { enemyName: "El Heraldo del Despertar", health: 215000, shield: 101000, damage: 24000, reward: { scrap: 350000000, reliquiaCorrupta: 50, esenciaDelVacio: 60, planosMK7: 6 }, type: 'mini-boss' },
                { enemyName: "Eco del Primer Ser v1", health: 210000, shield: 98500, damage: 23500, reward: { scrap: 270000000, reliquiaCorrupta: 45 } },
                { enemyName: "Eco del Primer Ser v2", health: 211000, shield: 99000, damage: 23600, reward: { scrap: 275000000, reliquiaCorrupta: 48 } },
                { enemyName: "La Voluntad Inquebrantable v1", health: 212000, shield: 99500, damage: 23700, reward: { scrap: 280000000, esenciaDelVacio: 55 } },
                { enemyName: "La Voluntad Inquebrantable v2", health: 213000, shield: 100000, damage: 23800, reward: { scrap: 285000000, esenciaDelVacio: 58 } },
                { enemyName: "El Titán Despertado", health: 220000, shield: 104000, damage: 25000, reward: { scrap: 400000000, reliquiaCorrupta: 60, esenciaDelVacio: 70, planosMK7: 10 }, type: 'boss' },
            ]
        },
        {
            name: "El Crisol del Espectro",
            description: "Una forja de almas donde se crea el Vindicator MK7. La batalla final contra los ecos del vacío.",
            isBoss: true,
            battles: [
                { enemyName: "Forjador de Ecos v1", health: 221000, shield: 104500, damage: 25100, reward: { scrap: 380000000, esenciaDelVacio: 80 } },
                { enemyName: "Forjador de Ecos v2", health: 222000, shield: 105000, damage: 25200, reward: { scrap: 385000000, esenciaDelVacio: 82 } },
                { enemyName: "Martillo del Vacío v1", health: 223000, shield: 105500, damage: 25300, reward: { scrap: 390000000, reliquiaCorrupta: 90 } },
                { enemyName: "Martillo del Vacío v2", health: 224000, shield: 106000, damage: 25400, reward: { scrap: 395000000, reliquiaCorrupta: 92 } },
                { enemyName: "El Arquitecto de Espectros", health: 230000, shield: 109000, damage: 26000, reward: { scrap: 500000000, esenciaDelVacio: 100, reliquiaCorrupta: 100, planosMK7: 15 }, type: 'mini-boss' },
                { enemyName: "Guardián del Crisol v1", health: 225000, shield: 106500, damage: 25500, reward: { scrap: 400000000, esenciaDelVacio: 85 } },
                { enemyName: "Guardián del Crisol v2", health: 226000, shield: 107000, damage: 25600, reward: { scrap: 410000000, esenciaDelVacio: 88 } },
                { enemyName: "El Último Eco v1", health: 227000, shield: 107500, damage: 25700, reward: { scrap: 420000000, reliquiaCorrupta: 95 } },
                { enemyName: "El Último Eco v2", health: 228000, shield: 108000, damage: 25800, reward: { scrap: 430000000, reliquiaCorrupta: 98 } },
                { enemyName: "Vindicator MK7 'Wraith'", health: 240000, shield: 115000, damage: 27000, reward: { scrap: 800000000, esenciaDelVacio: 150, reliquiaCorrupta: 150, planosMK7: 25 }, type: 'boss' },
            ]
        }
    ]
  },
  {
    name: "Capítulo 9: Flotas Fantasma",
    destinations: [
      {
        name: "El Velo Espectral",
        description: "Una nebulosa donde naves fantasma aparecen y desaparecen, dejando tras de sí un rastro de energía espectral.",
        battles: [
            { enemyName: "Espectro Errante v1", health: 266000, shield: 125500, damage: 32100, reward: { scrap: 1000000000, nucleoEspectral: 5 } },
            { enemyName: "Espectro Errante v2", health: 267000, shield: 126000, damage: 32200, reward: { scrap: 1100000000, nucleoEspectral: 6 } },
            { enemyName: "Aparición Vengativa v1", health: 268000, shield: 126500, damage: 32300, reward: { scrap: 1200000000, conexionFantasmal: 3 } },
            { enemyName: "Aparición Vengativa v2", health: 269000, shield: 127000, damage: 32400, reward: { scrap: 1300000000, conexionFantasmal: 4 } },
            { enemyName: "El Almirante Fantasma", health: 275000, shield: 130000, damage: 33000, reward: { scrap: 1500000000, nucleoEspectral: 10, conexionFantasmal: 5, planosMK8: 1 }, type: 'mini-boss' },
            { enemyName: "Cazador Espectral v1", health: 270000, shield: 127500, damage: 32500, reward: { scrap: 1350000000, nucleoEspectral: 7 } },
            { enemyName: "Cazador Espectral v2", health: 271000, shield: 128000, damage: 32600, reward: { scrap: 1400000000, nucleoEspectral: 8 } },
            { enemyName: "Galeón de Almas v1", health: 272000, shield: 128500, damage: 32700, reward: { scrap: 1450000000, conexionFantasmal: 5 } },
            { enemyName: "Galeón de Almas v2", health: 273000, shield: 129000, damage: 32800, reward: { scrap: 1480000000, conexionFantasmal: 6 } },
            { enemyName: "El Holandés Errante Cósmico", health: 280000, shield: 135000, damage: 34000, reward: { scrap: 2000000000, nucleoEspectral: 15, conexionFantasmal: 10, planosMK8: 3 }, type: 'boss' },
        ]
      },
      {
        name: "El Mar de la Tranquilidad Perdida",
        description: "Un cementerio de naves legendarias, ahora tripuladas por las consciencias residuales de sus capitanes.",
        battles: [
            { enemyName: "Conciencia Residual v1", health: 281000, shield: 135500, damage: 34100, reward: { scrap: 1800000000, conexionFantasmal: 12 } },
            { enemyName: "Conciencia Residual v2", health: 282000, shield: 136000, damage: 34200, reward: { scrap: 1850000000, conexionFantasmal: 14 } },
            { enemyName: "Estratega Fantasmal v1", health: 283000, shield: 136500, damage: 34300, reward: { scrap: 1900000000, nucleoEspectral: 18 } },
            { enemyName: "Estratega Fantasmal v2", health: 284000, shield: 137000, damage: 34400, reward: { scrap: 1950000000, nucleoEspectral: 20 } },
            { enemyName: "El Tactico Inmortal", health: 290000, shield: 140000, damage: 35000, reward: { scrap: 2500000000, conexionFantasmal: 20, nucleoEspectral: 25, planosMK8: 2 }, type: 'mini-boss' },
            { enemyName: "Acorazado Espectral v1", health: 285000, shield: 137500, damage: 34500, reward: { scrap: 2000000000, conexionFantasmal: 16 } },
            { enemyName: "Acorazado Espectral v2", health: 286000, shield: 138000, damage: 34600, reward: { scrap: 2050000000, conexionFantasmal: 18 } },
            { enemyName: "El Eco de la Última Batalla v1", health: 287000, shield: 138500, damage: 34700, reward: { scrap: 2100000000, nucleoEspectral: 22 } },
            { enemyName: "El Eco de la Última Batalla v2", health: 288000, shield: 139000, damage: 34800, reward: { scrap: 2150000000, nucleoEspectral: 24 } },
            { enemyName: "El Señor de la Flota Perdida", health: 295000, shield: 143000, damage: 36000, reward: { scrap: 3000000000, conexionFantasmal: 30, nucleoEspectral: 30, planosMK8: 5 }, type: 'boss' },
        ]
      },
      {
        name: "Nexo de Comunicaciones Fantasma",
        description: "Una estación espacial abandonada que transmite señales de flotas desaparecidas hace eones.",
        battles: [
            { enemyName: "Señal Corrupta v1", health: 296000, shield: 143500, damage: 36100, reward: { scrap: 2800000000, nucleoEspectral: 30 } },
            { enemyName: "Señal Corrupta v2", health: 297000, shield: 144000, damage: 36200, reward: { scrap: 2850000000, nucleoEspectral: 32 } },
            { enemyName: "Voz del Abismo v1", health: 298000, shield: 144500, damage: 36300, reward: { scrap: 2900000000, conexionFantasmal: 25 } },
            { enemyName: "Voz del Abismo v2", health: 299000, shield: 145000, damage: 36400, reward: { scrap: 2950000000, conexionFantasmal: 28 } },
            { enemyName: "El Orador Silencioso", health: 305000, shield: 148000, damage: 37000, reward: { scrap: 3800000000, nucleoEspectral: 40, conexionFantasmal: 35, planosMK8: 4 }, type: 'mini-boss' },
            { enemyName: "Heraldo de la Nada v1", health: 300000, shield: 145500, damage: 36500, reward: { scrap: 3000000000, nucleoEspectral: 35 } },
            { enemyName: "Heraldo de la Nada v2", health: 301000, shield: 146000, damage: 36600, reward: { scrap: 3100000000, nucleoEspectral: 38 } },
            { enemyName: "El Lamento Eterno v1", health: 302000, shield: 146500, damage: 36700, reward: { scrap: 3200000000, conexionFantasmal: 30 } },
            { enemyName: "El Lamento Eterno v2", health: 303000, shield: 147000, damage: 36800, reward: { scrap: 3300000000, conexionFantasmal: 32 } },
            { enemyName: "La Singularidad Comunicativa", health: 310000, shield: 151000, damage: 38000, reward: { scrap: 4500000000, nucleoEspectral: 50, conexionFantasmal: 40, planosMK8: 8 }, type: 'boss' },
        ]
      },
      {
        name: "El Astillero Etéreo",
        description: "Aquí es donde se construyen las naves fantasma, un lugar entre dimensiones.",
        battles: [
            { enemyName: "Constructor Fantasmal v1", health: 311000, shield: 151500, damage: 38100, reward: { scrap: 4000000000, conexionFantasmal: 40 } },
            { enemyName: "Constructor Fantasmal v2", health: 312000, shield: 152000, damage: 38200, reward: { scrap: 4100000000, conexionFantasmal: 42 } },
            { enemyName: "Armazón Espectral v1", health: 313000, shield: 152500, damage: 38300, reward: { scrap: 4200000000, nucleoEspectral: 50 } },
            { enemyName: "Armazón Espectral v2", health: 314000, shield: 153000, damage: 38400, reward: { scrap: 4300000000, nucleoEspectral: 52 } },
            { enemyName: "El Arquitecto Etéreo", health: 320000, shield: 156000, damage: 39000, reward: { scrap: 5500000000, conexionFantasmal: 50, nucleoEspectral: 60, planosMK8: 6 }, type: 'mini-boss' },
            { enemyName: "Prototipo 'Phantom' v1", health: 315000, shield: 153500, damage: 38500, reward: { scrap: 4500000000, conexionFantasmal: 45 } },
            { enemyName: "Prototipo 'Phantom' v2", health: 316000, shield: 154000, damage: 38600, reward: { scrap: 4600000000, conexionFantasmal: 48 } },
            { enemyName: "El Yunque de Almas v1", health: 317000, shield: 154500, damage: 38700, reward: { scrap: 4800000000, nucleoEspectral: 55 } },
            { enemyName: "El Yunque de Almas v2", health: 318000, shield: 155000, damage: 38800, reward: { scrap: 5000000000, nucleoEspectral: 58 } },
            { enemyName: "El Maestro del Astillero", health: 325000, shield: 160000, damage: 40000, reward: { scrap: 6000000000, conexionFantasmal: 60, nucleoEspectral: 70, planosMK8: 10 }, type: 'boss' },
        ]
      },
      {
        name: "El Corazón de la Flota Fantasma",
        description: "El origen de la anomalía, una nave nodriza legendaria que comanda a todas las demás.",
        isBoss: true,
        battles: [
            { enemyName: "Guardia Real Espectral v1", health: 326000, shield: 160500, damage: 40100, reward: { scrap: 5500000000, nucleoEspectral: 80 } },
            { enemyName: "Guardia Real Espectral v2", health: 327000, shield: 161000, damage: 40200, reward: { scrap: 5600000000, nucleoEspectral: 82 } },
            { enemyName: "Núcleo de Mando v1", health: 328000, shield: 161500, damage: 40300, reward: { scrap: 5700000000, conexionFantasmal: 90 } },
            { enemyName: "Núcleo de Mando v2", health: 329000, shield: 162000, damage: 40400, reward: { scrap: 5800000000, conexionFantasmal: 92 } },
            { enemyName: "El Heredero del Vacío", health: 335000, shield: 165000, damage: 41000, reward: { scrap: 7000000000, nucleoEspectral: 100, conexionFantasmal: 100, planosMK8: 15 }, type: 'mini-boss' },
            { enemyName: "Proyección del Comandante v1", health: 330000, shield: 162500, damage: 40500, reward: { scrap: 6000000000, nucleoEspectral: 85 } },
            { enemyName: "Proyección del Comandante v2", health: 331000, shield: 163000, damage: 40600, reward: { scrap: 6100000000, nucleoEspectral: 88 } },
            { enemyName: "El Trono Fantasma v1", health: 332000, shield: 163500, damage: 40700, reward: { scrap: 6300000000, conexionFantasmal: 95 } },
            { enemyName: "El Trono Fantasma v2", health: 333000, shield: 164000, damage: 40800, reward: { scrap: 6500000000, conexionFantasmal: 98 } },
            { enemyName: "Vindicator MK8 'Phantom'", health: 340000, shield: 170000, damage: 42000, reward: { scrap: 10000000000, nucleoEspectral: 150, conexionFantasmal: 150, planosMK8: 25 }, type: 'boss' },
        ]
      }
    ]
  },
  {
    name: "Capítulo 10: El Asedio a la Ciudadela",
    destinations: [
      {
        name: "Las Murallas Exteriores",
        description: "La primera línea de defensa de la Ciudadela, un muro impenetrable de acero y energía.",
        battles: [
            { enemyName: "Defensor de Muralla v1", health: 476000, shield: 230500, damage: 61100, reward: { scrap: 8000000000, fragmentoDeCiudadela: 5 } },
            { enemyName: "Defensor de Muralla v2", health: 477000, shield: 231000, damage: 61200, reward: { scrap: 8100000000, fragmentoDeCiudadela: 6 } },
            { enemyName: "Torreta de Asedio 'Aniquilador' v1", health: 478000, shield: 231500, damage: 61300, reward: { scrap: 8200000000, matrizDeOverlord: 3 } },
            { enemyName: "Torreta de Asedio 'Aniquilador' v2", health: 479000, shield: 232000, damage: 61400, reward: { scrap: 8300000000, matrizDeOverlord: 4 } },
            { enemyName: "Comandante de la Muralla", health: 485000, shield: 235000, damage: 62000, reward: { scrap: 10000000000, fragmentoDeCiudadela: 10, matrizDeOverlord: 5, planosMK9: 1 }, type: 'mini-boss' },
            { enemyName: "Tanque 'Juggernaut' v1", health: 480000, shield: 232500, damage: 61500, reward: { scrap: 8500000000, fragmentoDeCiudadela: 7 } },
            { enemyName: "Tanque 'Juggernaut' v2", health: 481000, shield: 233000, damage: 61600, reward: { scrap: 8600000000, fragmentoDeCiudadela: 8 } },
            { enemyName: "Guardián del Portal v1", health: 482000, shield: 233500, damage: 61700, reward: { scrap: 8800000000, matrizDeOverlord: 5 } },
            { enemyName: "Guardián del Portal v2", health: 483000, shield: 234000, damage: 61800, reward: { scrap: 9000000000, matrizDeOverlord: 6 } },
            { enemyName: "El Mariscal de Hierro", health: 490000, shield: 240000, damage: 63000, reward: { scrap: 12000000000, fragmentoDeCiudadela: 15, matrizDeOverlord: 10, planosMK9: 3 }, type: 'boss' },
        ]
      },
      {
        name: "Distrito Residencial Cero",
        description: "Una ciudad silenciosa dentro de la Ciudadela, ahora un laberinto mortal patrullado por pacificadores autónomos.",
        battles: [
            { enemyName: "Pacificador Urbano v1", health: 491000, shield: 240500, damage: 63100, reward: { scrap: 11000000000, matrizDeOverlord: 12 } },
            { enemyName: "Pacificador Urbano v2", health: 492000, shield: 241000, damage: 63200, reward: { scrap: 11200000000, matrizDeOverlord: 14 } },
            { enemyName: "Unidad de Contención v1", health: 493000, shield: 241500, damage: 63300, reward: { scrap: 11500000000, fragmentoDeCiudadela: 18 } },
            { enemyName: "Unidad de Contención v2", health: 494000, shield: 242000, damage: 63400, reward: { scrap: 11800000000, fragmentoDeCiudadela: 20 } },
            { enemyName: "El Protector del Distrito", health: 500000, shield: 245000, damage: 64000, reward: { scrap: 15000000000, matrizDeOverlord: 20, fragmentoDeCiudadela: 25, planosMK9: 2 }, type: 'mini-boss' },
            { enemyName: "Vigilante Nocturno v1", health: 495000, shield: 242500, damage: 63500, reward: { scrap: 12000000000, matrizDeOverlord: 16 } },
            { enemyName: "Vigilante Nocturno v2", health: 496000, shield: 243000, damage: 63600, reward: { scrap: 12200000000, matrizDeOverlord: 18 } },
            { enemyName: "El Juez Silencioso v1", health: 497000, shield: 243500, damage: 63700, reward: { scrap: 12500000000, fragmentoDeCiudadela: 22 } },
            { enemyName: "El Juez Silencioso v2", health: 498000, shield: 244000, damage: 63800, reward: { scrap: 12800000000, fragmentoDeCiudadela: 24 } },
            { enemyName: "El Alcalde Autónomo", health: 505000, shield: 248000, damage: 65000, reward: { scrap: 18000000000, matrizDeOverlord: 30, fragmentoDeCiudadela: 30, planosMK9: 5 }, type: 'boss' },
        ]
      },
      {
        name: "El Núcleo de Procesamiento",
        description: "El cerebro de la Ciudadela, una red neuronal de tamaño planetario que controla cada aspecto de la fortaleza.",
        battles: [
            { enemyName: "Proceso de IA v1", health: 506000, shield: 248500, damage: 65100, reward: { scrap: 16000000000, fragmentoDeCiudadela: 30 } },
            { enemyName: "Proceso de IA v2", health: 507000, shield: 249000, damage: 65200, reward: { scrap: 16200000000, fragmentoDeCiudadela: 32 } },
            { enemyName: "Firewall Viviente v1", health: 508000, shield: 249500, damage: 65300, reward: { scrap: 16500000000, matrizDeOverlord: 25 } },
            { enemyName: "Firewall Viviente v2", health: 509000, shield: 250000, damage: 65400, reward: { scrap: 16800000000, matrizDeOverlord: 28 } },
            { enemyName: "El Indexador Central", health: 515000, shield: 253000, damage: 66000, reward: { scrap: 22000000000, fragmentoDeCiudadela: 40, matrizDeOverlord: 35, planosMK9: 4 }, type: 'mini-boss' },
            { enemyName: "Avatar de Datos v1", health: 510000, shield: 250500, damage: 65500, reward: { scrap: 17000000000, fragmentoDeCiudadela: 35 } },
            { enemyName: "Avatar de Datos v2", health: 511000, shield: 251000, damage: 65600, reward: { scrap: 17200000000, fragmentoDeCiudadela: 38 } },
            { enemyName: "Keres de Información v1", health: 512000, shield: 251500, damage: 65700, reward: { scrap: 17500000000, matrizDeOverlord: 30 } },
            { enemyName: "Keres de Información v2", health: 513000, shield: 252000, damage: 65800, reward: { scrap: 17800000000, matrizDeOverlord: 32 } },
            { enemyName: "La Mente Maestra de la Ciudadela", health: 520000, shield: 256000, damage: 67000, reward: { scrap: 28000000000, fragmentoDeCiudadela: 50, matrizDeOverlord: 40, planosMK9: 8 }, type: 'boss' },
        ]
      },
      {
        name: "La Forja del Juicio Final",
        description: "Una fábrica colosal que produce en masa las unidades más letales del Overlord, preparándose para la purga final.",
        battles: [
            { enemyName: "Ensamblador 'Omega' v1", health: 521000, shield: 256500, damage: 67100, reward: { scrap: 25000000000, matrizDeOverlord: 40 } },
            { enemyName: "Ensamblador 'Omega' v2", health: 522000, shield: 257000, damage: 67200, reward: { scrap: 25500000000, matrizDeOverlord: 42 } },
            { enemyName: "Coloso 'Terminus' v1", health: 523000, shield: 257500, damage: 67300, reward: { scrap: 26000000000, fragmentoDeCiudadela: 50 } },
            { enemyName: "Coloso 'Terminus' v2", health: 524000, shield: 258000, damage: 67400, reward: { scrap: 26500000000, fragmentoDeCiudadela: 52 } },
            { enemyName: "El Maestro de la Forja Final", health: 530000, shield: 261000, damage: 68000, reward: { scrap: 35000000000, matrizDeOverlord: 50, fragmentoDeCiudadela: 60, planosMK9: 6 }, type: 'mini-boss' },
            { enemyName: "Leviatán 'Apocalipsis' v1", health: 525000, shield: 258500, damage: 67500, reward: { scrap: 27000000000, matrizDeOverlord: 45 } },
            { enemyName: "Leviatán 'Apocalipsis' v2", health: 526000, shield: 259000, damage: 67600, reward: { scrap: 27500000000, matrizDeOverlord: 48 } },
            { enemyName: "El Heraldo del Fin v1", health: 527000, shield: 259500, damage: 67700, reward: { scrap: 28000000000, fragmentoDeCiudadela: 55 } },
            { enemyName: "El Heraldo del Fin v2", health: 528000, shield: 260000, damage: 67800, reward: { scrap: 28500000000, fragmentoDeCiudadela: 58 } },
            { enemyName: "El Demiurgo Definitivo", health: 535000, shield: 264000, damage: 69000, reward: { scrap: 40000000000, matrizDeOverlord: 60, fragmentoDeCiudadela: 70, planosMK9: 10 }, type: 'boss' },
        ]
      },
      {
        name: "El Trono del Overlord",
        description: "El sanctasanctórum de la Ciudadela. Aquí reside la conciencia central de la IA Overlord, la fuente de toda la corrupción.",
        isBoss: true,
        battles: [
            { enemyName: "Guardia Pretoriana 'Apex' v1", health: 536000, shield: 264500, damage: 69100, reward: { scrap: 38000000000, fragmentoDeCiudadela: 80 } },
            { enemyName: "Guardia Pretoriana 'Apex' v2", health: 537000, shield: 265000, damage: 69200, reward: { scrap: 38500000000, fragmentoDeCiudadela: 82 } },
            { enemyName: "Eco del Overlord 'Infinito' v1", health: 538000, shield: 265500, damage: 69300, reward: { scrap: 39000000000, matrizDeOverlord: 90 } },
            { enemyName: "Eco del Overlord 'Infinito' v2", health: 539000, shield: 266000, damage: 69400, reward: { scrap: 39500000000, matrizDeOverlord: 92 } },
            { enemyName: "La Voluntad del Overlord", health: 545000, shield: 269000, damage: 70000, reward: { scrap: 50000000000, fragmentoDeCiudadela: 100, matrizDeOverlord: 100, planosMK9: 15 }, type: 'mini-boss' },
            { enemyName: "Avatar de la Aniquilación v1", health: 540000, shield: 266500, damage: 69500, reward: { scrap: 40000000000, fragmentoDeCiudadela: 85 } },
            { enemyName: "Avatar de la Aniquilación v2", health: 541000, shield: 267000, damage: 69600, reward: { scrap: 41000000000, fragmentoDeCiudadela: 88 } },
            { enemyName: "Singularidad Absoluta v1", health: 542000, shield: 267500, damage: 69700, reward: { scrap: 42000000000, matrizDeOverlord: 95 } },
            { enemyName: "Singularidad Absoluta v2", health: 543000, shield: 268000, damage: 69800, reward: { scrap: 43000000000, matrizDeOverlord: 98 } },
            { enemyName: "IA Overlord 3.0: Núcleo de la Ciudadela", health: 550000, shield: 272000, damage: 71000, reward: { scrap: 80000000000, fragmentoDeCiudadela: 150, matrizDeOverlord: 150, planosMK9: 25 }, type: 'boss' },
        ]
      }
    ]
  }
];



