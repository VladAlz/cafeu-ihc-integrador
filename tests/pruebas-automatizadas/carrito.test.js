// Prueba crítica 2 · T2: agregar, modificar cantidad y verificar total
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { armarApp } from './ayudante.js';

test('agregar y cambiar la cantidad recalcula subtotal y total', () => {
  const { app } = armarApp();
  app.agregarAlCarrito('sanduche-queso');
  app.agregarAlCarrito('cafe-americano');
  const { pedido } = app.cambiarCantidad('cafe-americano', 3);
  assert.equal(pedido.linea('cafe-americano').subtotal, 450);
  assert.equal(pedido.total, 725); // 2,75 + 3 × 1,50
  assert.equal(pedido.cantidadDeArticulos, 4);
});

test('agregar dos veces el mismo producto suma en la misma línea', () => {
  const { app } = armarApp();
  app.agregarAlCarrito('capuchino');
  const { pedido } = app.agregarAlCarrito('capuchino');
  assert.equal(pedido.lineas.length, 1);
  assert.equal(pedido.linea('capuchino').cantidad, 2);
});

test('la cantidad respeta los límites 1–10 con mensajes claros', () => {
  const { app } = armarApp();
  app.agregarAlCarrito('croissant');
  assert.throws(() => app.cambiarCantidad('croissant', 0), { codigo: 'CANTIDAD_MENOR' });
  assert.throws(() => app.cambiarCantidad('croissant', 11), { codigo: 'CANTIDAD_MAYOR' });
  assert.throws(() => app.cambiarCantidad('croissant', 2.5), { codigo: 'CANTIDAD_NO_ENTERA' });
  assert.equal(app.verCarrito().linea('croissant').cantidad, 1);
});

test('no permite agregar un producto agotado', () => {
  const { app } = armarApp();
  assert.throws(() => app.agregarAlCarrito('empanada-verde'), { codigo: 'PRODUCTO_AGOTADO' });
});

test('el carrito persiste en el almacenamiento y se recupera al recargar', () => {
  const { app, almacenamiento } = armarApp();
  app.agregarAlCarrito('jugo-naranja');
  app.cambiarCantidad('jugo-naranja', 2);
  const { app: recargada } = armarApp({ almacenamiento });
  assert.equal(recargada.verCarrito().total, 250);
});
