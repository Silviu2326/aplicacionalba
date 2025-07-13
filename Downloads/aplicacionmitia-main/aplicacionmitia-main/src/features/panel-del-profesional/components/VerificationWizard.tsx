
import React, { useState, useCallback } from 'react';
import { UploadCloud, FileCheck, FileClock, FileWarning, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

type StepStatus = 'pending' | 'uploaded' | 'verified' | 'rejected';

interface DocumentStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  file?: File;
  rejectionReason?: string;
}

const initialSteps: DocumentStep[] = [
  { id: 'id_document', title: 'Documento de Identidad', description: 'Sube una foto o escaneo de tu DNI, pasaporte o carnet de extranjería.', status: 'pending' },
  { id: 'degree_document', title: 'Título Profesional', description: 'Sube una copia de tu título universitario o certificado equivalente.', status: 'pending' },
  { id: 'collegiate_document', title: 'Certificado de Colegiación', description: 'Sube tu certificado de colegiación vigente.', status: 'pending' },
];

const StatusIndicator: React.FC<{ status: StepStatus }> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <div className="flex items-center text-textMuted"><FileClock className="w-4 h-4 mr-2" /> Pendiente</div>;
    case 'uploaded':
      return <div className="flex items-center text-warning"><FileClock className="w-4 h-4 mr-2" /> En Revisión</div>;
    case 'verified':
      return <div className="flex items-center text-success"><FileCheck className="w-4 h-4 mr-2" /> Verificado</div>;
    case 'rejected':
      return <div className="flex items-center text-error"><FileWarning className="w-4 h-4 mr-2" /> Requiere Acción</div>;
    default:
      return null;
  }
};

const FileDropzone: React.FC<{ onFileDrop: (file: File) => void, file?: File }> = ({ onFileDrop, file }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileDrop(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragging ? 'border-primary bg-surface' : 'border-border'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="file" id="file-upload" className="sr-only" onChange={handleFileChange} accept="application/pdf,image/jpeg,image/png" />
      <label htmlFor="file-upload" className="cursor-pointer">
        <UploadCloud className="w-12 h-12 mx-auto text-textMuted mb-4" />
        {file ? (
          <div>
            <p className="text-text font-semibold">{file.name}</p>
            <p className="text-textMuted text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
            <span className="text-primary mt-2 inline-block">Cambiar archivo</span>
          </div>
        ) : (
          <div>
            <p className="text-text font-semibold">Arrastra y suelta tu archivo aquí</p>
            <p className="text-textMuted text-sm">o haz clic para seleccionarlo</p>
            <p className="text-xs text-textMuted mt-4">PDF, JPG, PNG (Máx 5MB)</p>
          </div>
        )}
      </label>
    </div>
  );
};


const VerificationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<DocumentStep[]>(initialSteps);

  const handleFileDrop = useCallback((file: File) => {
    // Basic file validation
    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('El archivo es demasiado grande. El máximo es 5MB.');
      return;
    }
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      alert('Tipo de archivo no válido. Sube un PDF, JPG o PNG.');
      return;
    }

    const newSteps = [...steps];
    newSteps[currentStep].file = file;
    newSteps[currentStep].status = 'uploaded';
    setSteps(newSteps);
  }, [currentStep, steps]);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const isAllVerified = steps.every(step => step.status === 'verified');

  if (isAllVerified) {
    return (
      <div className="bg-card p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-text mb-2">¡Perfil Verificado!</h2>
        <p className="text-textMuted">Todos tus documentos han sido aprobados. Tu perfil ahora muestra la insignia de verificación.</p>
      </div>
    );
  }

  const activeStep = steps[currentStep];

  return (
    <div className="bg-backgroundSecondary p-6 sm:p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-text mb-2">Verificación de Credenciales</h1>
      <p className="text-textMuted mb-8">Completa los siguientes pasos para verificar tu perfil profesional.</p>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index <= currentStep ? 'bg-primary border-primary' : 'bg-surface border-border'}`}>
                {step.status === 'verified' ? <CheckCircle className="w-6 h-6 text-white" /> : <span className="text-text font-bold">{index + 1}</span>}
              </div>
              <p className={`mt-2 text-xs font-medium ${index <= currentStep ? 'text-text' : 'text-textMuted'}`}>{step.title}</p>
            </div>
            {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-border'}`}></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="bg-card p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-text">{activeStep.title}</h2>
            <p className="text-textMuted text-sm mt-1">{activeStep.description}</p>
          </div>
          <StatusIndicator status={activeStep.status} />
        </div>

        {activeStep.status === 'rejected' && (
          <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded-md mb-6">
            <h4 className="font-bold">Motivo del rechazo:</h4>
            <p className="text-sm">{activeStep.rejectionReason || 'Por favor, vuelve a subir un documento válido.'}</p>
          </div>
        )}

        <FileDropzone onFileDrop={handleFileDrop} file={activeStep.file} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={goToPrevStep} 
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 bg-surface text-text rounded-md hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </button>
        {currentStep < steps.length - 1 ? (
          <button 
            onClick={goToNextStep} 
            disabled={!activeStep.file}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryHover disabled:bg-muted disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button 
            disabled={!activeStep.file}
            className="px-6 py-2 bg-success text-white font-bold rounded-md hover:bg-successDark disabled:bg-muted disabled:cursor-not-allowed transition-colors"
          >
            Finalizar Verificación
          </button>
        )}
      </div>
    </div>
  );
};

export default VerificationWizard;
