// Presentación · mensajes de estado (v1): aviso flotante en la esquina inferior que desaparece solo.
import { h } from './dom.js';

export function crearMensajes(contenedor) {
  let temporizador = null;
  const limpiar = () => { clearTimeout(temporizador); contenedor.replaceChildren(); contenedor.className = 'mensajes'; };

  return {
    mostrar(texto, { tipo = 'exito', accion = null } = {}) {
      limpiar();
      contenedor.className = `mensajes mensajes--${tipo}`;
      contenedor.append(h('div', { class: 'aviso' },
        h('span', {}, texto),
        accion && h('button', { type: 'button', class: 'aviso__accion', onclick: () => { limpiar(); accion.alPulsar(); } }, accion.etiqueta)));
      temporizador = setTimeout(limpiar, 2500);
    },
    limpiar,
  };
}
