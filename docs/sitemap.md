# Sitemap · CaféU 2.0

Aplicación de una sola página con tres pantallas (rutas por hash) y sus estados.

```mermaid
flowchart TD
  A["CaféU 2.0"] --> B["Catálogo · #/catalogo"]
  A --> C["Mi pedido · #/pedido"]
  B --> B1["Búsqueda sin tildes"]
  B --> B2["Filtros: Todo / Bebidas / Comida"]
  B --> B3["Tarjeta de producto · Agregar / Agotado"]
  B1 --> B4["Sin resultados · sugerencias · Ver todo"]
  C --> C1["Línea: cantidad 1–10 · Eliminar"]
  C1 --> C2["Línea eliminada · Deshacer"]
  C --> C3["Pedido vacío · Ver el menú"]
  C --> D["Confirmación · #/confirmacion"]
  D --> D1["Número CU-### y total"]
  D --> D2["Cancelar pedido (≤ 5 min, dos pasos)"]
  D --> B
```

![Sitemap](img/sitemap.png)

| Pantalla | Ruta | Estados | Wireframe |
|---|---|---|---|
| Catálogo | `#/catalogo` | Con resultados · sin resultados · producto agotado | [WF-01](../prototipos/wireframes/wf-01-catalogo.png) |
| Mi pedido | `#/pedido` | Con productos · error de cantidad · línea eliminada con «Deshacer» · vacío | [WF-02](../prototipos/wireframes/wf-02-mi-pedido.png) |
| Confirmación | `#/confirmacion` | Confirmado · pregunta de cancelación · cancelado | [WF-03](../prototipos/wireframes/wf-03-confirmacion.png) |

Navegación global: cabecera con «Catálogo» y «Mi pedido (n)», enlace «Saltar al contenido» y región de mensajes `role="status"`.
