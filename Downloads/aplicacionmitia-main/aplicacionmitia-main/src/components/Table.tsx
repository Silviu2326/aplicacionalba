import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({ 
  columns, 
  data, 
  onRowClick, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="w-full p-12 text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-lg text-textMuted animate-pulse">Cargando datos...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-textMuted/20 to-textMuted/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">No hay datos disponibles</h3>
        <p className="text-textMuted">No se encontraron elementos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
      
      <div className="relative overflow-x-auto rounded-xl border border-borderLight/30 shadow-lg">
        <table className="min-w-full bg-gradient-to-br from-surface/80 to-card/80 backdrop-blur-sm">
          {/* Header modernizado */}
          <thead className="bg-gradient-to-r from-backgroundSecondary/90 via-surface/90 to-backgroundSecondary/90 backdrop-blur-sm border-b border-borderLight/30">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className="relative px-6 py-5 text-left text-xs font-bold text-textSecondary uppercase tracking-wider group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative z-10">
                    {column.label}
                  </div>
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Body modernizado */}
          <tbody className="bg-gradient-to-br from-surface/60 to-card/60 backdrop-blur-sm divide-y divide-borderLight/20">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`group relative transition-all duration-300 transform hover:scale-[1.01] ${
                  onRowClick 
                    ? 'hover:bg-gradient-to-r hover:from-primary/10 hover:via-secondary/5 hover:to-accent/10 cursor-pointer hover:shadow-lg' 
                    : 'hover:bg-gradient-to-r hover:from-surface/80 hover:to-card/80'
                }`}
                onClick={() => onRowClick && onRowClick(row)}
                style={{ animationDelay: `${rowIndex * 25}ms` }}
              >
                {/* Indicador lateral para filas clickeables */}
                {onRowClick && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    className="relative px-6 py-4 whitespace-nowrap text-sm text-text group-hover:text-text transition-colors duration-300"
                  >
                    <div className="relative z-10">
                      {row[column.key]}
                    </div>
                    
                    {/* Efecto de brillo sutil */}
                    {colIndex === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </td>
                ))}
                
                {/* Indicador de hover */}
                {onRowClick && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Efectos decorativos */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-accent rounded-full animate-ping opacity-50"></div>
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-secondary rounded-full animate-ping opacity-30 animation-delay-1000"></div>
    </div>
  );
};

export default Table;