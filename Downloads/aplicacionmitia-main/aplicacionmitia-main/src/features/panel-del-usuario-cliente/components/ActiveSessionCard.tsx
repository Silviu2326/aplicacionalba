
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';

interface ActiveSessionCardProps {
  professionalName: string;
  startTime: Date;
  meetingUrl: string;
}

const ActiveSessionCard = ({ professionalName, startTime, meetingUrl }: ActiveSessionCardProps) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = startTime.getTime() - now.getTime();

      if (difference > 0) {
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        
        // Enable button 5 minutes before session
        if (difference <= 5 * 60 * 1000) {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
        }

      } else {
        setTimeLeft('En curso');
        setIsButtonDisabled(false);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [startTime]);

  const handleJoinSession = () => {
    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-down">
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-text">Tu sesión con {professionalName} está a punto de comenzar.</h3>
        <p className="text-textSecondary">
          Tiempo restante: <span className="font-semibold text-accent">{timeLeft}</span>
        </p>
      </div>
      <Button 
        onClick={handleJoinSession} 
        disabled={isButtonDisabled}
        className="w-full md:w-auto"
      >
        Unirse a la Sesión
      </Button>
    </div>
  );
};

export default ActiveSessionCard;
