import React from 'react';

const ServiceStatusWidget = ({ service }) => {
  const getStatusColor = () => {
    switch (service.status) {
      case 'Operacional':
        return 'bg-success';
      case 'Degradado':
        return 'bg-warning';
      case 'Caído':
        return 'bg-error animate-pulse';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-md border border-border text-textInverse ${getStatusColor()}`}>
      <h3 className="text-lg font-bold">{service.name}</h3>
      <p className="text-2xl font-semibold">{service.status}</p>
      {service.status !== 'Caído' && (
        <p className="text-sm opacity-90">Response Time: {service.responseTime}ms</p>
      )}
    </div>
  );
};

export default ServiceStatusWidget;
