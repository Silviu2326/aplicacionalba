# User Story: Editar Información Básica del Perfil

## Descripción
Como cliente, quiero una forma sencilla de editar mi información de perfil, como mi nombre, apellidos y foto, para mantener mis datos personales actualizados.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/components/ProfileEditor.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/pgina-de-configuracin-de-cuenta/PáginadeConfiguracióndeCuentaPage.tsx

## Componentes a Crear
- ProfileEditor (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
En una pestaña/sección 'Mi Perfil' dentro del panel, mostrar la información actual del usuario. Al hacer clic en 'Editar', los campos se vuelven editables. La lógica para guardar los cambios (`PUT /api/v1/user/profile`) residirá en el hook `usePaneldelUsuario(Cliente)`. La edición de datos sensibles como email o contraseña debería redirigir a `PáginadeConfiguracióndeCuentaPage.tsx`.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Debe haber una sección 'Mi Perfil' en el panel.
2. Se deben mostrar los campos: nombre, apellidos, foto de perfil y email (no editable).
3. Un botón 'Editar' permite modificar los campos de nombre y apellidos.
4. El usuario puede subir una nueva foto de perfil.
5. Un botón 'Guardar Cambios' envía la información actualizada al servidor.
6. Se muestra una notificación de éxito o error tras el intento de guardado.
7. Debe haber un enlace a 'Configuración de la Cuenta' para cambiar la contraseña.

## Sugerencias Adicionales
- Implementar un recorte de imagen (cropper) para la foto de perfil antes de subirla.
- Mostrar un avatar genérico con las iniciales del usuario si no hay foto de perfil.

## Tarea para Editor IA
Crea el componente `ProfileEditor.tsx` con un formulario para editar los datos del usuario. Intégralo en una nueva pestaña 'Mi Perfil' del `PaneldelUsuario(Cliente)Page.tsx`. La lógica de actualización debe usar la API definida en `api.ts`.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
