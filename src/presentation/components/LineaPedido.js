// Presentación · línea del pedido (v1): el botón para quitar está junto a los controles de cantidad.
import { h } from './dom.js';
import { formatearDinero } from '../../domain/reglas.js';
import { SelectorCantidad } from './SelectorCantidad.js';

export function LineaPedido({ linea, alCambiarCantidad, alEliminar }) {
  const quitar = h('button', { type: 'button', class: 'selector__boton', 'aria-label': `Eliminar ${linea.nombre} del pedido`, onclick: () => alEliminar(linea) }, '✕');
  return h('li', { class: 'linea', dataset: { producto: linea.productoId } },
    h('div', { class: 'linea__cabecera' },
      h('h3', { class: 'linea__nombre' }, linea.nombre),
      h('p', { class: 'linea__precio' }, h('strong', {}, formatearDinero(linea.subtotal)))),
    SelectorCantidad({ id: linea.productoId, etiqueta: linea.nombre, valor: linea.cantidad, alCambiar: (n) => alCambiarCantidad(linea.productoId, n), extra: quitar }));
}

export function LineaEliminada() { return null; }
