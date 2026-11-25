// Presentación · pantalla Catálogo: búsqueda, filtros y tarjetas
import { h } from '../components/dom.js';
import { TarjetaProducto } from '../components/TarjetaProducto.js';

const CATEGORIAS = [['todo', 'Todo'], ['bebidas', 'Bebidas'], ['comida', 'Comida']];

export function VistaCatalogo({ casosDeUso, estado, alAgregar }) {
  const lista = h('ul', { class: 'catalogo', 'aria-label': 'Productos' });
  const resumen = h('p', { class: 'resumen', role: 'status' });
  const buscador = h('input', { id: 'buscar', type: 'search', class: 'campo__entrada', placeholder: 'Ej.: café, sánduche, jugo', autocomplete: 'off', value: estado.texto });

  const filtros = h('div', { class: 'filtros', role: 'group', 'aria-label': 'Filtrar por categoría' },
    CATEGORIAS.map(([valor, texto]) => h('button', {
      type: 'button', class: 'filtro', 'aria-pressed': String(estado.categoria === valor),
      onclick: (e) => { estado.categoria = valor; filtros.querySelectorAll('.filtro').forEach((b) => b.setAttribute('aria-pressed', String(b === e.currentTarget))); pintar(); },
    }, texto)));

  function pintar() {
    const productos = casosDeUso.buscarProductos({ texto: estado.texto, categoria: estado.categoria });
    lista.replaceChildren(...productos.map((producto) => TarjetaProducto({ producto, alAgregar })));
    resumen.textContent = productos.length
      ? `${productos.length} producto${productos.length === 1 ? '' : 's'}`
      : '';
    if (!productos.length) {
      lista.append(h('li', { class: 'vacio' },
        h('p', {}, `No encontramos «${estado.texto}».`),
        h('p', {}, 'Prueba con «café», «pan» o «jugo», o revisa todo el menú.'),
        h('button', { type: 'button', class: 'boton boton--secundario', onclick: () => { estado.texto = ''; buscador.value = ''; estado.categoria = 'todo'; filtros.querySelectorAll('.filtro').forEach((b, i) => b.setAttribute('aria-pressed', String(i === 0))); pintar(); buscador.focus(); } }, 'Ver todo el menú')));
    }
  }
  buscador.addEventListener('input', () => { estado.texto = buscador.value; pintar(); });
  pintar();

  return h('section', { 'aria-labelledby': 'titulo-catalogo', class: 'vista' },
    h('h1', { id: 'titulo-catalogo' }, '¿Qué te provoca hoy?'),
    h('div', { class: 'campo' }, h('label', { for: 'buscar', class: 'campo__etiqueta' }, 'Buscar en el menú'), buscador),
    filtros, resumen, lista);
}
