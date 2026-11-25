// Prueba crítica 3 · T3: eliminar, recuperar y confirmar; cancelar dentro del plazo
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { armarApp } from './ayudante.js';

test('eliminar y recuperar devuelve la línea a su posición y el total', () => {
  const { app } = armarApp();
  app.agregarAlCarrito('sanduche-queso');
  app.agregarAlCarrito('cafe-americano');
  app.cambiarCantidad('cafe-americano', 3);
  const { pedido: sinSanduche, recuerdo } = app.eliminarDelCarrito('sanduche-queso');
  assert.equal(sinSanduche.total, 450);
  const { pedido } = app.recuperarEliminado(recuerdo);
  assert.deepEqual(pedido.lineas.map((l) => l.productoId), ['sanduche-queso', 'cafe-americano']);
  assert.equal(pedido.total, 725);
});

test('confirmar asigna número correlativo, guarda el pedido y vacía el carrito', () => {
  const { app } = armarApp();
  app.agregarAlCarrito('capuchino');
  const primero = app.confirmarPedido();
  assert.equal(primero.numero, 'CU-101');
  assert.equal(primero.estado, 'confirmado');
  assert.ok(app.verCarrito().estaVacio());
  app.agregarAlCarrito('pan-yuca');
  assert.equal(app.confirmarPedido().numero, 'CU-102');
});

test('no se puede confirmar un pedido vacío', () => {
  const { app } = armarApp();
  assert.throws(() => app.confirmarPedido(), { codigo: 'PEDIDO_VACIO' });
});

test('cancelar solo es posible en los primeros 5 minutos', () => {
  const { app, reloj } = armarApp();
  app.agregarAlCarrito('te-hierbas');
  const { numero } = app.confirmarPedido();
  reloj.valor = new Date('2026-11-25T15:04:00Z');
  assert.equal(app.cancelarPedido(numero).estado, 'cancelado');

  app.agregarAlCarrito('te-hierbas');
  reloj.valor = new Date('2026-11-25T15:10:00Z');
  const otro = app.confirmarPedido();
  reloj.valor = new Date('2026-11-25T15:16:00Z');
  assert.throws(() => app.cancelarPedido(otro.numero), { codigo: 'NO_CANCELABLE' });
});
