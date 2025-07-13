# User Story: Gestión de Disponibilidad en el Calendario

## Descripción
Como profesional, quiero configurar mis horarios de disponibilidad en un calendario visual para controlar exactamente cuándo los clientes pueden reservar citas conmigo y así gestionar mi tiempo de forma eficiente.

## Contexto de la Página
Panel del Profesional

## Archivos Afectados
- @src/features/panel-del-profesional/PaneldelProfesionalPage.tsx
- @src/features/panel-del-profesional/hooks/usePaneldelProfesional.ts
- @src/features/panel-del-profesional/api.ts
- @src/features/panel-del-profesional/components/AvailabilityCalendar.jsx

## Componentes a Crear
- AvailabilityCalendar (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-profesional/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
El componente `AvailabilityCalendar` debe interactuar con una librería de calendarios (ej. `react-big-calendar` o `fullcalendar`). El hook `usePaneldelProfesional` debe obtener los huecos de disponibilidad y las citas ya reservadas (GET /api/professionals/me/availability). Al hacer clic en un hueco, se cambia su estado (disponible/no disponible) y se envía la actualización a la API (POST /api/professionals/me/availability).

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Veo un calendario (semanal o mensual) en mi panel.
2. Puedo hacer clic en franjas horarias para marcarlas como 'Disponibles'.
3. Puedo hacer clic en franjas ya marcadas para quitarlas de mi disponibilidad.
4. Las citas ya confirmadas por clientes aparecen en el calendario como bloques no editables.
5. Hay un botón de 'Guardar Disponibilidad' que persiste mi configuración.
6. El sistema debe prevenir marcar como disponibles horarios pasados.

## Sugerencias Adicionales
- Permitir configurar horarios recurrentes (ej. 'todos los lunes de 9 a 12').
- Añadir una opción para definir 'bloqueos' o vacaciones, deshabilitando la disponibilidad para días completos.

## Tarea para Editor IA
Implementa el componente `AvailabilityCalendar.jsx`. Usa una librería de calendario e integra la lógica del hook `usePaneldelProfesional` para mostrar, añadir y eliminar huecos de disponibilidad. Las interacciones deben llamar a los métodos correspondientes de la API.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-profesional
 Cuando termines, escribe: TAREA COMPLETADA.
