// src/features/pgina-de-planes-y-suscripciones/components/AddonSelector.tsx
import { Addon } from '../types';

interface AddonSelectorProps {
  addons: Addon[];
  selectedAddons: Addon[];
  onAddonToggle: (addon: Addon) => void;
}

export function AddonSelector({ addons, selectedAddons, onAddonToggle }: AddonSelectorProps) {
  if (addons.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-2xl font-bold text-text mb-2">¡Perfecto!</h3>
        <p className="text-textSecondary">
          Este plan incluye todo lo que necesitas para empezar.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-text mb-3">
          🚀 Potencia tu Plan con Add-ons
        </h3>
        <p className="text-textSecondary text-lg">
          Añade funcionalidades premium para llevar tu práctica al siguiente nivel
        </p>
      </div>
      
      <div className="space-y-4">
        {addons.map((addon) => {
          const isSelected = selectedAddons.some((a) => a.id === addon.id);
          
          return (
            <div 
              key={addon.id} 
              className={`group relative border-2 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-105 ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20' 
                  : 'border-borderLight bg-card hover:border-primary/50 hover:shadow-lg'
              }`}
              onClick={() => onAddonToggle(addon)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className={`w-3 h-3 rounded-full mr-3 transition-colors duration-300 ${
                      isSelected ? 'bg-primary' : 'bg-muted'
                    }`}></div>
                    <h4 className="font-bold text-xl text-text group-hover:text-primary transition-colors duration-300">
                      {addon.name}
                    </h4>
                  </div>
                  
                  <p className="text-textSecondary mb-4 leading-relaxed">
                    {addon.description}
                  </p>
                  
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-primary">+${addon.price}</span>
                    <span className="text-textMuted ml-2">/mes</span>
                  </div>
                </div>
                
                <div className="ml-6">
                  <div className={`relative w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary bg-primary' 
                      : 'border-borderLight group-hover:border-primary'
                  }`}>
                    {isSelected && (
                      <svg 
                        className="w-4 h-4 text-textInverse absolute top-0.5 left-0.5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-5 pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedAddons.length > 0 && (
        <div className="mt-8 p-6 bg-success/10 border border-success/30 rounded-2xl">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-bold text-success text-lg">
              {selectedAddons.length} Add-on{selectedAddons.length > 1 ? 's' : ''} seleccionado{selectedAddons.length > 1 ? 's' : ''}
            </h4>
          </div>
          <p className="text-success/80 text-sm">
            Estos complementos se añadirán a tu plan mensual y podrás cancelarlos en cualquier momento.
          </p>
        </div>
      )}
    </div>
  );
}