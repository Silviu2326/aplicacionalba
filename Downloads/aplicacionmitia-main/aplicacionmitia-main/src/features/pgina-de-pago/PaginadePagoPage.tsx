
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePaginadePago } from './hooks/usePaginadePago';
import PriceBreakdown from './components/PriceBreakdown';
import BookingSummaryCard from './components/BookingSummaryCard';
import AlertMessage from './components/AlertMessage';
import { Button } from '../../components/Button';
import SavePaymentMethodToggle from './components/SavePaymentMethodToggle';
import { BillingAddressForm } from './components/BillingAddressForm';
import PaymentProcessingOverlay from './components/PaymentProcessingOverlay';
import { SavedPaymentMethodSelector } from './components/SavedPaymentMethodSelector';
import { StripePaymentForm } from './components/StripePaymentForm';
import TermsConsentCheckbox from './components/TermsConsentCheckbox';
import SecurityTrustBadges from './components/SecurityTrustBadges';
import ValidatedCouponField from './components/ValidatedCouponField';

const PaginadePagoPage = () => {
  const { bookingId = 'default-booking-id' } = useParams<{ bookingId: string }>();
  const {
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
    applyCoupon,
    removeCoupon,
    handlePayment,
    setBillingAddress,
    setSelectedMethodId,
    handleDeleteMethod,
  } = usePaginadePago(bookingId);

  const [hasConsented, setHasConsented] = useState(false);

  if (loading && !paymentProcessing) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-text">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-semibold">Cargando detalles...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <AlertMessage message={error} type="error" />;
  }

  if (!bookingDetails || !priceDetails) {
    return <AlertMessage message="No se encontraron detalles de la reserva." type="warning" />;
  }

  const showStripeForm = selectedMethodId === null;

  return (
    <div className="min-h-screen bg-background text-text">
      {paymentProcessing && <PaymentProcessingOverlay />}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-primary">
            Confirmación y Pago
          </h1>
          <p className="mt-4 text-lg text-textSecondary">Estás a un solo paso de confirmar tu cita.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12 items-start">
          {/* Columna Izquierda: Detalles y Desglose */}
          <div className="lg:col-span-2 space-y-8">
            <BookingSummaryCard bookingDetails={bookingDetails} />
            <PriceBreakdown subtotal={priceDetails.basePrice} discount={discount} total={priceDetails.total} />
          </div>

          {/* Columna Derecha: Pago y Acciones */}
          <div className="lg:col-span-3 bg-surface/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-borderLight">
            <h2 className="text-2xl font-bold text-text mb-6">Completa tu pago</h2>
            
            <div className="space-y-6">
              <ValidatedCouponField
                applyCoupon={applyCoupon}
                removeCoupon={removeCoupon}
                appliedCoupon={appliedCoupon}
              />

              <BillingAddressForm onSubmit={setBillingAddress} />

              {savedMethods.length > 0 && (
                <SavedPaymentMethodSelector
                  savedMethods={savedMethods}
                  onSelectMethod={setSelectedMethodId}
                  onDeleteMethod={handleDeleteMethod}
                />
              )}

              {showStripeForm && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-4 text-text">Añadir nueva tarjeta</h3>
                  <div className="p-6 bg-backgroundSecondary rounded-lg border border-border">
                    <StripePaymentForm />
                    <SavePaymentMethodToggle saveCard={saveCard} setSaveCard={setSaveCard} />
                  </div>
                </div>
              )}
              
              <TermsConsentCheckbox hasConsented={hasConsented} onConsentChange={setHasConsented} />

              <div className="mt-8">
                <Button
                  onClick={handlePayment}
                  variant="primary"
                  className="w-full text-lg py-4 font-bold tracking-wider uppercase"
                  disabled={loading || paymentProcessing || !hasConsented}
                >
                  {paymentProcessing ? 'Procesando...' : `Pagar ${priceDetails.total.toFixed(2)} €`}
                </Button>
              </div>

              <p className="text-xs text-textMuted mt-4 text-center">
                Al hacer clic en "Pagar", aceptas nuestros Términos de Servicio.
              </p>

              <SecurityTrustBadges badges={[{ src: 'https://js.stripe.com/v3/fingerprinted/img/logo-wordmark-blurple-de95d859bb35c13e36996a2fa666677c.svg', alt: 'Pago Seguro con Stripe' }, { src: 'https://cdn.worldvectorlogo.com/logos/ssl-secure.svg', alt: 'SSL Encrypted' }]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginadePagoPage;

