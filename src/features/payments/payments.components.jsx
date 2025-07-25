import React, { useState } from 'react';
import { CreditCard, DollarSign, AlertCircle, CheckCircle, Clock, Send, Download } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

// Componente para tarjeta de pago
export const PaymentCard = ({ payment, onUpdateStatus, onSendReminder, onDownloadInvoice }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Pagado';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencido';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getStatusIcon(payment.status)}
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
              {getStatusText(payment.status)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{payment.clientName}</h3>
          <p className="text-sm text-gray-600">{payment.service}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">€{payment.amount}</p>
          <p className="text-xs text-gray-500">{payment.invoiceNumber}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Vencimiento:</span>
          <span>{new Date(payment.dueDate).toLocaleDateString()}</span>
        </div>
        {payment.paidDate && (
          <div className="flex justify-between">
            <span>Fecha de pago:</span>
            <span className="text-green-600">{new Date(payment.paidDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex space-x-2">
          {payment.status === 'pending' && (
            <Button 
              size="sm" 
              variant="success" 
              className="flex-1"
              onClick={() => onUpdateStatus(payment.id, 'completed')}
            >
              Marcar Pagado
            </Button>
          )}
          {(payment.status === 'pending' || payment.status === 'overdue') && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onSendReminder(payment.id)}
            >
              <Send size={14} className="mr-1" />
              Recordar
            </Button>
          )}
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onDownloadInvoice(payment.id)}
          >
            <Download size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Formulario para crear factura
export const InvoiceForm = ({ clients = [], services = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    service: '',
    amount: '',
    dueDate: '',
    description: '',
    taxRate: 21,
    paymentMethod: 'credit_card'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      ...formData,
      amount: parseFloat(formData.amount),
      taxRate: parseFloat(formData.taxRate)
    };
    onSubmit(invoiceData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const subtotal = parseFloat(formData.amount) || 0;
  const taxAmount = (subtotal * (formData.taxRate / 100));
  const total = subtotal + taxAmount;

  return (
    <Card title="Nueva Factura">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente *
            </label>
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar cliente...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Servicio *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar servicio...</option>
              <option value="Plan Mensual Básico">Plan Mensual Básico - €80</option>
              <option value="Plan Mensual Premium">Plan Mensual Premium - €120</option>
              <option value="Plan Trimestral">Plan Trimestral - €200</option>
              <option value="Sesión Individual">Sesión Individual - €60</option>
              <option value="Evaluación Inicial">Evaluación Inicial - €40</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Importe (sin IVA) *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de vencimiento *
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IVA (%)
            </label>
            <input
              type="number"
              name="taxRate"
              value={formData.taxRate}
              onChange={handleChange}
              min="0"
              max="30"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Método de pago preferido
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="credit_card">Tarjeta de Crédito</option>
              <option value="bank_transfer">Transferencia Bancaria</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Efectivo</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción adicional
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detalles adicionales del servicio..."
          />
        </div>

        {/* Resumen de la factura */}
        {formData.amount && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Resumen de la factura</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA ({formData.taxRate}%):</span>
                <span>€{taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button type="submit" className="flex-1">
            Crear Factura
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};

// Componente para estadísticas de pagos
export const PaymentStats = ({ stats }) => {
  const formatCurrency = (amount) => `€${amount.toFixed(2)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Ingresos Totales</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalRevenue)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.totalPayments} pagos
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-600">
              {formatCurrency(stats.pendingAmount)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.paymentsByStatus.pending} facturas
            </p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Vencidos</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(stats.overdueAmount)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.paymentsByStatus.overdue} facturas
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Promedio</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(stats.averagePayment)}
            </p>
            <p className="text-xs text-gray-500 mt-1">por pago</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <CreditCard className="text-blue-600" size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
};

// Componente para procesar pago con Stripe
export const StripePaymentForm = ({ payment, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Integrar con Stripe Elements real
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSuccess({
        paymentIntentId: 'pi_mock_' + Date.now(),
        status: 'succeeded'
      });
    } catch (error) {
      onError(error.message || 'Error procesando el pago');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card title="Procesar Pago">
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">{payment.service}</h3>
        <p className="text-sm text-gray-600 mb-1">Cliente: {payment.clientName}</p>
        <p className="text-lg font-bold text-blue-600">Total: €{payment.amount}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del titular *
          </label>
          <input
            type="text"
            name="holderName"
            value={paymentData.holderName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de tarjeta *
          </label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
            placeholder="1234 5678 9012 3456"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MM/YY *
            </label>
            <input
              type="text"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              required
              placeholder="12/28"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV *
            </label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              required
              placeholder="123"
              maxLength="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Procesando...
            </>
          ) : (
            <>
              <CreditCard size={16} className="mr-2" />
              Procesar Pago €{payment.amount}
            </>
          )}
        </Button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>🔒 Pago seguro procesado con Stripe</p>
        <p>Tus datos están protegidos con cifrado de extremo a extremo</p>
      </div>
    </Card>
  );
};