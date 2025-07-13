# User Story: Visualizar Historial de Reservas Anteriores y Próximas

## Descripción
Como cliente registrado, quiero ver una lista de todas mis reservas de sesiones (pasadas y futuras) para poder llevar un control de mis citas y consultar detalles de sesiones anteriores.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts
- @src/features/panel-del-usuario-cliente/components/BookingHistory.tsx

## Componentes a Crear
- BookingHistory (component)
- BookingRow (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Table from src/components/Table.jsx
- Button from src/components/Button.jsx

## Lógica y Datos
El hook `usePaneldelUsuario(Cliente).ts` debe incluir una función para hacer una llamada a `api.ts` que obtenga el historial de reservas del usuario (endpoint sugerido: `GET /api/v1/user/bookings`). La respuesta debe contener un array de objetos, cada uno con: id_reserva, nombre_profesional, especialidad, fecha, hora, estado ('Próxima', 'Completada', 'Cancelada'), y un enlace a la página de valoración si está completada y sin valorar.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Al entrar al panel, se debe mostrar una tabla o lista con las reservas del usuario.
2. La lista debe estar dividida en 'Próximas Sesiones' y 'Sesiones Anteriores'.
3. Cada fila debe mostrar el nombre del profesional, la fecha y hora de la sesión, y el estado.
4. Las sesiones pasadas deben tener un botón 'Dejar Valoración' si aún no se ha valorado, que redirija a `/pagina-de-valoracion/{id_reserva}`.
5. Las sesiones futuras deben tener un botón 'Cancelar Cita' (sujeto a políticas de cancelación).
6. Debe haber paginación si el historial es muy largo.

## Sugerencias Adicionales
- Añadir un filtro para ver solo un tipo de estado (e.g., 'Completadas').
- Permitir exportar el historial a CSV o PDF.

## Tarea para Editor IA
Crea el componente `BookingHistory.tsx` en `src/features/panel-del-usuario-cliente/components/`. Este componente debe renderizar una tabla con los datos de las reservas. Implementa la lógica de obtención de datos en el hook `usePaneldelUsuario(Cliente).ts` y la llamada a la API en `api.ts`.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
