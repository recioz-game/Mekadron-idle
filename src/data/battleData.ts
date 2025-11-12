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

