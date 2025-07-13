
// src/features/pgina-de-planes-y-suscripciones/types.ts

export interface Plan {
  id: string;
  name: string;
  price: { monthly: number; annually: number };
  features: { name:string, included: boolean }[];
  isRecommended?: boolean;
  addonIds?: string[];
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}


export interface Addon {
    id: string;
    name: string;
    price: number;
    compatibleWith: string[];
}

export interface ProrationDetails {
    creditForCurrentPlan: number;
    costOfNewPlanProrated: number;
    totalToPayToday: number;
    creditInYourFavor?: number;
}

export interface FaqItem {
    question: string;
    answer: string;
}
