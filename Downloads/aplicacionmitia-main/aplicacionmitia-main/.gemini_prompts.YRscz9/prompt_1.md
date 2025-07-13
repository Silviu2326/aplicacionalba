# User Story: Acceder a Sesión Online Activa o Inminente

## Descripción
Como cliente con una sesión a punto de comenzar, quiero ver un aviso destacado en mi panel para unirme a la videollamada de forma rápida y sin confusiones.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts
- @src/features/panel-del-usuario-cliente/components/ActiveSessionCard.tsx

## Componentes a Crear
- ActiveSessionCard (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
El componente principal `PaneldelUsuario(Cliente)Page.tsx` debe comprobar si existe una sesión activa o que comience en los próximos 15 minutos. Esta lógica se puede encapsular en el hook `usePaneldelUsuario(Cliente).ts`. Si se cumple la condición, se renderiza el componente `ActiveSessionCard` con un botón que contiene el enlace a la sala de videoconferencia.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Un card/banner debe aparecer en la parte superior del panel 15 minutos antes de la hora de inicio de una sesión.
2. El card debe mostrar el nombre del profesional y una cuenta atrás hasta el inicio de la sesión.
3. El card debe contener un botón principal con el texto 'Unirse a la Sesión'.
4. Al hacer clic en el botón, se debe abrir el enlace de la videollamada en una nueva pestaña.
5. El card debe desaparecer automáticamente una vez finalizada la hora de la sesión.

## Sugerencias Adicionales
- Emitir una notificación sonora sutil cuando el card aparezca.
- El botón puede estar deshabilitado hasta 5 minutos antes de la sesión para evitar entradas prematuras.

## Tarea para Editor IA
Crea el componente `ActiveSessionCard.tsx`. En `PaneldelUsuario(Cliente)Page.tsx`, añade la lógica condicional para mostrar este componente basándote en la fecha y hora de la próxima reserva del usuario.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
