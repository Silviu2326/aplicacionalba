import { Button } from "../../../components/Button";

interface PaymentSuccessProps {
  bookingDetails: {
    professional: string;
    date: string;
    time: string;
    transactionId: string;
  };
  onGoToDashboard: () => void;
}

export const PaymentSuccess = ({ bookingDetails, onGoToDashboard }: PaymentSuccessProps) => {
  return (
    <div className="bg-card p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-success"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-text mt-4">¡Pago Realizado con Éxito!</h2>
        <p className="text-textMuted mt-2">
          Tu reserva ha sido confirmada. Revisa tu correo electrónico para ver el recibo.
        </p>
      </div>

      <div className="bg-backgroundSecondary p-6 rounded-lg text-left mb-6">
        <h3 className="text-lg font-semibold text-textSecondary mb-4">Detalles de la Reserva</h3>
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-textMuted">Profesional:</span>{" "}
            <span className="text-text">{bookingDetails.professional}</span>
          </p>
          <p>
            <span className="font-semibold text-textMuted">Fecha:</span>{" "}
            <span className="text-text">{bookingDetails.date}</span>
          </p>
          <p>
            <span className="font-semibold text-textMuted">Hora:</span>{" "}
            <span className="text-text">{bookingDetails.time}</span>
          </p>
          <p>
            <span className="font-semibold text-textMuted">ID de Transacción:</span>{" "}
            <span className="text-text">{bookingDetails.transactionId}</span>
          </p>
        </div>
      </div>

      <Button onClick={onGoToDashboard} className="w-full">
        Ir al Panel de Usuario
      </Button>
    </div>
  );
};
