
export interface FraudAlert {
  id: string;
  type: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  riskScore: number;
  data: any;
  status: 'Nuevo' | 'En revisión' | 'Resuelto' | 'Ignorado';
  timestamp: string;
  userId: string;
  details: string;
}
