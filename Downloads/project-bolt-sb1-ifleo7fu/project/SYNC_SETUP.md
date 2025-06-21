# Configuración de Sincronización de Proyectos

Esta funcionalidad permite sincronizar proyectos con repositorios de GitHub y generar historias de usuario automáticamente usando Google Gemini AI.

## Configuración Requerida

### 1. API Key de Google Gemini

Para usar la funcionalidad de sincronización, necesitas obtener una API key de Google Gemini:

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API key
4. Copia la API key generada

### 2. Configuración del Backend

1. En el directorio `backend`, copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y agrega tu API key de Gemini:
   ```
   GEMINI_API_KEY=tu_api_key_de_gemini_aqui
   ```

3. Instala las nuevas dependencias:
   ```bash
   npm install
   ```

4. Reinicia el servidor del backend:
   ```bash
   npm run dev
   ```

## Cómo Usar la Sincronización

1. **Agregar URL de GitHub**: En la página de edición del proyecto, agrega la URL del repositorio de GitHub.

2. **Sincronizar**: Haz clic en el botón "Sincronizar con GitHub" (ícono de refresh).

3. **Proceso**: La sincronización realizará los siguientes pasos:
   - Clona el repositorio de GitHub
   - Busca archivos de páginas en las carpetas `pages` o `Pages`
   - Analiza cada página y sus componentes importados
   - Usa Google Gemini para extraer historias de usuario
   - Agrega las historias de usuario al proyecto

4. **Resultado**: Las nuevas historias de usuario aparecerán en el proyecto después de la sincronización.

## Estructura de Repositorio Soportada

La sincronización funciona mejor con repositorios que tienen:
- Una carpeta `pages` o `Pages` con archivos de páginas
- Archivos React/JavaScript/TypeScript (.js, .jsx, .ts, .tsx)
- Componentes bien documentados con comentarios

## Limitaciones

- Solo funciona con repositorios públicos de GitHub
- Requiere una API key válida de Google Gemini
- El proceso puede tomar varios minutos dependiendo del tamaño del repositorio
- Las historias de usuario generadas pueden requerir revisión manual

## Solución de Problemas

### Error: "API key no configurada"
- Verifica que hayas agregado `GEMINI_API_KEY` en el archivo `.env`
- Reinicia el servidor del backend

### Error: "Repositorio no encontrado"
- Verifica que la URL del repositorio sea correcta
- Asegúrate de que el repositorio sea público

### Error: "No se encontraron páginas"
- Verifica que el repositorio tenga una carpeta `pages` o `Pages`
- Asegúrate de que haya archivos de páginas en esa carpeta

### Historias de usuario de baja calidad
- Agrega más comentarios y documentación a tu código
- Usa nombres descriptivos para componentes y funciones
- Considera revisar y editar manualmente las historias generadas