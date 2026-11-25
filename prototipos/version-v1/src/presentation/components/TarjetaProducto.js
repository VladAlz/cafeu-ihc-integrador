// Presentación · tarjeta de producto del catálogo (componente reutilizable)
import { h } from './dom.js';
import { formatearDinero } from '../../domain/reglas.js';

export function TarjetaProducto({ producto, alAgregar }) {
  const boton = h('button', {
    type: 'button', class: 'boton boton--primario', disabled: !producto.disponible,
    'aria-label': producto.disponible ? `Agregar ${producto.nombre} al pedido` : `${producto.nombre} agotado`,
  }, producto.disponible ? 'Agregar' : 'Agotado');
  boton.addEventListener('click', () => alAgregar(producto, boton));

  return h('li', { class: 'tarjeta' },
    h('article', { 'aria-labelledby': `nombre-${producto.id}` },
      h('h3', { class: 'tarjeta__nombre', id: `nombre-${producto.id}` }, producto.nombre),
      h('p', { class: 'tarjeta__desc' }, producto.descripcion),
      h('div', { class: 'tarjeta__pie' },
        h('p', { class: 'tarjeta__precio' }, formatearDinero(producto.precio)),
        boton),
      !producto.disponible && h('p', { class: 'tarjeta__estado' }, 'Agotado por hoy · vuelve mañana')));
}
