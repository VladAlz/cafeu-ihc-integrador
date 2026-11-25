# CaféU 2.0 · Prueba práctica integradora de IHC

Aplicación web para consultar productos, hacer pedidos y recibir la confirmación en la cafetería de la FISEI. Integra análisis de experiencia de usuario, arquitectura de información, prototipado, accesibilidad, arquitectura por capas y evaluación de usabilidad con corrección y validación (v1 → v2).

**Universidad Técnica de Ambato · FISEI · Ingeniería de Software · Interacción Humano-Computador · 5.º semestre**

| Integrante | GitHub | Rol en la evaluación | Aporte principal |
|---|---|---|---|
| González Álvarez Vladimir Humberto | @VladAlz | Soporte técnico · QA | Implementación (v1 y v2), pruebas automatizadas, arquitectura |
| Mora Beltrán Santiago Sebastián | @Santio13-code | Moderador | Análisis UX, requisitos, sitemap, user flows, trazabilidad, wireframes |
| Vinces Cueva Boris Yussef | @Yussef2403 | Cronometrista | Plan, tareas, instrumentos, piloto, resultados y métricas |
| Acaro Ibujés Pedro Sebastián | @Sebastianyiyi | Observador | Heurística, recorrido cognitivo, accesibilidad, hallazgos, backlog, validación v2, evidencias |

## Instalación y ejecución

Requisitos: **Node.js 18 o superior** (solo para el servidor local y las pruebas; la app no tiene dependencias).

```bash
git clone https://github.com/VladAlz/cafeu-ihc-integrador.git
cd cafeu-ihc-integrador
npm start            # sirve el proyecto en http://localhost:5173
```

- **v2 (actual):** http://localhost:5173/src/
- **v1 (evaluada):** http://localhost:5173/prototipos/version-v1/src/
- **Estado inicial para las pruebas:** añadir `?reiniciar=1` (vacía el pedido y reinicia la numeración en CU-101).

Alternativa sin Node: `python -m http.server 5173` en la carpeta del proyecto. Los módulos ES requieren servirse por HTTP; abrir el archivo con doble clic no funciona.

## Pruebas

```bash
npm test
```

12 pruebas con `node:test` sobre dominio, aplicación e infraestructura en memoria. Cubren las tres funciones críticas: búsqueda tolerante a tildes y mayúsculas (T1), cantidades y total (T2), y eliminar, recuperar, confirmar y cancelar (T3), además de la persistencia. Código en [`tests/pruebas-automatizadas/`](tests/pruebas-automatizadas/).

## Arquitectura

Presentación → Aplicación → Dominio ← Infraestructura, con `src/main.js` como raíz de composición. El dominio (`Producto`, `Pedido`, `DetallePedido` y reglas) no depende del navegador; la persistencia en LocalStorage está detrás de repositorios. Detalle y regla de dependencias en [`docs/arquitectura.md`](docs/arquitectura.md).

```
src/
├── presentation/   app.js, views/ (Catálogo, Mi pedido, Confirmación), components/ (TarjetaProducto, SelectorCantidad, LineaPedido, Mensajes)
├── application/    casosDeUso.js
├── domain/         Producto.js, Pedido.js, DetallePedido.js, reglas.js
├── infrastructure/ repositorios.js, almacenamiento.js, catalogoDatos.js
├── styles/         main.css (Mobile First)
└── main.js
```

## Funcionalidades

- Catálogo de 10 productos con categorías y productos agotados.
- Búsqueda tolerante a tildes y mayúsculas («SANDUCHE» encuentra «Sánduche de queso»; «pan» no encuentra «empanada») y filtros.
- Pedido con cantidades de 1 a 10, subtotal «3 × $1,50 = $4,50» y total.
- Eliminación con «Deshacer» persistente en la misma posición.
- Confirmación con número correlativo (CU-101…), total y cancelación en dos pasos durante 5 minutos.
- Persistencia local del pedido; Mobile First; HTML semántico, navegación por teclado, foco visible, mensajes con `aria-live` y errores con `aria-invalid`.

## Evaluación y resultados

| Indicador | v1 | v2 |
|---|---|---|
| Éxito sin ayuda (T1–T3, P01–P02) | 4/6 (66,7 %) | 6/6 (100 %) |
| Errores críticos / no críticos | 1 / 3 | 0 / 0 |
| Mediana T2 · T3 | 79,5 s · 104 s | 44 s · 45 s |
| SUS medio (referencia 68) | 61,25 | 81,25 |
| Hallazgos heurísticos abiertos | 6 (severidad 1–4) | 0 |

Se corrigieron 7 problemas del backlog, empezando por los dos P1: «Deshacer» efímero (H-01) y «Eliminar» pegado a + (H-02).

## Evidencias

| Etapa | Documentos |
|---|---|
| Análisis UX | [`docs/analisis-ux.md`](docs/analisis-ux.md) · [curva emocional](docs/img/curva-emocional.png) |
| Requisitos e IA | [`docs/requisitos.md`](docs/requisitos.md) · [`docs/sitemap.md`](docs/sitemap.md) · [`docs/user-flow.md`](docs/user-flow.md) · [`docs/trazabilidad.md`](docs/trazabilidad.md) |
| Prototipos | [`prototipos/wireframes/`](prototipos/wireframes/) · [`prototipos/version-v1/`](prototipos/version-v1/) |
| Planificación | [`evaluacion/plan.md`](evaluacion/plan.md) · [`tareas.md`](evaluacion/tareas.md) · [`consentimiento.md`](evaluacion/consentimiento.md) · [`hoja-observacion.md`](evaluacion/hoja-observacion.md) · [`cuestionario.md`](evaluacion/cuestionario.md) · [`piloto.md`](evaluacion/piloto.md) |
| Inspección | [`heuristicas.md`](evaluacion/heuristicas.md) · [`recorrido-cognitivo.md`](evaluacion/recorrido-cognitivo.md) · [`accesibilidad.md`](evaluacion/accesibilidad.md) |
| Usuarios y métricas | [`resultados.csv`](evaluacion/resultados.csv) · [`metricas.md`](evaluacion/metricas.md) |
| Hallazgos y validación | [`hallazgos.md`](evaluacion/hallazgos.md) · [`backlog.md`](evaluacion/backlog.md) · [`validacion-v2.md`](evaluacion/validacion-v2.md) |
| Capturas | [`evidencias/antes/`](evidencias/antes/) · [`evidencias/despues/`](evidencias/despues/) · [`evidencias/comparativas/`](evidencias/comparativas/) |

## Limitaciones

- Las sesiones P00, P01 y P02 y la reevaluación de la v2 corresponden a un ejercicio académico con participantes simulados, construidos a partir de la persona y el contexto definidos en el análisis UX.
- Muestra de dos participantes: las métricas son descriptivas y no se generalizan estadísticamente; en la v2 repitieron las mismas personas (efecto de aprendizaje).
- Persistencia solo local (LocalStorage): el pedido no se comparte entre dispositivos ni llega a un servidor real.
- No se probó con lectores de pantalla ni en celulares de gama baja.

## Colaboración

Vladimir publicó la base del proyecto (v1 y la corrección v2 en commits separados). Los demás integrantes trabajaron en ramas propias y las integraron mediante Pull Requests con revisión de otro integrante; ver la pestaña **Pull requests** y el historial de commits.
