// Prueba crítica 1 · T1: buscar tolerando tildes y mayúsculas
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { armarApp } from './ayudante.js';

const nombres = (lista) => lista.map((p) => p.nombre);

test('encuentra «Sánduche de queso» escribiendo sin tilde y en mayúsculas', () => {
  const { app } = armarApp();
  assert.deepEqual(nombres(app.buscarProductos({ texto: 'SANDUCHE' })), ['Sánduche de queso']);
  assert.deepEqual(nombres(app.buscarProductos({ texto: 'sánduche' })), ['Sánduche de queso']);
});

test('«cafe» encuentra los productos de café por nombre o etiqueta', () => {
  const { app } = armarApp();
  assert.deepEqual(nombres(app.buscarProductos({ texto: 'Cafe' })), ['Café americano', 'Capuchino']);
});

test('combina texto y categoría, y una búsqueda vacía devuelve todo', () => {
  const { app } = armarApp();
  assert.deepEqual(nombres(app.buscarProductos({ texto: 'pan', categoria: 'comida' })), ['Sánduche de queso', 'Croissant', 'Pan de yuca']);
  assert.equal(app.buscarProductos().length, 10);
  assert.equal(app.buscarProductos({ texto: 'pizza' }).length, 0);
});
