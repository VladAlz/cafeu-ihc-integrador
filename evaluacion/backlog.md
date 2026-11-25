# Backlog priorizado · severidad × impacto

**Prioridad** = severidad (0–4) × impacto (1–3). P1 ≥ 9 · P2 6–8 · P3 3–5 · P4 ≤ 2.

| ID | Hallazgo | Cambio propuesto | Componente | Sev. | Imp. | Puntaje | Prioridad | Estado |
|---|---|---|---|---|---|---|---|---|
| **B-01** | H-01 | Reemplazar la línea eliminada por un marcador «se quitó de tu pedido» con «Deshacer» sin límite de tiempo, en la misma posición y con foco. | `LineaEliminada`, `app.js` | 4 | 3 | 12 | **P1** | ✅ Corregido en v2 |
| **B-02** | H-02 | Botón «Eliminar» con texto, en otra fila y con estilo de peligro; − y + de 44 px. | `LineaPedido`, `SelectorCantidad`, CSS | 3 | 3 | 9 | **P1** | ✅ Corregido en v2 |
| **B-03** | H-03 | Región de mensajes bajo la cabecera, 16 px, contraste ≥ 7:1, botón cerrar; «✓ Agregado» en el botón. | `Mensajes`, `TarjetaProducto` | 3 | 2 | 6 | **P2** | ✅ Corregido en v2 |
| **B-04** | H-04 | Error junto al campo con el rango, `aria-invalid`, − / + deshabilitados en los extremos. | `SelectorCantidad`, `reglas.js` | 2 | 1 | 2 | P4 | ✅ Corregido en v2 |
| **B-05** | H-05 | «No encontramos…», sugerencias y «Ver todo el menú». | `VistaCatalogo` | 2 | 1 | 2 | P4 | ✅ Corregido en v2 |
| **B-06** | H-06 | Total en el botón: «Confirmar pedido · $7,25»; línea «3 × $1,50 = $4,50». | `VistaPedido`, `LineaPedido` | 1 | 2 | 2 | P4 | ✅ Corregido en v2 |
| **B-07** | H-07 | Enlace «Ver mi pedido» dentro del mensaje al agregar. | `app.js` | 1 | 2 | 2 | P4 | ✅ Corregido en v2 |
| B-08 | Mejora | Mostrar el tiempo restante para cancelar (cuenta regresiva de 5 min). | `VistaConfirmacion` | 1 | 1 | 1 | P4 | Pendiente |
| B-09 | Mejora | Persistir pedidos en una API para verlos desde otro dispositivo y avisar «pedido listo». | `infrastructure/` | 1 | 1 | 1 | P4 | Pendiente (fuera del alcance) |

Se corrigieron siete problemas (se exigían al menos dos), empezando por los dos P1, que eran los responsables del error crítico y de la tarea con ayuda. La comprobación está en [`validacion-v2.md`](validacion-v2.md).
