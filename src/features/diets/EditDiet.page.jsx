import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, ChevronDown, ChevronUp, Calendar, Search, GripVertical, Copy, Check, BarChart3, Download, Share2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getDietById, updateDiet, createDiet } from './diets.api';
import FoodLibraryModal from '../../components/FoodLibraryModal';
import ShareDietModal from '../../components/ShareDietModal';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EditDietPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'weight_loss',
    calories: 1500,
    protein: 120,
    carbs: 150,
    fats: 50,
    fiber: 25,
    duration: '4 semanas',
    mealPlan: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isBasicInfoCollapsed, setIsBasicInfoCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dailyMeals, setDailyMeals] = useState({});
  const [dailyNutrition, setDailyNutrition] = useState({});
  const [isFoodLibraryOpen, setIsFoodLibraryOpen] = useState(false);
  const [currentMealContext, setCurrentMealContext] = useState(null); // Para saber a qué comida agregar el alimento
  const [isDuplicateDayModalOpen, setIsDuplicateDayModalOpen] = useState(false);
  const [duplicateFromDate, setDuplicateFromDate] = useState('');
  const [duplicateToDate, setDuplicateToDate] = useState('');
  const [showDuplicatePreview, setShowDuplicatePreview] = useState(false);
  const [duplicatePreviewData, setDuplicatePreviewData] = useState(null);
  const [showDuplicateSuccess, setShowDuplicateSuccess] = useState(false);
  const [isWeeklySummaryOpen, setIsWeeklySummaryOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [weeklyData, setWeeklyData] = useState(null);
  const [isShareDietModalOpen, setIsShareDietModalOpen] = useState(false);

  // Cargar datos de la dieta si estamos editando
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getDietById(id)
        .then(diet => {
          if (diet) {
            setFormData({
              name: diet.name || '',
              description: diet.description || '',
              category: diet.category || 'weight_loss',
              calories: diet.calories || 1500,
              protein: diet.protein || 120,
              carbs: diet.carbs || 150,
              fats: diet.fats || 50,
              fiber: diet.fiber || 25,
              duration: diet.duration || '4 semanas',
              mealPlan: diet.mealPlan || []
            });
          }
        })
        .catch(error => {
          console.error('Error loading diet:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEditing]);

  const categories = {
    weight_loss: 'Pérdida de peso',
    muscle_gain: 'Ganancia muscular',
    maintenance: 'Mantenimiento',
    special: 'Dietas especiales'
  };

  const mealTypes = [
    'Desayuno',
    'Media mañana',
    'Almuerzo',
    'Merienda',
    'Cena',
    'Antes de dormir'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'calories' || name === 'protein' || name === 'carbs' || name === 'fats' || name === 'fiber' 
        ? parseInt(value) || 0 
        : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addMeal = () => {
    const newMeal = {
      id: Date.now(),
      type: 'Desayuno',
      foods: []
    };
    setFormData(prev => ({
      ...prev,
      mealPlan: [...prev.mealPlan, newMeal]
    }));
  };

  const updateMeal = (mealId, field, value) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId ? { ...meal, [field]: value } : meal
      )
    }));
  };

  const removeMeal = (mealId) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.filter(meal => meal.id !== mealId)
    }));
  };

  const addFoodToMeal = (mealId) => {
    const newFood = {
      id: Date.now(),
      name: '',
      quantity: '',
      calories: 0
    };
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId 
          ? { ...meal, foods: [...meal.foods, newFood] }
          : meal
      )
    }));
  };

  const updateFood = (mealId, foodId, field, value) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId 
          ? {
              ...meal,
              foods: meal.foods.map(food =>
                food.id === foodId 
                  ? { ...food, [field]: field === 'calories' ? parseInt(value) || 0 : value }
                  : food
              )
            }
          : meal
      )
    }));
  };

  const removeFood = (mealId, foodId) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId 
          ? { ...meal, foods: meal.foods.filter(food => food.id !== foodId) }
          : meal
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (formData.calories < 800 || formData.calories > 4000) {
      newErrors.calories = 'Las calorías deben estar entre 800 y 4000';
    }

    if (formData.protein < 0 || formData.protein > 300) {
      newErrors.protein = 'Las proteínas deben estar entre 0 y 300g';
    }

    if (formData.carbs < 0 || formData.carbs > 500) {
      newErrors.carbs = 'Los carbohidratos deben estar entre 0 y 500g';
    }

    if (formData.fats < 0 || formData.fats > 200) {
      newErrors.fats = 'Las grasas deben estar entre 0 y 200g';
    }

    if (formData.fiber < 0 || formData.fiber > 100) {
      newErrors.fiber = 'La fibra debe estar entre 0 y 100g';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await updateDiet(id, formData);
      } else {
        await createDiet(formData);
      }
      navigate('/diets');
    } catch (error) {
      console.error('Error saving diet:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/diets');
  };

  // Funciones para el calendario
  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateClick = (date) => {
    const dateKey = formatDate(date);
    setSelectedDate(dateKey);
    
    // Inicializar comidas del día si no existen
    if (!dailyMeals[dateKey]) {
      setDailyMeals(prev => ({
        ...prev,
        [dateKey]: []
      }));
    }
    
    // Inicializar información nutricional del día si no existe
    if (!dailyNutrition[dateKey]) {
      setDailyNutrition(prev => ({
        ...prev,
        [dateKey]: {
          calories: '',
          protein: '',
          carbs: '',
          fats: '',
          fiber: ''
        }
      }));
    }
  };

  const updateDailyNutrition = (dateKey, field, value) => {
    setDailyNutrition(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [field]: value
      }
    }));
  };

  const addMealToDay = (dateKey) => {
    const newMeal = {
      id: Date.now(),
      type: 'Desayuno',
      foods: []
    };
    setDailyMeals(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newMeal]
    }));
  };

  const updateDailyMeal = (dateKey, mealId, field, value) => {
    setDailyMeals(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(meal =>
        meal.id === mealId ? { ...meal, [field]: value } : meal
      )
    }));
  };

  const removeDailyMeal = (dateKey, mealId) => {
    setDailyMeals(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(meal => meal.id !== mealId)
    }));
  };

  const addFoodToDailyMeal = (dateKey, mealId) => {
    const newFood = {
      id: Date.now(),
      name: '',
      quantity: '',
      calories: 0
    };
    setDailyMeals(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(meal =>
        meal.id === mealId 
          ? { ...meal, foods: [...meal.foods, newFood] }
          : meal
      )
    }));
  };

  const updateDailyFood = (dateKey, mealId, foodId, field, value) => {
    setDailyMeals(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(meal =>
        meal.id === mealId 
          ? {
              ...meal,
              foods: meal.foods.map(food =>
                food.id === foodId 
                  ? { ...food, [field]: field === 'calories' ? parseInt(value) || 0 : value }
                  : food
              )
            }
          : meal
      )
    }));
  };

  const removeDailyFood = (dateKey, mealId, foodId) => {
    setDailyMeals(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(meal =>
        meal.id === mealId 
          ? { ...meal, foods: meal.foods.filter(food => food.id !== foodId) }
          : meal
      )
    }));
  };

  // Funciones para la biblioteca de alimentos
  const handleOpenFoodLibrary = (dateKey, mealId) => {
    setCurrentMealContext({ dateKey, mealId, isDaily: true });
    setIsFoodLibraryOpen(true);
  };

  const handleOpenFoodLibraryForMeal = (mealId) => {
    setCurrentMealContext({ mealId, isDaily: false });
    setIsFoodLibraryOpen(true);
  };

  const handleSelectFoodFromLibrary = (foodData) => {
    if (!currentMealContext) return;

    const newFood = {
      id: Date.now(),
      name: foodData.name,
      quantity: `${foodData.quantity} ${foodData.unit}`,
      calories: foodData.calories,
      protein: foodData.protein,
      carbs: foodData.carbs,
      fats: foodData.fats,
      fiber: foodData.fiber
    };

    if (currentMealContext.isDaily) {
      // Agregar a comida diaria
      const { dateKey, mealId } = currentMealContext;
      setDailyMeals(prev => ({
        ...prev,
        [dateKey]: prev[dateKey].map(meal =>
          meal.id === mealId 
            ? { ...meal, foods: [...meal.foods, newFood] }
            : meal
        )
      }));
    } else {
      // Agregar a plan de comidas general
      const { mealId } = currentMealContext;
      setFormData(prev => ({
        ...prev,
        mealPlan: prev.mealPlan.map(meal =>
          meal.id === mealId 
            ? { ...meal, foods: [...meal.foods, newFood] }
            : meal
        )
      }));
    }

    setIsFoodLibraryOpen(false);
    setCurrentMealContext(null);
  };

  const handleCloseFoodLibrary = () => {
    setIsFoodLibraryOpen(false);
    setCurrentMealContext(null);
  };

  // Función para manejar el drag and drop de comidas diarias
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    
    // Solo permitir reordenamiento dentro de la misma lista
    if (source.droppableId !== destination.droppableId) {
      return;
    }

    // Manejar drag and drop para comidas diarias
    if (source.droppableId.startsWith('daily-meals-') && selectedDate) {
      const meals = Array.from(dailyMeals[selectedDate] || []);
      const [reorderedMeal] = meals.splice(source.index, 1);
      meals.splice(destination.index, 0, reorderedMeal);

      setDailyMeals(prev => ({
        ...prev,
        [selectedDate]: meals
      }));
    }
    
    // Manejar drag and drop para plan de comidas general
    if (source.droppableId === 'general-meal-plan') {
      const meals = Array.from(formData.mealPlan);
      const [reorderedMeal] = meals.splice(source.index, 1);
      meals.splice(destination.index, 0, reorderedMeal);

      setFormData(prev => ({
        ...prev,
        mealPlan: meals
      }));
    }
  };

  // Funciones para duplicar días
  const handleOpenDuplicateModal = () => {
    setIsDuplicateDayModalOpen(true);
    setDuplicateFromDate('');
    setDuplicateToDate('');
    setShowDuplicatePreview(false);
    setDuplicatePreviewData(null);
  };

  const handleCloseDuplicateModal = () => {
    setIsDuplicateDayModalOpen(false);
    setDuplicateFromDate('');
    setDuplicateToDate('');
    setShowDuplicatePreview(false);
    setDuplicatePreviewData(null);
  };

  const handlePreviewDuplicate = () => {
    if (!duplicateFromDate || !duplicateToDate) {
      return;
    }

    const fromDateMeals = dailyMeals[duplicateFromDate] || [];
    const fromDateNutrition = dailyNutrition[duplicateFromDate] || {};
    
    setDuplicatePreviewData({
      meals: fromDateMeals,
      nutrition: fromDateNutrition,
      fromDate: duplicateFromDate,
      toDate: duplicateToDate
    });
    setShowDuplicatePreview(true);
  };

  const handleConfirmDuplicate = () => {
    if (!duplicatePreviewData) return;

    const { meals, nutrition, toDate } = duplicatePreviewData;
    
    // Crear copias profundas de las comidas con nuevos IDs
    const duplicatedMeals = meals.map(meal => ({
      ...meal,
      id: Date.now() + Math.random(), // Nuevo ID único
      foods: meal.foods.map(food => ({
        ...food,
        id: Date.now() + Math.random() // Nuevo ID único para cada alimento
      }))
    }));

    // Actualizar las comidas del día de destino
    setDailyMeals(prev => ({
      ...prev,
      [toDate]: duplicatedMeals
    }));

    // Actualizar la información nutricional del día de destino
    setDailyNutrition(prev => ({
      ...prev,
      [toDate]: { ...nutrition }
    }));

    // Mostrar mensaje de éxito
    setShowDuplicateSuccess(true);
    setTimeout(() => setShowDuplicateSuccess(false), 3000);

    // Cerrar modal
    handleCloseDuplicateModal();

    // Seleccionar el día de destino para mostrar el resultado
    setSelectedDate(toDate);
  };

  const getAvailableDatesForDuplication = () => {
    return Object.keys(dailyMeals).filter(date => 
      dailyMeals[date] && dailyMeals[date].length > 0
    );
  };

  // Funciones para compartir dieta
  const handleOpenShareDietModal = () => {
    setIsShareDietModalOpen(true);
  };

  const handleCloseShareDietModal = () => {
    setIsShareDietModalOpen(false);
  };

  // Función para exportar dieta a PDF
  const exportDietToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPosition = margin;

    // Cabecera con logo y branding
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Color azul
    doc.text('FitCoach Pro', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Plan Nutricional Personalizado', margin, yPosition);
    yPosition += 20;

    // Información del cliente y dieta
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Dieta: ${formData.name}`, margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Categoría: ${categories[formData.category]}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Duración: ${formData.duration}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Descripción: ${formData.description}`, margin, yPosition);
    yPosition += 15;

    // Objetivos nutricionales generales
    doc.setFontSize(14);
    doc.setTextColor(59, 130, 246);
    doc.text('Objetivos Nutricionales Diarios', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Calorías: ${formData.calories} kcal`, margin, yPosition);
    doc.text(`Proteínas: ${formData.protein}g`, margin + 60, yPosition);
    yPosition += 8;
    doc.text(`Carbohidratos: ${formData.carbs}g`, margin, yPosition);
    doc.text(`Grasas: ${formData.fats}g`, margin + 60, yPosition);
    doc.text(`Fibra: ${formData.fiber}g`, margin + 120, yPosition);
    yPosition += 20;

    // Planificación por días
    const datesWithMeals = Object.keys(dailyMeals).filter(date => 
      dailyMeals[date] && dailyMeals[date].length > 0
    ).sort();

    if (datesWithMeals.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(59, 130, 246);
      doc.text('Planificación de Comidas', margin, yPosition);
      yPosition += 15;

      datesWithMeals.forEach((dateKey, dayIndex) => {
        // Verificar si necesitamos una nueva página
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = margin;
        }

        const date = new Date(dateKey + 'T00:00:00');
        const dayMeals = dailyMeals[dateKey] || [];
        const dayNutrition = dailyNutrition[dateKey] || {};

        // Título del día
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${date.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}`, margin, yPosition);
        yPosition += 10;

        // Objetivos del día
        if (dayNutrition.calories || dayNutrition.protein || dayNutrition.carbs || dayNutrition.fats) {
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          const goals = [];
          if (dayNutrition.calories) goals.push(`${dayNutrition.calories} kcal`);
          if (dayNutrition.protein) goals.push(`${dayNutrition.protein}g prot`);
          if (dayNutrition.carbs) goals.push(`${dayNutrition.carbs}g carb`);
          if (dayNutrition.fats) goals.push(`${dayNutrition.fats}g gras`);
          doc.text(`Objetivos: ${goals.join(' | ')}`, margin + 5, yPosition);
          yPosition += 8;
        }

        // Tabla de comidas del día
        const tableData = [];
        let dayTotalCalories = 0;
        let dayTotalProtein = 0;
        let dayTotalCarbs = 0;
        let dayTotalFats = 0;

        dayMeals.forEach(meal => {
          // Fila del tipo de comida
          tableData.push([{
            content: meal.type,
            colSpan: 4,
            styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }
          }]);

          // Filas de alimentos
          meal.foods.forEach(food => {
            dayTotalCalories += food.calories || 0;
            dayTotalProtein += food.protein || 0;
            dayTotalCarbs += food.carbs || 0;
            dayTotalFats += food.fats || 0;

            tableData.push([
              `${food.name}`,
              `${food.quantity || '-'}`,
              `${food.calories || 0} kcal`,
              `P:${food.protein || 0}g C:${food.carbs || 0}g G:${food.fats || 0}g`
            ]);
          });
        });

        // Fila de totales
        if (dayTotalCalories > 0) {
          tableData.push([{
            content: `TOTAL DEL DÍA: ${Math.round(dayTotalCalories)} kcal | P:${Math.round(dayTotalProtein)}g | C:${Math.round(dayTotalCarbs)}g | G:${Math.round(dayTotalFats)}g`,
            colSpan: 4,
            styles: { fillColor: [59, 130, 246], textColor: [255, 255, 255], fontStyle: 'bold' }
          }]);
        }

        if (tableData.length > 0) {
          doc.autoTable({
            startY: yPosition,
            head: [['Alimento', 'Cantidad', 'Calorías', 'Macros']],
            body: tableData,
            theme: 'grid',
            styles: {
              fontSize: 9,
              cellPadding: 3
            },
            headStyles: {
              fillColor: [59, 130, 246],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            margin: { left: margin, right: margin },
            tableWidth: 'auto'
          });
          yPosition = doc.lastAutoTable.finalY + 15;
        } else {
          yPosition += 10;
        }
      });
    }

    // Pie de página con información del nutricionista
    const addFooter = () => {
      const footerY = pageHeight - 30;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Elaborado por: Dr. Nutricionista | Email: nutricionista@ejemplo.com | Tel: +1234567890', margin, footerY);
      doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`, margin, footerY + 8);
    };

    // Agregar pie de página a todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooter();
    }

    // Guardar el PDF
    const fileName = `dieta-${formData.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  // Funciones para resumen semanal
  const getWeekDates = (weekStart) => {
    const dates = [];
    const start = new Date(weekStart);
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  const calculateDayNutrition = (dateKey) => {
    const dayMeals = dailyMeals[dateKey] || [];
    const dayNutritionGoals = dailyNutrition[dateKey] || {};
    
    // Calcular totales reales de los alimentos
    const actualTotals = dayMeals.reduce((totals, meal) => {
      meal.foods.forEach(food => {
        totals.calories += food.calories || 0;
        totals.protein += food.protein || 0;
        totals.carbs += food.carbs || 0;
        totals.fats += food.fats || 0;
      });
      return totals;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return {
      actual: actualTotals,
      goals: {
        calories: parseInt(dayNutritionGoals.calories) || 0,
        protein: parseInt(dayNutritionGoals.protein) || 0,
        carbs: parseInt(dayNutritionGoals.carbs) || 0,
        fats: parseInt(dayNutritionGoals.fats) || 0
      }
    };
  };

  const calculateWeeklyData = (weekStart) => {
    const weekDates = getWeekDates(weekStart);
    const weekData = {
      dates: weekDates,
      daily: [],
      totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
      goals: { calories: 0, protein: 0, carbs: 0, fats: 0 }
    };

    weekDates.forEach(date => {
      const dayData = calculateDayNutrition(date);
      weekData.daily.push({
        date,
        ...dayData
      });
      
      // Sumar totales
      weekData.totals.calories += dayData.actual.calories;
      weekData.totals.protein += dayData.actual.protein;
      weekData.totals.carbs += dayData.actual.carbs;
      weekData.totals.fats += dayData.actual.fats;
      
      // Sumar objetivos
      weekData.goals.calories += dayData.goals.calories;
      weekData.goals.protein += dayData.goals.protein;
      weekData.goals.carbs += dayData.goals.carbs;
      weekData.goals.fats += dayData.goals.fats;
    });

    return weekData;
  };

  const handleOpenWeeklySummary = () => {
    setIsWeeklySummaryOpen(true);
    
    // Establecer la semana actual por defecto
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    const weekStart = formatDate(monday);
    
    setSelectedWeek(weekStart);
    setWeeklyData(calculateWeeklyData(weekStart));
  };

  const handleCloseWeeklySummary = () => {
    setIsWeeklySummaryOpen(false);
    setSelectedWeek('');
    setWeeklyData(null);
  };

  const handleWeekChange = (weekStart) => {
    setSelectedWeek(weekStart);
    setWeeklyData(calculateWeeklyData(weekStart));
  };

  const exportChartToPNG = async () => {
    const chartElement = document.getElementById('weekly-chart-container');
    if (chartElement) {
      try {
        const canvas = await html2canvas(chartElement, {
          backgroundColor: '#ffffff',
          scale: 2
        });
        
        const link = document.createElement('a');
        link.download = `resumen-semanal-${selectedWeek}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error al exportar gráfico:', error);
      }
    }
  };

  const getAvailableWeeks = () => {
    const dates = Object.keys(dailyMeals).filter(date => 
      dailyMeals[date] && dailyMeals[date].length > 0
    );
    
    if (dates.length === 0) return [];
    
    const weeks = new Set();
    dates.forEach(dateStr => {
      const date = new Date(dateStr + 'T00:00:00');
      const monday = new Date(date);
      monday.setDate(date.getDate() - date.getDay() + 1);
      weeks.add(formatDate(monday));
    });
    
    return Array.from(weeks).sort();
  };

  const getChartData = () => {
    if (!weeklyData) return null;

    const labels = weeklyData.dates.map(date => {
      const d = new Date(date + 'T00:00:00');
      return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
    });

    return {
      labels,
      datasets: [
        {
          label: 'Calorías',
          data: weeklyData.daily.map(day => day.actual.calories),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Proteínas (g)',
          data: weeklyData.daily.map(day => day.actual.protein),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        },
        {
          label: 'Carbohidratos (g)',
          data: weeklyData.daily.map(day => day.actual.carbs),
          backgroundColor: 'rgba(245, 158, 11, 0.8)',
          borderColor: 'rgba(245, 158, 11, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        },
        {
          label: 'Grasas (g)',
          data: weeklyData.daily.map(day => day.actual.fats),
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Resumen Nutricional Semanal'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Calorías'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Macronutrientes (g)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const today = new Date();
  const calendarDays = generateCalendar();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dieta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Editar Dieta' : 'Nueva Dieta'}
              </h1>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-2 inline" />
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica - Colapsable */}
          <div className="bg-white rounded-lg shadow">
            <div 
              className="p-6 cursor-pointer flex items-center justify-between"
              onClick={() => setIsBasicInfoCollapsed(!isBasicInfoCollapsed)}
            >
              <h2 className="text-lg font-semibold text-gray-900">Información Básica</h2>
              {isBasicInfoCollapsed ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {!isBasicInfoCollapsed && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la dieta *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Plan de pérdida de peso"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(categories).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Describe los objetivos y características de esta dieta..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duración
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: 4 semanas"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>



          {/* Plan de comidas general */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Plan de Comidas General</h2>
              <button
                type="button"
                onClick={addMeal}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Agregar Comida
              </button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="general-meal-plan">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-4 ${
                      snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
                    }`}
                  >
                    {formData.mealPlan.map((meal, index) => (
                      <Draggable key={meal.id} draggableId={meal.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border border-gray-200 rounded-lg p-4 bg-white ${
                              snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <select
                                  value={meal.type}
                                  onChange={(e) => updateMeal(meal.id, 'type', e.target.value)}
                                  className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  {mealTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                  ))}
                                </select>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeMeal(meal.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                  
                  {/* Alimentos de la comida */}
                  <div className="space-y-2">
                    {meal.foods.map((food) => (
                      <div key={food.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          value={food.name}
                          onChange={(e) => updateFood(meal.id, food.id, 'name', e.target.value)}
                          placeholder="Nombre del alimento"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={food.quantity}
                          onChange={(e) => updateFood(meal.id, food.id, 'quantity', e.target.value)}
                          placeholder="Cantidad"
                          className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          value={food.calories}
                          onChange={(e) => updateFood(meal.id, food.id, 'calories', e.target.value)}
                          placeholder="Cal"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => removeFood(meal.id, food.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => addFoodToMeal(meal.id)}
                        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Agregar manual
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenFoodLibraryForMeal(meal.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Search className="h-4 w-4" />
                        Biblioteca de alimentos
                      </button>
                    </div>
                    </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {formData.mealPlan.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Plus className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No hay comidas en el plan</p>
                        <p className="text-sm">Haz clic en "Agregar Comida" para comenzar</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {/* Calendario */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <Calendar className="h-5 w-5 text-blue-600" />
                 <h2 className="text-lg font-semibold text-gray-900">Planificación por Días</h2>
               </div>
               <div className="flex gap-3">
                 <button
                   type="button"
                   onClick={handleOpenWeeklySummary}
                   className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                 >
                   <BarChart3 className="h-4 w-4" />
                   Resumen
                 </button>
                 <button
                   type="button"
                   onClick={handleOpenDuplicateModal}
                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                 >
                   <Copy className="h-4 w-4" />
                   Duplicar Día
                 </button>
                 <button
                   type="button"
                   onClick={handleOpenShareDietModal}
                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                 >
                   <Share2 className="h-4 w-4" />
                   Compartir
                 </button>
                 <button
                   type="button"
                   onClick={exportDietToPDF}
                   className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                 >
                   <Download className="h-4 w-4" />
                   Exportar PDF
                 </button>
               </div>
             </div>
            
            {/* Calendario */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {monthNames[today.getMonth()]} {today.getFullYear()}
                </h3>
              </div>
              
              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  const dateKey = formatDate(date);
                  const isCurrentMonth = date.getMonth() === today.getMonth();
                  const isToday = formatDate(date) === formatDate(today);
                  const isSelected = selectedDate === dateKey;
                  const hasMeals = dailyMeals[dateKey] && dailyMeals[dateKey].length > 0;
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateClick(date)}
                      className={`
                        p-2 text-sm rounded-lg transition-colors relative
                        ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                        ${isToday ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                        ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                        ${hasMeals ? 'ring-2 ring-green-400' : ''}
                      `}
                    >
                      {date.getDate()}
                      {hasMeals && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Editor de comidas del día seleccionado */}
            {selectedDate && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Comidas para {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <button
                    type="button"
                    onClick={() => addMealToDay(selectedDate)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Comida
                  </button>
                </div>
                
                {/* Información nutricional del día */}
                 <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                   <h4 className="text-md font-medium text-gray-900 mb-3">Objetivos Nutricionales del Día</h4>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                     <div>
                       <label className="block text-xs font-medium text-gray-700 mb-1">
                         Calorías
                       </label>
                       <input
                         type="number"
                         value={dailyNutrition[selectedDate]?.calories || ''}
                         onChange={(e) => updateDailyNutrition(selectedDate, 'calories', e.target.value)}
                         placeholder="2000"
                         className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-gray-700 mb-1">
                         Proteínas (g)
                       </label>
                       <input
                         type="number"
                         value={dailyNutrition[selectedDate]?.protein || ''}
                         onChange={(e) => updateDailyNutrition(selectedDate, 'protein', e.target.value)}
                         placeholder="150"
                         className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-gray-700 mb-1">
                         Carbohidratos (g)
                       </label>
                       <input
                         type="number"
                         value={dailyNutrition[selectedDate]?.carbs || ''}
                         onChange={(e) => updateDailyNutrition(selectedDate, 'carbs', e.target.value)}
                         placeholder="250"
                         className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-gray-700 mb-1">
                         Grasas (g)
                       </label>
                       <input
                         type="number"
                         value={dailyNutrition[selectedDate]?.fats || ''}
                         onChange={(e) => updateDailyNutrition(selectedDate, 'fats', e.target.value)}
                         placeholder="67"
                         className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-gray-700 mb-1">
                         Fibra (g)
                       </label>
                       <input
                         type="number"
                         value={dailyNutrition[selectedDate]?.fiber || ''}
                         onChange={(e) => updateDailyNutrition(selectedDate, 'fiber', e.target.value)}
                         placeholder="25"
                         className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                   </div>
                 </div>

                {/* Lista de comidas del día */}
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId={`daily-meals-${selectedDate}`}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`space-y-4 ${
                          snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
                        }`}
                      >
                        {(dailyMeals[selectedDate] || []).map((meal, mealIndex) => (
                          <Draggable key={meal.id} draggableId={meal.id.toString()} index={mealIndex}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`border border-gray-200 rounded-lg p-4 bg-white ${
                                  snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
                                }`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div
                                      {...provided.dragHandleProps}
                                      className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                      <GripVertical className="h-5 w-5" />
                                    </div>
                                    <select
                                      value={meal.type}
                                      onChange={(e) => updateDailyMeal(selectedDate, meal.id, 'type', e.target.value)}
                                      className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                      {mealTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeDailyMeal(selectedDate, meal.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                      
                      {/* Alimentos de la comida */}
                      <div className="space-y-2">
                        {meal.foods.map((food) => (
                          <div key={food.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <input
                              type="text"
                              value={food.name}
                              onChange={(e) => updateDailyFood(selectedDate, meal.id, food.id, 'name', e.target.value)}
                              placeholder="Nombre del alimento"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value={food.quantity}
                              onChange={(e) => updateDailyFood(selectedDate, meal.id, food.id, 'quantity', e.target.value)}
                              placeholder="Cantidad"
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="number"
                              value={food.calories}
                              onChange={(e) => updateDailyFood(selectedDate, meal.id, food.id, 'calories', e.target.value)}
                              placeholder="Cal"
                              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => removeDailyFood(selectedDate, meal.id, food.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => addFoodToDailyMeal(selectedDate, meal.id)}
                            className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            Agregar manual
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenFoodLibrary(selectedDate, meal.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Search className="h-4 w-4" />
                            Biblioteca de alimentos
                          </button>
                        </div>
                      </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {(!dailyMeals[selectedDate] || dailyMeals[selectedDate].length === 0) && (
                          <div className="text-center py-8 text-gray-500">
                            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>No hay comidas planificadas para este día</p>
                            <p className="text-sm">Haz clic en "Agregar Comida" para comenzar</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>


        </form>
      </div>
      
      {/* Modal de Biblioteca de Alimentos */}
      <FoodLibraryModal
        isOpen={isFoodLibraryOpen}
        onClose={handleCloseFoodLibrary}
        onSelectFood={handleSelectFoodFromLibrary}
      />

      {/* Modal de Duplicar Día */}
      {isDuplicateDayModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Duplicar Día</h3>
              <button
                onClick={handleCloseDuplicateModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!showDuplicatePreview ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Copiar de (fecha origen)
                  </label>
                  <select
                    value={duplicateFromDate}
                    onChange={(e) => setDuplicateFromDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar fecha...</option>
                    {getAvailableDatesForDuplication().map(date => (
                      <option key={date} value={date}>
                        {new Date(date + 'T00:00:00').toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Copiar a (fecha destino)
                  </label>
                  <input
                    type="date"
                    value={duplicateToDate}
                    onChange={(e) => setDuplicateToDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCloseDuplicateModal}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePreviewDuplicate}
                    disabled={!duplicateFromDate || !duplicateToDate}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Vista Previa
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-2">Vista Previa de Duplicación</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Se copiarán <strong>{duplicatePreviewData?.meals?.length || 0} comidas</strong> desde{' '}
                    <strong>
                      {new Date(duplicatePreviewData?.fromDate + 'T00:00:00').toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </strong>{' '}
                    hacia{' '}
                    <strong>
                      {new Date(duplicatePreviewData?.toDate + 'T00:00:00').toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </strong>
                  </p>
                  
                  {duplicatePreviewData?.meals?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Comidas a copiar:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {duplicatePreviewData.meals.map((meal, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {meal.type} ({meal.foods.length} alimentos)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowDuplicatePreview(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleConfirmDuplicate}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Resumen Semanal */}
       {isWeeklySummaryOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-semibold text-gray-900">Resumen Nutricional Semanal</h3>
               <div className="flex items-center gap-3">
                 <button
                   onClick={exportChartToPNG}
                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                 >
                   <Download className="h-4 w-4" />
                   Exportar PNG
                 </button>
                 <button
                   onClick={handleCloseWeeklySummary}
                   className="text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   <X className="h-5 w-5" />
                 </button>
               </div>
             </div>

             {/* Selector de semana */}
             <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Seleccionar semana
               </label>
               <select
                 value={selectedWeek}
                 onChange={(e) => handleWeekChange(e.target.value)}
                 className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               >
                 {getAvailableWeeks().map(week => {
                   const weekStart = new Date(week + 'T00:00:00');
                   const weekEnd = new Date(weekStart);
                   weekEnd.setDate(weekStart.getDate() + 6);
                   return (
                     <option key={week} value={week}>
                       {weekStart.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - {weekEnd.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                     </option>
                   );
                 })}
               </select>
             </div>

             {weeklyData && (
               <div className="space-y-6">
                 {/* Resumen de totales */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                     <h4 className="text-sm font-medium text-blue-800 mb-1">Calorías Totales</h4>
                     <p className="text-2xl font-bold text-blue-900">{weeklyData.totals.calories.toLocaleString()}</p>
                     <p className="text-xs text-blue-600">Objetivo: {weeklyData.goals.calories.toLocaleString()}</p>
                   </div>
                   <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                     <h4 className="text-sm font-medium text-green-800 mb-1">Proteínas (g)</h4>
                     <p className="text-2xl font-bold text-green-900">{Math.round(weeklyData.totals.protein)}</p>
                     <p className="text-xs text-green-600">Objetivo: {Math.round(weeklyData.goals.protein)}</p>
                   </div>
                   <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                     <h4 className="text-sm font-medium text-yellow-800 mb-1">Carbohidratos (g)</h4>
                     <p className="text-2xl font-bold text-yellow-900">{Math.round(weeklyData.totals.carbs)}</p>
                     <p className="text-xs text-yellow-600">Objetivo: {Math.round(weeklyData.goals.carbs)}</p>
                   </div>
                   <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                     <h4 className="text-sm font-medium text-red-800 mb-1">Grasas (g)</h4>
                     <p className="text-2xl font-bold text-red-900">{Math.round(weeklyData.totals.fats)}</p>
                     <p className="text-xs text-red-600">Objetivo: {Math.round(weeklyData.goals.fats)}</p>
                   </div>
                 </div>

                 {/* Gráfico */}
                 <div id="weekly-chart-container" className="bg-white p-4 rounded-lg border border-gray-200">
                   {getChartData() && (
                     <Bar data={getChartData()} options={chartOptions} />
                   )}
                 </div>

                 {/* Tabla detallada */}
                 <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                   <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                     <h4 className="text-sm font-medium text-gray-900">Detalle Diario</h4>
                   </div>
                   <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                       <thead className="bg-gray-50">
                         <tr>
                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Día</th>
                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calorías</th>
                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proteínas</th>
                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbohidratos</th>
                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grasas</th>
                         </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-gray-200">
                         {weeklyData.daily.map((day, index) => {
                           const date = new Date(day.date + 'T00:00:00');
                           return (
                             <tr key={day.date} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                               <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                 {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}
                               </td>
                               <td className="px-4 py-3 text-sm text-gray-900">
                                 {day.actual.calories}
                                 <span className="text-xs text-gray-500 ml-1">/ {day.goals.calories}</span>
                               </td>
                               <td className="px-4 py-3 text-sm text-gray-900">
                                 {Math.round(day.actual.protein)}g
                                 <span className="text-xs text-gray-500 ml-1">/ {Math.round(day.goals.protein)}g</span>
                               </td>
                               <td className="px-4 py-3 text-sm text-gray-900">
                                 {Math.round(day.actual.carbs)}g
                                 <span className="text-xs text-gray-500 ml-1">/ {Math.round(day.goals.carbs)}g</span>
                               </td>
                               <td className="px-4 py-3 text-sm text-gray-900">
                                 {Math.round(day.actual.fats)}g
                                 <span className="text-xs text-gray-500 ml-1">/ {Math.round(day.goals.fats)}g</span>
                               </td>
                             </tr>
                           );
                         })}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             )}
           </div>
         </div>
       )}

       {/* Modal de Compartir Dieta */}
       {isShareDietModalOpen && (
         <ShareDietModal
           isOpen={isShareDietModalOpen}
           onClose={handleCloseShareDietModal}
           dietData={{
             id: id,
             name: formData.name || 'Dieta sin nombre',
             description: formData.description || '',
             dailyMeals,
             dailyNutrition,
             nutritionist: {
               name: 'Dr. Nutricionista',
               email: 'nutricionista@ejemplo.com',
               phone: '+1234567890'
             }
           }}
         />
       )}

       {/* Toast de éxito */}
       {showDuplicateSuccess && (
         <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
           <Check className="h-5 w-5" />
           <span>¡Día duplicado exitosamente!</span>
         </div>
       )}
     </div>
   );
 };
 
 export default EditDietPage;