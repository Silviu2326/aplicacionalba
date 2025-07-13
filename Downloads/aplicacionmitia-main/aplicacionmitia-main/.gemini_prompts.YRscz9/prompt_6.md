# User Story: Enviar y Recibir Mensajes Seguros del Profesional

## Descripción
Como cliente, quiero un sistema de mensajería seguro dentro de mi panel para comunicarme con mi terapeuta sobre asuntos logísticos o seguimientos, manteniendo la confidencialidad.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts
- @src/components/Sidebar.jsx

## Componentes a Crear
- SecureChatInterface (component)
- MessageBubble (component)
- MessageInput (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Lógica y Datos
El hook 'usePaneldelUsuario(Cliente)' deberá incluir lógica para 'fetchMessages', 'sendMessage' y posiblemente 'subscribeToNewMessages' (vía WebSocket). La API necesitará endpoints como GET /api/messages/:professionalId y POST /api/messages. Los mensajes deben estar encriptados en tránsito y en reposo.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Al entrar a la sección de mensajes, veo una lista de mis conversaciones con terapeutas.
2. Puedo seleccionar una conversación para ver el historial de mensajes.
3. Los mensajes enviados por mí aparecen alineados a la derecha y los del terapeuta a la izquierda.
4. Puedo escribir en un campo de texto y enviar un nuevo mensaje pulsando un botón o la tecla Enter.
5. Se muestra un indicador de 'enviando' y luego 'entregado' o 'leído'.
6. Recibo una notificación visual (ej. un punto rojo) en el panel cuando llega un nuevo mensaje.

## Sugerencias Adicionales
- Implementar notificaciones push si la app es una PWA.
- Permitir el envío de archivos adjuntos de forma segura.

## Tarea para Editor IA
Genera los componentes 'SecureChatInterface.tsx', 'MessageBubble.tsx' y 'MessageInput.tsx' en la carpeta 'src/features/panel-del-usuario-cliente/components/'. Implementa la lógica de obtención y envío de mensajes en el hook 'usePaneldelUsuario(Cliente).ts' y define los endpoints correspondientes en 'api.ts'.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
