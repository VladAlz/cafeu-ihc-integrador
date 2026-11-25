// Presentación · pantalla Confirmación: número, detalle y cancelación en dos pasos
import { h } from '../components/dom.js';
import { formatearDinero, MINUTOS_PARA_CANCELAR } from '../../domain/reglas.js';

export function VistaConfirmacion({ casosDeUso, acciones }) {
  const pedido = casosDeUso.ultimoPedido();
  if (!pedido) return h('section', { class: 'vista' }, h('h1', {}, 'Sin pedidos'), h('a', { class: 'boton boton--primario', href: '#/catalogo' }, 'Ir al menú'));
  const cancelado = pedido.estado === 'cancelado';
  const zonaCancelar = h('div', { class: 'cancelar' });

  const pintarCancelar = (preguntando = false) => {
    if (cancelado || !casosDeUso.puedeCancelarse(pedido)) { zonaCancelar.replaceChildren(); return; }
    zonaCancelar.replaceChildren(...(preguntando
      ? [h('p', { id: 'pregunta-cancelar' }, `¿Cancelar el pedido ${pedido.numero}? No se podrá recuperar.`),
         h('div', { class: 'acciones' },
           h('button', { type: 'button', class: 'boton boton--peligro', 'aria-describedby': 'pregunta-cancelar', onclick: () => acciones.cancelar(pedido.numero) }, 'Sí, cancelar pedido'),
           h('button', { type: 'button', class: 'boton boton--secundario', onclick: () => pintarCancelar(false) }, 'No, mantenerlo'))]
      : [h('button', { type: 'button', class: 'boton boton--secundario', onclick: () => { pintarCancelar(true); zonaCancelar.querySelector('.boton--peligro').focus(); } }, 'Cancelar pedido'),
         h('p', { class: 'nota' }, `Puedes cancelar durante ${MINUTOS_PARA_CANCELAR} minutos.`)]));
  };
  pintarCancelar();

  return h('section', { class: 'vista confirmacion', 'aria-labelledby': 'titulo-confirmacion' },
    h('h1', { id: 'titulo-confirmacion' }, cancelado ? 'Pedido cancelado' : '¡Pedido confirmado!'),
    h('p', { class: 'confirmacion__numero' }, 'Número de pedido ', h('strong', {}, pedido.numero)),
    h('ul', { class: 'resumen-pedido' }, pedido.lineas.map((l) => h('li', {}, `${l.cantidad} × ${l.nombre}`, h('span', {}, formatearDinero(l.subtotal))))),
    h('p', { class: 'total' }, h('span', {}, cancelado ? 'Total (anulado)' : 'Total a pagar al retirar'), h('strong', {}, formatearDinero(pedido.total))),
    zonaCancelar,
    h('a', { class: 'boton boton--primario', href: '#/catalogo' }, 'Hacer otro pedido'));
}
