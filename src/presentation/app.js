// Presentación · controlador (v1): enrutamiento por hash, acciones de usuario y mensajes.
import { crearMensajes } from './components/Mensajes.js';
import { VistaCatalogo } from './views/VistaCatalogo.js';
import { VistaPedido } from './views/VistaPedido.js';
import { VistaConfirmacion } from './views/VistaConfirmacion.js';
import { ErrorDeDominio } from '../domain/reglas.js';

export function iniciarPresentacion({ casosDeUso, raiz }) {
  const mensajes = crearMensajes(document.getElementById('mensajes'));
  const insignia = document.getElementById('insignia');
  const estadoCatalogo = { texto: '', categoria: 'todo' };
  let eliminada = null; // último elemento quitado, recuperable hasta la siguiente acción

  const actualizarInsignia = () => {
    const n = casosDeUso.verCarrito().cantidadDeArticulos;
    insignia.textContent = n;
    insignia.setAttribute('aria-label', `${n} artículo${n === 1 ? '' : 's'}`);
  };

  const ejecutar = (fn) => {
    try { return { valor: fn() }; } catch (e) {
      if (e instanceof ErrorDeDominio) { const texto = e.codigo.startsWith('CANTIDAD') ? 'Cantidad inválida' : e.message; mensajes.mostrar(texto, { tipo: 'error' }); return { error: texto }; }
      throw e;
    }
  };

  const acciones = {
    agregar(producto, boton) {
      const r = ejecutar(() => casosDeUso.agregarAlCarrito(producto.id));
      if (r.error) return;
      actualizarInsignia();
      mensajes.mostrar('Agregado');
    },
    cambiarCantidad(productoId, cantidad) {
      eliminada = null;
      const r = ejecutar(() => casosDeUso.cambiarCantidad(productoId, cantidad));
      if (r.error) return r;
      pintar({ foco: `#cant-${productoId}` });
      return r;
    },
    eliminar(linea) {
      const r = ejecutar(() => casosDeUso.eliminarDelCarrito(linea.productoId));
      if (r.error) return;
      const recuerdo = r.valor.recuerdo;
      pintar();
      mensajes.mostrar('Producto eliminado', { accion: { etiqueta: 'Deshacer', alPulsar: () => acciones.deshacer(recuerdo) } });
    },
    deshacer(recuerdo) {
      const r = ejecutar(() => casosDeUso.recuperarEliminado(recuerdo));
      if (r.error) return;
      pintar();
    },
    confirmar() {
      const r = ejecutar(() => casosDeUso.confirmarPedido());
      if (r.error) return;
      eliminada = null;
      mensajes.limpiar();
      location.hash = '#/confirmacion';
    },
    cancelar(numero) {
      const r = ejecutar(() => casosDeUso.cancelarPedido(numero));
      if (r.error) return;
      mensajes.mostrar(`El pedido ${numero} fue cancelado.`);
      pintar({ foco: 'h1' });
    },
  };

  function rutaActual() {
    const ruta = location.hash.replace('#/', '') || 'catalogo';
    return ['catalogo', 'pedido', 'confirmacion'].includes(ruta) ? ruta : 'catalogo';
  }

  function pintar({ foco = null } = {}) {
    const ruta = rutaActual();
    const vista = ruta === 'pedido' ? VistaPedido({ casosDeUso, acciones, eliminada })
      : ruta === 'confirmacion' ? VistaConfirmacion({ casosDeUso, acciones })
      : VistaCatalogo({ casosDeUso, estado: estadoCatalogo, alAgregar: acciones.agregar });
    raiz.replaceChildren(vista);
    raiz.querySelector('h1')?.setAttribute('tabindex', '-1');
    document.querySelectorAll('[data-ruta]').forEach((a) => (a.dataset.ruta === ruta ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    document.title = `${{ catalogo: 'Catálogo', pedido: 'Mi pedido', confirmacion: 'Confirmación' }[ruta]} · CaféU 2.0`;
    actualizarInsignia();
    if (foco) raiz.querySelector(foco)?.focus();
    return ruta;
  }

  window.addEventListener('hashchange', () => { eliminada = null; mensajes.limpiar(); pintar({ foco: 'h1' }); });
  pintar();
}
