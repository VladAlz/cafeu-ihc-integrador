// Dominio · Pedido: carrito en estado «borrador», luego «confirmado» o «cancelado»
import { DetallePedido } from './DetallePedido.js';
import { CANTIDAD_MAX, ErrorDeDominio, MINUTOS_PARA_CANCELAR } from './reglas.js';

export const ESTADO = Object.freeze({ BORRADOR: 'borrador', CONFIRMADO: 'confirmado', CANCELADO: 'cancelado' });

export class Pedido {
  constructor({ lineas = [], estado = ESTADO.BORRADOR, numero = null, confirmadoEn = null } = {}) {
    this.lineas = lineas.map((l) => (l instanceof DetallePedido ? l : new DetallePedido(l)));
    this.estado = estado;
    this.numero = numero;
    this.confirmadoEn = confirmadoEn; // ISO string
  }

  get total() {
    return this.lineas.reduce((suma, l) => suma + l.subtotal, 0);
  }

  get cantidadDeArticulos() {
    return this.lineas.reduce((suma, l) => suma + l.cantidad, 0);
  }

  estaVacio() {
    return this.lineas.length === 0;
  }

  #exigirBorrador() {
    if (this.estado !== ESTADO.BORRADOR) {
      throw new ErrorDeDominio('PEDIDO_NO_EDITABLE', 'Este pedido ya fue enviado y no se puede modificar.');
    }
  }

  linea(productoId) {
    return this.lineas.find((l) => l.productoId === productoId) ?? null;
  }

  /** Agrega un producto; si ya está en el pedido, suma la cantidad respetando el máximo. */
  agregar(producto, cantidad = 1) {
    this.#exigirBorrador();
    if (!producto.disponible) {
      throw new ErrorDeDominio('PRODUCTO_AGOTADO', `${producto.nombre} está agotado por hoy.`);
    }
    const existente = this.linea(producto.id);
    if (existente) {
      const nueva = existente.cantidad + cantidad;
      if (nueva > CANTIDAD_MAX) {
        throw new ErrorDeDominio('CANTIDAD_MAYOR', `Ya tienes ${existente.cantidad}; el máximo por producto es ${CANTIDAD_MAX}.`);
      }
      this.lineas = this.lineas.map((l) => (l.productoId === producto.id ? l.conCantidad(nueva) : l));
    } else {
      this.lineas = [...this.lineas, new DetallePedido({ productoId: producto.id, nombre: producto.nombre, precioUnitario: producto.precio, cantidad })];
    }
    return this.linea(producto.id);
  }

  cambiarCantidad(productoId, cantidad) {
    this.#exigirBorrador();
    const existente = this.linea(productoId);
    if (!existente) throw new ErrorDeDominio('LINEA_INEXISTENTE', 'El producto ya no está en tu pedido.');
    const actualizada = existente.conCantidad(cantidad); // valida límites
    this.lineas = this.lineas.map((l) => (l.productoId === productoId ? actualizada : l));
    return actualizada;
  }

  /** Elimina una línea y devuelve lo necesario para poder recuperarla. */
  eliminar(productoId) {
    this.#exigirBorrador();
    const indice = this.lineas.findIndex((l) => l.productoId === productoId);
    if (indice === -1) throw new ErrorDeDominio('LINEA_INEXISTENTE', 'El producto ya no está en tu pedido.');
    const [linea] = this.lineas.splice(indice, 1);
    this.lineas = [...this.lineas];
    return { linea: linea.aDatos(), indice };
  }

  /** Restaura una línea eliminada en su posición original. */
  restaurar({ linea, indice }) {
    this.#exigirBorrador();
    if (this.linea(linea.productoId)) return this.linea(linea.productoId);
    const restaurada = new DetallePedido(linea);
    const lineas = [...this.lineas];
    lineas.splice(Math.min(indice, lineas.length), 0, restaurada);
    this.lineas = lineas;
    return restaurada;
  }

  confirmar(numero, fecha = new Date()) {
    this.#exigirBorrador();
    if (this.estaVacio()) throw new ErrorDeDominio('PEDIDO_VACIO', 'Agrega al menos un producto antes de confirmar.');
    this.estado = ESTADO.CONFIRMADO;
    this.numero = numero;
    this.confirmadoEn = fecha.toISOString();
    return this;
  }

  puedeCancelarse(ahora = new Date()) {
    if (this.estado !== ESTADO.CONFIRMADO) return false;
    const minutos = (ahora.getTime() - new Date(this.confirmadoEn).getTime()) / 60000;
    return minutos <= MINUTOS_PARA_CANCELAR;
  }

  cancelar(ahora = new Date()) {
    if (!this.puedeCancelarse(ahora)) {
      throw new ErrorDeDominio('NO_CANCELABLE', `Solo puedes cancelar durante los primeros ${MINUTOS_PARA_CANCELAR} minutos después de confirmar.`);
    }
    this.estado = ESTADO.CANCELADO;
    return this;
  }

  aDatos() {
    return { lineas: this.lineas.map((l) => l.aDatos()), estado: this.estado, numero: this.numero, confirmadoEn: this.confirmadoEn };
  }
}
