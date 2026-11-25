// Raíz de composición: une infraestructura → aplicación → presentación.
import { crearCasosDeUso } from './application/casosDeUso.js';
import { almacenamientoDelNavegador } from './infrastructure/almacenamiento.js';
import { CatalogoRepositorioEnMemoria, CarritoRepositorioLocal, PedidoRepositorioLocal } from './infrastructure/repositorios.js';
import { iniciarPresentacion } from './presentation/app.js';

const almacenamiento = almacenamientoDelNavegador();

// Estado inicial de las sesiones de evaluación: abrir con ?reiniciar=1 borra el pedido y la secuencia.
if (new URLSearchParams(location.search).has('reiniciar')) {
  ['cafeu.carrito.v1', 'cafeu.pedidos.v1', 'cafeu.secuencia.v1'].forEach((k) => almacenamiento.removeItem(k));
  history.replaceState(null, '', location.pathname + location.hash);
}
const casosDeUso = crearCasosDeUso({
  catalogo: new CatalogoRepositorioEnMemoria(),
  carrito: new CarritoRepositorioLocal(almacenamiento),
  pedidos: new PedidoRepositorioLocal(almacenamiento),
});

iniciarPresentacion({ casosDeUso, raiz: document.getElementById('principal') });
