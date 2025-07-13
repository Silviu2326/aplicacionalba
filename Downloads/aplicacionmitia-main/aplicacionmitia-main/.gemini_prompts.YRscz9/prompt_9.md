# User Story: Visualizar el Estado de mis Paquetes de Sesiones o Suscripción

## Descripción
Como cliente que ha comprado un paquete o tiene una suscripción, quiero ver un resumen claro de mi estado actual (sesiones restantes, fecha de renovación) para poder planificar mis próximas reservas y pagos.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- SubscriptionStatusWidget (component)
- UsageProgressBar (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
La API debe proveer un endpoint (ej. GET /api/subscription/status) que devuelva el plan actual del usuario, incluyendo tipo (paquete/suscripción), sesiones totales, sesiones usadas, y fecha de la próxima renovación/expiración. El hook se encargará de obtener y exponer estos datos.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. En una parte visible del panel, veo un resumen de mi plan.
2. Si tengo un paquete, veo claramente 'X de Y sesiones restantes'.
3. Si tengo una suscripción mensual, veo la fecha del próximo cobro.
4. Se muestra el nombre de mi plan actual (ej. 'Paquete de 5 Sesiones', 'Plan Mensual').
5. Hay un botón o enlace directo para 'Comprar más sesiones' o 'Gestionar suscripción', que lleva a la página de planes.
6. Si no tengo ningún plan activo, el widget me invita a explorar los planes.

## Sugerencias Adicionales
- Enviar una notificación por email cuando al usuario le quede solo una sesión en su paquete.
- Mostrar un historial de paquetes comprados.

## Tarea para Editor IA
Genera los componentes 'SubscriptionStatusWidget.tsx' y 'UsageProgressBar.tsx'. Integra la llamada a la API en el hook 'usePaneldelUsuario(Cliente).ts' para mostrar el estado del plan del usuario en el panel.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
