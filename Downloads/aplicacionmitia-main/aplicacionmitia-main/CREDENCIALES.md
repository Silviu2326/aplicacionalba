# Credenciales de Acceso

La aplicación ahora requiere autenticación para acceder. Utiliza las siguientes credenciales falsas para probar la aplicación:

## Credenciales de Cliente
- **Email:** `cliente@example.com`
- **Contraseña:** `password`
- **Tipo de usuario:** Cliente
- **Redirección:** Panel del Usuario Cliente

## Credenciales de Profesional
- **Email:** `profesional@example.com`
- **Contraseña:** `password`
- **Tipo de usuario:** Profesional
- **Redirección:** Panel del Profesional

## Credenciales para Probar Verificación de Email
- **Email:** `unverified@example.com`
- **Contraseña:** `password`
- **Comportamiento:** Muestra el flujo de verificación de email

## Notas Importantes

1. **Autenticación Requerida:** Ahora es obligatorio iniciar sesión para acceder a cualquier página de la aplicación.

2. **Persistencia de Sesión:** 
   - Si marcas "Recordarme", la sesión se guarda en `localStorage`
   - Si no lo marcas, la sesión se guarda en `sessionStorage`

3. **Cerrar Sesión:** Utiliza el botón "Cerrar Sesión" en la barra lateral para salir de la aplicación.

4. **Pantalla de Carga:** La aplicación verifica automáticamente la autenticación al cargar.

## Flujo de la Aplicación

1. Al abrir la aplicación, se verifica si hay un token de autenticación válido
2. Si no hay token o es inválido, se muestra la página de login/registro
3. Una vez autenticado, se muestra la aplicación completa con la barra lateral
4. El tipo de usuario se muestra en la barra lateral junto con el botón de logout

¡Disfruta probando la aplicación con autenticación integrada!