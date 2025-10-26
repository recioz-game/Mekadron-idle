export const formatNumber = (num: number): string => {
  // Para números enteros pequeños, no hacemos nada.
  if (num < 1000) {
    return Math.floor(num).toString();
  }

  // Definimos los sufijos para miles, millones, billones, etc.
  const suffixes = ["", "K", "M", "B", "T"];

  // Calculamos a qué "nivel" pertenece el número (miles, millones...)
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);

  // Si el número es demasiado grande, volvemos a un formato seguro
  if (tier >= suffixes.length) {
    return num.toExponential(1);
  }

  // Obtenemos el sufijo correspondiente (K, M, etc.)
  const suffix = suffixes[tier];

  // Escalamos el número (ej. 1500 se convierte en 1.5)
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  // Lo formateamos a un decimal y eliminamos el ".0" si no es necesario
  const formatted = parseFloat(scaled.toFixed(1));

  return formatted + suffix;
};
