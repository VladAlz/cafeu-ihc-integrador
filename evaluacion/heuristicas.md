# Evaluación heurística · CaféU 2.0 (v1)

**Método:** inspección de la v1 con las 10 heurísticas de Nielsen; cada integrante revisó por separado y luego se consolidó. **Severidad 0–4:** 0 no es problema · 1 cosmético · 2 menor · 3 mayor · 4 catastrófico. **Fecha:** 24/11/2026 (antes de las sesiones P01–P02).

## 1. Revisión por heurística

| H | Heurística | v1 | Evidencia |
|---|---|---|---|
| H1 | Visibilidad del estado del sistema | ✗ | El aviso «Agregado» es gris, de 12 px, en la esquina inferior y dura 2,5 s; el contador del pedido sí se actualiza. |
| H2 | Relación con el mundo real | ✓ | Precios en dólares con coma, nombres de la cafetería, «Mi pedido», «Pagas al retirar». |
| H3 | Control y libertad del usuario | ✗ | «Deshacer» solo dentro del aviso de 2,5 s; después no hay forma de recuperar lo quitado. |
| H4 | Consistencia y estándares | ✗ | El botón ✕ (eliminar) tiene la misma forma y tamaño que − y +, aunque su efecto es destructivo. |
| H5 | Prevención de errores | ✗ | ✕ junto a +; − habilitado en 1; el campo de cantidad acepta 0 o 15 antes de validar. |
| H6 | Reconocer antes que recordar | ◐ | El botón «Confirmar pedido» no muestra el total; hay que desplazarse para verlo. |
| H7 | Flexibilidad y eficiencia | ✓ | Búsqueda tolerante a tildes y mayúsculas, por inicio de palabra; filtros por categoría. |
| H8 | Diseño estético y minimalista | ✓ | Tarjetas limpias, una acción principal por pantalla. |
| H9 | Reconocer, diagnosticar y recuperarse de errores | ✗ | «Cantidad inválida» sin decir el límite ni marcar el campo; «Sin resultados.» sin sugerencias. |
| H10 | Ayuda y documentación | ◐ | Hay textos de apoyo (pago al retirar, 10 min), pero no se explican los límites de cantidad ni el plazo de cancelación hasta llegar a él. |

## 2. Hallazgos (v1)

| ID | Heurística | Pantalla · componente | Hallazgo y evidencia | Severidad |
|---|---|---|---|---|
| HE-01 | H5, H4 | Mi pedido · `LineaPedido` | El botón ✕ para eliminar está pegado a + (28 px cada uno, misma forma): un toque impreciso borra la línea completa. | **3** |
| HE-02 | H3, H9 | Mi pedido · `Mensajes` | Tras eliminar, «Deshacer» solo aparece 2,5 s dentro del aviso; si no se pulsa a tiempo, el producto se pierde. | **4** |
| HE-03 | H1 | Global · `Mensajes` | Los avisos son de 12 px, gris #8a8a8a sobre #f4f4f4 (**3,14:1**, WCAG 1.4.3 exige 4,5:1) y aparecen lejos de la acción. | **3** |
| HE-04 | H9, H5 | Mi pedido · `SelectorCantidad` | Escribir 0 o 15 muestra «Cantidad inválida» en el aviso, sin indicar el rango 1–10 ni marcar el campo. | **2** |
| HE-05 | H9, H10 | Catálogo · búsqueda | Una búsqueda sin coincidencias muestra solo «Sin resultados.», sin sugerencias ni forma rápida de volver al menú. | **2** |
| HE-06 | H6, H1 | Mi pedido · confirmar | El botón «Confirmar pedido» no muestra el total que se va a pagar. | **1** |

La triangulación con las observaciones de P01–P02 está en [`hallazgos.md`](hallazgos.md).

## 3. Reverificación en la v2 (25/11/2026)

| ID | Estado en v2 | Comprobación |
|---|---|---|
| HE-01 | Resuelto | «Eliminar» es un botón de texto, en otra fila y con estilo de peligro; − y + miden 44 px. |
| HE-02 | Resuelto | La línea eliminada queda como marcador con «Deshacer» sin límite de tiempo; el foco pasa al botón. |
| HE-03 | Resuelto | Mensajes bajo la cabecera, 16 px, #14532d sobre #e3f4e8 (**7,97:1**) y error #7f1d1d sobre #fdecec (**8,77:1**); botón para cerrar. |
| HE-04 | Resuelto | Error junto al campo con el límite («La cantidad máxima por producto es 10.»), `aria-invalid` y − / + deshabilitados en los extremos. |
| HE-05 | Resuelto | Mensaje «No encontramos…», sugerencias y botón «Ver todo el menú». |
| HE-06 | Resuelto | El botón dice «Confirmar pedido · $7,25». |
