# User Story: Configurar y Visualizar Contactos de Emergencia

## Descripción
Como cliente, quiero un apartado visible en mi panel para añadir y consultar información de contacto de emergencia, para tener acceso rápido en caso de una crisis.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- EmergencyResourcesWidget (component)
- EmergencyContactForm (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Lógica y Datos
La parte de líneas de ayuda puede ser una lista estática. La parte del contacto personal necesita endpoints (POST/PUT /api/user/emergency-contact) para guardar de forma segura esa información. El hook 'usePaneldelUsuario(Cliente)' debe obtener estos datos al cargar el panel.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Hay un widget o sección claramente etiquetada como 'Ayuda Urgente' o 'Contactos de Emergencia'.
2. El widget muestra al menos un número de una línea de prevención de crisis nacional.
3. Tengo la opción de añadir un contacto personal de emergencia (nombre y número de teléfono).
4. Una vez añadido, mi contacto personal se muestra en el widget.
5. Puedo editar o eliminar mi contacto personal en cualquier momento.
6. Se muestra un descargo de responsabilidad indicando que esto es una herramienta de acceso rápido y que en una emergencia real se debe llamar a los servicios locales (ej. 911).

## Sugerencias Adicionales
- Permitir añadir más de un contacto personal.
- Geolocalizar al usuario para ofrecer líneas de ayuda locales.

## Tarea para Editor IA
Crea 'EmergencyResourcesWidget.tsx' y 'EmergencyContactForm.tsx'. El widget debe ser visualmente distintivo. Implementa la lógica en el hook y la API para guardar y recuperar el contacto personal del usuario.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
