
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizStep from './QuizStep';
import { Button } from '../../../components/Button';

const quizSteps = [
  {
    question: '¿Cuál es tu principal preocupación?',
    options: [
      { value: 'ansiedad', label: 'Ansiedad', icon: '😟' },
      { value: 'depresion', label: 'Depresión', icon: '😢' },
      { value: 'estres', label: 'Estrés', icon: '😫' },
      { value: 'pareja', label: 'Terapia de Pareja', icon: '💔' },
    ],
    key: 'especialidad',
  },
  {
    question: '¿Qué modalidad de terapia prefieres?',
    options: [
      { value: 'online', label: 'Online', icon: '💻' },
      { value: 'presencial', label: 'Presencial', icon: '🗣️' },
    ],
    key: 'modalidad',
  },
  {
    question: '¿Tienes alguna preferencia de género para tu terapeuta?',
    options: [
        { value: 'masculino', label: 'Masculino', icon: '👨‍⚕️' },
        { value: 'femenino', label: 'Femenino', icon: '👩‍⚕️' },
        { value: 'indiferente', label: 'Sin Preferencia', icon: '🤷‍♂️' },
    ],
    key: 'genero',
  },
];

const InteractiveQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSelect = (value: string) => {
    const currentQuizStep = quizSteps[currentStep];
    const newAnswers = { ...answers, [currentQuizStep.key]: value };
    setAnswers(newAnswers);

    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const queryParams = new URLSearchParams(newAnswers).toString();
      navigate(`/search?${queryParams}`);
    }
  };

  const handleSkip = () => {
    navigate('/search');
  };

  return (
    <div className="bg-backgroundSecondary p-8 rounded-lg shadow-inner">
      <QuizStep
        question={quizSteps[currentStep].question}
        options={quizSteps[currentStep].options}
        onSelect={handleSelect}
      />
      <div className="text-center mt-6">
        <Button onClick={handleSkip} variant="secondary">Saltar cuestionario</Button>
      </div>
    </div>
  );
};

export default InteractiveQuiz;
