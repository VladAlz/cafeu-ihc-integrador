// Infraestructura · adaptadores de almacenamiento clave-valor

/** Almacenamiento en memoria con la misma interfaz que localStorage (para pruebas y como respaldo). */
export class AlmacenamientoEnMemoria {
  #datos = new Map();
  getItem(clave) { return this.#datos.has(clave) ? this.#datos.get(clave) : null; }
  setItem(clave, valor) { this.#datos.set(clave, String(valor)); }
  removeItem(clave) { this.#datos.delete(clave); }
}

/** Devuelve localStorage si está disponible; si el navegador lo bloquea, usa memoria. */
export function almacenamientoDelNavegador() {
  try {
    const prueba = '__cafeu__';
    window.localStorage.setItem(prueba, '1');
    window.localStorage.removeItem(prueba);
    return window.localStorage;
  } catch {
    return new AlmacenamientoEnMemoria();
  }
}
