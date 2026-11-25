// Presentación · pantalla Mi pedido: líneas, cantidades, total y confirmación
import { h } from '../components/dom.js';
import { LineaPedido, LineaEliminada } from '../components/LineaPedido.js';
import { formatearDinero } from '../../domain/reglas.js';

export function VistaPedido({ casosDeUso, acciones, eliminada }) {
  const pedido = casosDeUso.verCarrito();
  if (pedido.estaVacio() && !eliminada) {
    return h('section', { class: 'vista', 'aria-labelledby': 'titulo-pedido' },
      h('h1', { id: 'titulo-pedido' }, 'Mi pedido'),
      h('p', {}, 'Tu pedido está vacío.'),
      h('a', { class: 'boton boton--primario', href: '#/catalogo' }, 'Ver el menú'));
  }
  const items = pedido.lineas.map((linea) => LineaPedido({ linea, alCambiarCantidad: acciones.cambiarCantidad, alEliminar: acciones.eliminar }));
  if (eliminada) {
    const marcador = LineaEliminada({ nombre: eliminada.recuerdo.linea.nombre, alDeshacer: () => acciones.deshacer(eliminada.recuerdo) });
    items.splice(Math.min(eliminada.recuerdo.indice, items.length), 0, marcador);
  }
  return h('section', { class: 'vista', 'aria-labelledby': 'titulo-pedido' },
    h('h1', { id: 'titulo-pedido' }, 'Mi pedido'),
    h('ul', { class: 'lineas', 'aria-label': 'Productos del pedido' }, items),
    h('div', { class: 'total', 'aria-live': 'polite' },
      h('span', {}, `Total (${pedido.cantidadDeArticulos} artículo${pedido.cantidadDeArticulos === 1 ? '' : 's'})`),
      h('strong', { id: 'total' }, formatearDinero(pedido.total))),
    h('p', { class: 'nota' }, 'Pagas al retirar en caja. Tu pedido estará listo en unos 10 minutos.'),
    h('div', { class: 'acciones' },
      h('a', { class: 'boton boton--secundario', href: '#/catalogo' }, 'Seguir agregando'),
      h('button', { type: 'button', class: 'boton boton--primario', disabled: pedido.estaVacio(), onclick: acciones.confirmar }, `Confirmar pedido · ${formatearDinero(pedido.total)}`)));
}
