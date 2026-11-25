# Requisitos · CaféU 2.0

## Requisitos funcionales

| ID | Requisito | Criterio de aceptación | Prioridad |
|---|---|---|---|
| **RF-01** | Mostrar el catálogo con nombre, descripción, precio, categoría y disponibilidad. | 10 productos; los agotados muestran «Agotado» y no se pueden agregar. | Alta |
| **RF-02** | Buscar productos tolerando tildes y mayúsculas, y filtrar por categoría. | «SANDUCHE», «sánduche» y «sanduche» devuelven «Sánduche de queso»; «pan» no devuelve «empanada». | Alta |
| **RF-03** | Agregar productos al pedido con retroalimentación visible. | Mensaje junto a la acción, botón «✓ Agregado» y contador del pedido actualizado. | Alta |
| **RF-04** | Modificar la cantidad de cada producto (1–10) y recalcular subtotal y total. | − y + respetan los límites; escribir un valor fuera de rango muestra el error junto al campo y conserva el valor anterior. | Alta |
| **RF-05** | Eliminar un producto y poder recuperarlo. | La línea eliminada muestra «Deshacer», que permanece hasta la siguiente acción y la restaura en su posición. | Alta |
| **RF-06** | Confirmar el pedido con número y total, y cancelarlo dentro de 5 minutos. | Número correlativo «CU-###»; cancelación en dos pasos solo en los primeros 5 min. | Alta |

## Requisitos no funcionales

| ID | Requisito | Métrica / verificación |
|---|---|---|
| **RNF-01 · Usabilidad** | Las tareas T1–T3 se completan sin ayuda y con satisfacción aceptable. | Éxito ≥ 80 % por tarea, mediana ≤ tiempo máximo, SUS ≥ 68 (ISO 9241-11). |
| **RNF-02 · Accesibilidad** | Cumplir WCAG 2.1 nivel AA en lo esencial. | Operable con teclado, foco visible, contraste ≥ 4,5:1 en texto y ≥ 3:1 en componentes, etiquetas en campos, errores anunciados (aria-live, aria-invalid). |
| **RNF-03 · Mobile First y responsive** | Diseño base para 360 px que se adapta a tablet y escritorio. | Sin desplazamiento horizontal de 320 a 1280 px; objetivos táctiles ≥ 44 px. |
| **RNF-04 · Persistencia y mantenibilidad** | El pedido se conserva al recargar y el código está separado por capas con pruebas. | LocalStorage tras repositorios; dominio sin dependencias del navegador; `npm test` en verde. |

La relación entre requisitos, pantallas y pruebas está en [`trazabilidad.md`](trazabilidad.md).
