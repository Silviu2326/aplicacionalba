import { Link } from 'react-router-dom';

const SubmissionSuccessMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-surface rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-text mb-4">¡Gracias por tu valoración!</h2>
      <p className="text-textSecondary text-center mb-6">Tu opinión ha sido enviada y será publicada tras ser revisada por nuestro equipo.</p>
      <Link
        to="/panel-usuario"
        className="bg-primary hover:bg-primaryHover text-textInverse font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        Volver al Panel de Usuario
      </Link>
    </div>
  );
};

export default SubmissionSuccessMessage;
