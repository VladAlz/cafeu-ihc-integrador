// Dominio · Línea de un pedido (producto + cantidad)
import { validarCantidad } from './reglas.js';

export class DetallePedido {
  constructor({ productoId, nombre, precioUnitario, cantidad = 1 }) {
    this.productoId = productoId;
    this.nombre = nombre;
    this.precioUnitario = precioUnitario; // centavos
    this.cantidad = validarCantidad(cantidad);
  }

  get subtotal() {
    return this.precioUnitario * this.cantidad;
  }

  conCantidad(cantidad) {
    return new DetallePedido({ ...this.aDatos(), cantidad });
  }

  aDatos() {
    return { productoId: this.productoId, nombre: this.nombre, precioUnitario: this.precioUnitario, cantidad: this.cantidad };
  }
}
