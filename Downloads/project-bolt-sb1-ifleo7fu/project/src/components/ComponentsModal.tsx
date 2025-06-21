import React, { useState } from 'react';
import { X, Package, Code, Copy, Plus, Trash2, Edit3, Layers } from 'lucide-react';

interface ComponentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Component {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: Variant[];
  props: ComponentProp[];
}

interface Variant {
  id: string;
  name: string;
  description: string;
  code: string;
}

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

export default function ComponentsModal({ isOpen, onClose }: ComponentsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('buttons');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newComponent, setNewComponent] = useState<Partial<Component>>({
    name: '',
    category: 'buttons',
    description: '',
    variants: [],
    props: []
  });

  const categories = [
    { id: 'buttons', name: 'Botones', icon: Package },
    { id: 'forms', name: 'Formularios', icon: Edit3 },
    { id: 'layout', name: 'Layout', icon: Layers },
    { id: 'navigation', name: 'Navegación', icon: Code },
    { id: 'feedback', name: 'Feedback', icon: Copy }
  ];

  const mockComponents: Component[] = [
    {
      id: '1',
      name: 'Button',
      category: 'buttons',
      description: 'Botón reutilizable con múltiples variantes',
      variants: [
        {
          id: '1',
          name: 'Primary',
          description: 'Botón principal',
          code: `<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
  {children}
</button>`
        },
        {
          id: '2',
          name: 'Secondary',
          description: 'Botón secundario',
          code: `<button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">
  {children}
</button>`
        },
        {
          id: '3',
          name: 'Outline',
          description: 'Botón con borde',
          code: `<button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition-colors">
  {children}
</button>`
        }
      ],
      props: [
        { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del botón' },
        { name: 'variant', type: 'primary | secondary | outline', required: false, defaultValue: 'primary', description: 'Variante del botón' },
        { name: 'size', type: 'sm | md | lg', required: false, defaultValue: 'md', description: 'Tamaño del botón' },
        { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Estado deshabilitado' }
      ]
    },
    {
      id: '2',
      name: 'Input',
      category: 'forms',
      description: 'Campo de entrada con validación',
      variants: [
        {
          id: '1',
          name: 'Default',
          description: 'Input básico',
          code: `<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />`
        },
        {
          id: '2',
          name: 'Error',
          description: 'Input con error',
          code: `<input className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />`
        }
      ],
      props: [
        { name: 'value', type: 'string', required: false, description: 'Valor del input' },
        { name: 'placeholder', type: 'string', required: false, description: 'Texto placeholder' },
        { name: 'error', type: 'boolean', required: false, defaultValue: 'false', description: 'Estado de error' },
        { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Estado deshabilitado' }
      ]
    }
  ];

  const [components, setComponents] = useState<Component[]>(mockComponents);

  if (!isOpen) return null;

  const filteredComponents = components.filter(comp => comp.category === selectedCategory);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías agregar una notificación de éxito
  };

  const addNewVariant = () => {
    if (!newComponent.variants) newComponent.variants = [];
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: 'Nueva Variante',
      description: '',
      code: ''
    };
    setNewComponent(prev => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant]
    }));
  };

  const addNewProp = () => {
    if (!newComponent.props) newComponent.props = [];
    const newProp: ComponentProp = {
      name: '',
      type: 'string',
      required: false,
      description: ''
    };
    setNewComponent(prev => ({
      ...prev,
      props: [...(prev.props || []), newProp]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-full max-w-6xl h-[80vh]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Componentes Reutilizables</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-300 border border-green-400/30 rounded-md hover:bg-green-500/30 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Componente</span>
            </button>
            <button onClick={onClose} className="text-gray-300 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex h-full space-x-6">
          {/* Sidebar de Categorías */}
          <div className="w-64 space-y-2">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Categorías</h4>
            {categories.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md transition-colors text-left ${
                  selectedCategory === id
                    ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </button>
            ))}
          </div>

          {/* Lista de Componentes */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-white">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h4>
              <span className="text-sm text-gray-400">
                {filteredComponents.length} componentes
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  onClick={() => setSelectedComponent(component)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedComponent?.id === component.id
                      ? 'bg-blue-500/20 border-blue-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-white">{component.name}</h5>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                      {component.variants.length} variantes
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{component.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {component.variants.slice(0, 3).map((variant) => (
                      <span
                        key={variant.id}
                        className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                      >
                        {variant.name}
                      </span>
                    ))}
                    {component.variants.length > 3 && (
                      <span className="text-xs text-gray-400">+{component.variants.length - 3} más</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Detalles del Componente Seleccionado */}
            {selectedComponent && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-medium text-white">{selectedComponent.name}</h5>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(selectedComponent, null, 2))}
                    className="flex items-center space-x-1 text-sm text-blue-300 hover:text-blue-200"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copiar JSON</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Variantes */}
                  <div>
                    <h6 className="text-sm font-medium text-gray-300 mb-3">Variantes</h6>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {selectedComponent.variants.map((variant) => (
                        <div key={variant.id} className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-white">{variant.name}</span>
                            <button
                              onClick={() => copyToClipboard(variant.code)}
                              className="text-xs text-blue-300 hover:text-blue-200"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{variant.description}</p>
                          <pre className="text-xs bg-black/20 p-2 rounded overflow-x-auto">
                            <code className="text-green-300">{variant.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Props */}
                  <div>
                    <h6 className="text-sm font-medium text-gray-300 mb-3">Props</h6>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedComponent.props.map((prop, index) => (
                        <div key={index} className="p-2 bg-white/5 rounded border border-white/10">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white text-sm">{prop.name}</span>
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-1 rounded">
                              {prop.type}
                            </span>
                            {prop.required && (
                              <span className="text-xs bg-red-500/20 text-red-300 px-1 rounded">
                                requerido
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{prop.description}</p>
                          {prop.defaultValue && (
                            <p className="text-xs text-gray-500">Default: {prop.defaultValue}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md hover:bg-white/20 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              console.log('Componentes exportados:', components);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-md hover:bg-green-500/30 transition-colors"
          >
            Exportar Componentes
          </button>
        </div>
      </div>
    </div>
  );
}