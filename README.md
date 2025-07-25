# Aplicación Alba - Gestión de Dietas y Entrenamientos

Una aplicación web completa para la gestión de dietas y entrenamientos con funcionalidades de compartir y exportación.

## Características Principales

### 🍽️ Gestión de Dietas
- Creación y edición de planes dietéticos personalizados
- Calendario interactivo para planificación diaria
- Cálculo automático de macronutrientes
- Biblioteca de alimentos integrada
- Duplicación de días para facilitar la planificación
- Resumen nutricional semanal con gráficos

### 🏋️ Gestión de Entrenamientos
- Creación de rutinas de ejercicios
- Plantillas de microciclos
- Seguimiento de progreso

### 📊 Funcionalidades de Exportación
- **Exportación PNG**: Gráficos de resumen nutricional
- **Exportación PDF**: Planes de dieta con branding profesional
  - Header con logo y datos del cliente
  - Tabla detallada de comidas diarias
  - Totales de macronutrientes
  - Información del nutricionista

### 🔗 Sistema de Compartir
- **Enlaces de solo lectura** para dietas y entrenamientos
- **Tokens de expiración opcionales** para mayor seguridad
- **Vista pública responsive** sin campos editables
- **Estadísticas de compartir** para seguimiento
- **Gestión de enlaces** con activación/desactivación

### 👥 Gestión de Clientes
- Perfiles de clientes completos
- Asignación de dietas y entrenamientos
- Historial de progreso

### 💳 Sistema de Pagos
- Integración con Stripe
- Gestión de suscripciones
- Historial de transacciones

## Tecnologías Utilizadas

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Iconos**: Lucide React
- **Gráficos**: Chart.js, React-Chartjs-2
- **Drag & Drop**: React Beautiful DnD
- **Exportación**: 
  - jsPDF + jsPDF-AutoTable (PDF)
  - html2canvas (PNG)
- **Routing**: React Router DOM
- **Estado**: React Hooks

## Estructura del Proyecto

```
src/
├── api/                    # APIs y servicios
│   ├── dietSharing.api.js  # API de compartir dietas
│   └── workoutSharing.api.js # API de compartir entrenamientos
├── components/             # Componentes reutilizables
│   ├── ShareDietModal.jsx  # Modal para compartir dietas
│   ├── ShareWorkoutModal.jsx # Modal para compartir entrenamientos
│   └── ...
├── features/              # Funcionalidades por módulo
│   ├── auth/             # Autenticación
│   ├── clients/          # Gestión de clientes
│   ├── diets/            # Gestión de dietas
│   ├── workouts/         # Gestión de entrenamientos
│   └── payments/         # Sistema de pagos
├── pages/                # Páginas públicas
│   ├── SharedDiet.page.jsx # Vista pública de dietas
│   └── SharedWorkout.page.jsx # Vista pública de entrenamientos
└── layouts/              # Layouts de la aplicación
```

## Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Silviu2326/aplicacionalba.git
   cd aplicacionalba
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## Funcionalidades Destacadas

### Sistema de Compartir con Tokens
- Generación automática de tokens únicos
- Configuración de fecha de expiración
- Opción de mostrar/ocultar información del nutricionista
- Vista de solo lectura completamente responsive

### Exportación PDF con Branding
- Header profesional con logo
- Información completa del cliente y dieta
- Tabla detallada con todas las comidas
- Cálculos automáticos de totales nutricionales
- Footer con datos del nutricionista

### Resumen Nutricional Avanzado
- Gráficos interactivos por semana
- Comparación objetivos vs. reales
- Exportación de gráficos a PNG
- Tabla detallada día por día

## Contribución

Este proyecto está en desarrollo activo. Las contribuciones son bienvenidas.

## Licencia

Este proyecto es privado y está protegido por derechos de autor.

---

**Desarrollado con ❤️ para profesionales de la nutrición y el fitness**