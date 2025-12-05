// src/data/assetMap.ts

export interface EnemyAsset {
  idle: string;
  shooting: string;
}

/**
 * Mapeo de nombres de enemigos a sus archivos de assets.
 * La ruta debe ser relativa a la raíz del proyecto para que Vite la maneje correctamente.
 */
export const enemyAssets: Record<string, EnemyAsset> = {
  // ===================================================================
  // CAPÍTULO 1 — Hermandad del Vacío
  // ===================================================================

  // --- Sector 1: Cinturón Khelar ---
  "Desguazador Khelar": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 1/caza_ligero_dañado.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 1/caza ligero dañado disparando.png'
  },
  "Triturador Óxido": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 1/mini boss sector 1.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 1/mini boss sector 1 disparando.png'
  },
  "Recolector Errante": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 1/caza_ligero_dañado_rojo.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 1/caza ligero dañado disparando rojo.png'
  },
  "Capataz Chatarra": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 1/boss_sector_1.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 1/boss_sector_1_disparando.png'
  },

  // --- Sector 2: Ancla Roja ---
  "Vigilante Carmesí": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 2/dron_de_combate_ligero-removebg-preview.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 2/don_de_combate_liegro_disparo-removebg-preview.png'
  },
  "Martillo Rojo": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 2/mini_boss-removebg-preview.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 2/mini_boss_disparando-removebg-preview.png'
  },
  "Garfio del Vacío": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 2/dron_de_combate_liegero_2-removebg-preview.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 2/don_de_combate_ligero_disparando_2-removebg-preview.png'
  },
  "Contramaestre Sangrefría": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 2/boss_sector_2.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 2/boss sector 2 disparando.png'
  },

  // --- Sector 3: Nebulosa del Rumor Azul ---
  "Sombra Azul": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 3/caza_sector_3.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 3/caza_sector_3_disparando.png'
  },
  "Acechador Nebular": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 3/mini_boss_sector_3.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 3/mini boss sector 3 disparando.png'
  },
  "Espectro Turquesa": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 3/caza_sector_3_amarillo-removebg-preview.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 3/caza_amarillo_sector_3_disparando.png'
  },
  "Capitán Brumahelada": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 3/boss_sector_3.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 3/boss_sector_3_disparando.png'
  },

  // --- Sector 4: Dominio Grifo ---
  "Ala Grifo": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 4/caza_pirata_sector_4.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 4/caza_pirata_sector_4_disparando.png'
  },
  "Heraldo del Grifo": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 4/mini_boss_sector_4.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 4/mini_boss_sector_4_disparando.png'
  },
  "Talón Férreo": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 4/caza_pirata_sector_4_verde.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 4/caza_pirata_sector_4_verde_disparando.png'
  },
  "Jefe Picoteador": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 4/boss_sector_4.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 4/boss_sector_4_disparando.png'
  },

  // --- Sector 5: Fortaleza Garra Negra ---
  "Ronda Negra": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 5/caza_liguero_sector_5.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 5/caza_ligero_sector_5_disparando.png'
  },
  "Azote del Vacío": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 5/mini_boss_sector_5.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 5/mini_boss_sector_5 disparando.png'
  },
  "Saqueador Élite": {
    idle: '/src/assets/images/enemies/Capitulo 1/sector 5/caza_ligero_sector_5_verde.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 5/caza_ligero_sector_5_verde_disparando.png'
  },
  "Capitán Atronador": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 1/sector 5/boss_sector_5.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/sector 5/boss_sector_5 disparando.png'
  },

  // --- Final Boss ---
  "Fragata Skullbreaker": {
    idle: '/src/assets/images/enemies/Capitulo 1/boss capitulo.png',
    shooting: '/src/assets/images/enemies/Capitulo 1/boss capitulo disparando.png'
  },

  // ===================================================================
  // CAPÍTULO 2 — “Enjambre Carminis”
  // ===================================================================

  // --- Sector 1: Colmena de Frontera “Nido Espina” ---
  "Zángano Espina": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 1/enjambre basico.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 1/ejambre basico disparnado.png'
  },
  "Larva Guardiana": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 1/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 1/mini boss disparando.png'
  },
  "Polinizador Letal": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 1/enjambre basico 2.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 1/ejambre basico 2 disparnado.png'
  },
  "Reina Menor Espina Roja": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 1/boss_sector_1.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 1/boss_sector_1_disparando.png'
  },

  // --- Sector 2: Barranco Bioluminiscente “Hueco Ámbar” ---
  "Cortador Ámbar": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 2/ejambre v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 2/ejambre v2 disparando.png'
  },
  "Centinela Resinario": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 2/mini boss sector 2.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 2/mini boss sector 2 disparando.png'
  },
  "Acechador Filamento": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 2/ejambare_v2_amarillo.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 2/ejambare v2 amarillo disparandoi.png'
  },
  "Soberana de Resina": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 2/boss_sector_2.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 2/boss_sector_2_disparando.png'
  },

  // --- Sector 3: Nebulosa “Velo Melífero” ---
  "Recolector Néctar": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 3/ejambre sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 3/ejambre sector 3 disparando.png'
  },
  "Emisor de Feromonas": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 3/mini boss sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 3/mini boss sector 3 disparando.png'
  },
  "Ala Melífera": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 3/ejambre sector 3 naranja.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 3/ejambre sector 3 naranja disparando.png'
  },
  "Dama del Velo Dulce": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 3/boss_sector_3.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 3/boss_sector_3_disparando.png'
  },

  // --- Sector 4: Túneles del Caparazón “Cripta Quitina” ---
  "Quitinoide Raso": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 4/ejambre sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 4/ejambre sector 4 disparando.png'
  },
  "Destructor Mandíbula": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 4/mini boss sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 4/mini boss sector 4 disparando.png'
  },
  "Ala Serrada": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 4/ejambre sector 4 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 4/ejambre sector 4 v2 disparando.png'
  },
  "Señora Mandibular": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 4/boss_sector_4.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 4/boss_sector_4_disparando.png'
  },

  // --- Sector 5: Corazón del Enjambre “Púlsar Carmesí” ---
  "Guardián Carmesí": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 5/libelula sector 5.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 5/libelula sector 5 disparando.png'
  },
  "Esporo Alfa": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 5/mini_boss_sector_5.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 5/mini_boss_sector_5_disparando.png'
  },
  "Irradiado del Enjambre": {
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 5/libelula sector 5 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 5/libelula sector 5 v2 disparando.png'
  },
  "Matriarca Sangrecolmena": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 2/Sector 5/boss_sector_5.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/Sector 5/boss_sector_5_disparando.png'
  },

  // --- Final Boss ---
  "Emperatriz Carminis": {
    idle: '/src/assets/images/enemies/Capitulo 2/boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 2/boss disparando.png'
  },

  // ===================================================================
  // CAPÍTULO 3 — “Legión Ilex”
  // ===================================================================

  // --- Sector 1: Perímetro Gris ---
  "Patrulla Gris": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 1/Caza pesado.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 1/caza pesado disparando.png'
  },
  "Blindado Scout": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 1/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 1/mini boss disparando.png'
  },
  "Recluta Armado": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 1/caza pesado v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 1/caza pesado v2 disparando.png'
  },
  "Teniente Centinela": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 1/boss sector 1.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 1/boss disparando.png'
  },

  // --- Sector 2: Corredor de Interdicción ---
  "Interdictor Delta": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 2/caza pesado.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 2/caza pesado disparando.png'
  },
  "Operador Jammer": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 2/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 2/mini boss disparando.png'
  },
  "Asaltante Táctico": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 2/caza pesado v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 2/caza pesado disparando v2.png'
  },
  "Capitán Vector": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 2/boss sector 2.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 2/boss sector 2 disparando.png'
  },

  // --- Sector 3: Base Móvil “Ilex-03” ---
  "Mecaguarida": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 3/caza pesado sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 3/caza pesado sector 3 disparando.png'
  },
  "Supervisor de Hangar": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 3/mini boss sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 3/mini boss sector 3 disparando.png'
  },
  "Técnico de Choque": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 3/caza pesado sector 3 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 3/caza pesado sector 3 v2 disparando.png'
  },
  "Comandante Argón": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 3/boss sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 3/boss sector 3 disparando.png'
  },

  // --- Sector 4: Zona Cráneo Verde ---
  "Cadete Esmeralda": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 4/bombardero sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 4/bombardero sector 4 disparando.png'
  },
  "Instructor Sierra": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 4/mini boss sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 4/mini boss sector 4 disparando.png'
  },
  "Tirador Musgo": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 4/bombardero sector 4 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 4/bombardero sector 4 v2 disparando.png'
  },
  "Mayor Coraza Verde": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 4/boss sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 4/boss sector 4 disparando.png'
  },

  // --- Sector 5: Línea Férrea Cerberus ---
  "Vigía Cerberus": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 5/caza espia.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 5/caza espia.png' // Placeholder
  },
  "Unidad Cerberus-β": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 5/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 5/mini boss.png' // Placeholder
  },
  "Operador Férreo": {
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 5/caza espia v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 5/caza espia v2.png' // Placeholder
  },
  "Coronel Muralla": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 3/Sector 5/boss sector 5.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/Sector 5/boss sector 5.png' // Placeholder
  },

  // --- Final Boss ---
  "Destructor “Iron Howl”": {
    idle: '/src/assets/images/enemies/Capitulo 3/Boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 3/boss disparando.png'
  },

  // ===================================================================
  // CAPÍTULO 4 — “El Dominio Aureano”
  // ===================================================================

  // --- Sector 1: Umbral Celeste ---
  "Centinela Celeste": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 1/Protos_1.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 1/Protos 1 disparando.png'
  },
  "Vigilante Prismático": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 1/mini boss sector 1.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 1/mini boss disparando sector 1.png'
  },
  "Eco de Luz": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 1/Protos_1_v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 1/Protos 1 disparando v2.png'
  },
  "Custodio Aural": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 1/boss sector 1.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 1/boss sector 1 disparando.png'
  },

  // --- Sector 2: Campos Resonantes ---
  "Iniciado Resonante": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 2/Caza protos sector 2.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 2/Caza protos sector 2 disparando.png'
  },
  "Agravio Armónico": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 2/mini boss sector 2.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 2/mini boss sector 2 disparando.png'
  },
  "Disonancia Errante": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 3/Caza protos sector 2 v2.png', // Reutilizado de la carpeta del Sector 3
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 2/Caza protos sector 2 v2 disparando.png'
  },
  "Maestro de la Resonancia": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 2/boss sector 2.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 2/boss sector 2 disparando.png'
  },

  // --- Sector 3: Sagrario de Aurora ---
  "Guardián de Aurora": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 3/caza protos sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 3/caza protos sector 3 disparando.png'
  },
  "Portador de la Llama": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 3/mini boss sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 3/mini boss sector 3 disparando.png'
  },
  "Chispa Ancestral": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 3/caza protos sector 3 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 3/caza protos sector 3 v2 disparando.png'
  },
  "Orador Lumínico": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 3/boss disparando.png', // Asumiendo que es el boss del capítulo
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 3/boss sector 3 disparando.png'
  },

  // --- Sector 4: Bastión Dorado ---
  "Arconte Dorado": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 4/protoss sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 4/protoss sector 4 disparando.png'
  },
  "Escudo Viviente": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 4/mini boss ssector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 4/mini boss ssector 4 disparnado.png'
  },
  "Lanza Radiante": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 4/protoss sector 4 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 4/protoss sector 4 v2 disparando.png'
  },
  "Prelado Solemne": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 4/boss sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 4/boss sector 4 dispararndo.png'
  },

  // --- Sector 5: Horizonte Sacro ---
  "Aureano Sagrado": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 5/caza protos sector 5.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 5/caza protos sector 5.png' // Placeholder, falta 'disparando'
  },
  "Disruptor del Horizonte": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 5/mini boss sector 5.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 5/mini boss sector 5 disparando.png'
  },
  "Rayo Custodio": {
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 5/caza protos sector 5 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 5/caza protos sector 5 v2.png' // Placeholder, falta 'disparando'
  },
  "Sumo Guardián del Vórtice": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 5/boss sector 5.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 5/boss sector 5 disparando.png'
  },

  // --- Final Boss ---
  "Arconte Supremo Seraphys": {
    // No hay un asset específico para este jefe final de capítulo, usando uno genérico.
    idle: '/src/assets/images/enemies/Capitulo 4/Sector 3/boss disparando.png',
    shooting: '/src/assets/images/enemies/Capitulo 4/Sector 3/boss disparando.png'
  },

  // ===================================================================
  // CAPÍTULO 5 — “El Culto del Abismo”
  // ===================================================================

  // --- Sector 1: Penumbra Sangrante ---
  "Engendro Penumbrio": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 1/caos 1.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 1/caos 1 disparar.png'
  },
  "Vástago Hemolítico": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 1/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 1/mini boss disparando.png'
  },
  "Deforme Sanguinas": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 1/caos 1 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 1/caos 1 v2 disparando.png'
  },
  "Heraldo Carmesí": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 1/boss sector.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 1/boss disparando.png'
  },

  // --- Sector 2: Forja Profanada ---
  "Fragmento Profano": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 2/interceptor 1.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 2/interceptor 1 disparando.png'
  },
  "Operario del Vacío": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 2/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 2/mini boss.png' // Placeholder
  },
  "Masa Forjada": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 2/interceptor 1 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 2/interceptor 1 v2 disparando.png'
  },
  "Artífice del Abismo": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 2/boss sector 2.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 2/boss sector 2.png' // Placeholder
  },

  // --- Sector 3: Madriguera del Susurro ---
  "Eco Torturado": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 3/caza sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 3/caza sector 3 disparando.png'
  },
  "Devoramente": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 3/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 3/mini boss.png' // Placeholder
  },
  "Aullador del Silencio": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 3/caza sector 3 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 3/caza sector 3 v2 disparando.png'
  },
  "Profeta de los Susurros": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 3/boss sector 3.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 3/boss sector 3.png' // Placeholder
  },

  // --- Sector 4: Desgarro Onírico ---
  "Rastro Abismal": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 4/nave 1.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 4/nave 1 disparando.png'
  },
  "Quimera Delirante": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 4/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 4/mini boss disparando.png'
  },
  "Reptante de Pesadilla": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 4/nave 1 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 4/nave 1 v2 disparando.png'
  },
  "Guardián del Desgarro": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 4/boss sector 4.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 4/boss sector 4 disparando.png'
  },

  // --- Sector 5: Santuario de la Ruina ---
  "Adepto de Ruina": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 5/nave 1 sector 5.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 5/nave 1 sector 5 disparando.png'
  },
  "Desolador Ritual": { // Mini-Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 5/mini boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 5/mini boss disparando.png'
  },
  "Sombra Flagelante": {
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 5/nave 1 sector 5 v2.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 5/nave 1 sector 5 v2 disparando.png'
  },
  "Alto Sacerdote del Vacío": { // Boss
    idle: '/src/assets/images/enemies/Capitulo 5/Sector 5/boss sector 5.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/Sector 5/boss sector 5 disparando.png'
  },

  "Señor del Abismo Vorgrath": {
    idle: '/src/assets/images/enemies/Capitulo 5/boss.png',
    shooting: '/src/assets/images/enemies/Capitulo 5/boss.png' // Placeholder
  }
};

export const vindicatorAssets: Record<string, EnemyAsset> = {
  base: {
    idle: '/src/assets/images/vindicators/base.png',
    shooting: '/src/assets/images/vindicators/base_shooting.png'
  },
  vm01_origin: {
    idle: '/src/assets/images/vindicators/vm01_origin.png',
    shooting: '/src/assets/images/vindicators/vm01_origin_shooting.png'
  },
  vm02_interceptor: {
    idle: '/src/assets/images/vindicators/vm02_interceptor.png',
    shooting: '/src/assets/images/vindicators/vm02_interceptor_shooting.png'
  },
  vm03_devastator: {
    idle: '/src/assets/images/vindicators/vm03_devastator.png',
    shooting: '/src/assets/images/vindicators/vm03_devastator_shooting.png'
  },
  vm04_reaper: {
    idle: '/src/assets/images/vindicators/vm04_reaper.png',
    shooting: '/src/assets/images/vindicators/vm04_reaper_shooting.png'
  },
  vm05_aegis: {
    idle: '/src/assets/images/vindicators/vm05_aegis.png',
    shooting: '/src/assets/images/vindicators/vm05_aegis_shooting.png'
  },
  vm06_tempest: {
    idle: '/src/assets/images/vindicators/vm06_tempest.png',
    shooting: '/src/assets/images/vindicators/vm06_tempest_shooting.png'
  },
  vm07_wraith: {
    idle: '/src/assets/images/vindicators/vm07_wraith.png',
    shooting: '/src/assets/images/vindicators/vm07_wraith_shooting.png'
  },
  vm08_phantom: {
    idle: '/src/assets/images/vindicators/vm08_phantom.png',
    shooting: '/src/assets/images/vindicators/vm08_phantom_shooting.png'
  },
  vm09_apex: {
    idle: '/src/assets/images/vindicators/vm09_apex.png',
    shooting: '/src/assets/images/vindicators/vm09_apex_shooting.png'
  },
};
