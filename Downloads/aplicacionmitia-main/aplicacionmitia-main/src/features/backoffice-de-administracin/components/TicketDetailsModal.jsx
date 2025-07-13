import React from 'react';

const TicketDetailsModal = ({ ticket, onClose, onReply, onStatusChange }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-surface p-6 rounded-lg shadow-xl w-full max-w-2xl text-text">
        <h2 className="text-2xl font-bold mb-4">Ticket #{ticket.id}</h2>
        <div className="mb-4">
          <p><span className="font-semibold">Usuario:</span> {ticket.user}</p>
          <p><span className="font-semibold">Asunto:</span> {ticket.subject}</p>
          <p><span className="font-semibold">Fecha:</span> {ticket.date}</p>
          <p><span className="font-semibold">Estado:</span> {ticket.status}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Mensaje del Usuario:</h3>
          <p className="bg-gray-100 p-3 rounded">{ticket.message}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Historial de Respuestas:</h3>
          <div className="space-y-2">
            {ticket.history.map((entry, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-600">{entry.date} - {entry.author}</p>
                <p>{entry.message}</p>
              </div>
            ))}
          </div>
        </div>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Escribe tu respuesta aquí..."
        ></textarea>
        <div className="flex justify-between items-center">
          <div>
            <label htmlFor="status" className="mr-2">Cambiar estado:</label>
            <select
              id="status"
              className="p-2 border rounded"
              onChange={(e) => onStatusChange(ticket.id, e.target.value)}
              value={ticket.status}
            >
              <option value="Abierto">Abierto</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>
          <div>
            <button onClick={onClose} className="bg-muted text-text px-4 py-2 rounded mr-2">Cerrar</button>
            <button onClick={() => onReply(ticket.id, '...')} className="bg-primary text-text px-4 py-2 rounded">Enviar Respuesta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;
