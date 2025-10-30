export interface Battle {
  enemyName: string;
  health: number;
  shield: number;
  damage: number;
  reward: {
    scrap: number; 
    aleacionReforzada: number;
    neuroChipCorrupto: number;
    blueprints?: number;
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
];


export const battleDestinations: Destination[] = [
  {
    name: "Sector de Patrulla Dron",
    description: "Drones de reconocimiento renegados han infestado este sector. Despéjalo.",
    battles: [
      // 4 Combates Regulares
      { enemyName: "Dron Patrulla Mk.I", health: 100, shield: 50, damage: 20, reward: { scrap: 500, aleacionReforzada: 1, neuroChipCorrupto: 1 }, type: 'regular' },
      { enemyName: "Dron Patrulla Mk.II", health: 120, shield: 60, damage: 22, reward: { scrap: 550, aleacionReforzada: 1, neuroChipCorrupto: 1 }, type: 'regular' },
      { enemyName: "Dron Patrulla Mk.III", health: 140, shield: 70, damage: 25, reward: { scrap: 600, aleacionReforzada: 2, neuroChipCorrupto: 1 }, type: 'regular' },
      { enemyName: "Dron Patrulla Mk.IV", health: 160, shield: 80, damage: 28, reward: { scrap: 650, aleacionReforzada: 2, neuroChipCorrupto: 2 }, type: 'regular' },
      // 1 Mini-Jefe
      { enemyName: "Líder de Escuadrón Dron", health: 250, shield: 125, damage: 40, reward: { scrap: 1500, aleacionReforzada: 5, neuroChipCorrupto: 3, blueprints: 1 }, type: 'mini-boss' },
      // 4 Combates Regulares
      { enemyName: "Dron de Asalto Mk.I", health: 180, shield: 90, damage: 32, reward: { scrap: 700, aleacionReforzada: 2, neuroChipCorrupto: 2 }, type: 'regular' },
      { enemyName: "Dron de Asalto Mk.II", health: 200, shield: 100, damage: 35, reward: { scrap: 750, aleacionReforzada: 3, neuroChipCorrupto: 2 }, type: 'regular' },
      { enemyName: "Dron de Asalto Mk.III", health: 220, shield: 110, damage: 38, reward: { scrap: 800, aleacionReforzada: 3, neuroChipCorrupto: 3 }, type: 'regular' },
      { enemyName: "Dron de Asalto Mk.IV", health: 240, shield: 120, damage: 41, reward: { scrap: 850, aleacionReforzada: 4, neuroChipCorrupto: 3 }, type: 'regular' },
      // 1 Jefe Final de Destino
      { enemyName: "Nave Nodriza Dron", health: 500, shield: 250, damage: 60, reward: { scrap: 3000, aleacionReforzada: 10, neuroChipCorrupto: 7, blueprints: 3 }, type: 'boss' },
    ],
  },
  {
    name: "Nido de Carroñeros",
    description: "Una pequeña facción de carroñeros ha reclamado un campo de asteroides cercano.",
    battles: [
        { enemyName: "Nave Carroñera Mk.I", health: 250, shield: 100, damage: 45, reward: { scrap: 1000, aleacionReforzada: 3, neuroChipCorrupto: 2 }, type: 'regular' },
        { enemyName: "Nave Carroñera Mk.II", health: 280, shield: 115, damage: 50, reward: { scrap: 1100, aleacionReforzada: 3, neuroChipCorrupto: 2 }, type: 'regular' },
        { enemyName: "Nave Carroñera Mk.III", health: 310, shield: 130, damage: 55, reward: { scrap: 1200, aleacionReforzada: 4, neuroChipCorrupto: 3 }, type: 'regular' },
        { enemyName: "Nave Carroñera Mk.IV", health: 340, shield: 145, damage: 60, reward: { scrap: 1300, aleacionReforzada: 4, neuroChipCorrupto: 3 }, type: 'regular' },
        { enemyName: "Capitán Carroñero", health: 500, shield: 200, damage: 80, reward: { scrap: 3000, aleacionReforzada: 10, neuroChipCorrupto: 8, blueprints: 1 }, type: 'mini-boss' },
        { enemyName: "Nave de Guerra Carroñera Mk.I", health: 370, shield: 160, damage: 65, reward: { scrap: 1400, aleacionReforzada: 5, neuroChipCorrupto: 4 }, type: 'regular' },
        { enemyName: "Nave de Guerra Carroñera Mk.II", health: 400, shield: 175, damage: 70, reward: { scrap: 1500, aleacionReforzada: 5, neuroChipCorrupto: 4 }, type: 'regular' },
        { enemyName: "Nave de Guerra Carroñera Mk.III", health: 430, shield: 190, damage: 75, reward: { scrap: 1600, aleacionReforzada: 6, neuroChipCorrupto: 5 }, type: 'regular' },
        { enemyName: "Nave de Guerra Carroñera Mk.IV", health: 460, shield: 205, damage: 80, reward: { scrap: 1700, aleacionReforzada: 6, neuroChipCorrupto: 5 }, type: 'regular' },
        { enemyName: "El 'Recuperador'", health: 800, shield: 400, damage: 120, reward: { scrap: 6000, aleacionReforzada: 20, neuroChipCorrupto: 15, blueprints: 4 }, type: 'boss' },
    ]
  },
  // ... (Puedes seguir este patrón para los otros destinos)
  {
    name: "Puesto de Escucha Pirata",
    description: "Un puesto de avanzada pirata está interceptando transmisiones. Debe ser neutralizado.",
    battles: [
        { enemyName: "Fragata Pirata Mk.I", health: 500, shield: 250, damage: 80, reward: { scrap: 2500, aleacionReforzada: 5, neuroChipCorrupto: 4 }, type: 'regular' },
        { enemyName: "Fragata Pirata Mk.II", health: 550, shield: 275, damage: 88, reward: { scrap: 2750, aleacionReforzada: 6, neuroChipCorrupto: 4 }, type: 'regular' },
        { enemyName: "Fragata Pirata Mk.III", health: 600, shield: 300, damage: 96, reward: { scrap: 3000, aleacionReforzada: 7, neuroChipCorrupto: 5 }, type: 'regular' },
        { enemyName: "Fragata Pirata Mk.IV", health: 650, shield: 325, damage: 104, reward: { scrap: 3250, aleacionReforzada: 8, neuroChipCorrupto: 5 }, type: 'regular' },
        { enemyName: "Señor de la Guerra Pirata", health: 1000, shield: 500, damage: 150, reward: { scrap: 7000, aleacionReforzada: 20, neuroChipCorrupto: 15, blueprints: 2 }, type: 'mini-boss' },
        { enemyName: "Destructor Pirata Mk.I", health: 700, shield: 350, damage: 112, reward: { scrap: 3500, aleacionReforzada: 9, neuroChipCorrupto: 6 }, type: 'regular' },
        { enemyName: "Destructor Pirata Mk.II", health: 750, shield: 375, damage: 120, reward: { scrap: 3750, aleacionReforzada: 10, neuroChipCorrupto: 6 }, type: 'regular' },
        { enemyName: "Destructor Pirata Mk.III", health: 800, shield: 400, damage: 128, reward: { scrap: 4000, aleacionReforzada: 11, neuroChipCorrupto: 7 }, type: 'regular' },
        { enemyName: "Destructor Pirata Mk.IV", health: 850, shield: 425, damage: 136, reward: { scrap: 4250, aleacionReforzada: 12, neuroChipCorrupto: 7 }, type: 'regular' },
        { enemyName: "El 'Terror de los Cielos'", health: 1500, shield: 750, damage: 200, reward: { scrap: 12000, aleacionReforzada: 40, neuroChipCorrupto: 30, blueprints: 5 }, type: 'boss' },
    ]
  },
  {
    name: "Flota de Seguridad corrupta",
    description: "Una flota de seguridad automatizada se ha vuelto hostil y ataca a todo lo que se acerca.",
    battles: [
        { enemyName: "Corbeta de Seguridad Mk.I", health: 1000, shield: 500, damage: 150, reward: { scrap: 5000, aleacionReforzada: 10, neuroChipCorrupto: 8 }, type: 'regular' },
        { enemyName: "Corbeta de Seguridad Mk.II", health: 1100, shield: 550, damage: 165, reward: { scrap: 5500, aleacionReforzada: 11, neuroChipCorrupto: 9 }, type: 'regular' },
        { enemyName: "Corbeta de Seguridad Mk.III", health: 1200, shield: 600, damage: 180, reward: { scrap: 6000, aleacionReforzada: 12, neuroChipCorrupto: 10 }, type: 'regular' },
        { enemyName: "Corbeta de Seguridad Mk.IV", health: 1300, shield: 650, damage: 195, reward: { scrap: 6500, aleacionReforzada: 13, neuroChipCorrupto: 11 }, type: 'regular' },
        { enemyName: "Unidad de Contención Central", health: 2000, shield: 1000, damage: 250, reward: { scrap: 15000, aleacionReforzada: 30, neuroChipCorrupto: 25, blueprints: 2 }, type: 'mini-boss' },
        { enemyName: "Crucero de Seguridad Mk.I", health: 1400, shield: 700, damage: 210, reward: { scrap: 7000, aleacionReforzada: 14, neuroChipCorrupto: 12 }, type: 'regular' },
        { enemyName: "Crucero de Seguridad Mk.II", health: 1500, shield: 750, damage: 225, reward: { scrap: 7500, aleacionReforzada: 15, neuroChipCorrupto: 13 }, type: 'regular' },
        { enemyName: "Crucero de Seguridad Mk.III", health: 1600, shield: 800, damage: 240, reward: { scrap: 8000, aleacionReforzada: 16, neuroChipCorrupto: 14 }, type: 'regular' },
        { enemyName: "Crucero de Seguridad Mk.IV", health: 1700, shield: 850, damage: 255, reward: { scrap: 8500, aleacionReforzada: 17, neuroChipCorrupto: 15 }, type: 'regular' },
        { enemyName: "El 'Pacificador'", health: 3000, shield: 1500, damage: 350, reward: { scrap: 25000, aleacionReforzada: 60, neuroChipCorrupto: 50, blueprints: 6 }, type: 'boss' },
    ]
  },
    {
    name: "Base de Operaciones Final",
    description: "La base de operaciones final que coordina todas las fuerzas enemigas en el sector. Una fortaleza fuertemente defendida.",
    battles: [
        { enemyName: "Defensa de Base Mk.I", health: 2000, shield: 800, damage: 200, reward: { scrap: 10000, aleacionReforzada: 20, neuroChipCorrupto: 15 }, type: 'regular' },
        { enemyName: "Defensa de Base Mk.II", health: 2200, shield: 880, damage: 220, reward: { scrap: 11000, aleacionReforzada: 22, neuroChipCorrupto: 17 }, type: 'regular' },
        { enemyName: "Defensa de Base Mk.III", health: 2400, shield: 960, damage: 240, reward: { scrap: 12000, aleacionReforzada: 24, neuroChipCorrupto: 19 }, type: 'regular' },
        { enemyName: "Defensa de Base Mk.IV", health: 2600, shield: 1040, damage: 260, reward: { scrap: 13000, aleacionReforzada: 26, neuroChipCorrupto: 21 }, type: 'regular' },
        { enemyName: "Comandante de la Fortaleza", health: 4000, shield: 1600, damage: 350, reward: { scrap: 25000, aleacionReforzada: 50, neuroChipCorrupto: 40, blueprints: 3 }, type: 'mini-boss' },
        { enemyName: "Torreta Pesada Mk.I", health: 2800, shield: 1120, damage: 280, reward: { scrap: 14000, aleacionReforzada: 28, neuroChipCorrupto: 23 }, type: 'regular' },
        { enemyName: "Torreta Pesada Mk.II", health: 3000, shield: 1200, damage: 300, reward: { scrap: 15000, aleacionReforzada: 30, neuroChipCorrupto: 25 }, type: 'regular' },
        { enemyName: "Torreta Pesada Mk.III", health: 3200, shield: 1280, damage: 320, reward: { scrap: 16000, aleacionReforzada: 32, neuroChipCorrupto: 27 }, type: 'regular' },
        { enemyName: "Torreta Pesada Mk.IV", health: 3400, shield: 1360, damage: 340, reward: { scrap: 17000, aleacionReforzada: 34, neuroChipCorrupto: 29 }, type: 'regular' },
        { enemyName: "El 'Overlord'", health: 6000, shield: 2400, damage: 500, reward: { scrap: 50000, aleacionReforzada: 100, neuroChipCorrupto: 80, blueprints: 8 }, type: 'boss' },
    ]
  },
  // Capítulo 1 - Jefe Final del CAPÍTULO
  {
    name: "El 'Leviatán'",
    description: "El origen de la corrupción. Una nave capital abandonada controlada por una IA hostil.",
    isBoss: true,
    battles: [
      {
        enemyName: "El Leviatán - Núcleo Central",
        health: 15000,
        shield: 7500,
        damage: 400,
        reward: {
          scrap: 50000,
          aleacionReforzada: 200,
          neuroChipCorrupto: 150,
          blueprints: 20,
        },
        type: 'boss',
      }
    ],
  },
];

// Estructura para capítulos futuros
export interface Chapter {
  id: number;
  name: string;
  unlocked: boolean;
  destinations: Destination[];
  rewards: {
    newNaveUnlocked?: string;
    resources: Record<string, number>;
    phase1Upgrades: string[];
  };
}

export const battleChapters: Chapter[] = [
  {
    id: 1,
    name: "La Amenaza del Leviatán",
    unlocked: true,
    destinations: battleDestinations,
    rewards: {
      newNaveUnlocked: "Vindicator Mk.II",
      resources: {
        tecnologiaAvanzada: 1,
        nucleoSingularidad: 5
      },
      phase1Upgrades: ["dronesAvanzados", "fundicionMejorada"]
    }
  },
  // Capítulos futuros se agregarán aquí
];

