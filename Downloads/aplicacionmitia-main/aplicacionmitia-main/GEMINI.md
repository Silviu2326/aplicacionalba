# TheraFlow: Terapia y Salud Mental Simplificada

## Descripción
Plataforma de nicho enfocada exclusivamente en conectar pacientes con profesionales de la salud mental (psicólogos, terapeutas, psiquiatras). Incluye funcionalidades especializadas como videollamadas encriptadas (HIPAA/GDPR), notas de sesión seguras para el terapeuta y seguimiento de progreso para el paciente.

## Stack Tecnológico
- React
- TypeScript
- Tailwind CSS
- React Router DOM

## Páginas
1. **Página de Registro/Login** (/auth)
   - Permite a los usuarios y profesionales crear una cuenta o acceder a la plataforma. Incluye registro con email y contraseña, elección de tipo de perfil (Cliente o Profesional), verificación por correo electrónico, recuperación de contraseña y login con redes sociales (opcional).

2. **Home pública** (/)
   - Landing accesible a no registrados, que explica cómo funciona la plataforma, con CTA para registrarse o buscar servicios. Incluye breve explicación de la plataforma, testimonios o reseñas destacadas, botón de "Buscar profesionales" y CTA para registro/login.

3. **Página de Búsqueda** (/search)
   - Interfaz principal donde los usuarios buscan profesionales con filtros. Incluye filtro por ubicación (geolocalización, ciudad, código postal), filtro por categoría de servicios, filtro por disponibilidad (fechas), filtro por precio o valoración, y resultados en listado o mapa.

4. **Ficha de Profesional** (/professional/:id)
   - Vista pública del perfil profesional, similar a Airbnb o Doctoralia. Incluye foto y descripción, servicios ofrecidos, localización en mapa, valoraciones, botón para contactar o reservar, y enlace a sesión online si está confirmado.

5. **Página de Reserva** (/booking/:professionalId)
   - Formulario de reserva que permite seleccionar fecha, modalidad (online/presencial), y confirmación. Incluye calendario con disponibilidad, modalidad online o presencial, envío de email de confirmación, botón para cancelar o modificar, visualización del enlace externo si es online, e integración con Stripe o PayPal (si aplica).

6. **Página de Pago** (/payment/:bookingId)
   - Pasarela de pago segura para completar reservas (si el plan lo permite). Incluye cálculo automático de precio, integración con Stripe, PayPal u otros, confirmación de pago, y factura/envío de recibo (opcional).

7. **Página de Valoración** (/valoracion)
   - Formulario que se activa una vez completado el servicio para valorar al profesional. Incluye sistema de estrellas + texto, solo disponible si hubo reserva completada, y revisión/moderación de reseñas.

8. **Panel del Usuario (Cliente)** (/panel-usuario)
   - Panel privado para usuarios/clientes con historial de reservas, acceso a sesiones online activas, favoritos guardados, valoraciones realizadas y edición de perfil.

9. **Panel del Profesional** (/panel-profesional)
   - Zona privada para que los profesionales gestionen su actividad. Incluye edición del perfil profesional, gestión de reservas, configuración de disponibilidad/calendario, subida de enlace a videollamada, acceso a estadísticas y selección/gestión del plan de suscripción.

10. **Página de Planes y Suscripciones** (/planes-suscripciones)
    - Página informativa sobre los planes disponibles para profesionales con comparación de planes, registro de tarjeta/pago recurrente, gestión de suscripción y opciones promocionales gratuitas.

11. **Backoffice de Administración** (/admin)
    - Panel interno para el equipo administrador de la plataforma. Incluye validación de perfiles profesionales, gestión de usuarios, control de incidencias y soporte, moderación de valoraciones, acceso a estadísticas generales y activación/desactivación de cuentas.

12. **Página de Instalación como PWA** (/instalar-pwa)
    - Interfaz que guía al usuario para instalar la app en su móvil como PWA. Incluye detección del dispositivo compatible, mensaje de instalación (Add to Home Screen) y explicación de beneficios.

13. **Página de Soporte / Ayuda** (/soporte)
    - Centro de ayuda para clientes y profesionales con preguntas frecuentes (FAQs), contacto directo por formulario, chat o email de soporte (opcional) y seguimiento de incidencias (si se implementa).

14. **Página de Configuración de Cuenta** (/configuracion-cuenta)
    - Permite a cualquier tipo de usuario cambiar sus datos personales, contraseña, etc. Incluye edición de nombre, email, contraseña, eliminación de cuenta y preferencias de notificaciones.

15. **pagina prueba** (/pagina-prueba)
    - Página de prueba para testing y desarrollo.

## Componentes Globales
- **Button**: Componente reutilizable para botones con variantes (primary, secondary, danger)
- **Table**: Componente reutilizable para tablas con soporte para columnas dinámicas y estado de carga
- **Sidebar**: Navegación principal con enlaces a todas las páginas

## Arquitectura
- Basada en features
- Cada feature en su propia carpeta con componentes, hooks y API
- Componentes globales mínimos
- Routing con React Router DOM
- Diseño responsivo con Tailwind CSS

## Estructura de Carpetas
```
src/
├── components/           # Componentes globales
├── features/            # Features organizadas por funcionalidad
│   ├── [feature-name]/
│   │   ├── components/  # Componentes específicos de la feature
│   │   ├── hooks/       # Hooks específicos de la feature
│   │   ├── api.ts       # Funciones API de la feature
│   │   └── [Page].tsx   # Componente principal de la página
├── hooks/               # Hooks globales
└── styles/              # Estilos globales adicionales
```

## Próximos Pasos
1. Implementar funcionalidad específica de cada página
2. Añadir autenticación y autorización
3. Integrar con APIs externas (pagos, mapas, etc.)
4. Implementar funcionalidades PWA
5. Añadir tests unitarios y de integración