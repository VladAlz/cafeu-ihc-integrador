// Presentación · selector de cantidad reutilizable (v2): botones de 44 px, límites visibles
// y error junto al campo con aria-invalid.
import { h } from './dom.js';
import { CANTIDAD_MAX, CANTIDAD_MIN } from '../../domain/reglas.js';

export function SelectorCantidad({ id, etiqueta, valor, alCambiar }) {
  const idCampo = `cant-${id}`;
  const idError = `cant-err-${id}`;
  const error = h('p', { class: 'campo__error', id: idError, hidden: true });
  const campo = h('input', {
    id: idCampo, class: 'selector__campo', type: 'number', inputmode: 'numeric',
    min: CANTIDAD_MIN, max: CANTIDAD_MAX, step: 1, value: valor, 'aria-describedby': `${idError} ayuda-${id}`,
  });
  const menos = h('button', { type: 'button', class: 'selector__boton', 'aria-label': `Quitar una unidad de ${etiqueta}`, disabled: valor <= CANTIDAD_MIN }, '−');
  const mas = h('button', { type: 'button', class: 'selector__boton', 'aria-label': `Agregar una unidad de ${etiqueta}`, disabled: valor >= CANTIDAD_MAX }, '+');

  const intentar = (n) => {
    const resultado = alCambiar(n);
    if (resultado?.error) {
      campo.setAttribute('aria-invalid', 'true');
      error.textContent = resultado.error;
      error.hidden = false;
      campo.value = valor;
    }
  };
  menos.addEventListener('click', () => intentar(valor - 1));
  mas.addEventListener('click', () => intentar(valor + 1));
  campo.addEventListener('change', () => intentar(Number(campo.value)));

  return h('div', { class: 'selector' },
    h('label', { class: 'selector__etiqueta', for: idCampo }, `Cantidad de ${etiqueta}`),
    h('div', { class: 'selector__controles' }, menos, campo, mas),
    h('p', { class: 'selector__ayuda', id: `ayuda-${id}` }, `De ${CANTIDAD_MIN} a ${CANTIDAD_MAX} unidades`),
    error);
}
