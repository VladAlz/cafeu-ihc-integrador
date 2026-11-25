# Matriz de trazabilidad · requisitos → pantallas → pruebas

| Requisito | Pantalla / componente | Caso de uso (aplicación) | Prueba automatizada | Tarea con usuarios | Hallazgo / backlog |
|---|---|---|---|---|---|
| RF-01 Catálogo y disponibilidad | Catálogo · `TarjetaProducto` | `buscarProductos` | `carrito.test.js` › no permite agregar un producto agotado | T1 | — |
| RF-02 Búsqueda sin tildes ni mayúsculas | Catálogo · buscador y filtros | `buscarProductos` | `busqueda.test.js` (3 casos) | T1 | H-05 → B-05 (sugerencias sin resultados) |
| RF-03 Agregar con retroalimentación | Catálogo · `Mensajes`, contador | `agregarAlCarrito` | `carrito.test.js` › agregar dos veces suma en la misma línea | T1 | H-03 → B-03 (mensajes visibles) |
| RF-04 Cantidad 1–10 y total | Mi pedido · `SelectorCantidad` | `cambiarCantidad` | `carrito.test.js` › recalcula subtotal y total · respeta límites | T2 | H-01 → B-02 · H-04 → B-04 |
| RF-05 Eliminar y recuperar | Mi pedido · `LineaPedido`, `LineaEliminada` | `eliminarDelCarrito`, `recuperarEliminado` | `eliminar-confirmar.test.js` › eliminar y recuperar | T3 | H-02 → B-01 (deshacer persistente) |
| RF-06 Confirmar y cancelar | Mi pedido · Confirmación | `confirmarPedido`, `cancelarPedido` | `eliminar-confirmar.test.js` › número correlativo · pedido vacío · cancelar ≤ 5 min | T3 | H-06 → B-06 (total en el botón) |
| RNF-01 Usabilidad | Todas | — | — | T1–T3, SEQ y SUS | [`metricas.md`](../evaluacion/metricas.md) |
| RNF-02 Accesibilidad | Todas | — | Revisión con teclado y contraste | — | [`accesibilidad.md`](../evaluacion/accesibilidad.md) |
| RNF-03 Mobile First | Todas | — | Capturas 390 px y 1280 px | — | [`evidencias/`](../evidencias/) |
| RNF-04 Persistencia y capas | Infraestructura · repositorios | todos | `carrito.test.js` › el carrito persiste al recargar | — | [`arquitectura.md`](arquitectura.md) |

**Cadena problema → corrección → resultado:** cada hallazgo H-xx de [`evaluacion/hallazgos.md`](../evaluacion/hallazgos.md) tiene un ítem B-xx en [`backlog.md`](../evaluacion/backlog.md), y su efecto se mide en [`validacion-v2.md`](../evaluacion/validacion-v2.md).
