import React, { useState } from 'react';
import { Plus, Search, Filter, CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const payments = [
    {
      id: 1,
      clientName: 'María López',
      clientEmail: 'maria.lopez@email.com',
      amount: 120,
      service: 'Plan Mensual Premium',
      status: 'completed',
      method: 'credit_card',
      dueDate: '2024-01-15',
      paidDate: '2024-01-14',
      invoiceNumber: 'INV-001'
    },
    {
      id: 2,
      clientName: 'Carlos Ruiz',
      clientEmail: 'carlos.ruiz@email.com',
      amount: 80,
      service: 'Plan Mensual Básico',
      status: 'pending',
      method: 'bank_transfer',
      dueDate: '2024-01-20',
      paidDate: null,
      invoiceNumber: 'INV-002'
    },
    {
      id: 3,
      clientName: 'Alba Martín',
      clientEmail: 'alba.martin@email.com',
      amount: 60,
      service: 'Sesión Individual',
      status: 'overdue',
      method: 'paypal',
      dueDate: '2024-01-10',
      paidDate: null,
      invoiceNumber: 'INV-003'
    },
    {
      id: 4,
      clientName: 'Luis García',
      clientEmail: 'luis.garcia@email.com',
      amount: 200,
      service: 'Plan Trimestral',
      status: 'completed',
      method: 'credit_card',
      dueDate: '2024-01-05',
      paidDate: '2024-01-05',
      invoiceNumber: 'INV-004'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Pagado';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencido';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'pending': return <Clock size={16} className="text-yellow-600" />;
      case 'overdue': return <AlertCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getMethodText = (method) => {
    switch (method) {
      case 'credit_card': return 'Tarjeta de Crédito';
      case 'bank_transfer': return 'Transferencia Bancaria';
      case 'paypal': return 'PayPal';
      case 'cash': return 'Efectivo';
      default: return 'Otro';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Calcular estadísticas
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/20 via-white to-brand/10 p-6">
      <div className="container mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-dark to-brand bg-clip-text text-transparent">
            Gestión de Pagos
          </h1>
          <p className="text-neutral-600 mt-2 text-lg">Controla los pagos y facturación de tus clientes</p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-4">
          <button className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-4 py-3 transition-all duration-300">
            Exportar
          </button>
          <button className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-6 py-3 transition-all duration-300 hover:scale-105">
            <Plus size={16} className="mr-2" />
            Nueva Factura
          </button>
        </div>
      </div>

      {/* Estadísticas financieras */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Ingresos del Mes</p>
              <p className="text-3xl font-display font-bold text-neutral-900">€{totalRevenue}</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-xs text-emerald-600 font-medium">+15% vs mes anterior</span>
              </div>
            </div>
            <div className="p-4 bg-emerald-500/10 backdrop-blur-sm border border-white/20">
              <DollarSign size={28} className="text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Pagos Pendientes</p>
              <p className="text-3xl font-display font-bold text-neutral-900">€{pendingAmount}</p>
              <p className="text-xs text-neutral-500 mt-2 font-medium">
                {payments.filter(p => p.status === 'pending').length} facturas
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 backdrop-blur-sm border border-white/20">
              <Clock size={28} className="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Pagos Vencidos</p>
              <p className="text-3xl font-display font-bold text-neutral-900">€{overdueAmount}</p>
              <p className="text-xs text-neutral-500 mt-2 font-medium">
                {payments.filter(p => p.status === 'overdue').length} facturas
              </p>
            </div>
            <div className="p-4 bg-red-500/10 backdrop-blur-sm border border-white/20">
              <AlertCircle size={28} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Total Clientes</p>
              <p className="text-3xl font-display font-bold text-neutral-900">
                {new Set(payments.map(p => p.clientName)).size}
              </p>
              <p className="text-xs text-neutral-500 mt-2 font-medium">Con pagos activos</p>
            </div>
            <div className="p-4 bg-brand/10 backdrop-blur-sm border border-white/20">
              <CreditCard size={28} className="text-brand" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="glass p-6 animate-glass-pop">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por cliente, servicio o número de factura..."
              className="pl-10 pr-4 py-3 w-full glass border-0 placeholder-neutral-500 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="glass border-0 px-4 py-3 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="completed">Pagados</option>
              <option value="pending">Pendientes</option>
              <option value="overdue">Vencidos</option>
              <option value="cancelled">Cancelados</option>
            </select>
            <button className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand px-4 py-3 transition-all duration-300">
              <Filter size={16} className="mr-2" />
              Más Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de pagos */}
      <div className="glass p-6 animate-glass-pop">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">Cliente</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">Servicio</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">Importe</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">Estado</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">Método</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">Vencimiento</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-white/10 hover:bg-white/30 transition-all duration-300">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-neutral-900">{payment.clientName}</p>
                      <p className="text-sm text-neutral-600">{payment.invoiceNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-neutral-900 font-medium">{payment.service}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-neutral-900 text-lg">€{payment.amount}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-neutral-600 text-sm font-medium">{getMethodText(payment.method)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-neutral-600 text-sm font-medium">
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                    {payment.paidDate && (
                      <p className="text-xs text-emerald-600 font-medium">
                        Pagado: {new Date(payment.paidDate).toLocaleDateString()}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      {payment.status === 'pending' && (
                        <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 px-3 py-1 text-sm font-medium shadow-frosted">
                          Marcar Pagado
                        </button>
                      )}
                      {payment.status === 'overdue' && (
                        <button className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 px-3 py-1 text-sm font-medium shadow-frosted">
                          Recordatorio
                        </button>
                      )}
                      <button className="glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 px-3 py-1 text-sm font-medium">
                        Ver Factura
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="glass-mid text-center py-16 animate-glass-pop">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-light to-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CreditCard size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">No se encontraron pagos</h3>
          <p className="text-neutral-600 mb-8 text-lg">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primera factura'}
          </p>
          <button className="bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 px-8 py-3 shadow-frosted font-semibold">
            <Plus size={16} className="mr-2" />
            Nueva Factura
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default PaymentsPage;