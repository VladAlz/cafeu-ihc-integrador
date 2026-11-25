# Hallazgos consolidados y triangulación · CaféU 2.0 (v1)

**Insumos:** [`heuristicas.md`](heuristicas.md) (HE-01 a HE-06), [`recorrido-cognitivo.md`](recorrido-cognitivo.md), [`accesibilidad.md`](accesibilidad.md) y las sesiones P01–P02 ([`resultados.csv`](resultados.csv)). **Severidad 0–4** consensuada; **impacto** = tareas y participantes afectados (1 bajo, 2 medio, 3 alto).

## 1. Matriz de hallazgos

| ID | Hallazgo | Heurística · WCAG | Evidencia heurística | Evidencia con usuarios | Severidad | Impacto | Triangulación |
|---|---|---|---|---|---|---|---|
| **H-01** | «Deshacer» desaparece a los 2,5 s; lo quitado se pierde. | H3, H9 · WCAG 2.2.1 | HE-02; recorrido T3 paso 2 (Q2, Q4 = No) | T3: P01 no lo vio y volvió al catálogo; **P02 confirmó sin el sánduche (error crítico)** | **4** | 3 | Confirmado por ambos métodos |
| **H-02** | ✕ (eliminar) junto a + con la misma forma y 28 px. | H5, H4 · WCAG 2.5.5 | HE-01; recorrido T2 paso 3 | T2: **P02 pulsó ✕ en vez de +** y necesitó la pista | **3** | 3 | Confirmado por ambos métodos |
| **H-03** | Avisos poco visibles: 12 px, 3,14:1, lejos de la acción. | H1 · WCAG 1.4.3 | HE-03; contraste medido | T1: P01 «¿se agregó? no vi nada»; P02 «¿ya está?» | **3** | 2 | Confirmado por ambos métodos |
| **H-04** | Error de cantidad genérico, sin límite ni campo marcado. | H9, H5 · WCAG 3.3.1, 3.3.3 | HE-04 | No observado (nadie escribió fuera de rango) | **2** | 1 | Solo heurística |
| **H-05** | Búsqueda sin resultados sin sugerencias ni salida. | H9, H10 · WCAG 3.3.3 | HE-05 | No observado (las búsquedas tuvieron resultados) | **2** | 1 | Solo heurística |
| **H-06** | «Confirmar pedido» no muestra el total. | H6, H1 | HE-06 | T3: P01 se desplazó para revisar el total antes de confirmar | **1** | 2 | Confirmado por ambos métodos |
| **H-07** | Tras agregar no hay acceso directo a «Mi pedido». | H7 | — | T1: P01 y P02 buscaron dónde ver lo agregado | **1** | 2 | Solo usuarios |

## 2. Resumen de la triangulación

| Clasificación | Hallazgos | Lectura |
|---|---|---|
| Confirmado por ambos métodos | H-01, H-02, H-03, H-06 | Evidencia más fuerte; explican el error crítico de T3 y la ayuda de T2. |
| Solo heurística | H-04, H-05 | Están en estados de error que las tareas no provocaron; se corrigen porque su costo es bajo y son incumplimientos WCAG. |
| Solo usuarios | H-07 | El equipo, que conoce la navegación, no lo detectó en la inspección. |

## 3. Relación con los datos

- Los dos fracasos sin ayuda de la v1 (T2 de P02 con ayuda y T3 de P02 «No») se explican por **H-02** y **H-01**.
- Los tiempos más altos (T2 = 79,5 s y T3 = 104 s de mediana, frente a objetivos de 45 y 60 s) coinciden con las rutas de recuperación largas que provocan H-01 y H-02.
- El SUS medio de 61,25 (bajo 68) y el SEQ de T3 (2,5) reflejan la frustración en TP5 de la [curva emocional](../docs/img/curva-emocional.png).

La priorización está en [`backlog.md`](backlog.md).
