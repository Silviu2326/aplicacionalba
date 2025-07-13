# User Story: Visualizar Notificaciones de la Plataforma en un Centro Unificado

## Descripción
Como cliente, quiero un centro de notificaciones que agrupe todos los avisos importantes (próximas citas, mensajes nuevos, facturas) para no perderme ninguna actualización relevante de la plataforma.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts
- @src/components/Sidebar.jsx

## Componentes a Crear
- NotificationCenterPanel (component)
- NotificationItem (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Lógica y Datos
La API necesita un endpoint GET /api/notifications para traer las últimas N notificaciones del usuario. También un endpoint POST /api/notifications/mark-as-read para actualizar su estado. Las notificaciones deben generarse en el backend a partir de eventos (nueva reserva, nuevo mensaje, etc.).

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Veo un icono de campana en la cabecera del panel.
2. El icono muestra un contador o un punto si tengo notificaciones sin leer.
3. Al hacer clic en la campana, se despliega una lista de mis notificaciones.
4. Cada notificación tiene un texto claro (ej. 'Tu sesión con Dr. Smith es en 24 horas').
5. Hacer clic en una notificación me lleva a la página relevante (ej. a la reserva, al chat).
6. Hay una opción para 'Marcar todas como leídas'.

## Sugerencias Adicionales
- Implementar un sistema de preferencias de notificación para que el usuario elija qué avisos recibir por email.
- Las notificaciones deberían desaparecer del panel después de un tiempo (ej. 30 días).

## Tarea para Editor IA
Crea los componentes 'NotificationCenterPanel.tsx' y 'NotificationItem.tsx'. Añade el icono de la campana a la disposición principal del panel de usuario. Implementa la lógica de obtención y marcado como leído en el hook y la API.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
