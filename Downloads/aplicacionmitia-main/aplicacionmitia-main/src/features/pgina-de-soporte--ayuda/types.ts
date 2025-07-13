export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: 'received' | 'in-consideration' | 'implemented';
  createdAt: string;
}