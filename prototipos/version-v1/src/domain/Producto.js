// Dominio · Producto del catálogo
import { ErrorDeDominio, normalizarTexto } from './reglas.js';

export class Producto {
  constructor({ id, nombre, categoria, precio, descripcion = '', disponible = true, etiquetas = [] }) {
    if (!id || !nombre) throw new ErrorDeDominio('PRODUCTO_INVALIDO', 'El producto necesita id y nombre.');
    if (!Number.isInteger(precio) || precio <= 0) {
      throw new ErrorDeDominio('PRECIO_INVALIDO', 'El precio debe expresarse en centavos y ser positivo.');
    }
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio; // centavos
    this.descripcion = descripcion;
    this.disponible = disponible;
    this.etiquetas = etiquetas;
    Object.freeze(this);
  }

  /** Coincidencia tolerante a tildes y mayúsculas, por inicio de palabra, sobre nombre, descripción y etiquetas. */
  coincideCon(consulta) {
    const q = normalizarTexto(consulta);
    if (!q) return true;
    const palabras = normalizarTexto([this.nombre, this.descripcion, ...this.etiquetas].join(' ')).split(/[^a-z0-9ñ]+/);
    // Cada palabra buscada debe ser el inicio de alguna palabra del producto («pan» no encuentra «empanada»).
    return q.split(' ').every((buscada) => palabras.some((p) => p.startsWith(buscada)));
  }
}
