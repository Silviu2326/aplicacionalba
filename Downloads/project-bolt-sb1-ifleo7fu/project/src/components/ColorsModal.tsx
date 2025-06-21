import React, { useState, useEffect } from 'react';
import { X, Palette, Eye, Paintbrush, Contrast, Star, Copy, RotateCcw, Info, Sun, Moon, Smartphone, Monitor, ChevronDown, ChevronUp, Undo2, Download, Upload, Sparkles } from 'lucide-react';

interface ColorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  category?: string;
  shades?: {
    primary: string[];
    secondary: string[];
    accent: string[];
    neutral: string[];
  };
}

interface ColorHistory {
  colors: typeof customColors;
  theme: string;
  timestamp: number;
}

export default function ColorsModal({ isOpen, onClose }: ColorsModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  const [favorites, setFavorites] = useState<string[]>(['default']);
  const [customColors, setCustomColors] = useState({
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#1F2937',
    text: '#F9FAFB'
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isResponsiveMode, setIsResponsiveMode] = useState(false);
  const [colorBlindnessFilter, setColorBlindnessFilter] = useState<'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'>('none');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['basic']);
  const [colorHistory, setColorHistory] = useState<ColorHistory[]>([]);
  const [showAdvancedThemes, setShowAdvancedThemes] = useState(false);

  const predefinedThemes: ColorTheme[] = [
    // Básicos
    {
      name: 'default',
      category: 'basic',
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      background: '#1F2937',
      text: '#F9FAFB',
      shades: {
        primary: ['#EFF6FF', '#DBEAFE', '#3B82F6', '#1D4ED8', '#1E3A8A'],
        secondary: ['#ECFDF5', '#D1FAE5', '#10B981', '#047857', '#064E3B'],
        accent: ['#FFFBEB', '#FEF3C7', '#F59E0B', '#D97706', '#92400E'],
        neutral: ['#F9FAFB', '#6B7280', '#1F2937']
      }
    },
    {
      name: 'dark',
      category: 'basic',
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      background: '#111827',
      text: '#F3F4F6',
      shades: {
        primary: ['#EEF2FF', '#E0E7FF', '#6366F1', '#4F46E5', '#3730A3'],
        secondary: ['#F5F3FF', '#EDE9FE', '#8B5CF6', '#7C3AED', '#5B21B6'],
        accent: ['#FDF2F8', '#FCE7F3', '#EC4899', '#DB2777', '#BE185D'],
        neutral: ['#F9FAFB', '#6B7280', '#111827']
      }
    },
    {
      name: 'ocean',
      category: 'basic',
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#14B8A6',
      background: '#0F172A',
      text: '#E2E8F0',
      shades: {
        primary: ['#F0F9FF', '#E0F2FE', '#0EA5E9', '#0284C7', '#0C4A6E'],
        secondary: ['#ECFEFF', '#CFFAFE', '#06B6D4', '#0891B2', '#164E63'],
        accent: ['#F0FDFA', '#CCFBF1', '#14B8A6', '#0D9488', '#134E4A'],
        neutral: ['#F8FAFC', '#64748B', '#0F172A']
      }
    },
    {
      name: 'sunset',
      category: 'basic',
      primary: '#F97316',
      secondary: '#EF4444',
      accent: '#F59E0B',
      background: '#7C2D12',
      text: '#FEF7FF',
      shades: {
        primary: ['#FFF7ED', '#FFEDD5', '#F97316', '#EA580C', '#9A3412'],
        secondary: ['#FEF2F2', '#FECACA', '#EF4444', '#DC2626', '#991B1B'],
        accent: ['#FFFBEB', '#FEF3C7', '#F59E0B', '#D97706', '#92400E'],
        neutral: ['#FEF7FF', '#A78BFA', '#7C2D12']
      }
    },
    {
      name: 'forest',
      category: 'basic',
      primary: '#059669',
      secondary: '#065F46',
      accent: '#84CC16',
      background: '#064E3B',
      text: '#ECFDF5',
      shades: {
        primary: ['#ECFDF5', '#D1FAE5', '#059669', '#047857', '#064E3B'],
        secondary: ['#F0FDF4', '#DCFCE7', '#065F46', '#166534', '#14532D'],
        accent: ['#F7FEE7', '#ECFCCB', '#84CC16', '#65A30D', '#365314'],
        neutral: ['#ECFDF5', '#6EE7B7', '#064E3B']
      }
    },
    // Material 3 / Tailwind
    {
      name: 'blue',
      category: 'material',
      primary: '#2563EB',
      secondary: '#1E40AF',
      accent: '#3B82F6',
      background: '#1E293B',
      text: '#F1F5F9',
      shades: {
        primary: ['#EFF6FF', '#DBEAFE', '#2563EB', '#1D4ED8', '#1E3A8A'],
        secondary: ['#EFF6FF', '#DBEAFE', '#1E40AF', '#1E3A8A', '#172554'],
        accent: ['#EFF6FF', '#DBEAFE', '#3B82F6', '#2563EB', '#1D4ED8'],
        neutral: ['#F1F5F9', '#64748B', '#1E293B']
      }
    },
    {
      name: 'rose',
      category: 'material',
      primary: '#E11D48',
      secondary: '#BE123C',
      accent: '#F43F5E',
      background: '#1F1F23',
      text: '#FFF1F2',
      shades: {
        primary: ['#FFF1F2', '#FFE4E6', '#E11D48', '#BE123C', '#9F1239'],
        secondary: ['#FFF1F2', '#FFE4E6', '#BE123C', '#9F1239', '#881337'],
        accent: ['#FFF1F2', '#FFE4E6', '#F43F5E', '#E11D48', '#BE123C'],
        neutral: ['#FFF1F2', '#9CA3AF', '#1F1F23']
      }
    },
    {
      name: 'emerald',
      category: 'material',
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
      background: '#1F2937',
      text: '#ECFDF5',
      shades: {
        primary: ['#ECFDF5', '#D1FAE5', '#10B981', '#059669', '#047857'],
        secondary: ['#ECFDF5', '#D1FAE5', '#059669', '#047857', '#065F46'],
        accent: ['#ECFDF5', '#D1FAE5', '#34D399', '#10B981', '#059669'],
        neutral: ['#ECFDF5', '#6B7280', '#1F2937']
      }
    },
    // Pasteles
    {
      name: 'lavender',
      category: 'pastel',
      primary: '#A78BFA',
      secondary: '#C4B5FD',
      accent: '#DDD6FE',
      background: '#F8FAFC',
      text: '#1E293B',
      shades: {
        primary: ['#F5F3FF', '#EDE9FE', '#A78BFA', '#8B5CF6', '#7C3AED'],
        secondary: ['#F5F3FF', '#EDE9FE', '#C4B5FD', '#A78BFA', '#8B5CF6'],
        accent: ['#F5F3FF', '#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA'],
        neutral: ['#F8FAFC', '#64748B', '#1E293B']
      }
    },
    {
      name: 'mint',
      category: 'pastel',
      primary: '#6EE7B7',
      secondary: '#9CA3AF',
      accent: '#FDE68A',
      background: '#F9FAFB',
      text: '#1F2937',
      shades: {
        primary: ['#ECFDF5', '#D1FAE5', '#6EE7B7', '#34D399', '#10B981'],
        secondary: ['#F9FAFB', '#F3F4F6', '#9CA3AF', '#6B7280', '#4B5563'],
        accent: ['#FFFBEB', '#FEF3C7', '#FDE68A', '#FBBF24', '#F59E0B'],
        neutral: ['#F9FAFB', '#6B7280', '#1F2937']
      }
    },
    {
      name: 'peach',
      category: 'pastel',
      primary: '#FDBA74',
      secondary: '#FCA5A5',
      accent: '#A7F3D0',
      background: '#FEF7FF',
      text: '#7C2D12',
      shades: {
        primary: ['#FFF7ED', '#FFEDD5', '#FDBA74', '#FB923C', '#F97316'],
        secondary: ['#FEF2F2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444'],
        accent: ['#F0FDF4', '#DCFCE7', '#A7F3D0', '#6EE7B7', '#34D399'],
        neutral: ['#FEF7FF', '#A78BFA', '#7C2D12']
      }
    },
    // Alto contraste
    {
      name: 'charcoal-lime',
      category: 'high-contrast',
      primary: '#84CC16',
      secondary: '#65A30D',
      accent: '#FACC15',
      background: '#0A0A0A',
      text: '#FAFAFA',
      shades: {
        primary: ['#F7FEE7', '#ECFCCB', '#84CC16', '#65A30D', '#365314'],
        secondary: ['#F7FEE7', '#ECFCCB', '#65A30D', '#4D7C0F', '#365314'],
        accent: ['#FEFCE8', '#FEF3C7', '#FACC15', '#EAB308', '#CA8A04'],
        neutral: ['#FAFAFA', '#737373', '#0A0A0A']
      }
    },
    {
      name: 'neon-dark',
      category: 'high-contrast',
      primary: '#00FF88',
      secondary: '#FF0080',
      accent: '#00D4FF',
      background: '#000000',
      text: '#FFFFFF',
      shades: {
        primary: ['#F0FDF4', '#DCFCE7', '#00FF88', '#00CC6A', '#00994D'],
        secondary: ['#FDF2F8', '#FCE7F3', '#FF0080', '#E11D48', '#BE123C'],
        accent: ['#F0F9FF', '#E0F2FE', '#00D4FF', '#0EA5E9', '#0284C7'],
        neutral: ['#FFFFFF', '#808080', '#000000']
      }
    }
  ];

  // Funciones utilitarias
  const saveToHistory = () => {
    const newEntry: ColorHistory = {
      colors: customColors,
      theme: selectedTheme,
      timestamp: Date.now()
    };
    setColorHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Mantener solo 10 entradas
  };

  const undoLastChange = () => {
    if (colorHistory.length > 0) {
      const lastEntry = colorHistory[0];
      setCustomColors(lastEntry.colors);
      setSelectedTheme(lastEntry.theme);
      setColorHistory(prev => prev.slice(1));
      setHasUnsavedChanges(true);
    }
  };

  const generateColorShades = (baseColor: string): string[] => {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const shades = [];
    const steps = [0.95, 0.8, 1, 0.7, 0.4]; // 50, 200, 500, 700, 900
    
    for (const step of steps) {
      const newR = Math.round(r * step + (255 * (1 - step)));
      const newG = Math.round(g * step + (255 * (1 - step)));
      const newB = Math.round(b * step + (255 * (1 - step)));
      shades.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
    }
    
    return shades;
  };

  const applyColorBlindnessFilter = (color: string): string => {
    if (colorBlindnessFilter === 'none') return color;
    
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    let newR = r, newG = g, newB = b;
    
    switch (colorBlindnessFilter) {
      case 'protanopia':
        newR = 0.567 * r + 0.433 * g;
        newG = 0.558 * r + 0.442 * g;
        break;
      case 'deuteranopia':
        newR = 0.625 * r + 0.375 * g;
        newG = 0.7 * r + 0.3 * g;
        break;
      case 'tritanopia':
        newG = 0.95 * g + 0.05 * b;
        newB = 0.433 * g + 0.567 * b;
        break;
    }
    
    const toHex = (val: number) => Math.round(val * 255).toString(16).padStart(2, '0');
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  };

  const importColors = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const config = JSON.parse(e.target?.result as string);
            if (config.colors) {
              setCustomColors(config.colors);
              setSelectedTheme(config.theme || 'custom');
              setHasUnsavedChanges(true);
            }
          } catch (error) {
            console.error('Error importing colors:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const exportColorsToFile = () => {
    const config = {
      theme: selectedTheme,
      colors: customColors,
      timestamp: Date.now(),
      tailwindConfig: {
        theme: {
          extend: {
            colors: {
              primary: customColors.primary,
              secondary: customColors.secondary,
              accent: customColors.accent
            }
          }
        }
      }
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `color-theme-${selectedTheme}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryName = (category: string) => {
    const names = {
      basic: 'Básicos',
      material: 'Material 3',
      pastel: 'Pasteles',
      'high-contrast': 'Alto Contraste'
    };
    return names[category as keyof typeof names] || category;
  };

  // Efecto para guardar en historial cuando cambian los colores
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(saveToHistory, 1000);
      return () => clearTimeout(timer);
    }
  }, [customColors, selectedTheme]);

  if (!isOpen) return null;

  const handleColorChange = (colorKey: string, value: string) => {
    saveToHistory();
    setCustomColors(prev => ({ ...prev, [colorKey]: value }));
    setHasUnsavedChanges(true);
  };

  const applyTheme = (theme: ColorTheme) => {
    saveToHistory();
    setCustomColors({
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent,
      background: theme.background,
      text: theme.text
    });
    setHasUnsavedChanges(false);
  };

  const toggleFavorite = (themeName: string) => {
    setFavorites(prev => 
      prev.includes(themeName) 
        ? prev.filter(name => name !== themeName)
        : [...prev, themeName]
    );
  };

  const resetToDefault = () => {
    const defaultTheme = predefinedThemes.find(t => t.name === 'default')!;
    applyTheme(defaultTheme);
    setSelectedTheme('default');
  };

  const exportColors = () => {
    const config = {
      theme: selectedTheme,
      colors: customColors,
      tailwindConfig: {
        theme: {
          extend: {
            colors: {
              primary: customColors.primary,
              secondary: customColors.secondary,
              accent: customColors.accent
            }
          }
        }
      }
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
  };

  const checkContrast = (bg: string, text: string) => {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    // Calculate relative luminance
    const getLuminance = (rgb: {r: number, g: number, b: number}) => {
      const sRGB = [rgb.r, rgb.g, rgb.b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    };

    const bgRgb = hexToRgb(bg);
    const textRgb = hexToRgb(text);
    const bgLum = getLuminance(bgRgb);
    const textLum = getLuminance(textRgb);
    
    // Calculate contrast ratio
    const lighter = Math.max(bgLum, textLum);
    const darker = Math.min(bgLum, textLum);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const sortedThemes = [...predefinedThemes].sort((a, b) => {
    const aFav = favorites.includes(a.name) ? 0 : 1;
    const bFav = favorites.includes(b.name) ? 0 : 1;
    return aFav - bFav;
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Palette className="h-6 w-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Configuración de Colores</h3>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Temas Predefinidos */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Temas Predefinidos
              </h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={importColors}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  title="Importar colores"
                >
                  <Upload className="h-4 w-4" />
                </button>
                <button
                  onClick={exportColorsToFile}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  title="Exportar colores"
                >
                  <Download className="h-4 w-4" />
                </button>
                {colorHistory.length > 0 && (
                  <button
                    onClick={undoLastChange}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    title={`Deshacer (${colorHistory.length} cambios)`}
                  >
                    <Undo2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {Object.entries(
                predefinedThemes.reduce((acc, theme) => {
                  const category = theme.category || 'other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(theme);
                  return acc;
                }, {} as Record<string, ColorTheme[]>)
              ).map(([category, themes]) => (
                <div key={category} className="space-y-2">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center justify-between w-full p-2 text-left text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <span className="font-medium">{getCategoryName(category)}</span>
                    {expandedCategories.includes(category) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedCategories.includes(category) && (
                    <div className="space-y-3 ml-4">
                      {themes
                        .sort((a, b) => {
                          const aFav = favorites.includes(a.name) ? 0 : 1;
                          const bFav = favorites.includes(b.name) ? 0 : 1;
                          return aFav - bFav;
                        })
                        .map((theme) => (
                        <div
                          key={theme.name}
                          onClick={() => {
                            setCustomColors({
                              primary: theme.primary,
                              secondary: theme.secondary,
                              accent: theme.accent,
                              background: theme.background,
                              text: theme.text
                            });
                            setSelectedTheme(theme.name);
                            setHasUnsavedChanges(true);
                          }}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all relative group ${
                            selectedTheme === theme.name
                              ? 'bg-purple-500/20 border-purple-400 ring-2 ring-purple-400/30'
                              : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium capitalize">{theme.name}</span>
                              {selectedTheme === theme.name && (
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(theme.name);
                                }}
                                className={`p-1 rounded-lg transition-colors ${
                                  favorites.includes(theme.name)
                                    ? 'text-yellow-400 hover:text-yellow-300'
                                    : 'text-gray-400 hover:text-yellow-400'
                                }`}
                              >
                                <Star className={`h-4 w-4 ${favorites.includes(theme.name) ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          </div>
                          
                          {/* Swatches de colores con tonos */}
                          {theme.shades && (
                            <div className="space-y-2 mb-3">
                              <div className="flex space-x-1">
                                {theme.shades.primary.map((shade, idx) => (
                                  <div
                                    key={idx}
                                    className="w-4 h-4 rounded border border-white/20 relative group/shade"
                                    style={{ backgroundColor: applyColorBlindnessFilter(shade) }}
                                    title={`Primary ${[50, 200, 500, 700, 900][idx]}`}
                                  >
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-1 py-0.5 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/shade:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                      {checkContrast(shade, theme.background).toFixed(1)}:1
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex space-x-1">
                                {theme.shades.neutral.map((neutral, idx) => (
                                  <div
                                    key={idx}
                                    className="w-4 h-4 rounded border border-white/20"
                                    style={{ backgroundColor: applyColorBlindnessFilter(neutral) }}
                                    title={`Neutral ${idx + 1}`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            <div className="flex-1 h-6 rounded border border-white/10" style={{ backgroundColor: applyColorBlindnessFilter(theme.background) }}></div>
                            <div className="flex-1 h-6 rounded border border-white/10" style={{ backgroundColor: applyColorBlindnessFilter(theme.primary) }}></div>
                            <div className="flex-1 h-6 rounded border border-white/10" style={{ backgroundColor: applyColorBlindnessFilter(theme.secondary) }}></div>
                            <div className="flex-1 h-6 rounded border border-white/10" style={{ backgroundColor: applyColorBlindnessFilter(theme.accent) }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Colores Personalizados */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white flex items-center">
                <Paintbrush className="h-5 w-5 mr-2" />
                Colores Personalizados
              </h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={exportColors}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
                  title="Copiar configuración JSON"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={resetToDefault}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  title="Revertir a tema por defecto"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {hasUnsavedChanges && (
              <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                <p className="text-yellow-200 text-sm">⚠️ Tienes cambios sin aplicar</p>
              </div>
            )}
            
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {Object.entries(customColors).map(([key, value]) => {
                const tooltips = {
                  primary: 'Se usa para botones principales y enlaces importantes',
                  secondary: 'Para botones secundarios y elementos de apoyo',
                  accent: 'Para destacar elementos especiales y notificaciones',
                  background: 'Color de fondo principal de la aplicación',
                  text: 'Color del texto principal sobre el fondo'
                };
                const shades = generateColorShades(value);
                
                return (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-300 capitalize">
                          {key === 'primary' ? 'Color Primario' :
                           key === 'secondary' ? 'Color Secundario' :
                           key === 'accent' ? 'Color de Acento' :
                           key === 'background' ? 'Fondo' : 'Texto'}
                        </label>
                        <div className="group relative">
                          <Info className="h-3 w-3 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            {tooltips[key as keyof typeof tooltips]}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-10 h-10 rounded-lg border border-white/30 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-24 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    {/* Tonos generados automáticamente */}
                    {key !== 'text' && key !== 'background' && (
                      <div className="flex space-x-1 ml-4">
                        {shades.map((shade, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleColorChange(key, shade)}
                            className="w-6 h-6 rounded border border-white/20 hover:scale-110 transition-transform duration-200 relative group/shade"
                            style={{ backgroundColor: applyColorBlindnessFilter(shade) }}
                            title={`Tono ${idx + 1}`}
                          >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-1 py-0.5 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/shade:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                              Tono {idx + 1}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Sección de temas avanzados */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <button
                onClick={() => setShowAdvancedThemes(!showAdvancedThemes)}
                className="flex items-center justify-between w-full p-2 text-left text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Explorar más temas
                </span>
                {showAdvancedThemes ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {showAdvancedThemes && (
                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                  <p className="text-gray-300 text-sm mb-3">
                    Próximamente: Generación de paletas con IA, temas Material 3, y más opciones avanzadas.
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm border border-purple-500/30">
                      🎨 Generar con IA
                    </button>
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm border border-blue-500/30">
                      Material 3
                    </button>
                    <button className="px-3 py-1 bg-green-500/20 text-green-300 rounded text-sm border border-green-500/30">
                      Tailwind
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Vista Previa Mejorada */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Vista Previa
                </h4>
                <div className="flex items-center space-x-2">
                  {/* Toggle modo claro/oscuro */}
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                  >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                  
                  {/* Toggle responsive */}
                  <button
                    onClick={() => setIsResponsiveMode(!isResponsiveMode)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isResponsiveMode
                        ? 'text-blue-400 bg-blue-400/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={isResponsiveMode ? 'Vista desktop' : 'Vista móvil'}
                  >
                    {isResponsiveMode ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                  </button>
                  
                  {/* Simulación daltonismo */}
                  <select
                    value={colorBlindnessFilter}
                    onChange={(e) => setColorBlindnessFilter(e.target.value as any)}
                    className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm"
                  >
                    <option value="none">Normal</option>
                    <option value="protanopia">Protanopia</option>
                    <option value="deuteranopia">Deuteranopia</option>
                    <option value="tritanopia">Tritanopia</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Inspector WCAG */}
                <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                  <h5 className="text-white font-medium mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Inspector WCAG
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: 'Primario vs Fondo', color1: customColors.primary, color2: customColors.background },
                      { label: 'Texto vs Fondo', color1: customColors.text, color2: customColors.background },
                      { label: 'Secundario vs Fondo', color1: customColors.secondary, color2: customColors.background },
                      { label: 'Acento vs Fondo', color1: customColors.accent, color2: customColors.background }
                    ].map((pair, idx) => {
                      const contrast = checkContrast(pair.color1, pair.color2);
                      const isGood = contrast >= 4.5;
                      const isOk = contrast >= 3;
                      return (
                        <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-gray-300">{pair.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white text-xs">{contrast.toFixed(1)}:1</span>
                            <div className={`w-3 h-3 rounded-full ${
                              isGood ? 'bg-green-400' : isOk ? 'bg-yellow-400' : 'bg-red-400'
                            }`}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Vista previa del layout */}
                <div 
                  className={`bg-white/5 border border-white/20 rounded-xl overflow-hidden transition-all duration-300 ${
                    isResponsiveMode ? 'max-w-sm mx-auto' : ''
                  }`}
                >
                  {/* Navbar simulado */}
                  <div 
                    className="p-4 border-b border-white/10"
                    style={{ 
                      backgroundColor: applyColorBlindnessFilter(isDarkMode ? customColors.background : customColors.primary),
                      color: applyColorBlindnessFilter(isDarkMode ? customColors.text : customColors.background)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h6 className="font-medium">Mi App</h6>
                      <div className="flex space-x-2">
                        <div className="w-6 h-6 rounded-full opacity-60" style={{ backgroundColor: applyColorBlindnessFilter(customColors.accent) }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenido simulado */}
                  <div 
                    className="p-4 space-y-4"
                    style={{ 
                      backgroundColor: applyColorBlindnessFilter(isDarkMode ? customColors.background : '#ffffff'),
                      color: applyColorBlindnessFilter(isDarkMode ? customColors.text : '#000000')
                    }}
                  >
                    <div className="space-y-2">
                      <h5 className="font-medium">Título Principal</h5>
                      <p className="text-sm opacity-80">Este es un ejemplo de cómo se verían los colores en una interfaz real.</p>
                    </div>
                    
                    {/* Cards simulados */}
                    <div className={`grid gap-3 ${isResponsiveMode ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <div 
                        className="p-3 rounded-lg border"
                        style={{ 
                          backgroundColor: applyColorBlindnessFilter(isDarkMode ? customColors.background + '40' : '#f8f9fa'),
                          borderColor: applyColorBlindnessFilter(customColors.primary + '40')
                        }}
                      >
                        <div className="w-full h-2 rounded mb-2" style={{ backgroundColor: applyColorBlindnessFilter(customColors.secondary) }}></div>
                        <div className="text-xs opacity-60">Card de ejemplo</div>
                      </div>
                      <div 
                        className="p-3 rounded-lg border"
                        style={{ 
                          backgroundColor: applyColorBlindnessFilter(isDarkMode ? customColors.background + '40' : '#f8f9fa'),
                          borderColor: applyColorBlindnessFilter(customColors.accent + '40')
                        }}
                      >
                        <div className="w-3/4 h-2 rounded mb-2" style={{ backgroundColor: applyColorBlindnessFilter(customColors.accent) }}></div>
                        <div className="text-xs opacity-60">Otro card</div>
                      </div>
                    </div>
                    
                    {/* Botones simulados */}
                    <div className="flex space-x-2 pt-2">
                      <button 
                        className="px-3 py-2 rounded text-sm font-medium transition-all"
                        style={{ 
                          backgroundColor: applyColorBlindnessFilter(customColors.primary),
                          color: applyColorBlindnessFilter(isDarkMode ? customColors.background : '#ffffff')
                        }}
                      >
                        Acción Principal
                      </button>
                      <button 
                        className="px-3 py-2 rounded text-sm font-medium border transition-all"
                        style={{ 
                          backgroundColor: 'transparent',
                          borderColor: applyColorBlindnessFilter(customColors.secondary),
                          color: applyColorBlindnessFilter(customColors.secondary)
                        }}
                      >
                        Secundaria
                      </button>
                    </div>
                    
                    {/* Input simulado */}
                    <div className="pt-2">
                      <input 
                        type="text" 
                        placeholder="Campo de entrada..."
                        className="w-full p-2 rounded border text-sm"
                        style={{ 
                          backgroundColor: applyColorBlindnessFilter(isDarkMode ? customColors.background + '60' : '#ffffff'),
                          borderColor: applyColorBlindnessFilter(customColors.primary + '60'),
                          color: applyColorBlindnessFilter(isDarkMode ? customColors.text : '#000000')
                        }}
                      />
                    </div>
                    
                    {/* Alerta simulada */}
                    <div 
                      className="p-3 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: applyColorBlindnessFilter(customColors.accent + '20'),
                        borderLeftColor: applyColorBlindnessFilter(customColors.accent)
                      }}
                    >
                      <p className="text-sm">Mensaje de estado con color de acento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-white/20">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Shift</kbd>
              <span>+</span>
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">P</kbd>
              <span className="ml-1">Abrir modal</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Esc</kbd>
              <span className="ml-1">Cerrar</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Enter</kbd>
              <span className="ml-1">Aplicar</span>
            </span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                console.log('Configuración de colores guardada:', { selectedTheme, customColors });
                onClose();
              }}
              disabled={!hasUnsavedChanges}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                hasUnsavedChanges
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Aplicar Colores</span>
              {hasUnsavedChanges && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}