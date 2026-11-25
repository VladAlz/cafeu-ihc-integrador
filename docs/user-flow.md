# User flows · compra, modificación y cancelación

## 1. Compra (T1 y T3)
```mermaid
flowchart LR
  S(["Inicio: Catálogo"]) --> Q{"¿Encuentra el producto?"}
  Q -- "Busca o filtra" --> P["Tarjeta del producto"]
  Q -- "Sin resultados" --> SR["Sugerencias · Ver todo el menú"] --> P
  P --> AG{"¿Disponible?"}
  AG -- "No" --> AGO["Agotado · vuelve mañana"] --> Q
  AG -- "Sí" --> AD["Agregar · mensaje ✓ y Ver mi pedido"]
  AD --> MP["Mi pedido · total"]
  MP --> CF["Confirmar pedido · $total"]
  CF --> OK(["Confirmación CU-### · paga al retirar"])
```
![Flujo de compra](img/flujo-compra.png)

## 2. Modificación del pedido (T2 y T3)
```mermaid
flowchart LR
  MP(["Mi pedido"]) --> A{"¿Qué cambia?"}
  A -- "Cantidad" --> C["− / + o escribir 1–10"]
  C --> V{"¿Valor válido?"}
  V -- "Sí" --> T["Subtotal y total se recalculan"]
  V -- "No" --> E["Error junto al campo · valor anterior"] --> C
  A -- "Quitar" --> EL["Eliminar"]
  EL --> M["Marcador: «se quitó» + Deshacer (persistente)"]
  M -- "Deshacer" --> R["Línea restaurada en su posición"] --> T
  M -- "Sigue" --> T
  T --> MP
```
![Flujo de modificación](img/flujo-modificacion.png)

## 3. Cancelación
```mermaid
flowchart LR
  OK(["Confirmación CU-###"]) --> P{"¿≤ 5 min desde confirmar?"}
  P -- "No" --> N["Sin opción de cancelar · acudir a caja"]
  P -- "Sí" --> B["Cancelar pedido"]
  B --> Q["¿Cancelar el pedido CU-###? (paso 2)"]
  Q -- "No, mantenerlo" --> OK
  Q -- "Sí, cancelar" --> C["Pedido cancelado · total anulado"]
  C --> H(["Hacer otro pedido"])
```
![Flujo de cancelación](img/flujo-cancelacion.png)

**Puntos de recuperación de errores:** sugerencias y «Ver todo el menú» cuando no hay resultados; error junto al campo cuando la cantidad no es válida; «Deshacer» persistente al eliminar; confirmación en dos pasos para cancelar.
