# User Story: Añadir Enlace de Videollamada a una Reserva

## Descripción
Como profesional, quiero añadir un enlace de videollamada a una reserva confirmada para que el cliente pueda acceder fácilmente a nuestra sesión online en el momento de la cita.

## Contexto de la Página
Panel del Profesional

## Archivos Afectados
- @src/features/panel-del-profesional/components/ReservationsTable.jsx
- @src/features/panel-del-profesional/components/AddVideoLinkModal.jsx
- @src/features/panel-del-profesional/hooks/usePaneldelProfesional.ts
- @src/features/panel-del-profesional/api.ts

## Componentes a Crear
- AddVideoLinkModal (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-profesional/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
Desde la `ReservationsTable`, un botón abrirá el `AddVideoLinkModal`, pasándole el ID de la reserva. El modal contendrá un campo de texto para el enlace. Al guardar, se enviará una petición a la API (PATCH /api/reservations/{id}) con el enlace. El hook `usePaneldelProfesional` gestionará la visibilidad del modal y la lógica de la petición.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. En la lista de reservas próximas, cada una tiene un botón o icono para 'Añadir Enlace'.
2. Al hacer clic, se abre un modal con un campo para pegar la URL.
3. El campo de texto debe validar que lo introducido es una URL válida.
4. Al guardar, el modal se cierra y el enlace se asocia a la reserva.
5. Una vez añadido, el enlace es visible en los detalles de la reserva y el botón cambia a 'Editar Enlace'.
6. El cliente debe recibir una notificación (email o en la app) con el enlace de la sesión.

## Sugerencias Adicionales
- Integrar con servicios como Google Meet o Zoom para generar el enlace automáticamente.
- Añadir un botón para copiar el enlace al portapapeles.

## Tarea para Editor IA
Crea el componente `AddVideoLinkModal.jsx`. Conéctalo para que se abra desde el componente `ReservationsTable.jsx`. Implementa la lógica en `usePaneldelProfesional` para gestionar el estado del modal y la llamada a la API para actualizar la reserva con el nuevo enlace.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-profesional/components
 Cuando termines, escribe: TAREA COMPLETADA.
