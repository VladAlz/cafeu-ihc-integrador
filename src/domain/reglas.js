// Dominio · reglas de negocio compartidas (sin dependencias de navegador)

export const CANTIDAD_MIN = 1;
export const CANTIDAD_MAX = 10;
export const MINUTOS_PARA_CANCELAR = 5;

export class ErrorDeDominio extends Error {
  constructor(codigo, mensaje) {
    super(mensaje);
    this.name = 'ErrorDeDominio';
    this.codigo = codigo;
  }
}

/** Quita tildes, pasa a minúsculas y colapsa espacios: «Sánduche  DE Queso» → «sanduche de queso». */
export function normalizarTexto(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Valida una cantidad y devuelve un entero dentro de los límites o lanza un error de dominio. */
export function validarCantidad(valor) {
  const n = Number(valor);
  if (!Number.isInteger(n)) {
    throw new ErrorDeDominio('CANTIDAD_NO_ENTERA', 'La cantidad debe ser un número entero.');
  }
  if (n < CANTIDAD_MIN) {
    throw new ErrorDeDominio('CANTIDAD_MENOR', `La cantidad mínima es ${CANTIDAD_MIN}. Para quitar el producto usa «Eliminar».`);
  }
  if (n > CANTIDAD_MAX) {
    throw new ErrorDeDominio('CANTIDAD_MAYOR', `La cantidad máxima por producto es ${CANTIDAD_MAX}.`);
  }
  return n;
}

/** Formatea centavos como dólares con coma decimal: 725 → «$7,25». */
export function formatearDinero(centavos) {
  const signo = centavos < 0 ? '-' : '';
  const abs = Math.abs(centavos);
  return `${signo}$${Math.floor(abs / 100)},${String(abs % 100).padStart(2, '0')}`;
}
