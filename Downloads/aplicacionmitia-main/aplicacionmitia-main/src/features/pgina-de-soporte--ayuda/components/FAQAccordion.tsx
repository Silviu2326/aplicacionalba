import { useState } from 'react';
import { Faq } from '../types';
import { ArticleFeedback } from './ArticleFeedback';

interface FAQAccordionProps {
  title: string;
  faqs: Faq[];
}

const FAQAccordion = ({ title, faqs }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="mb-8">
      {/* Header con contador */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 border border-borderLight/50">
          <span className="text-sm font-bold text-text">{faqs.length} preguntas</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="relative group">
            {/* Efecto de fondo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative bg-gradient-to-br from-surface/60 via-card/60 to-surface/60 backdrop-blur-sm rounded-xl border border-borderLight/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex justify-between items-center text-left p-6 focus:outline-none group"
              >
                <div className="flex items-start space-x-4 flex-1">
                  {/* Icono de pregunta */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    openIndex === faq.id 
                      ? 'bg-gradient-to-br from-primary to-primaryDark text-textInverse shadow-lg' 
                      : 'bg-gradient-to-br from-backgroundSecondary to-surface text-textMuted group-hover:from-primary/20 group-hover:to-secondary/20'
                  }`}>
                    <span className="text-sm font-bold">Q</span>
                  </div>
                  
                  <div className="flex-1">
                    <span className="font-bold text-text group-hover:text-primary transition-colors duration-300">
                      {faq.pregunta}
                    </span>
                  </div>
                </div>
                
                {/* Icono de expansión */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  openIndex === faq.id 
                    ? 'bg-gradient-to-br from-secondary to-secondaryDark text-textInverse shadow-lg rotate-180' 
                    : 'bg-gradient-to-br from-backgroundSecondary to-surface text-textMuted group-hover:from-secondary/20 group-hover:to-primary/20'
                }`}>
                  <svg
                    className="w-4 h-4 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </button>
              
              {/* Contenido expandible */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-borderLight/30 pt-4">
                    <div className="flex items-start space-x-4">
                      {/* Icono de respuesta */}
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-success/20 to-success/30 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-success">A</span>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-textSecondary leading-relaxed mb-4">{faq.respuesta}</p>
                        <ArticleFeedback articleId={faq.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
