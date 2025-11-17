// src/data/bodegaData.ts
import { ResourceCategory } from "./categoryData";

interface BodegaUpgradeData {
  baseCost: number;
  costIncreaseFactor: number;
  capacityIncrease: number;
  resource: string;
}

export const bodegaData: Record<string, Record<ResourceCategory, BodegaUpgradeData>> = {
  base: {
    materialesIndustriales: {
      baseCost: 2500,
      costIncreaseFactor: 1.5,
      capacityIncrease: 1000,
      resource: 'metalRefinado',
    },
    componentesBatalla: {
      baseCost: 500,
      costIncreaseFactor: 1.8,
      capacityIncrease: 500,
      resource: 'aleacionReforzada',
    },
    materialesExoticos: {
      baseCost: 100,
      costIncreaseFactor: 2.0,
      capacityIncrease: 100,
      resource: 'neuroChipCorrupto',
    },
  },
  mk1: {
    materialesIndustriales: {
      baseCost: 10000,
      costIncreaseFactor: 1.6,
      capacityIncrease: 2000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 2000,
      costIncreaseFactor: 1.9,
      capacityIncrease: 1000,
      resource: 'matrizCristalina',
    },
    materialesExoticos: {
      baseCost: 500,
      costIncreaseFactor: 2.2,
      capacityIncrease: 250,
      resource: 'IA_Fragmentada',
    },
  },
  mk2: {
    materialesIndustriales: {
      baseCost: 25000,
      costIncreaseFactor: 1.7,
      capacityIncrease: 4000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 5000,
      costIncreaseFactor: 2.0,
      capacityIncrease: 2000,
      resource: 'matrizDeManiobra',
    },
    materialesExoticos: {
      baseCost: 1000,
      costIncreaseFactor: 2.5,
      capacityIncrease: 500,
      resource: 'placasDeSigilo',
    },
  },
  mk3: {
    materialesIndustriales: {
      baseCost: 50000,
      costIncreaseFactor: 1.8,
      capacityIncrease: 8000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 10000,
      costIncreaseFactor: 2.2,
      capacityIncrease: 4000,
      resource: 'placasAdamantioReforzado',
    },
    materialesExoticos: {
      baseCost: 2500,
      costIncreaseFactor: 2.8,
      capacityIncrease: 1000,
      resource: 'nucleoDatosArcano',
    },
  },
  mk4: {
    materialesIndustriales: {
      baseCost: 100000,
      costIncreaseFactor: 1.9,
      capacityIncrease: 15000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 20000,
      costIncreaseFactor: 2.4,
      capacityIncrease: 8000,
      resource: 'tejidoEspaciotemporal',
    },
    materialesExoticos: {
      baseCost: 5000,
      costIncreaseFactor: 3.0,
      capacityIncrease: 2000,
      resource: 'singularidadEmbotellada',
    },
  },
  mk5: {
    materialesIndustriales: {
      baseCost: 250000,
      costIncreaseFactor: 2.0,
      capacityIncrease: 30000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 40000,
      costIncreaseFactor: 2.6,
      capacityIncrease: 15000,
      resource: 'esquirlasDeReliquia',
    },
    materialesExoticos: {
      baseCost: 10000,
      costIncreaseFactor: 3.2,
      capacityIncrease: 4000,
      resource: 'codexAncestral',
    },
  },
  mk6: {
    materialesIndustriales: {
      baseCost: 500000,
      costIncreaseFactor: 2.1,
      capacityIncrease: 50000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 80000,
      costIncreaseFactor: 2.8,
      capacityIncrease: 25000,
      resource: 'fragmentoHorizonteSucesos',
    },
    materialesExoticos: {
      baseCost: 20000,
      costIncreaseFactor: 3.4,
      capacityIncrease: 8000,
      resource: 'energiaPuntoCero',
    },
  },
  mk7: {
    materialesIndustriales: {
      baseCost: 1000000,
      costIncreaseFactor: 2.2,
      capacityIncrease: 100000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 150000,
      costIncreaseFactor: 3.0,
      capacityIncrease: 50000,
      resource: 'esenciaDelVacio',
    },
    materialesExoticos: {
      baseCost: 40000,
      costIncreaseFactor: 3.6,
      capacityIncrease: 15000,
      resource: 'reliquiaCorrupta',
    },
  },
  mk8: {
    materialesIndustriales: {
      baseCost: 2000000,
      costIncreaseFactor: 2.3,
      capacityIncrease: 200000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 300000,
      costIncreaseFactor: 3.2,
      capacityIncrease: 100000,
      resource: 'nucleoEspectral',
    },
    materialesExoticos: {
      baseCost: 80000,
      costIncreaseFactor: 3.8,
      capacityIncrease: 30000,
      resource: 'conexionFantasmal',
    },
  },
  mk9: {
    materialesIndustriales: {
      baseCost: 4000000,
      costIncreaseFactor: 2.4,
      capacityIncrease: 400000,
      resource: 'aceroEstructural',
    },
    componentesBatalla: {
      baseCost: 600000,
      costIncreaseFactor: 3.4,
      capacityIncrease: 200000,
      resource: 'fragmentoDeCiudadela',
    },
    materialesExoticos: {
      baseCost: 160000,
      costIncreaseFactor: 4.0,
      capacityIncrease: 60000,
      resource: 'matrizDeOverlord',
    },
  },
};
