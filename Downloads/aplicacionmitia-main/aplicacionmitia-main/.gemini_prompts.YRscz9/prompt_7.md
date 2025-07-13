# User Story: Acceder a los Recursos y Documentos Compartidos por el Profesional

## Descripción
Como cliente, quiero una sección en mi panel donde pueda ver y descargar los materiales (ejercicios, artículos, guías) que mi terapeuta comparte conmigo para apoyar mi proceso terapéutico.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- SharedResourcesSection (component)
- DocumentListItem (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Table from src/components/Table.jsx

## Lógica y Datos
Se necesita un endpoint en 'api.ts' (ej. GET /api/resources) que devuelva una lista de documentos asociados al cliente. Cada documento debe tener metadatos como nombre, URL de descarga segura, tipo de archivo y fecha. El hook 'usePaneldelUsuario(Cliente)' gestionará el estado de carga y la lista de documentos.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Existe una sección o pestaña en el panel llamada 'Mis Recursos' o similar.
2. Dentro de esta sección, se muestra una lista de todos los documentos compartidos por mi terapeuta.
3. Para cada documento, puedo ver el nombre, la fecha en que fue compartido y un icono del tipo de archivo.
4. Hay un botón de 'Descargar' junto a cada documento que inicia la descarga segura del archivo.
5. Si no hay documentos, se muestra un mensaje amigable como 'Tu terapeuta aún no ha compartido ningún recurso contigo'.

## Sugerencias Adicionales
- Añadir un buscador para filtrar documentos por nombre.
- Agrupar documentos por sesión o por fecha.

## Tarea para Editor IA
Crea los componentes 'SharedResourcesSection.tsx' y 'DocumentListItem.tsx' en la carpeta de componentes del feature. Actualiza el hook y el archivo de API para manejar la carga de los recursos compartidos.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
