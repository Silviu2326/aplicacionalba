# User Story: Visualizar Resúmenes de Sesión del Terapeuta

## Descripción
Como cliente, quiero poder consultar los resúmenes o notas post-sesión que mi terapeuta comparte conmigo para poder revisar los puntos clave y recomendaciones tratadas.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts
- @src/components/Table.jsx

## Componentes a Crear
- SessionSummaryModal (component)
- ViewSummaryButton (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Table from src/components/Table.jsx

## Lógica y Datos
El objeto de la reserva devuelto por la API en el historial debe incluir un flag 'hasSummary' y un 'summaryId'. Se necesita un nuevo endpoint GET /api/summaries/:summaryId para obtener el contenido del resumen. Este contenido debe ser manejado de forma segura.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. En mi historial de reservas pasadas, las sesiones con resumen disponible tienen un botón o icono de 'Ver Resumen'.
2. Las sesiones sin resumen no muestran este botón.
3. Al hacer clic en el botón, se abre un modal.
4. El modal muestra claramente la fecha de la sesión y el nombre del terapeuta.
5. El contenido del resumen compartido por el terapeuta se muestra en el cuerpo del modal.
6. Puedo cerrar el modal fácilmente.

## Sugerencias Adicionales
- Permitir al usuario imprimir el resumen o guardarlo como PDF desde el modal.
- Notificar al usuario cuando un nuevo resumen de sesión esté disponible.

## Tarea para Editor IA
Crea 'SessionSummaryModal.tsx' y 'ViewSummaryButton.tsx'. Modifica la implementación del historial de reservas para incluir el botón condicionalmente. Implementa la llamada a la API en el hook para obtener el contenido del resumen bajo demanda.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
