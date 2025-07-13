// src/features/pgina-de-planes-y-suscripciones/hooks/usePaginadePlanesySuscripciones.ts
import { useState, useEffect, useMemo } from 'react';
import { Plan, Addon } from '../types';
import { getPlans, getAddons } from '../api';

export const usePaginadePlanesySuscripciones = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  useEffect(() => {
    getPlans().then(setPlans);
    getAddons().then(setAddons);
  }, []);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setSelectedAddons([]); // Reset addons when plan changes
  };

  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons(prev =>
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const availableAddons = useMemo(() => {
    if (!selectedPlan || !selectedPlan.addonIds) {
      return [];
    }
    return addons.filter(addon => selectedPlan.addonIds?.includes(addon.id));
  }, [selectedPlan, addons]);

  const totalPrice = useMemo(() => {
    if (!selectedPlan) return 0;
    const planPrice = selectedPlan.price[billingCycle];
    const addonsPrice = selectedAddons.reduce((total, addon) => total + addon.price, 0);
    // Note: Addon prices are monthly. We might need to adjust for annual billing.
    // For now, we assume addons are billed monthly on top of the plan price.
    return planPrice + (billingCycle === 'monthly' ? addonsPrice : addonsPrice * 12);
  }, [selectedPlan, selectedAddons, billingCycle]);

  return {
    plans,
    selectedPlan,
    selectedAddons,
    billingCycle,
    availableAddons,
    totalPrice,
    handlePlanSelect,
    handleAddonToggle,
    setBillingCycle,
  };
};