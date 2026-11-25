// Aplicación · casos de uso. Solo conoce el dominio y los puertos (repositorios) que recibe.
import { ErrorDeDominio } from '../domain/reglas.js';

export function crearCasosDeUso({ catalogo, carrito, pedidos, reloj = () => new Date() }) {
  const productoOError = (id) => {
    const p = catalogo.porId(id);
    if (!p) throw new ErrorDeDominio('PRODUCTO_INEXISTENTE', 'El producto no existe.');
    return p;
  };

  return {
    /** CU-01 · Buscar productos por texto (sin tildes ni mayúsculas) y categoría. */
    buscarProductos({ texto = '', categoria = 'todo' } = {}) {
      return catalogo.todos().filter((p) => (categoria === 'todo' || p.categoria === categoria) && p.coincideCon(texto));
    },

    /** CU-02 · Ver el pedido en curso. */
    verCarrito() {
      return carrito.obtener();
    },

    /** CU-03 · Agregar un producto al pedido. */
    agregarAlCarrito(productoId, cantidad = 1) {
      const pedido = carrito.obtener();
      const linea = pedido.agregar(productoOError(productoId), cantidad);
      carrito.guardar(pedido);
      return { pedido, linea };
    },

    /** CU-04 · Cambiar la cantidad de una línea (1–10). */
    cambiarCantidad(productoId, cantidad) {
      const pedido = carrito.obtener();
      const linea = pedido.cambiarCantidad(productoId, cantidad);
      carrito.guardar(pedido);
      return { pedido, linea };
    },

    /** CU-05 · Eliminar una línea; devuelve el recuerdo para deshacer. */
    eliminarDelCarrito(productoId) {
      const pedido = carrito.obtener();
      const recuerdo = pedido.eliminar(productoId);
      carrito.guardar(pedido);
      return { pedido, recuerdo };
    },

    /** CU-06 · Recuperar una línea eliminada. */
    recuperarEliminado(recuerdo) {
      const pedido = carrito.obtener();
      const linea = pedido.restaurar(recuerdo);
      carrito.guardar(pedido);
      return { pedido, linea };
    },

    /** CU-07 · Confirmar el pedido: asigna número, lo guarda y vacía el carrito. */
    confirmarPedido() {
      const pedido = carrito.obtener();
      pedido.confirmar(pedidos.siguienteNumero(), reloj());
      pedidos.guardar(pedido);
      carrito.vaciar();
      return pedido;
    },

    /** CU-08 · Cancelar un pedido confirmado (dentro del plazo). */
    cancelarPedido(numero) {
      const pedido = pedidos.porNumero(numero);
      if (!pedido) throw new ErrorDeDominio('PEDIDO_INEXISTENTE', 'No encontramos ese pedido.');
      pedido.cancelar(reloj());
      pedidos.guardar(pedido);
      return pedido;
    },

    ultimoPedido() {
      return pedidos.ultimo();
    },

    puedeCancelarse(pedido) {
      return pedido.puedeCancelarse(reloj());
    },
  };
}
