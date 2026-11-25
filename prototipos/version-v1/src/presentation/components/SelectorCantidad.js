// Presentación · selector de cantidad (v1): botones compactos; los errores se informan con un aviso.
import { h } from './dom.js';

export function SelectorCantidad({ id, etiqueta, valor, alCambiar, extra = null }) {
  const campo = h('input', { id: `cant-${id}`, class: 'selector__campo', type: 'number', value: valor, 'aria-label': `Cantidad de ${etiqueta}` });
  const menos = h('button', { type: 'button', class: 'selector__boton', 'aria-label': `Quitar una unidad de ${etiqueta}` }, '−');
  const mas = h('button', { type: 'button', class: 'selector__boton', 'aria-label': `Agregar una unidad de ${etiqueta}` }, '+');
  const intentar = (n) => { const r = alCambiar(n); if (r?.error) campo.value = valor; };
  menos.addEventListener('click', () => intentar(valor - 1));
  mas.addEventListener('click', () => intentar(valor + 1));
  campo.addEventListener('change', () => intentar(Number(campo.value)));
  return h('div', { class: 'selector' }, h('div', { class: 'selector__controles' }, menos, campo, mas, extra));
}
