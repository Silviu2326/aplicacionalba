import React from 'react';
import { FiWifi, FiBatteryCharging, FiSignal } from 'react-icons/fi';

interface DeviceFrameProps {
  children: React.ReactNode;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    <div className="group relative mx-auto max-w-sm">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-[3rem] blur-xl group-hover:blur-lg transition-all duration-500"></div>
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-accent/10 to-warning/10 rounded-full blur-2xl group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
      
      {/* Device Frame */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
        {/* Reflejo en el marco */}
        <div className="absolute inset-2 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem] pointer-events-none"></div>
        
        {/* Botones laterales */}
        <div className="absolute left-0 top-20 w-1 h-12 bg-gradient-to-b from-gray-700 to-gray-600 rounded-r-full shadow-inner"></div>
        <div className="absolute left-0 top-36 w-1 h-8 bg-gradient-to-b from-gray-700 to-gray-600 rounded-r-full shadow-inner"></div>
        <div className="absolute left-0 top-48 w-1 h-8 bg-gradient-to-b from-gray-700 to-gray-600 rounded-r-full shadow-inner"></div>
        <div className="absolute right-0 top-24 w-1 h-16 bg-gradient-to-b from-gray-700 to-gray-600 rounded-l-full shadow-inner"></div>
        
        {/* Cámara frontal y sensores */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
          <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
          <div className="w-16 h-6 bg-gray-900 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-800 rounded-full border border-gray-600"></div>
          </div>
          <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
        </div>
        
        {/* Screen */}
        <div className="relative bg-gradient-to-br from-surface to-card rounded-[2.5rem] overflow-hidden shadow-inner border border-borderLight/20">
          {/* Status Bar mejorada */}
          <div className="bg-gradient-to-r from-surface/95 to-card/95 backdrop-blur-xl h-8 flex items-center justify-between px-6 text-xs font-medium border-b border-borderLight/10">
            <div className="flex items-center space-x-1">
              <span className="text-text font-semibold">9:41</span>
              <div className="w-1 h-1 bg-textMuted rounded-full ml-2"></div>
              <span className="text-textMuted text-[10px]">PWA</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Señal */}
              <div className="flex items-end space-x-0.5">
                <div className="w-1 h-2 bg-text rounded-full"></div>
                <div className="w-1 h-3 bg-text rounded-full"></div>
                <div className="w-1 h-4 bg-text rounded-full"></div>
                <div className="w-1 h-3 bg-textMuted rounded-full"></div>
              </div>
              
              {/* WiFi */}
              <FiWifi className="w-3 h-3 text-text" />
              
              {/* Batería */}
              <div className="relative">
                <div className="w-6 h-3 border border-text rounded-sm flex items-center">
                  <div className="w-4 h-1.5 bg-gradient-to-r from-success to-successDark rounded-sm mx-0.5"></div>
                </div>
                <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-text rounded-r-sm"></div>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="relative min-h-[32rem] bg-gradient-to-br from-background via-surface to-card">
            {/* Indicador PWA */}
            <div className="absolute top-2 right-2 z-10">
              <div className="bg-gradient-to-r from-primary to-secondary px-2 py-1 rounded-full shadow-lg">
                <span className="text-[8px] font-bold text-textInverse">PWA</span>
              </div>
            </div>
            
            {/* Contenido */}
            <div className="relative z-0">
              {children}
            </div>
            
            {/* Overlay de brillo */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
        
        {/* Home Indicator mejorado */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent rounded-full shadow-inner">
            <div className="w-full h-full bg-gradient-to-r from-gray-500 to-gray-400 rounded-full opacity-80"></div>
          </div>
        </div>
        
        {/* Efectos de luz */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[3rem] pointer-events-none group-hover:from-white/10 transition-all duration-500"></div>
      </div>
      
      {/* Sombra proyectada */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-gradient-to-r from-transparent via-black/20 to-transparent rounded-full blur-xl group-hover:via-black/30 transition-all duration-500"></div>
    </div>
  );
};

export default DeviceFrame;
