
import React, { useState, useEffect, useRef } from 'react';
// Assuming an API service similar to the one for TaxonomyManager
// These functions would need to be implemented in your API layer
import { 
  getInsurancePartners, 
  addInsurancePartner, 
  updateInsurancePartner, 
  deleteInsurancePartner 
} from '../api';

// Define the structure of an insurance partner
interface InsurancePartner {
  id: number;
  name: string;
  logo?: string; // URL to the logo
  isActive: boolean; // Status for the partner
}

// Props for the component, if any are needed in the future
interface InsurancePartnerManagerProps {
  // Example: baseUrl for API calls, if not hardcoded
}

const InsurancePartnerManager: React.FC<InsurancePartnerManagerProps> = () => {
  const [partners, setPartners] = useState<InsurancePartner[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemLogo, setNewItemLogo] = useState<File | null>(null);
  const [editingItem, setEditingItem] = useState<InsurancePartner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        // const data = await getInsurancePartners(); // API call
        // Mock data for demonstration:
        const data: InsurancePartner[] = [
          { id: 1, name: 'Adeslas', logo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Adeslas', isActive: true },
          { id: 2, name: 'Sanitas', logo: 'https://via.placeholder.com/150/008000/FFFFFF?text=Sanitas', isActive: true },
          { id: 3, name: 'DKV', logo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=DKV', isActive: false },
        ];
        setPartners(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las aseguradoras.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (editingItem) {
        // Handle file change for the item being edited
        const file = e.target.files[0];
        // Here you would typically upload the file and get a URL
        // For this example, we'll use a local URL
        const logoUrl = URL.createObjectURL(file);
        setEditingItem({ ...editingItem, logo: logoUrl });
      } else {
        // Handle file change for the new item
        setNewItemLogo(e.target.files[0]);
      }
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    // In a real app, you'd upload the logo first, get a URL, then save the new partner
    let logoUrl = 'https://via.placeholder.com/150/808080/FFFFFF?text=No+Logo';
    if (newItemLogo) {
      // Simulate upload
      logoUrl = URL.createObjectURL(newItemLogo);
    }

    try {
      // const newItem = await addInsurancePartner({ name: newItemName, logo: logoUrl, isActive: true });
      // Mock response:
      const newItem: InsurancePartner = {
        id: Date.now(),
        name: newItemName,
        logo: logoUrl,
        isActive: true,
      };
      setPartners([...partners, newItem]);
      setNewItemName('');
      setNewItemLogo(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError('Error al añadir la nueva aseguradora.');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta aseguradora?')) {
      try {
        // await deleteInsurancePartner(id);
        setPartners(partners.filter((partner) => partner.id !== id));
      } catch (err) {
        setError('Error al eliminar la aseguradora.');
        console.error(err);
      }
    }
  };

  const handleEditItem = (partner: InsurancePartner) => {
    setEditingItem({ ...partner });
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    try {
      // const updatedPartner = await updateInsurancePartner(editingItem.id, editingItem);
      const updatedPartner = editingItem; // Mock update
      setPartners(partners.map((p) => (p.id === editingItem.id ? updatedPartner : p)));
      setEditingItem(null);
    } catch (err) {
      setError('Error al actualizar la aseguradora.');
      console.error(err);
    }
  };
  
  const handleToggleActive = async (partner: InsurancePartner) => {
    const updatedPartner = { ...partner, isActive: !partner.isActive };
    try {
        // await updateInsurancePartner(partner.id, updatedPartner);
        setPartners(partners.map((p) => (p.id === partner.id ? updatedPartner : p)));
    } catch (err) {
        setError('Error al cambiar el estado de la aseguradora.');
        console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-8">
      <h3 className="text-xl font-bold text-text mb-4 border-b border-border pb-2">Gestionar Aseguradoras</h3>

      {error && <p className="text-error mb-4">{error}</p>}

      {/* Add Form */}
      <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-center">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Nombre de la aseguradora"
          className="md:col-span-1 bg-surface border border-border rounded-md py-2 px-4 text-text focus:outline-none focus:ring-2 focus:ring-focus"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="md:col-span-1 bg-surface border border-border rounded-md py-1 px-2 text-text focus:outline-none focus:ring-2 focus:ring-focus"
        />
        <button type="submit" className="md:col-span-1 bg-primary hover:bg-primaryHover text-textInverse font-bold py-2 px-4 rounded-md transition-colors duration-300">
          Añadir Aseguradora
        </button>
      </form>

      {isLoading ? (
        <p className="text-textMuted">Cargando aseguradoras...</p>
      ) : (
        <div className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.id} className={`bg-surface p-4 rounded-md shadow flex flex-col md:flex-row items-center gap-4 ${!partner.isActive ? 'opacity-50' : ''}`}>
              {editingItem && editingItem.id === partner.id ? (
                <form onSubmit={handleUpdateItem} className="flex-grow flex flex-col md:flex-row items-center gap-4 w-full">
                  <img src={editingItem.logo} alt="Logo" className="w-16 h-16 rounded-full object-cover" />
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="flex-grow bg-backgroundSecondary border border-border rounded-md py-1 px-3 text-text focus:outline-none focus:ring-2 focus:ring-focus"
                    autoFocus
                  />
                   <input
                    type="file"
                    ref={editFileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="text-success hover:text-successDark transition-colors duration-300">
                      Guardar
                    </button>
                    <button type="button" onClick={handleCancelEdit} className="text-textMuted hover:text-text transition-colors duration-300">
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <img src={partner.logo} alt={`Logo de ${partner.name}`} className="w-16 h-16 rounded-full object-cover" />
                  <span className="text-textSecondary font-semibold flex-grow">{partner.name}</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleToggleActive(partner)} className={`px-3 py-1 text-sm rounded-full ${partner.isActive ? 'bg-success text-white' : 'bg-gray-300 text-gray-700'}`}>
                      {partner.isActive ? 'Activa' : 'Inactiva'}
                    </button>
                    <button onClick={() => handleEditItem(partner)} className="text-accent hover:text-accentHover transition-colors duration-300">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteItem(partner.id)} className="text-error hover:text-errorDark transition-colors duration-300">
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsurancePartnerManager;
