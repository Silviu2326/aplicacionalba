import { useState, useEffect } from 'react';
import { getProfessionalById } from '../api';

interface Service {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
}

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface Credential {
  name: string;
  verified: boolean;
  icon: string;
  verificationDate?: string;
}

interface ServicePackage {
  id: string;
  name: string;
  sessionCount: number;
  totalPrice: number;
  originalPrice: number;
  description: string;
  isPopular?: boolean;
}

interface Publication {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publicationDate: string;
  imageUrl?: string;
}

interface Professional {
  id: string;
  fullName: string;
  profilePictureUrl: string;
  videoIntroductionUrl?: string; // Nueva propiedad
  specialties: string[];
  title: string;
  aboutMe: string;
  services: Service[];
  packages: ServicePackage[];
  basePrice: number;
  location?: Location;
  credentials: Credential[];
  publications: Publication[];
}

export const useFichadeProfesional = (id: string) => {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        setLoading(true);
        const data = await getProfessionalById(id);
        setProfessional(data);
      } catch (err) {
        setError('Error al cargar los datos del profesional.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfessional();
    }
  }, [id]);

  return { professional, loading, error };
};