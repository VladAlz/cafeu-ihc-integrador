// Infraestructura · repositorios (implementan los puertos que usa la capa de aplicación)
import { Producto } from '../domain/Producto.js';
import { Pedido } from '../domain/Pedido.js';
import { CATALOGO } from './catalogoDatos.js';

export class CatalogoRepositorioEnMemoria {
  #productos;
  constructor(datos = CATALOGO) { this.#productos = datos.map((d) => new Producto(d)); }
  todos() { return [...this.#productos]; }
  porId(id) { return this.#productos.find((p) => p.id === id) ?? null; }
}

const CLAVE_CARRITO = 'cafeu.carrito.v1';
const CLAVE_PEDIDOS = 'cafeu.pedidos.v1';
const CLAVE_SECUENCIA = 'cafeu.secuencia.v1';

export class CarritoRepositorioLocal {
  constructor(almacenamiento) { this.almacenamiento = almacenamiento; }
  obtener() {
    const crudo = this.almacenamiento.getItem(CLAVE_CARRITO);
    try { return crudo ? new Pedido(JSON.parse(crudo)) : new Pedido(); } catch { return new Pedido(); }
  }
  guardar(pedido) { this.almacenamiento.setItem(CLAVE_CARRITO, JSON.stringify(pedido.aDatos())); }
  vaciar() { this.almacenamiento.removeItem(CLAVE_CARRITO); }
}

export class PedidoRepositorioLocal {
  constructor(almacenamiento) { this.almacenamiento = almacenamiento; }
  #leer() {
    try { return JSON.parse(this.almacenamiento.getItem(CLAVE_PEDIDOS) ?? '[]'); } catch { return []; }
  }
  siguienteNumero() {
    const actual = Number(this.almacenamiento.getItem(CLAVE_SECUENCIA) ?? '100') + 1;
    this.almacenamiento.setItem(CLAVE_SECUENCIA, String(actual));
    return `CU-${actual}`;
  }
  guardar(pedido) {
    const lista = this.#leer().filter((p) => p.numero !== pedido.numero);
    lista.push(pedido.aDatos());
    this.almacenamiento.setItem(CLAVE_PEDIDOS, JSON.stringify(lista));
  }
  porNumero(numero) {
    const dato = this.#leer().find((p) => p.numero === numero);
    return dato ? new Pedido(dato) : null;
  }
  ultimo() {
    const lista = this.#leer();
    return lista.length ? new Pedido(lista[lista.length - 1]) : null;
  }
}
