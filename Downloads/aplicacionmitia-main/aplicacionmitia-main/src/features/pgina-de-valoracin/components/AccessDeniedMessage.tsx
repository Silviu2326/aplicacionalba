interface AccessDeniedMessageProps {
    message: string;
  }
  
  export const AccessDeniedMessage = ({ message }: AccessDeniedMessageProps) => {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <h1 className="text-2xl font-bold text-error mb-4">Acceso Denegado</h1>
        <p className="text-textSecondary">{message}</p>
      </div>
    );
  };