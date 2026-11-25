// Arma la aplicación con almacenamiento en memoria y un reloj controlable.
import { crearCasosDeUso } from '../../src/application/casosDeUso.js';
import { AlmacenamientoEnMemoria } from '../../src/infrastructure/almacenamiento.js';
import { CatalogoRepositorioEnMemoria, CarritoRepositorioLocal, PedidoRepositorioLocal } from '../../src/infrastructure/repositorios.js';

export function armarApp({ almacenamiento = new AlmacenamientoEnMemoria(), ahora = new Date('2026-11-25T15:00:00Z') } = {}) {
  const reloj = { valor: ahora };
  const app = crearCasosDeUso({
    catalogo: new CatalogoRepositorioEnMemoria(),
    carrito: new CarritoRepositorioLocal(almacenamiento),
    pedidos: new PedidoRepositorioLocal(almacenamiento),
    reloj: () => reloj.valor,
  });
  return { app, almacenamiento, reloj };
}
