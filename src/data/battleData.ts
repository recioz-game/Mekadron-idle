export interface Battle {
  enemyName: string;
  health: number;
  shield: number;
  damage: number;
  reward: {
    scrap: number; 
    aleacionReforzada: number;
    neuroChipCorrupto: number;
  };
}

export interface Destination {
  name: string;
  description: string;
  battles: Battle[];
}

const generateBattles = (
  count: number,
  name: string,
  baseHealth: number,
  baseShield: number,
  baseDamage: number,
  baseScrap: number,
  baseAleacion: number,
  baseChip: number
): Battle[] => {
  return Array(count).fill(null).map((_, i) => ({
    enemyName: `${name} Mk.${i + 1}`,
    health: Math.floor(baseHealth * Math.pow(1.2, i)),
    shield: Math.floor(baseShield * Math.pow(1.15, i)),
    damage: Math.floor(baseDamage * Math.pow(1.1, i)),
    reward: {
      scrap: Math.floor(baseScrap * Math.pow(1.05, i)),
      aleacionReforzada: Math.floor(baseAleacion * Math.pow(1.1, i)),
      neuroChipCorrupto: Math.floor(baseChip * Math.pow(1.12, i)),
    },
  }));
};

export const battleDestinations: Destination[] = [
  {
    name: "Sector de Patrulla Dron",
    description: "Drones de reconocimiento renegados han infestado este sector. Despéjalo.",
    battles: generateBattles(10, "Dron Patrulla", 100, 50, 20, 500, 5, 3),
  },
  {
    name: "Nido de Carroñeros",
    description: "Una pequeña facción de carroñeros ha reclamado un campo de asteroides cercano.",
    battles: generateBattles(10, "Nave Carroñera", 250, 100, 45, 1000, 10, 7),
  },
  {
    name: "Puesto de Escucha Pirata",
    description: "Un puesto de avanzada pirata está interceptando transmisiones. Debe ser neutralizado.",
    battles: generateBattles(10, "Fragata Pirata", 500, 250, 80, 2500, 20, 15),
  },
  {
    name: "Flota de Seguridad corrupta",
    description: "Una flota de seguridad automatizada se ha vuelto hostil y ataca a todo lo que se acerca.",
    battles: generateBattles(10, "Corbeta de Seguridad", 1000, 500, 150, 5000, 40, 30),
  },
  {
    name: "El 'Leviatán'",
    description: "El origen de la corrupción. Una nave capital abandonada controlada por una IA hostil.",
    battles: generateBattles(10, "Defensa del Leviatán", 2500, 1000, 300, 15000, 80, 60),
  },
];
