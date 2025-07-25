import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, TrendingUp, Activity, Target, Edit, Save, Camera } from 'lucide-react';
import ClientMonthlyProgress from '../workouts/ClientMonthlyProgress';

const ClientProfile = ({ isOpen, onClose, client }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Cargar datos del cliente cuando se abre el modal
  React.useEffect(() => {
    if (client && isOpen) {
      setEditData({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        status: client.status || 'active',
        notes: client.notes || '',
        goals: client.goals || '',
        emergencyContact: client.emergencyContact || '',
        birthDate: client.birthDate || '',
        weight: client.weight || '',
        height: client.height || ''
      });
    }
  }, [client, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aquí se podría implementar la lógica para guardar los cambios
    console.log('Guardando cambios:', editData);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'suspended':
        return 'Suspendido';
      default:
        return 'Desconocido';
    }
  };

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">{client.avatar}</span>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">{client.name}</h2>
              <span className={`inline-block px-3 py-1 text-sm rounded-full ${getStatusColor(client.status)}`}>
                {getStatusText(client.status)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit size={16} />
                <span>Editar</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Vista mensual de progreso */}
            <ClientMonthlyProgress 
              clientId={client.id} 
              onDateSelect={(date) => console.log('Fecha seleccionada:', date)}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información Personal */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User size={20} className="mr-2" />
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{client.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-500" />
                        <p className="text-gray-900">{client.email}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-500" />
                        <p className="text-gray-900">{client.phone}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="birthDate"
                        value={editData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <p className="text-gray-900">{editData.birthDate || 'No especificado'}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="weight"
                        value={editData.weight}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 70"
                      />
                    ) : (
                      <p className="text-gray-900">{editData.weight ? `${editData.weight} kg` : 'No especificado'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="height"
                        value={editData.height}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 175"
                      />
                    ) : (
                      <p className="text-gray-900">{editData.height ? `${editData.height} cm` : 'No especificado'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Objetivos y Notas */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target size={20} className="mr-2" />
                  Objetivos y Notas
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Objetivos</label>
                    {isEditing ? (
                      <textarea
                        name="goals"
                        value={editData.goals}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe los objetivos del cliente..."
                      />
                    ) : (
                      <p className="text-gray-900">{editData.goals || 'No especificado'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
                    {isEditing ? (
                      <textarea
                        name="notes"
                        value={editData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Notas importantes sobre el cliente..."
                      />
                    ) : (
                      <p className="text-gray-900">{editData.notes || 'No hay notas adicionales'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contacto de emergencia</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyContact"
                        value={editData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nombre y teléfono de contacto de emergencia"
                      />
                    ) : (
                      <p className="text-gray-900">{editData.emergencyContact || 'No especificado'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas y Progreso */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity size={20} className="mr-2" />
                  Estadísticas
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fecha de ingreso</span>
                    <span className="font-semibold text-gray-900">{new Date(client.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Última sesión</span>
                    <span className="font-semibold text-gray-900">{new Date(client.lastSession).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Progreso</span>
                    <span className={`font-bold ${client.progress.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                      {client.progress}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Nueva Sesión
                  </button>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Asignar Rutina
                  </button>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Plan Nutricional
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    Historial Completo
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;