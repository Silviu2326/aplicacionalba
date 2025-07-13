
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs?: Faq[];
}

const FaqAccordion = ({ faqs = [] }: FaqAccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Ensure faqs is always an array to prevent filter errors
  const safeFaqs = Array.isArray(faqs) ? faqs : [];
  
  const filteredFaqs = safeFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-textSecondary" />
        </div>
        <input
          type="text"
          placeholder="Buscar en preguntas frecuentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-textPrimary placeholder-textSecondary shadow-sm hover:shadow-md"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-textSecondary hover:text-textPrimary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Results Counter */}
      {searchTerm && (
        <div className="text-sm text-textSecondary">
          {filteredFaqs.length === 0 
            ? 'No se encontraron resultados' 
            : `${filteredFaqs.length} resultado${filteredFaqs.length !== 1 ? 's' : ''} encontrado${filteredFaqs.length !== 1 ? 's' : ''}`
          }
        </div>
      )}
      
      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isExpanded = expandedItems.includes(faq.id);
          
          return (
            <div 
              key={faq.id} 
              className="group bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left hover:bg-surfaceHover transition-all duration-300 flex justify-between items-start gap-4 group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-textPrimary text-lg leading-relaxed group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </h3>
                  {!isExpanded && (
                    <p className="text-textSecondary text-sm mt-2 line-clamp-2">
                      {faq.answer.substring(0, 100)}...
                    </p>
                  )}
                </div>
                
                <div className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
                  isExpanded 
                    ? 'bg-primary text-white transform rotate-180' 
                    : 'bg-background text-textSecondary group-hover:bg-primary group-hover:text-white'
                }`}>
                  <ChevronDownIcon className="w-5 h-5" />
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="bg-background rounded-xl p-6 border-l-4 border-primary">
                    <p className="text-textSecondary leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Empty State */}
      {filteredFaqs.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-surface rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-textPrimary mb-2">
              No se encontraron preguntas
            </h3>
            <p className="text-textSecondary mb-4">
              No hay preguntas que coincidan con tu búsqueda "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-primary hover:text-primaryDark font-medium transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        </div>
      )}
      
      {/* Help Section */}
      {filteredFaqs.length > 0 && !searchTerm && (
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-textPrimary mb-2">
                ¿No encuentras lo que buscas?
              </h4>
              <p className="text-textSecondary mb-4">
                Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta adicional.
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primaryDark transition-colors duration-300 font-medium">
                Contactar Soporte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqAccordion;
