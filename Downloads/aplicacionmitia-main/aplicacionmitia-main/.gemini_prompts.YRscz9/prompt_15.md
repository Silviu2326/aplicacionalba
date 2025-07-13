# User Story: Cambiar Contraseña y Configurar 2FA desde el Perfil

## Descripción
Como cliente, quiero poder cambiar mi contraseña y configurar la autenticación de dos factores (2FA) directamente desde mi panel para gestionar la seguridad de mi cuenta.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/pgina-de-configuracin-de-cuenta/PáginadeConfiguracióndeCuentaPage.tsx
- @src/features/pgina-de-configuracin-de-cuenta/api.ts
- @src/features/pgina-de-configuracin-de-cuenta/hooks/usePáginadeConfiguracióndeCuenta.ts

## Componentes a Crear
- SecuritySettings (component)
- ChangePasswordForm (component)
- TwoFactorAuthSetup (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- PasswordStrengthIndicator from src/features/pgina-de-registrologin/components/PasswordStrengthIndicator.tsx

## Lógica y Datos
Aunque la acción se inicia en el panel, la lógica residiría en la feature 'pgina-de-configuracin-de-cuenta'. Se necesitan endpoints en su 'api.ts' para POST /api/account/change-password y para el flujo de 2FA (POST /api/account/2fa/setup, POST /api/account/2fa/verify).

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Desde mi perfil o una página de 'Configuración de Cuenta' enlazada desde el panel, encuentro una sección de 'Seguridad'.
2. Dentro de 'Seguridad', hay una opción para 'Cambiar Contraseña'.
3. El formulario de cambio de contraseña requiere mi contraseña actual y la nueva contraseña dos veces.
4. Veo un indicador de fortaleza para la nueva contraseña.
5. Recibo una confirmación visual de que la contraseña se ha cambiado con éxito.
6. Hay una sección para configurar 2FA que me muestra si está activo o inactivo.
7. Si está inactivo, un botón de 'Configurar' inicia el proceso, mostrando un código QR e solicitando un código de verificación.

## Sugerencias Adicionales
- Enviar un correo electrónico de notificación al usuario cada vez que la contraseña o el estado de 2FA se cambie.
- Ofrecer códigos de recuperación de un solo uso al configurar 2FA.

## Tarea para Editor IA
Crea los componentes 'SecuritySettings.tsx', 'ChangePasswordForm.tsx' y 'TwoFactorAuthSetup.tsx' dentro de 'src/features/pgina-de-configuracin-de-cuenta/components/'. Enlaza a esta funcionalidad desde el 'Panel del Usuario'. Implementa la lógica y los endpoints en los archivos del feature de configuración de cuenta.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
