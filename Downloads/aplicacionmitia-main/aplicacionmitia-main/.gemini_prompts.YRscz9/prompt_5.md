# User Story: Ver y Gestionar Métodos de Pago

## Descripción
Como cliente, quiero ver mis métodos de pago guardados y poder añadir o eliminar una tarjeta para agilizar futuras reservas y pagos de suscripciones.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/components/PaymentMethods.tsx
- @src/features/pgina-de-pago/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- PaymentMethods (component)
- AddPaymentMethodForm (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Button from src/components/Button.jsx

## Lógica y Datos
Esta funcionalidad se integrará en una pestaña de 'Facturación y Pagos'. Utilizará una integración con un proveedor de pagos (ej. Stripe, Adyen). El hook llamará a la API para obtener los métodos de pago guardados (`GET /api/v1/user/payment-methods`). Se mostrará una lista ofuscada (ej. 'VISA **** 4242'). Habrá botones para 'Añadir nuevo método' y 'Eliminar' junto a cada método existente.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Hay una sección 'Métodos de Pago' en el panel.
2. Se muestra una lista de los métodos de pago guardados por el usuario.
3. Cada método de pago muestra el tipo de tarjeta, los últimos 4 dígitos y la fecha de caducidad.
4. Junto a cada método, hay un botón para 'Eliminar'.
5. Se pide confirmación antes de eliminar un método de pago.
6. Hay un botón para 'Añadir nuevo método de pago' que muestra un formulario seguro para introducir los datos.
7. Se puede designar un método de pago como 'Predeterminado'.

## Sugerencias Adicionales
- Integrar con Stripe Elements o una librería similar para la captura segura de datos de tarjeta.
- Mostrar un historial de facturas o transacciones en una subsección, enlazando con la `pgina-de-pago`.

## Tarea para Editor IA
Crea el componente `PaymentMethods.tsx` que gestionará la visualización y eliminación de tarjetas. Este componente debe comunicarse con el backend a través de funciones en `api.ts` para obtener y eliminar métodos de pago.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
