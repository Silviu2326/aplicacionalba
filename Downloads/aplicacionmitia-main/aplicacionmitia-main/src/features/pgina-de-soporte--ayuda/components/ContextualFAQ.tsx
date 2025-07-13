
import FaqAccordion from '../../pgina-de-planes-y-suscripciones/components/FaqAccordion';
import { Link } from 'react-router-dom';

interface FaqItem {
  question: string;
  answer: string;
}

interface ContextualFAQProps {
  faqs: FaqItem[];
  context: string;
}

const ContextualFAQ = ({ faqs, context }: ContextualFAQProps) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl blur-xl"></div>
      <div className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-borderLight/50">
        {/* Header del FAQ */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondaryDark rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg className="w-6 h-6 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-text via-secondary to-primary bg-clip-text text-transparent mb-2">
            Preguntas Frecuentes sobre {context}
          </h2>
          <p className="text-textMuted text-sm">Encuentra respuestas rápidas a las consultas más comunes</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="transform hover:scale-[1.02] transition-transform duration-300">
              <FaqAccordion question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30"></div>
            <Link 
              to="/soporte" 
              className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary text-textInverse font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 backdrop-blur-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Ver todas las preguntas
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextualFAQ;
