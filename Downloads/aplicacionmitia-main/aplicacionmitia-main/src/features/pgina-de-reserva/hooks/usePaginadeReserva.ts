import { useState, useCallback, useEffect, useMemo } from 'react';
import { validatePromoCode, createTemporaryLock, releaseTemporaryLock, extendTemporaryLock } from '../api';

type Step = 'date' | 'time' | 'summary';

const BASE_PRICE = 100; // Example base price

// Mock de disponibilidad de la API
const mockApiAvailability = {
  '2025-07-15': ['10:00', '11:00', '15:30'],
  '2025-07-16': ['09:00', '12:00'],
  '2025-07-18': ['16:00', '17:00'],
};

// Mock hook de autenticación
const useAuth = () => {
  return useMemo(() => ({
    isAuthenticated: true,
    user: {
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
    },
  }), []);
};

export const usePaginadeReserva = (professionalId: string) => {
  const { isAuthenticated, user } = useAuth();

  const [step, setStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [modality, setModality] = useState<'online' | 'presencial' | null>(null);
  const [personalNote, setPersonalNote] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('semanal');
  const [recurringSessions, setRecurringSessions] = useState(4);
  const [recurringDates, setRecurringDates] = useState<Date[]>([]);

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(BASE_PRICE);
  const [finalPrice, setFinalPrice] = useState<number>(BASE_PRICE);

  const [lockId, setLockId] = useState<string | null>(null);
  const [expirationTime, setExpirationTime] = useState<number | null>(null);
  const [canExtend, setCanExtend] = useState(true);

  // Datos del formulario que pueden ser pre-llenados
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [isAuthenticated, user]);


  // Lógica para encontrar la próxima cita disponible
  const nextAvailableSlot = useMemo(() => {
    const now = new Date();
    const sortedDates = Object.keys(mockApiAvailability).sort();

    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      if (date < now && date.toDateString() !== now.toDateString()) {
        continue; // Skip past dates
      }

      const times = mockApiAvailability[dateStr as keyof typeof mockApiAvailability].sort();
      for (const timeStr of times) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const slotDateTime = new Date(date);
        slotDateTime.setHours(hours, minutes, 0, 0);

        if (slotDateTime > now) {
          return slotDateTime; // Found the next available slot
        }
      }
    }

    return null; // No available slots in the future
  }, []);

  const reset = useCallback(() => {
    setStep('date');
    setSelectedDate(null);
    setSelectedTime(null);
    setModality(null);
    setPersonalNote('');
    setIsRecurring(false);
    setRecurringFrequency('semanal');
    setRecurringSessions(4);
    setRecurringDates([]);
    setPromoCode(null);
    setPromoError(null);
    setDiscount(0);
    setOriginalPrice(BASE_PRICE);
    setFinalPrice(BASE_PRICE);
    setLockId(null);
    setExpirationTime(null);
    setCanExtend(true);
  }, []);

  const nextStep = useCallback(() => {
    if (step === 'date') setStep('time');
    else if (step === 'time') setStep('summary');
  }, [step]);

  const prevStep = useCallback(() => {
    if (step === 'summary') setStep('time');
    else if (step === 'time') setStep('date');
  }, [step]);

  const handleTimeSelection = useCallback(async (time: string) => {
    setSelectedTime(time);
    try {
      const { lockId, expirationTime } = await createTemporaryLock(professionalId, time);
      setLockId(lockId);
      setExpirationTime(expirationTime);
      setCanExtend(true);
      nextStep();
    } catch (error) {
      console.error("Failed to lock time slot:", error);
      alert("No se pudo reservar el horario. Por favor, inténtalo de nuevo.");
      // Optionally reset selection
      setSelectedTime(null);
    }
  }, [professionalId, nextStep]);

  const handleTimerExpire = useCallback(() => {
    if (lockId) {
      releaseTemporaryLock(lockId);
      alert("Tu sesión ha expirado. Por favor, selecciona un nuevo horario.");
      reset();
    }
  }, [lockId, reset]);

  const handleExtendTimer = async () => {
    if (lockId && canExtend) {
      try {
        const { newExpirationTime } = await extendTemporaryLock(lockId);
        setExpirationTime(newExpirationTime);
        setCanExtend(false); // Can only extend once
      } catch (error) {
        console.error("Failed to extend lock:", error);
        alert("No se pudo extender el tiempo de reserva.");
      }
    }
  };

  const calculateRecurringDates = useCallback((startDate: Date, frequency: string, sessions: number) => {
    const dates: Date[] = [];
    if (!startDate) return dates;

    const interval = frequency === 'semanal' ? 7 : 14;
    for (let i = 0; i < sessions; i++) {
      const nextDate = new Date(startDate.getTime());
      nextDate.setDate(startDate.getDate() + i * interval);
      dates.push(nextDate);
    }
    return dates;
  }, []);

  useEffect(() => {
    const newOriginalPrice = isRecurring ? BASE_PRICE * recurringSessions : BASE_PRICE;
    setOriginalPrice(newOriginalPrice);
  }, [isRecurring, recurringSessions]);

  useEffect(() => {
    const newFinalPrice = originalPrice - discount;
    setFinalPrice(newFinalPrice > 0 ? newFinalPrice : 0);
  }, [originalPrice, discount]);

  // Separate effect to handle recurring dates when selectedDate changes
  useEffect(() => {
    if (isRecurring && selectedDate) {
      const dates: Date[] = [];
      const interval = recurringFrequency === 'semanal' ? 7 : 14;
      for (let i = 0; i < recurringSessions; i++) {
        const nextDate = new Date(selectedDate.getTime());
        nextDate.setDate(selectedDate.getDate() + i * interval);
        dates.push(nextDate);
      }
      setRecurringDates(dates);
    } else if (!isRecurring) {
      setRecurringDates([]);
    }
  }, [selectedDate, isRecurring, recurringFrequency, recurringSessions]);

  const handleApplyPromoCode = async (code: string) => {
    setPromoError(null);
    const result = await validatePromoCode(code);
    if (result.isValid && result.discount) {
      const discountAmount = (originalPrice * result.discount) / 100;
      setDiscount(discountAmount);
      setPromoCode(code);
    } else {
      setPromoError(result.error || 'Código no válido');
      setDiscount(0);
      setPromoCode(null);
    }
  };

  const handleRemovePromoCode = () => {
    setPromoCode(null);
    setPromoError(null);
    setDiscount(0);
  };

  const handleRecurringChange = useCallback((isRec: boolean, frequency: string, sessions: number) => {
    setIsRecurring(isRec);
    setRecurringFrequency(frequency);
    setRecurringSessions(sessions);
    if (!isRec) {
      setRecurringDates([]);
    }
    // The useEffect will handle recalculating dates when selectedDate changes
  }, []);

  const confirmBooking = async () => {
    // On successful booking, clear the lock
    if (lockId) {
        // Here you would call your final booking creation API
        console.log("Booking confirmed, lock will be released implicitly on the backend");
        setLockId(null);
        setExpirationTime(null);
    }
  };

  return {
    step,
    nextStep,
    prevStep,
    reset,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime: handleTimeSelection,
    modality,
    setModality,
    personalNote,
    setPersonalNote,
    isRecurring,
    recurringDates,
    handleRecurringChange,
    promoCode,
    promoError,
    discount,
    originalPrice,
    finalPrice,
    handleApplyPromoCode,
    handleRemovePromoCode,
    expirationTime,
    handleTimerExpire,
    handleExtendTimer,
    canExtend,
    confirmBooking,
    nextAvailableSlot,
    formData,
    setFormData,
    isAuthenticated,
    user,
  };
};

