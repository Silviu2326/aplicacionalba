import React from 'react';

type ServiceStatus = 'operational' | 'degraded_performance' | 'downtime';

interface ServiceStatusItemProps {
  service: string;
  status: ServiceStatus;
  message?: string;
}

const statusColors: { [key in ServiceStatus]: string } = {
  operational: 'bg-success',
  degraded_performance: 'bg-warning',
  downtime: 'bg-error',
};

const statusText: { [key in ServiceStatus]: string } = {
    operational: 'Operativo',
    degraded_performance: 'Rendimiento degradado',
    downtime: 'No disponible',
  };

const ServiceStatusItem: React.FC<ServiceStatusItemProps> = ({ service, status, message }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-card rounded-lg mb-2">
      <div className="flex items-center">
        <span className={`w-3 h-3 rounded-full mr-3 ${statusColors[status]}`}></span>
        <span className="text-text">{service}</span>
      </div>
      <div className='flex flex-col items-end'>
        <span className="text-textMuted">{statusText[status]}</span>
        {message && <span className="text-textMuted text-sm">{message}</span>}
      </div>
    </div>
  );
};

export default ServiceStatusItem;
