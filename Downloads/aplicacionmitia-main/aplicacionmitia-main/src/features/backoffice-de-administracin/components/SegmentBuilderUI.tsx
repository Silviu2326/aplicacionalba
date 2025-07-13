import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../../components/Button';
import { debounce } from 'lodash';

interface Rule {
  id: number;
  attribute: string;
  operator: string;
  value: string;
}

interface SegmentBuilderUIProps {
  onSave: (segment: { name: string; rules: Rule[] }) => void;
  getLiveUserCount: (rules: Rule[]) => Promise<number>;
  isLoading: boolean;
}

const ATTRIBUTES = [
  { id: 'userType', name: 'Tipo de Usuario' },
  { id: 'subscriptionStatus', name: 'Estado de Suscripción' },
  { id: 'sessionCount', name: 'Número de Sesiones' },
  { id: 'registrationDate', name: 'Fecha de Registro' },
];

const OPERATORS: { [key: string]: { id: string; name: string }[] } = {
  userType: [
    { id: 'is', name: 'es' },
    { id: 'isNot', name: 'no es' },
  ],
  subscriptionStatus: [
    { id: 'is', name: 'es' },
    { id: 'isNot', name: 'no es' },
  ],
  sessionCount: [
    { id: 'equals', name: '=' },
    { id: 'greaterThan', name: '>' },
    { id: 'lessThan', name: '<' },
  ],
  registrationDate: [
    { id: 'before', name: 'antes de' },
    { id: 'after', name: 'después de' },
  ],
};

const SegmentBuilderUI: React.FC<SegmentBuilderUIProps> = ({ onSave, getLiveUserCount, isLoading }) => {
  const [segmentName, setSegmentName] = useState('');
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, attribute: 'userType', operator: 'is', value: 'Cliente' },
  ]);
  const [nextRuleId, setNextRuleId] = useState(2);
  const [logic, setLogic] = useState<'AND' | 'OR'>('AND');
  const [liveCount, setLiveCount] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const debouncedGetLiveCount = useCallback(
    debounce(async (currentRules: Rule[]) => {
      if (currentRules.every(rule => rule.value)) {
        setIsCalculating(true);
        const count = await getLiveUserCount(currentRules);
        setLiveCount(count);
        setIsCalculating(false);
      }
    }, 1000),
    [getLiveUserCount]
  );

  useEffect(() => {
    debouncedGetLiveCount(rules);
  }, [rules, debouncedGetLiveCount]);

  const addRule = () => {
    setRules([...rules, { id: nextRuleId, attribute: 'userType', operator: 'is', value: '' }]);
    setNextRuleId(nextRuleId + 1);
  };

  const updateRule = (id: number, field: keyof Rule, value: string) => {
    setRules(rules.map(rule => (rule.id === id ? { ...rule, [field]: value } : rule)));
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleSave = () => {
    if (segmentName && rules.length > 0) {
      onSave({ name: segmentName, rules });
      setSegmentName('');
      setRules([{ id: 1, attribute: 'userType', operator: 'is', value: 'Cliente' }]);
      setNextRuleId(2);
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-text mb-4">Crear Nuevo Segmento</h2>
      
      <div className="mb-4">
        <label htmlFor="segmentName" className="block text-sm font-medium text-textSecondary mb-1">
          Nombre del Segmento
        </label>
        <input
          id="segmentName"
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="w-full p-2 bg-backgroundSecondary border border-border rounded-md text-text focus:ring-2 focus:ring-focus"
          placeholder="Ej: Clientes VIP"
        />
      </div>

      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div key={rule.id} className="flex items-center gap-2 p-3 bg-surface rounded-md">
            <select
              value={rule.attribute}
              onChange={(e) => updateRule(rule.id, 'attribute', e.target.value)}
              className="p-2 bg-backgroundSecondary border border-border rounded-md text-text"
            >
              {ATTRIBUTES.map(attr => <option key={attr.id} value={attr.id}>{attr.name}</option>)}
            </select>
            <select
              value={rule.operator}
              onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
              className="p-2 bg-backgroundSecondary border border-border rounded-md text-text"
            >
              {(OPERATORS[rule.attribute] || []).map(op => <option key={op.id} value={op.id}>{op.name}</option>)}
            </select>
            <input
              type="text"
              value={rule.value}
              onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
              className="flex-grow p-2 bg-backgroundSecondary border border-border rounded-md text-text"
            />
            <Button variant="danger" size="sm" onClick={() => removeRule(rule.id)} disabled={rules.length <= 1}>
              X
            </Button>
            {index < rules.length - 1 && (
              <div className="p-2 bg-accent text-textInverse rounded-md font-bold">{logic}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button variant="secondary" onClick={addRule}>Añadir Condición</Button>
        <div className="flex items-center">
          <label className="text-textSecondary mr-2">Lógica:</label>
          <select
            value={logic}
            onChange={(e) => setLogic(e.target.value as 'AND' | 'OR')}
            className="p-2 bg-backgroundSecondary border border-border rounded-md text-text"
          >
            <option value="AND">Y</option>
            <option value="OR">O</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Button variant="primary" onClick={handleSave} disabled={!segmentName || isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Segmento'}
        </Button>
        <div className="text-right">
          <p className="text-textSecondary">Usuarios en este segmento:</p>
          <p className="text-2xl font-bold text-primary">
            {isCalculating ? 'Calculando...' : (liveCount !== null ? liveCount : 'N/A')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SegmentBuilderUI;