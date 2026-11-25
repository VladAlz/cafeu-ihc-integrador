# Plan de evaluación de usabilidad · CaféU 2.0

## 1. Objetivo y pregunta
Comprobar si CaféU 2.0 permite a la comunidad de la FISEI **buscar un producto, ajustar cantidades, corregir errores y confirmar su pedido** con eficacia, eficiencia y satisfacción (ISO 9241-11), y validar que las correcciones de la v2 resuelven los problemas detectados en la v1.

> ¿En qué medida CaféU 2.0 permite a estudiantes y personal de la FISEI completar un pedido (T1–T3) sin errores ni ayuda, en un tiempo razonable y con satisfacción aceptable?

## 2. Métodos
| Método | Tipo | Versión | Instrumento |
|---|---|---|---|
| Evaluación heurística (10 heurísticas de Nielsen, severidad 0–4) | Inspección | v1 y reverificación en v2 | [`heuristicas.md`](heuristicas.md) |
| Recorrido cognitivo de T2 y T3 | Inspección | v1 y v2 | [`recorrido-cognitivo.md`](recorrido-cognitivo.md) |
| Revisión de accesibilidad (teclado, contraste, etiquetas, errores) | Inspección | v1 y v2 | [`accesibilidad.md`](accesibilidad.md) |
| Piloto P00 (revisión del protocolo) | Empírico | v1 | [`piloto.md`](piloto.md) |
| Prueba con usuarios P01 y P02 (pensamiento en voz alta) | Empírico | v1 y repetición en v2 | [`tareas.md`](tareas.md), [`hoja-observacion.md`](hoja-observacion.md), [`cuestionario.md`](cuestionario.md) |

## 3. Participantes
Personas de 18 años o más que compran en la cafetería y **no participaron en el desarrollo**. Códigos P00 (piloto), P01 y P02; no se registran nombres. Consentimiento informado: [`consentimiento.md`](consentimiento.md).

## 4. Tareas, estado inicial y criterios
Tres tareas encadenadas (detalle en [`tareas.md`](tareas.md)): **T1** buscar y agregar, **T2** modificar cantidad y verificar total, **T3** eliminar/recuperar y confirmar. Estado inicial: app abierta con `?reiniciar=1` (pedido vacío, numeración desde CU-101).

## 5. Métricas
| Dimensión | Métrica | Cálculo | Umbral |
|---|---|---|---|
| Eficacia | Tasa de éxito sin ayuda | «Sí» / participantes × 100 | ≥ 80 % por tarea |
| Eficacia | Errores críticos / no críticos | Conteo por tarea | 0 críticos |
| Eficiencia | Tiempo por tarea | Mediana (n = 2: promedio de los dos valores) | ≤ tiempo objetivo; nunca > máximo |
| Satisfacción | SEQ por tarea (1–7) | Media | ≥ 5,5 |
| Satisfacción | SUS (0–100) | Impares − 1, 5 − pares, × 2,5 | ≥ 68 |

Con dos participantes las métricas son **descriptivas** y no se generalizan estadísticamente.

## 6. Roles
| Rol | Responsable |
|---|---|
| Moderador (lee consignas sin guiar) | Mora Beltrán Santiago Sebastián |
| Cronometrista y métricas | Vinces Cueva Boris Yussef |
| Observador (frases, errores, heurística asociada) | Acaro Ibujés Pedro Sebastián |
| Soporte técnico (estado inicial, versión, capturas) | González Álvarez Vladimir Humberto |

## 7. Procedimiento (15 min por sesión)
1. Bienvenida y consentimiento (2 min). 2. Práctica de pensamiento en voz alta (1 min). 3. T1–T3 con tarjeta impresa; SEQ al terminar cada tarea (8 min). 4. SUS (2 min). 5. Cierre: ¿qué fue lo más difícil? ¿qué cambiarías? (2 min). 6. Reinicio con `?reiniciar=1`.

**Reglas del moderador:** lee la consigna tal cual; no indica respuestas ni nombra controles; una sola pista neutral («Vuelve a leer la tarea y revisa lo que tienes en pantalla») tras 30 s sin avanzar; la tarea con pista cuenta como «Con ayuda».

## 8. Criterios de preparación (verificados en P00)
Consignas comprensibles sin repetir; estado inicial reproducible; hoja de observación sin campos ambiguos; sesión ≤ 15 min.
