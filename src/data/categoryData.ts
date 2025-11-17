// src/data/categoryData.ts

export type ResourceCategory = 'materialesIndustriales' | 'componentesBatalla' | 'materialesExoticos';

export const resourceCategories: Record<string, ResourceCategory> = {
  // Materiales Industriales
  metalRefinado: 'materialesIndustriales',
  aceroEstructural: 'materialesIndustriales',
  placasCasco: 'materialesIndustriales',
  cableadoSuperconductor: 'materialesIndustriales',
  barraCombustible: 'materialesIndustriales',

  // Componentes de Batalla
  fragmentosPlaca: 'componentesBatalla',
  circuitosDañados: 'componentesBatalla',
  aleacionReforzada: 'componentesBatalla',
  neuroChipCorrupto: 'componentesBatalla',
  
  // Materiales Exóticos
  nucleoSingularidad: 'materialesExoticos',
  matrizCristalina: 'materialesExoticos',
  IA_Fragmentada: 'materialesExoticos',
  planosMK2: 'materialesExoticos',
  matrizDeManiobra: 'materialesExoticos',
  placasDeSigilo: 'materialesExoticos',
  planosDeInterceptor: 'materialesExoticos',
  nucleoDatosArcano: 'materialesExoticos',
  planosMK3: 'materialesExoticos',
  tejidoEspaciotemporal: 'materialesExoticos',
  singularidadEmbotellada: 'materialesExoticos',
  planosMK4: 'materialesExoticos',
  esquirlasDeReliquia: 'componentesBatalla',
  codexAncestral: 'materialesExoticos',
  planosMK5: 'materialesExoticos',
  fragmentoHorizonteSucesos: 'componentesBatalla',
  energiaPuntoCero: 'materialesExoticos',
  planosMK6: 'materialesExoticos',

  // Nuevas Categorías si fueran necesarias
  placasAdamantioReforzado: 'componentesBatalla',
};
