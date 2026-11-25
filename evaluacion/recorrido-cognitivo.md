# Recorrido cognitivo · T2 y T3

**Usuario objetivo:** Andrea (persona), primera vez con CaféU, celular, con prisa. **Preguntas por paso:** (Q1) ¿Intentará lograr el efecto correcto? (Q2) ¿Notará que la acción correcta está disponible? (Q3) ¿Asociará la acción con el efecto que busca? (Q4) ¿Verá que progresa hacia la meta?

## T2 · Dejar 3 cafés americanos y verificar el total (v1)

| Paso | Acción correcta | Q1 | Q2 | Q3 | Q4 | Problema |
|---|---|---|---|---|---|---|
| 1 | Buscar «cafe» y pulsar «Agregar» en Café americano | Sí | Sí | Sí | ◐ | El aviso «Agregado» casi no se ve (HE-03). |
| 2 | Ir a «Mi pedido» | Sí | Sí | Sí | Sí | — |
| 3 | Pulsar + dos veces en Café americano | Sí | ◐ | Sí | Sí | ✕ está pegado a + con la misma forma: riesgo de pulsar ✕ (HE-01). |
| 4 | Leer el total | Sí | Sí | ◐ | Sí | La línea muestra solo el subtotal, sin «3 × $1,50». |

**Fallo principal:** paso 3, Q2 (acción confundible con una destructiva). **Observado:** P02 pulsó ✕ en lugar de +.

## T3 · Quitar y recuperar el sánduche, confirmar y decir el número (v1)

| Paso | Acción correcta | Q1 | Q2 | Q3 | Q4 | Problema |
|---|---|---|---|---|---|---|
| 1 | Pulsar ✕ en Sánduche de queso | Sí | ◐ | ◐ | ◐ | El ícono ✕ no dice «Eliminar»; el aviso de confirmación es casi invisible. |
| 2 | Pulsar «Deshacer» en el aviso | Sí | **No** | ◐ | No | «Deshacer» aparece 2,5 s, abajo y en gris; la mirada está en la lista (HE-02, HE-03). |
| 3 | (Si se perdió) volver al catálogo y agregar otra vez | ◐ | Sí | Sí | Sí | Ruta larga; algunos usuarios no la consideran y confirman sin el producto. |
| 4 | Pulsar «Confirmar pedido» | Sí | Sí | ◐ | Sí | El botón no muestra el total (HE-06). |
| 5 | Leer el número CU-101 | Sí | Sí | Sí | Sí | — |

**Fallo principal:** paso 2, Q2 y Q4. **Observado:** P01 no vio «Deshacer» y volvió al catálogo; P02 lo vio desaparecer y confirmó sin el sánduche (error crítico).

## Recorrido en la v2

| Tarea · paso | Cambio | Q1–Q4 |
|---|---|---|
| T2 · 3 | − y + de 44 px; «Eliminar» en otra fila, con texto | Sí · Sí · Sí · Sí |
| T2 · 4 | Línea «3 × $1,50 = $4,50» y total con `aria-live` | Sí · Sí · Sí · Sí |
| T3 · 1 | Botón «Eliminar» con texto; mensaje visible bajo la cabecera | Sí · Sí · Sí · Sí |
| T3 · 2 | Marcador «se quitó de tu pedido» + «Deshacer» en la misma posición, sin límite de tiempo y con foco | Sí · Sí · Sí · Sí |
| T3 · 4 | «Confirmar pedido · $7,25» | Sí · Sí · Sí · Sí |
