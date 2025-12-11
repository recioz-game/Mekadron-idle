// src/data/codexData.ts

export const resourceNameMap: { [key: string]: string } = {
  scrap: 'Chatarra',
  energy: 'Energía',
  researchPoints: 'Puntos de Investigación',
  metalRefinado: 'Metal Refinado',
  aceroEstructural: 'Acero Estructural',
  placasCasco: 'Placas de Casco',
  fragmentosPlaca: 'Fragmentos de Placa',
  cableadoSuperconductor: 'Cableado Superconductor',
  circuitosDañados: 'Circuitos Dañados',
  barraCombustible: 'Barra de Combustible',
  // --- RECURSOS FASE 2 ---
  aleacionReforzadaRobada: 'Aleación Reforzada Robada',
  neuroChipCorrupto: 'Neuro-Chip Corrupto',
  matrizQuitinaCristal: 'Matriz de Quitina-Cristal',
  nucleoSinapticoFracturado: 'Núcleo Sináptico Fracturado',
  planosMK2: 'Planos de Vindicator (MK.II)',
  moduloManiobrasTácticas: 'Módulo de Maniobras',
  placasCamuflajeActivo: 'Placas de Camuflaje Activo',
  planosDeInterceptor: 'Planos de Interceptor',
  placasDeAetherium: 'Placas de Aetherium',
  nucleoPsionicoArmonico: 'Núcleo Psiónico Armónico',
  planosMK3: 'Planos de Vindicator (MK.III)',
  tejidoAbisalRetorcido: 'Tejido Abisal Retorcido',
  singularidadCorruptaContenida: 'Singularidad Corrupta Contenida',
  planosMK4: 'Planos de Vindicator (MK.IV)',
  // --- STATS NAVE ---
  vindicatorHealth: 'Salud del Vindicator',
  vindicatorShield: 'Escudo del Vindicator',
  vindicatorDamage: 'Daño del Vindicator',
};

export type CodexOrigin = {
  type: 'Recolección' | 'Fundición' | 'Expedición' | 'Batalla' | 'Procesamiento' | 'Mejora de Nave';
  label: string;
  view?: string; 
};

export type CodexUse = {
  type: 'Construcción' | 'Mejora de Nave' | 'Crafteo' | 'Investigación' | 'Coste de Expedición' | 'Batalla';
  label: string;
  view?: string;
};

export type CodexEntry = {
  description: string;
  origins: CodexOrigin[];
  uses: CodexUse[];
};

// Mapeamos cada recurso a su entrada en el Códice.
export const codexData: Partial<Record<string, CodexEntry>> = {
  scrap: {
    description: "Material básico de construcción obtenido de los restos de naves y estaciones espaciales. Es la espina dorsal de tu operación.",
    origins: [
      { type: 'Recolección', label: 'Click manual en el hangar' },
      { type: 'Recolección', label: 'Drones de Reciclado (producción pasiva)', view: 'workshop' },
      { type: 'Expedición', label: 'Recompensa en la mayoría de expediciones', view: 'expeditions' },
    ],
    uses: [
      { type: 'Construcción', label: 'Construcción de casi todas las estructuras y drones básicos', view: 'workshop' },
      { type: 'Crafteo', label: 'Producción de Metal Refinado', view: 'foundry' },
    ],
  },
  metalRefinado: {
    description: "Una aleación metálica estándar, más resistente que la chatarra cruda. Necesaria para componentes y drones más avanzados.",
    origins: [
      { type: 'Fundición', label: 'Craftear en la Fundición', view: 'foundry' },
      { type: 'Procesamiento', label: 'Producción pasiva del Dron Golem', view: 'workshop' },
      { type: 'Expedición', label: 'Recompensa en expediciones de Tier 1', view: 'expeditions' },
    ],
    uses: [
      { type: 'Construcción', label: 'Drones Reforzados y de Expedición', view: 'workshop' },
      { type: 'Construcción', label: 'Módulos de energía y almacenamiento avanzados', view: 'energy' },
      { type: 'Crafteo', label: 'Producción de Acero Estructural', view: 'foundry' },
    ],
  },
  energy: {
    description: "Energía necesaria para alimentar todas las operaciones, desde la producción de drones hasta los sistemas de la nave. Sin energía, toda la producción se detiene.",
    origins: [
      { type: 'Recolección', label: 'Paneles Solares y Reactores', view: 'energy' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Consumida por todos los drones y procesos de la fundición' },
    ],
  },
  aceroEstructural: {
    description: "Una aleación avanzada crucial para la construcción de naves y drones de élite. Es mucho más denso y resistente que el metal refinado.",
    origins: [
      { type: 'Fundición', label: 'Craftear en la Fundición', view: 'foundry' },
      { type: 'Procesamiento', label: 'Producción pasiva del Dron Wyrm', view: 'workshop' },
      { type: 'Expedición', label: 'Recompensa en expediciones de Tier 1', view: 'expeditions' },
    ],
    uses: [
      { type: 'Construcción', label: 'Drones Golem y Wyrm', view: 'workshop' },
      { type: 'Construcción', label: 'Proyecto del Astillero (Vindicator)', view: 'shipyard' },
    ],
  },
  placasCasco: {
    description: "Placas de blindaje pesado diseñadas específicamente para la construcción de cascos de naves estelares.",
    origins: [
      { type: 'Fundición', label: 'Craftear en la Fundición a partir de Fragmentos', view: 'foundry' },
    ],
    uses: [
      { type: 'Construcción', label: 'Componente principal del Astillero (Vindicator)', view: 'shipyard' },
    ],
  },
  fragmentosPlaca: {
    description: "Restos destrozados de blindaje de naves. Pueden ser reforjados en la Fundición para crear Placas de Casco útiles.",
    origins: [
      { type: 'Expedición', label: 'Recompensa principal en el Cinturón de Asteroides', view: 'expeditions' },
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 1', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Material para crear Placas de Casco', view: 'foundry' },
    ],
  },
  cableadoSuperconductor: {
    description: "Cableado de alta eficiencia que permite la transferencia de energía y datos con una pérdida mínima. Esencial para sistemas de naves avanzados.",
    origins: [
      { type: 'Fundición', label: 'Craftear en la Fundición a partir de Circuitos Dañados', view: 'foundry' },
    ],
    uses: [
      { type: 'Construcción', label: 'Componente principal del Astillero (Vindicator)', view: 'shipyard' },
    ],
  },
  barraCombustible: {
    description: "Barras de combustible nuclear enriquecido. Se utilizan para alimentar los motores del Vindicator y para recargar sus escudos fuera de combate.",
    origins: [
      { type: 'Fundición', label: 'Craftear en la Fundición', view: 'foundry' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Recargar escudos del Vindicator', view: 'armory' },
      { type: 'Coste de Expedición', label: 'Coste para iniciar expediciones de alto nivel', view: 'expeditions' },
      { type: 'Mejora de Nave', label: 'Mejoras de la Bodega', view: 'bodega' },
    ],
  },
  researchPoints: {
    description: "Puntos de Investigación generados por el análisis de datos y la operación de tu flota de drones. Se utilizan para desbloquear nuevas tecnologías.",
    origins: [
      { type: 'Recolección', label: 'Generación pasiva en el Laboratorio', view: 'laboratory' },
    ],
    uses: [
      { type: 'Investigación', label: 'Desbloquear todas las mejoras tecnológicas', view: 'laboratory' },
      { type: 'Construcción', label: 'Algunos componentes del Astillero', view: 'shipyard' },
    ],
  },
  circuitosDañados: {
    description: "Componentes electrónicos recuperados que han sufrido daños. Aunque inútiles por sí solos, pueden ser reprocesados para fabricar Cableado Superconductor.",
    origins: [
      { type: 'Expedición', label: 'Recompensa principal en la Chatarrería Orbital', view: 'expeditions' },
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 1', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Material para crear Cableado Superconductor', view: 'foundry' },
    ],
  },
  // --- FASE 2 ---
  aleacionReforzadaRobada: {
    description: "Una variante de la aleación reforzada, modificada apresuradamente por piratas y renegados. Menos estable, pero potente para mejoras rápidas.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 1', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Mejoras de componentes del Vindicator', view: 'armory' },
    ],
  },
  neuroChipCorrupto: {
    description: "Chips de control neuronal dañados por la exposición a la radiación cósmica o a la corrupción de datos. Contienen fragmentos de información táctica.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 1', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Mejoras de componentes del Vindicator', view: 'armory' },
    ],
  },
  matrizQuitinaCristal: {
    description: "Un bio-material cristalino extraído de las formas de vida insectoides del sistema Tyran. Es increíblemente ligero y resistente.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 2', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Fabricación de Módulos Ofensivos (Armería)', view: 'armory' },
    ],
  },
  nucleoSinapticoFracturado: {
    description: "El nexo neuronal de una criatura Tyraniana, dañado en combate. Todavía pulsa con energía psiónica residual.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 2', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Fabricación de Módulos Ofensivos (Armería)', view: 'armory' },
    ],
  },
  planosMK2: {
    description: "Fragmentos de datos que detallan las especificaciones de construcción para el Vindicator MK.II. Un paso crucial en la evolución de tu nave.",
    origins: [
      { type: 'Batalla', label: 'Botín de Jefes del Capítulo 2', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Fabricación de Módulos Ofensivos (Armería)', view: 'armory' },
    ],
  },
  moduloManiobrasTácticas: {
    description: "Un dispositivo de hardware que contiene algoritmos de combate avanzados, permitiendo maniobras evasivas y ofensivas complejas.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 3', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Fabricación de Módulos Tácticos (Armería)', view: 'armory' },
    ],
  },
  placasCamuflajeActivo: {
    description: "Placas de casco que pueden refractar la luz y las señales de los sensores, haciendo que la nave sea casi invisible por cortos periodos.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 3', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Crafteo', label: 'Fabricación de Módulos Defensivos (Armería)', view: 'armory' },
    ],
  },
  planosDeInterceptor: {
    description: "Planos de diseño para la clase de nave 'Interceptor', una variante del Vindicator especializada en velocidad y agilidad. Necesarios para subir de nivel el VM-02.",
    origins: [
      { type: 'Batalla', label: 'Botín de Jefes del Capítulo 3', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Subir de nivel el Vindicator MK.II', view: 'armory' },
    ],
  },
  placasDeAetherium: {
    description: "Un metal exótico que resuena con energías del sub-espacio. Es clave para la fabricación de escudos y blindajes psiónicamente activos.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 4', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Mejoras de componentes del Vindicator MK.IV', view: 'armory' },
    ],
  },
  nucleoPsionicoArmonico: {
    description: "Un cristal sintiente que puede canalizar y amplificar la energía psiónica, sirviendo como el corazón de los sistemas de armas y defensa más avanzados.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 4', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Mejoras de componentes del Vindicator MK.IV', view: 'armory' },
    ],
  },
  planosMK3: {
    description: "Datos de construcción para el Vindicator MK.III 'Devastator'.",
    origins: [
      { type: 'Batalla', label: 'Botín de Jefes del Capítulo 4', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Subir de nivel el Vindicator MK.III', view: 'armory' },
    ],
  },
  tejidoAbisalRetorcido: {
    description: "Bio-materia corrupta que parece existir en múltiples dimensiones a la vez. Su estructura desafía las leyes de la física conocida.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 5', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Mejoras de componentes del Vindicator MK.V', view: 'armory' },
    ],
  },
  singularidadCorruptaContenida: {
    description: "Una micro-singularidad gravitacional, estabilizada a la fuerza en un campo de contención. Irradia una energía oscura y peligrosa.",
    origins: [
      { type: 'Batalla', label: 'Botín de enemigos del Capítulo 5', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Mejoras de componentes del Vindicator MK.V', view: 'armory' },
    ],
  },
  planosMK4: {
    description: "Datos de construcción para el Vindicator MK.IV 'Reaper'.",
    origins: [
      { type: 'Batalla', label: 'Botín de Jefes del Capítulo 5', view: 'battleRoom' },
    ],
    uses: [
      { type: 'Mejora de Nave', label: 'Subir de nivel el Vindicator MK.IV', view: 'armory' },
    ],
  },
  // --- STATS NAVE ---
  vindicatorHealth: {
    description: "Representa la integridad estructural del casco del Vindicator. Si llega a cero, la nave será destruida y la batalla se perderá.",
    origins: [
      { type: 'Mejora de Nave', label: 'Aumenta al subir de nivel el Vindicator', view: 'armory' },
      { type: 'Mejora de Nave', label: 'Aumenta con ciertas mejoras de componentes', view: 'armory' },
    ],
    uses: [
      { type: 'Batalla', label: 'Absorbe el daño una vez que los escudos se agotan', view: 'battleRoom' },
    ],
  },
  vindicatorShield: {
    description: "Una barrera de energía que protege al Vindicator del daño. Se recarga lentamente fuera de combate o puede ser reparado en la Armería.",
    origins: [
      { type: 'Mejora de Nave', label: 'Aumenta al subir de nivel el Vindicator', view: 'armory' },
      { type: 'Mejora de Nave', label: 'Aumenta con ciertas mejoras de componentes', view: 'armory' },
    ],
    uses: [
      { type: 'Batalla', label: 'Absorbe el daño recibido antes que el casco', view: 'battleRoom' },
      { type: 'Mejora de Nave', label: 'Se puede reparar en la Armería usando Barras de Combustible', view: 'armory' },
    ],
  },
  vindicatorDamage: {
    description: "La cantidad de daño base que infligen las armas principales del Vindicator en cada ataque.",
    origins: [
      { type: 'Mejora de Nave', label: 'Aumenta al subir de nivel el Vindicator', view: 'armory' },
      { type: 'Mejora de Nave', label: 'Aumenta con mejoras de componentes de armamento', view: 'armory' },
    ],
    uses: [
      { type: 'Batalla', label: 'Determina el poder ofensivo contra los enemigos', view: 'battleRoom' },
    ],
  },
};

