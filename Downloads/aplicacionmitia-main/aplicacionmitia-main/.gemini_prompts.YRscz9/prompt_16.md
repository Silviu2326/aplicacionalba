# User Story: Edición del Perfil Profesional

## Descripción
Como profesional, quiero editar la información de mi perfil público para mantener mis datos actualizados y atraer a más clientes mostrando mi especialidad, experiencia y tarifas correctas.

## Contexto de la Página
Panel del Profesional

## Archivos Afectados
- @src/features/panel-del-profesional/PaneldelProfesionalPage.tsx
- @src/features/panel-del-profesional/hooks/usePaneldelProfesional.ts
- @src/features/panel-del-profesional/api.ts
- @src/features/panel-del-profesional/components/ProfileForm.jsx

## Componentes a Crear
- ProfileForm (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-profesional/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
El hook `usePaneldelProfesional` debe incluir un estado para manejar los datos del formulario del perfil. Al cargar la página, se debe realizar una llamada a la API (GET /api/professionals/me) para obtener los datos actuales del profesional y rellenar el formulario. Al enviar el formulario, se debe realizar una llamada a la API (PUT /api/professionals/me) con los datos actualizados. Se necesita manejar el estado de carga y los mensajes de éxito/error.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Al entrar en la sección de 'Mi Perfil', veo un formulario con mis datos actuales (nombre, foto de perfil, biografía, especialidades, tarifas, etc.).
2. Puedo modificar cualquiera de los campos editables del formulario.
3. Puedo subir una nueva foto de perfil.
4. Al hacer clic en 'Guardar Cambios', los nuevos datos se persisten en el sistema.
5. Recibo una notificación visual (toast/snackbar) de que los cambios se han guardado correctamente.
6. Si hay un error al guardar, se muestra un mensaje de error claro.

## Sugerencias Adicionales
- Añadir validación en tiempo real para campos como el correo electrónico o el número de teléfono.
- Implementar un sistema de 'previsualización' para ver cómo quedaría el perfil público antes de guardar los cambios.

## Tarea para Editor IA
Crea el componente `ProfileForm.jsx` dentro de `src/features/panel-del-profesional/components/`. Debe contener campos para biografía (textarea), especialidades (input con tags), y tarifas (input numérico). Integra la lógica para obtener y enviar datos desde el hook `usePaneldelProfesional`.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-profesional
 Cuando termines, escribe: TAREA COMPLETADA.
