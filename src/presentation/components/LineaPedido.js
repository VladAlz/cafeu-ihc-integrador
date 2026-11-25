// Presentación · línea del pedido (v2): «Eliminar» separado del selector de cantidad.
import { h } from './dom.js';
import { formatearDinero } from '../../domain/reglas.js';
import { SelectorCantidad } from './SelectorCantidad.js';

export function LineaPedido({ linea, alCambiarCantidad, alEliminar }) {
  return h('li', { class: 'linea', dataset: { producto: linea.productoId } },
    h('div', { class: 'linea__cabecera' },
      h('h3', { class: 'linea__nombre' }, linea.nombre),
      h('p', { class: 'linea__precio' },
        linea.cantidad > 1 ? `${linea.cantidad} × ${formatearDinero(linea.precioUnitario)} = ` : '',
        h('strong', {}, formatearDinero(linea.subtotal)))),
    SelectorCantidad({ id: linea.productoId, etiqueta: linea.nombre, valor: linea.cantidad, alCambiar: (n) => alCambiarCantidad(linea.productoId, n) }),
    h('button', { type: 'button', class: 'boton boton--peligro linea__eliminar', 'aria-label': `Eliminar ${linea.nombre} del pedido`, onclick: () => alEliminar(linea) }, 'Eliminar'));
}

/** Marcador que reemplaza a la línea eliminada y permanece hasta la siguiente acción. */
export function LineaEliminada({ nombre, alDeshacer }) {
  return h('li', { class: 'linea linea--eliminada' },
    h('p', {}, h('strong', {}, nombre), ' se quitó de tu pedido.'),
    h('button', { type: 'button', class: 'boton boton--secundario', onclick: alDeshacer }, 'Deshacer'));
}
