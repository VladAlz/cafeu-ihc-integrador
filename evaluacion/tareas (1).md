# Tareas de la prueba con usuarios · CaféU 2.0

Las consignas se leen y se entregan en una tarjeta. No nombran botones ni pantallas.

| ID | Escenario (consigna) | Estado inicial | Criterio de éxito | Respuesta correcta | Objetivo / máximo |
|---|---|---|---|---|---|
| **T1** · Buscar y agregar | «Tienes hambre entre clases y te provoca un sánduche de queso. Encuéntralo escribiendo su nombre como lo harías rápido en el celular y déjalo en tu pedido.» | App en el catálogo, pedido vacío (`?reiniciar=1`). | El pedido contiene 1 Sánduche de queso. | Pedido: 1 × Sánduche de queso ($2,75). | 30 s / 60 s |
| **T2** · Modificar cantidad y verificar total | «Tus amigos también quieren café: deja tres cafés americanos en tu pedido y dinos cuánto pagarás en total.» | Pedido con 1 sánduche (resultado de T1). | Pedido con 1 sánduche y 3 cafés americanos; dice el total correcto. | **$7,25** (2,75 + 3 × 1,50). | 45 s / 90 s |
| **T3** · Eliminar, recuperar y confirmar | «Decides no llevar el sánduche y lo quitas; enseguida cambias de opinión y lo quieres de nuevo. Deja el pedido completo, envíalo y dinos tu número de pedido.» | Pedido de T2 ($7,25). | Pedido confirmado con 1 sánduche y 3 cafés; dice el número correcto. | **CU-101**, $7,25. | 60 s / 120 s |

**Si una tarea termina en «No»,** el soporte técnico deja el estado de partida de la siguiente antes de leerla.
**Reinicio entre participantes:** abrir `http://localhost:5173/src/?reiniciar=1` (o `…/prototipos/version-v1/src/?reiniciar=1` para la v1).
**Pista única:** «Vuelve a leer la tarea y revisa lo que tienes en pantalla», solo tras 30 s sin avanzar o si la pide.
**Clasificación:** *Sí* (sin ayuda, dentro del máximo) · *Con ayuda* (tras la pista) · *No* (no la completa, resultado incorrecto o excede el máximo).
**Error crítico:** deja un resultado incorrecto no detectado o impide terminar. **Error no crítico:** el participante se equivoca y se recupera solo.
