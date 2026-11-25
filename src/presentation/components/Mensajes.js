// Presentación · mensajes de estado (v2): franja visible bajo la cabecera, alto contraste,
// anunciada por lectores de pantalla y que permanece hasta la siguiente acción o al cerrarla.
import { h } from './dom.js';

export function crearMensajes(contenedor) {
  let temporizador = null;
  const limpiar = () => { clearTimeout(temporizador); contenedor.replaceChildren(); contenedor.className = 'mensajes'; };

  return {
    mostrar(texto, { tipo = 'exito', accion = null, duracion = 8000 } = {}) {
      limpiar();
      contenedor.className = `mensajes mensajes--${tipo}`;
      contenedor.setAttribute('aria-live', tipo === 'error' ? 'assertive' : 'polite');
      const caja = h('div', { class: 'mensajes__caja' },
        h('span', { class: 'mensajes__icono', 'aria-hidden': 'true' }, tipo === 'error' ? '!' : '✓'),
        h('p', { class: 'mensajes__texto' }, texto),
        accion && h('button', { type: 'button', class: 'boton boton--enlace', onclick: () => { limpiar(); accion.alPulsar(); } }, accion.etiqueta),
        h('button', { type: 'button', class: 'mensajes__cerrar', 'aria-label': 'Cerrar mensaje', onclick: limpiar }, '×'));
      contenedor.append(caja);
      if (duracion) temporizador = setTimeout(limpiar, duracion);
    },
    limpiar,
  };
}
