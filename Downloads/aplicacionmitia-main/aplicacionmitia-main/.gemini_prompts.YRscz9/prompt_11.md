# User Story: Consultar y Editar mis Valoraciones Enviadas

## Descripción
Como cliente, quiero ver una lista de todas las valoraciones que he dejado a los profesionales para recordar mi feedback o editarlo si la plataforma lo permite.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- MyReviewsPanel (component)
- UserReviewCard (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- InteractiveStarRating from src/features/pgina-de-valoracin/components/InteractiveStarRating.tsx

## Lógica y Datos
La API necesita un endpoint GET /api/my-reviews para obtener todas las reseñas del usuario logueado, y endpoints PUT/DELETE /api/reviews/:reviewId para modificarlas o eliminarlas (sujeto a reglas de negocio, como un límite de tiempo para editar).

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. En mi panel, existe una sección 'Mis Valoraciones'.
2. En esta sección, veo una lista de todas las reseñas que he escrito.
3. Cada elemento de la lista muestra a qué profesional valoré, la fecha, mi calificación y el comentario.
4. Junto a cada reseña, hay un botón de 'Editar' (si la edición está permitida).
5. Al hacer clic en 'Editar', se abre un modal o formulario pre-rellenado con mi valoración actual para que pueda modificarla.
6. Si no he escrito ninguna valoración, se muestra un mensaje invitándome a hacerlo después de mi próxima sesión.

## Sugerencias Adicionales
- Mostrar si el profesional ha respondido a la reseña.
- Permitir al usuario eliminar su propia reseña.

## Tarea para Editor IA
Crea los componentes 'MyReviewsPanel.tsx' y 'UserReviewCard.tsx'. Implementa la lógica y los endpoints necesarios en el hook y la API para obtener y gestionar las valoraciones del usuario.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
