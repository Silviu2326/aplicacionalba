# User Story: Cancelar una Reserva Próxima con Notificación de Política

## Descripción
Como cliente, quiero poder cancelar una cita futura directamente desde mi historial de reservas para gestionar mis citas de forma autónoma si me surge un imprevisto.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/components/BookingHistory.tsx
- @src/features/panel-del-usuario-cliente/components/CancellationModal.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- CancellationModal (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- BookingHistory from src/features/panel-del-usuario-cliente/components/BookingHistory.tsx
- Button from src/components/Button.jsx

## Lógica y Datos
En el listado de reservas próximas (Historia de Usuario 1), el botón 'Cancelar Cita' estará activo. Al pulsarlo, se abrirá un modal (`CancellationModal`). Este modal informará sobre la política de cancelación (p. ej. 'Las cancelaciones con menos de 24h de antelación no son reembolsables'). Al confirmar, se llamará al endpoint `POST /api/v1/bookings/{booking_id}/cancel`. La UI se actualizará reflejando el estado 'Cancelada'.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. En la lista de reservas futuras, cada cita tiene un botón 'Cancelar'.
2. El botón está deshabilitado si la cita es en menos de X horas (según la política de negocio, ej. 24h).
3. Al hacer clic en el botón 'Cancelar', aparece un modal de confirmación.
4. El modal muestra claramente la política de cancelación y si aplicará o no un reembolso.
5. El modal tiene los botones 'Confirmar Cancelación' y 'Volver'.
6. Tras confirmar, la cita se marca como 'Cancelada' en la lista y se muestra un mensaje de éxito.

## Sugerencias Adicionales
- Enviar un email de confirmación de la cancelación al usuario y al profesional.
- Si la cancelación implica un reembolso, mostrar el estado del reembolso en el panel de usuario.

## Tarea para Editor IA
Crea el componente `CancellationModal.tsx` que reciba como props la política de cancelación a mostrar. Modifica el componente `BookingHistory.tsx` para que el botón 'Cancelar' lance este modal y, al confirmar, llame a la función de cancelación definida en `api.ts`.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente/components
 Cuando termines, escribe: TAREA COMPLETADA.
