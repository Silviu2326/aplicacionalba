# User Story: Mantener un Diario Privado de Sesiones y Reflexiones

## Descripción
Como cliente, quiero una función de diario privado en mi panel para registrar mis pensamientos, sentimientos y progresos, asegurando que esta información sea solo para mi consulta personal.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- PrivateJournal (component)
- JournalEntryEditor (component)
- JournalEntryCard (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Lógica y Datos
La API necesita endpoints para CRUD de entradas de diario (ej. GET /api/journal, POST /api/journal, PUT /api/journal/:id). Es CRÍTICO que estos datos se almacenen encriptados en la base de datos y que la política de privacidad deje claro que solo el usuario tiene acceso. El hook gestionará el estado de las entradas.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Puedo acceder a una sección de 'Mi Diario' en el panel.
2. Veo una lista de mis entradas anteriores, ordenadas por fecha (la más reciente primero).
3. Tengo un botón para 'Crear Nueva Entrada' que abre un editor de texto.
4. Puedo escribir, dar formato básico (negrita, cursiva) y guardar mi entrada.
5. Las entradas se guardan automáticamente como borrador mientras escribo.
6. Puedo editar o eliminar entradas existentes.
7. Se muestra una advertencia clara de que el diario es privado y no será visto por el terapeuta.

## Sugerencias Adicionales
- Permitir asociar una entrada de diario a una sesión específica del historial de reservas.
- Añadir 'etiquetas' de emociones o temas a cada entrada para un futuro análisis personal.

## Tarea para Editor IA
Crea los componentes 'PrivateJournal.tsx', 'JournalEntryEditor.tsx' y 'JournalEntryCard.tsx' en la carpeta de componentes del feature. Implementa los endpoints CRUD y la lógica en el hook correspondiente, asegurando el manejo de la privacidad.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
