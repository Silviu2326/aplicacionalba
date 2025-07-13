# User Story: Visualización y Gestión de Reservas

## Descripción
Como profesional, quiero ver una lista de mis reservas próximas y pasadas para tener un control claro de mi agenda, prepararme para las sesiones y llevar un registro de mi historial de citas.

## Contexto de la Página
Panel del Profesional

## Archivos Afectados
- @src/features/panel-del-profesional/PaneldelProfesionalPage.tsx
- @src/features/panel-del-profesional/hooks/usePaneldelProfesional.ts
- @src/features/panel-del-profesional/api.ts
- @src/features/panel-del-profesional/components/ReservationsTable.jsx

## Componentes a Crear
- ReservationsTable (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-profesional/components

## Módulos a Importar
- Table from src/components/Table.jsx

## Lógica y Datos
El hook `usePaneldelProfesional` obtendrá la lista de reservas (GET /api/professionals/me/reservations?filter=upcoming). Se necesitan filtros para cambiar entre 'Próximas', 'Pasadas' y 'Canceladas'. La tabla mostrará datos clave: nombre del cliente, fecha, hora, estado y un menú de acciones.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Veo una tabla con mis próximas reservas por defecto.
2. La tabla muestra el nombre del cliente, fecha/hora y el estado de la reserva.
3. Puedo usar pestañas o un selector para filtrar las reservas por 'Próximas', 'Pasadas' y 'Canceladas'.
4. Cada fila de una reserva próxima tiene una acción para 'Añadir enlace de videollamada'.
5. Las reservas pasadas muestran si el cliente ha dejado una valoración.

## Sugerencias Adicionales
- Implementar paginación para la lista de reservas pasadas.
- Añadir una función de búsqueda para encontrar una reserva por nombre de cliente.

## Tarea para Editor IA
Crea el componente `ReservationsTable.jsx` que utilice el componente genérico `Table.jsx`. Implementa la lógica de fetching y filtrado en `usePaneldelProfesional` y pásala como props. Añade botones de acción en la última columna de la tabla.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-profesional
 Cuando termines, escribe: TAREA COMPLETADA.
