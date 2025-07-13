
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';

interface BookingPanelProps {
  price: number;
  professionalId: string;
}

export const BookingPanel = ({ price, professionalId }: BookingPanelProps) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${professionalId}`);
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-card/90 to-surface/80 backdrop-blur-sm border border-borderLight/50 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
        {/* Header con precio destacado */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-warning rounded-2xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-r from-accent/20 to-warning/20 backdrop-blur-sm border border-accent/30 rounded-2xl px-6 py-4">
              <p className="text-sm text-textSecondary font-medium mb-1">Desde</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                {price}€
              </p>
              <p className="text-sm text-textMuted">/sesión</p>
            </div>
          </div>
        </div>

        {/* Botones de acción mejorados */}
        <div className="space-y-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <Button 
              onClick={handleBooking}
              variant="primary"
              className="relative w-full bg-gradient-primary hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-4 text-lg font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Reservar Cita
            </Button>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-secondary rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Button 
              variant="secondary"
              className="relative w-full bg-gradient-to-r from-secondary/20 to-success/20 backdrop-blur-sm border border-secondary/30 hover:border-secondary/50 text-secondary hover:text-white hover:bg-gradient-secondary transform hover:scale-105 transition-all duration-300 py-4 text-lg font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contactar
            </Button>
          </div>
        </div>

        {/* Características destacadas */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-textSecondary">Confirmación inmediata</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <span className="text-textSecondary">Pago seguro</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-textSecondary">Cancelación gratuita 24h antes</span>
          </div>
        </div>

        {/* Footer con garantía */}
        <div className="text-center pt-4 border-t border-border/30">
          <div className="flex items-center justify-center gap-2 text-xs text-textMuted">
            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Plataforma verificada y segura</span>
          </div>
        </div>
      </div>
    </div>
  );
};
