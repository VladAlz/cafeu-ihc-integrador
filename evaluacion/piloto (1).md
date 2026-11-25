# Piloto P00 · revisión del protocolo

> **Nota metodológica.** Las sesiones P00, P01 y P02 (v1) y la reevaluación de la v2 corresponden a un ejercicio académico con participantes simulados, construidos a partir de la persona y el contexto de docs/analisis-ux.md.

**Fecha:** 24/11/2026 · **Versión:** v1 · **Participante:** P00 — Estudiante de otra carrera de la FISEI, 21 años (piloto) · **Duración:** 17 min

El piloto sirve para comprobar consignas, estado inicial, tiempos y la hoja de observación. **Sus datos no se incluyen en las métricas.**

| Tarea | Éxito | Tiempo (s) | Pista | SEQ | Observación |
|---|---|---|---|---|---|
| T1 | Sí | 35 | No | 5 | Buscó «sanduche»; preguntó si debía pulsar algo más tras agregar. |
| T2 | Sí | 72 | No | 4 | Pulsó dos veces + y luego − para dejar 3. |
| T3 | Con ayuda | 118 | Sí | 3 | Pidió repetir la consigna; tras la pista recuperó volviendo al catálogo. El pedido de la prueba anterior seguía en la app tras F5. |

## Ajustes al protocolo derivados de P00

| N.º | Problema en el piloto | Ajuste antes de P01 |
|---|---|---|
| 1 | Al recargar con F5 la app conservaba el pedido de la tarea anterior (persistencia local). | Se agregó el parámetro `?reiniciar=1` en `src/main.js` para empezar cada sesión con el pedido vacío y la numeración en CU-101. |
| 2 | P00 pidió repetir la consigna de T3 (tres acciones en una). | La consigna se entrega también en tarjeta impresa; la redacción se mantiene. |
| 3 | La sesión duró 17 min por explicar el SUS. | Instrucción breve antes del SUS; objetivo de 15 min. |
| 4 | La hoja no tenía campo para la respuesta dicha en T2. | Se añadió la columna «Respuesta / estado final». |

**Resultado:** el protocolo queda listo; las consignas no nombran controles y los tiempos máximos (60/90/120 s) son alcanzables.
