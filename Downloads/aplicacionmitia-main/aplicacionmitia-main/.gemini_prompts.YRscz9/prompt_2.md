# User Story: Gestionar Lista de Profesionales Favoritos

## Descripción
Como cliente, quiero poder ver y gestionar la lista de profesionales que he marcado como favoritos para acceder a sus perfiles y reservar nuevas citas con ellos fácilmente.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts
- @src/features/panel-del-usuario-cliente/components/FavoritesList.tsx

## Componentes a Crear
- FavoritesList (component)
- FavoriteCard (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
Crear una nueva sección/pestaña en el panel. El hook `usePaneldelUsuario(Cliente).ts` obtendrá la lista de favoritos desde `GET /api/v1/user/favorites`. Cada favorito debe incluir id, nombre, foto, especialidad y enlace al perfil. Se debe implementar la función para eliminar un favorito, que llamará a `DELETE /api/v1/user/favorites/{professional_id}`.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Debe existir una pestaña o sección llamada 'Mis Favoritos' en el panel de usuario.
2. Esta sección muestra una lista de tarjetas, una por cada profesional guardado.
3. Cada tarjeta muestra la foto, nombre y especialidad principal del profesional.
4. Cada tarjeta tiene un botón/enlace para 'Ver Perfil' que lleva a su ficha completa.
5. Cada tarjeta tiene un botón para 'Eliminar de Favoritos'.
6. Al hacer clic en 'Eliminar', se pide confirmación antes de realizar la acción.
7. Si no hay favoritos, se muestra un mensaje amigable con un enlace a la página de búsqueda.

## Sugerencias Adicionales
- Mostrar el estado de disponibilidad del profesional (online/offline) en su tarjeta de favorito.
- Añadir un botón de 'Reservar Ahora' directamente en la tarjeta que lleve al calendario de ese profesional.

## Tarea para Editor IA
Implementa una nueva pestaña en el `PaneldelUsuario(Cliente)Page.tsx` para 'Favoritos'. Crea el componente `FavoritesList.tsx` que mapeará y renderizará los `FavoriteCard` con los datos obtenidos de la API.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
