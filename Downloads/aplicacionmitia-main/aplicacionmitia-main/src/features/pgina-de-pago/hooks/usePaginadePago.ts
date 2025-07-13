import { useState, useEffect, useCallback } from 'react';
import {
  fetchBookingDetails,
  processPayment,
  getSavedPaymentMethods,
  deletePaymentMethod,
  validateCoupon,
} from '../api';

interface SavedPaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
  };
}

interface BillingAddress {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PriceDetails {
  basePrice: number;
  taxes: number;
  platformFee: number;
  discount?: number;
  total: number;
}

interface BookingDetails {
  bookingId: string;
  professionalName: string;
  sessionDate: string;
  priceDetails: PriceDetails;
}

export const usePaginadePago = (bookingId: string) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [billingAddress, setBillingAddress] = useState<BillingAddress | null>(null);
  const [savedMethods, setSavedMethods] = useState<SavedPaymentMethod[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saveCard, setSaveCard] = useState<boolean>(false);
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        setLoading(true);
        const [details, methods] = await Promise.all([
          fetchBookingDetails(bookingId),
          getSavedPaymentMethods(),
        ]);
        setBookingDetails(details);
        setPriceDetails(details.priceDetails);
        setSavedMethods(methods);
        if (methods.length > 0) {
          setSelectedMethodId(methods[0].id);
        }
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los datos de la página de pago.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      getInitialData();
    }
  }, [bookingId]);

  const applyCoupon = useCallback(async (code: string) => {
    try {
      setLoading(true);
      const { isValid, discount } = await validateCoupon(code);
      if (isValid) {
        setAppliedCoupon(code);
        setDiscount(discount);
        if (priceDetails) {
          const newTotal = priceDetails.basePrice + priceDetails.taxes + priceDetails.platformFee - discount;
          setPriceDetails({ ...priceDetails, discount, total: newTotal });
        }
        setError(null);
        return true;
      } else {
        setError('El código del cupón no es válido.');
        return false;
      }
    } catch (err) {
      setError('No se pudo aplicar el código de descuento.');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [priceDetails]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setDiscount(0);
    if (priceDetails) {
      const newTotal = priceDetails.basePrice + priceDetails.taxes + priceDetails.platformFee;
      setPriceDetails({ ...priceDetails, discount: 0, total: newTotal });
    }
  }, [priceDetails]);

  const handleDeleteMethod = useCallback(async (methodId: string) => {
    try {
      await deletePaymentMethod(methodId);
      setSavedMethods((prevMethods) => prevMethods.filter((method) => method.id !== methodId));
      if (selectedMethodId === methodId) {
        setSelectedMethodId(savedMethods.length > 1 ? savedMethods.find(m => m.id !== methodId)!.id : null);
      }
    } catch (err) {
      setError('No se pudo eliminar el método de pago.');
      console.error(err);
    }
  }, [selectedMethodId, savedMethods]);

  const handlePayment = useCallback(async () => {
    if (!bookingId) return;

    try {
      setPaymentProcessing(true);
      await processPayment(bookingId, {
        paymentMethodId: selectedMethodId,
        saveMethod: saveCard,
        billingAddress: billingAddress,
      });
      setError(null);
      alert('Pago procesado con éxito!');
    } catch (err) {
      setError('Ocurrió un error al procesar el pago.');
      console.error(err);
    } finally {
      setPaymentProcessing(false);
    }
  }, [bookingId, saveCard, billingAddress, selectedMethodId]);

  return {
    loading,
    error,
    bookingDetails,
    priceDetails,
    savedMethods,
    selectedMethodId,
    saveCard,
    paymentProcessing,
    appliedCoupon,
    discount,
    setSaveCard,
    setBillingAddress,
    setSelectedMethodId,
    applyCoupon,
    removeCoupon,
    handlePayment,
    handleDeleteMethod,
  };
};
