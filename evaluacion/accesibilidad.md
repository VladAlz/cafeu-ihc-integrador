# Checklist de accesibilidad · WCAG 2.1 (v1 y v2)

**Herramientas:** navegación solo con teclado (Tab, Shift+Tab, Enter, Espacio), cálculo de contraste según WCAG (luminancia relativa), inspección del HTML y del árbol de accesibilidad del navegador. **Fecha:** 24/11/2026 (v1) y 25/11/2026 (v2).

## 1. Teclado y foco

| Criterio | WCAG | v1 | v2 | Evidencia |
|---|---|---|---|---|
| Todo es operable con teclado | 2.1.1 (A) | ✓ | ✓ | Buscador, filtros, «Agregar», − / +, campo de cantidad, «Eliminar», «Deshacer», confirmar y cancelar se alcanzan con Tab y se activan con Enter/Espacio. |
| Orden de foco lógico | 2.4.3 (A) | ✓ | ✓ | Saltar al contenido → marca → navegación → buscador → filtros → tarjetas. |
| Foco visible | 2.4.7 (AA) | ✓ | ✓ | Contorno de 3 px #1d4ed8 (6,7:1) con `:focus-visible`. Captura: [`evidencias/despues/08-foco-visible.png`](../evidencias/despues/08-foco-visible.png). |
| Enlace para saltar al contenido | 2.4.1 (A) | ✓ | ✓ | «Saltar al contenido» visible al recibir foco. |
| Gestión del foco tras acciones | 2.4.3 (A) | ✗ | ✓ | v1: al eliminar, el foco se pierde. v2: pasa a «Deshacer»; al cambiar de pantalla, al título `h1`. |

## 2. Contraste

| Elemento | Colores | Ratio | Mínimo | v1 | v2 |
|---|---|---|---|---|---|
| Aviso de estado (v1) | #8a8a8a / #f4f4f4, 12 px | **3,14:1** | 4,5:1 | ✗ | — |
| Mensaje de éxito (v2) | #14532d / #e3f4e8 | 7,97:1 | 4,5:1 | — | ✓ |
| Mensaje de error (v2) | #7f1d1d / #fdecec | 8,77:1 | 4,5:1 | — | ✓ |
| Botón primario | #ffffff / #a2400f | 6,41:1 | 4,5:1 | ✓ | ✓ |
| Texto secundario | #5c524c / #ffffff | 7,59:1 | 4,5:1 | ✓ | ✓ |
| Barra superior | #ffffff / #5b3420 | 10,73:1 | 4,5:1 | ✓ | ✓ |
| Botón «Eliminar» (v2) | #9b1c1c / #ffffff | 8,15:1 | 4,5:1 | — | ✓ |
| Borde de campos y filtros | #8d7b73 / #ffffff | 4,03:1 | 3:1 (1.4.11) | ✓ | ✓ |

## 3. Etiquetas y nombres accesibles

| Criterio | WCAG | v1 | v2 | Evidencia |
|---|---|---|---|---|
| Campos con etiqueta | 1.3.1, 3.3.2 (A) | ◐ | ✓ | Buscador con `<label>` en ambas; cantidad solo con `aria-label` en v1, con `<label>` visible y ayuda «De 1 a 10 unidades» en v2. |
| Botones con nombre que indica el producto | 4.1.2 (A) | ✓ | ✓ | «Agregar Sánduche de queso al pedido», «Agregar una unidad de Café americano». |
| Estado de filtros | 4.1.2 (A) | ✓ | ✓ | `aria-pressed` en Todo / Bebidas / Comida. |
| Página actual en la navegación | 1.3.1 (A) | ✓ | ✓ | `aria-current="page"`. |
| Título de página por pantalla | 2.4.2 (A) | ✓ | ✓ | «Mi pedido · CaféU 2.0», etc. |

## 4. Mensajes de error y de estado

| Criterio | WCAG | v1 | v2 | Evidencia |
|---|---|---|---|---|
| Mensajes de estado anunciados | 4.1.3 (AA) | ◐ | ✓ | `role="status"` en ambas; v2 usa `aria-live="assertive"` para errores. |
| Identificación del error | 3.3.1 (A) | ✗ | ✓ | v1: «Cantidad inválida» genérico, lejos del campo. v2: texto junto al campo, `aria-invalid="true"` y `aria-describedby`. |
| Sugerencia ante errores | 3.3.3 (AA) | ✗ | ✓ | v2 indica el rango («máximo 10») y sugiere búsquedas cuando no hay resultados. |
| Tiempo suficiente | 2.2.1 (A) | ✗ | ✓ | v1: «Deshacer» desaparece a los 2,5 s. v2: sin límite de tiempo. |
| Prevención de errores en acciones definitivas | 3.3.4 (AA) | ◐ | ✓ | Cancelar pedido en dos pasos («¿Cancelar el pedido CU-101?»). |

## 5. Tamaño de objetivos y responsive

| Criterio | WCAG | v1 | v2 | Evidencia |
|---|---|---|---|---|
| Objetivos táctiles ≥ 44 px | 2.5.5 (AAA, recomendado) | ✗ | ✓ | v1: − / + / ✕ de 28 px. v2: 44 px (`--toque`). |
| Reflujo sin desplazamiento horizontal a 320 px | 1.4.10 (AA) | ✓ | ✓ | Diseño Mobile First; probado a 390 px y 1280 px. |

**Resumen:** la v1 incumplía 1.4.3, 2.2.1, 3.3.1 y 3.3.3; la v2 los cumple.
