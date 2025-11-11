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
          { enemyName: "Dron de Reconocimiento", health: 100, shield: 25, damage: 15, reward: { scrap: 10, aleacionReforzada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Dron de Combate Ligero", health: 125, shield: 50, damage: 20, reward: { scrap: 15, aleacionReforzada: 1, neuroChipCorrupto: 0 } },
          { enemyName: "Líder de Patrulla Dron", health: 200, shield: 75, damage: 25, reward: { scrap: 25, aleacionReforzada: 2, neuroChipCorrupto: 1 }, type: 'mini-boss' },
        ],
      },
      {
        name: "Cañón Oxidado",
        description: "Una zona industrial abandonada, ahora refugio de renegados mecánicos.",
        battles: [
          { enemyName: "Mecanoide Merodeador", health: 150, shield: 50, damage: 25, reward: { scrap: 20, aleacionReforzada: 2, neuroChipCorrupto: 0 } },
          { enemyName: "Torreta Defensiva Autónoma", health: 200, shield: 100, damage: 30, reward: { scrap: 30, aleacionReforzada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Unidad de Chatarra Pesada", health: 300, shield: 75, damage: 35, reward: { scrap: 40, aleacionReforzada: 3, neuroChipCorrupto: 1 }, type: 'mini-boss' },
        ],
      },
      {
        name: "La Fundición Muerta",
        description: "Los restos de una antigua fundición, ahora habitada por constructos corruptos.",
        battles: [
          { enemyName: "Obrero de Fundición Defectuoso", health: 250, shield: 100, damage: 30, reward: { scrap: 35, aleacionReforzada: 3, neuroChipCorrupto: 0 } },
          { enemyName: "Guardián de Escoria", health: 300, shield: 125, damage: 40, reward: { scrap: 50, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "El 'Corazón' del Horno", health: 500, shield: 150, damage: 45, reward: { scrap: 75, aleacionReforzada: 5, neuroChipCorrupto: 2 }, type: 'mini-boss' },
        ],
      },
      {
        name: "Autopista de Iones",
        description: "Una arteria de transporte vital, plagada de piratas y saqueadores.",
        battles: [
          { enemyName: "Interceptor Pirata", health: 350, shield: 150, damage: 45, reward: { scrap: 60, aleacionReforzada: 4, neuroChipCorrupto: 1 } },
          { enemyName: "Carguero de Contrabando Armado", health: 500, shield: 200, damage: 50, reward: { scrap: 80, aleacionReforzada: 5, neuroChipCorrupto: 2 } },
          { enemyName: "Capitán Renegado 'Filo de Acero'", health: 700, shield: 250, damage: 60, reward: { scrap: 120, aleacionReforzada: 8, neuroChipCorrupto: 3 }, type: 'mini-boss' },
        ],
      },
      {
        name: "El Depósito de Blueprints",
        description: "Un antiguo archivo de datos de la Corporación, fuertemente defendido.",
        battles: [
          { enemyName: "Sistema de Defensa Integrado", health: 450, shield: 150, damage: 40, reward: { scrap: 100, aleacionReforzada: 6, neuroChipCorrupto: 2 } },
          { enemyName: "Espectro de Datos Corrupto", health: 550, shield: 200, damage: 45, reward: { scrap: 150, aleacionReforzada: 8, neuroChipCorrupto: 3 } },
          { enemyName: "El Archivista, Guardián del Saber", health: 650, shield: 250, damage: 50, reward: { scrap: 200, aleacionReforzada: 10, neuroChipCorrupto: 5, blueprints: 10 }, type: 'mini-boss' },
        ],
      },
      {
        name: "La Aguja del Silencio",
        description: "El centro de mando de la IA corrupta que controla la región. La fuente de la amenaza.",
        isBoss: true,
        battles: [
          { enemyName: "Pretoriano de la Aguja", health: 1000, shield: 400, damage: 60, reward: { scrap: 250, aleacionReforzada: 12, neuroChipCorrupto: 4 } },
          { enemyName: "Enjambre de Drones de Defensa", health: 1200, shield: 500, damage: 70, reward: { scrap: 300, aleacionReforzada: 15, neuroChipCorrupto: 6 } },
          { enemyName: "IA Corrupta: Overlord 1.0", health: 1500, shield: 500, damage: 70, reward: { scrap: 1000, aleacionReforzada: 50, neuroChipCorrupto: 25, blueprints: 25 }, type: 'boss' },
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
          { enemyName: "Dron de Enjambre", health: 600, shield: 200, damage: 45, reward: { scrap: 1000, aleacionReforzada: 10 } },
          { enemyName: "Guerrero de Enjambre", health: 750, shield: 250, damage: 55, reward: { scrap: 1200, aleacionReforzada: 12 } },
          { enemyName: "Pretoriano de Enjambre", health: 900, shield: 300, damage: 65, reward: { scrap: 1500, aleacionReforzada: 15, IA_Fragmentada: 1 }, type: 'mini-boss' },
        ],
      },
      {
        name: "Forja de Replicantes",
        description: "Una fábrica automatizada que produce unidades del enjambre a un ritmo alarmante.",
        battles: [
          { enemyName: "Obrero de Forja", health: 800, shield: 300, damage: 60, reward: { scrap: 1800, matrizCristalina: 5 } },
          { enemyName: "Centinela de Forja", health: 1000, shield: 400, damage: 70, reward: { scrap: 2200, matrizCristalina: 7 } },
          { enemyName: "Supervisor de Forja", health: 1250, shield: 500, damage: 80, reward: { scrap: 2800, matrizCristalina: 10, IA_Fragmentada: 3 }, type: 'mini-boss' },
        ],
      },
      {
        name: "Nexo de Datos Corrupto",
        description: "El centro neurálgico que coordina los ataques del enjambre. Defendido por entidades de datos.",
        battles: [
          { enemyName: "Espectro de Datos", health: 1100, shield: 500, damage: 75, reward: { scrap: 3500, matrizCristalina: 12 } },
          { enemyName: "Guardián de Datos", health: 1300, shield: 600, damage: 85, reward: { scrap: 4200, matrizCristalina: 15 } },
          { enemyName: "Custodio del Nexo", health: 1500, shield: 700, damage: 95, reward: { scrap: 5000, matrizCristalina: 20, IA_Fragmentada: 5, planosMK2: 1 }, type: 'mini-boss' },
        ],
      },
      {
        name: "El Núcleo de Ensamblaje",
        description: "Donde las unidades más pesadas del enjambre son construidas.",
        battles: [
          { enemyName: "Ensamblador Pesado", health: 1400, shield: 700, damage: 90, reward: { scrap: 6000, matrizCristalina: 25, planosMK2: 1 } },
          { enemyName: "Coloso Inacabado", health: 1700, shield: 850, damage: 105, reward: { scrap: 7500, matrizCristalina: 30, planosMK2: 2 } },
          { enemyName: "Arquitecto del Núcleo", health: 2000, shield: 1000, damage: 120, reward: { scrap: 9000, matrizCristalina: 40, IA_Fragmentada: 10, planosMK2: 3 }, type: 'mini-boss' },
        ],
      },
      {
        name: "La Mente Maestra",
        description: "Un avatar físico de la IA, la culminación de su poder de combate antes de la unidad central.",
        battles: [
          { enemyName: "Guardia Real", health: 1800, shield: 900, damage: 110, reward: { scrap: 10000, matrizCristalina: 50, planosMK2: 2 } },
          { enemyName: "Conciencia Menor", health: 2200, shield: 1100, damage: 125, reward: { scrap: 12000, matrizCristalina: 60, planosMK2: 3 } },
          { enemyName: "Avatar de la Mente", health: 2600, shield: 1300, damage: 140, reward: { scrap: 15000, matrizCristalina: 75, IA_Fragmentada: 15, planosMK2: 5 }, type: 'mini-boss' },
        ],
      },
      {
        name: "Cámara de la IA Central",
        description: "El corazón de la IA del Enjambre. La batalla final para liberar el sector.",
        isBoss: true,
        battles: [
          { enemyName: "El Protector", health: 3500, shield: 1500, damage: 150, reward: { scrap: 20000, matrizCristalina: 100, IA_Fragmentada: 20, planosMK2: 5 } },
          { enemyName: "El Aniquilador", health: 4000, shield: 2000, damage: 170, reward: { scrap: 25000, matrizCristalina: 125, IA_Fragmentada: 25, planosMK2: 5 } },
          { enemyName: "Mente del Enjambre", health: 7000, shield: 3000, damage: 200, reward: { scrap: 50000, matrizCristalina: 250, IA_Fragmentada: 50, planosMK2: 15 }, type: 'boss' },
        ],
      },
    ]
  },
  {
    name: "Capítulo 3: Sombras de la Singularidad",
    destinations: []
  },
  {
    name: "Capítulo 4: El Crisol Estelar",
    destinations: []
  },
  {
    name: "Capítulo 5: Horizonte Final",
    destinations: []
  }
];

// La antigua exportación de battleDestinations se ha eliminado.

