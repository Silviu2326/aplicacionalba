import { Link } from 'react-router-dom';

const CompatibilityNotice = () => {
  return (
    <div className="bg-warning/10 border-l-4 border-warning text-warning-dark p-4 rounded-lg shadow-md" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-warning mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-text">Navegador no compatible</p>
          <p className="text-sm text-textSecondary">
            La función de instalación de la aplicación no está disponible en tu navegador actual.
          </p>
          <p className="text-sm mt-2 text-textMuted">
            Te recomendamos usar Google Chrome, Microsoft Edge o Safari en iOS para la mejor experiencia.
          </p>
          <Link to="/" className="mt-4 inline-block bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityNotice;
