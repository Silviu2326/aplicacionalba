import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import tailwindConfig from '../../../../tailwind.config.js';

interface DataChartProps {
  data: any[];
  lineKey: string;
  xAxisKey: string;
}

const DataChart: React.FC<DataChartProps> = ({ data, lineKey, xAxisKey }) => {
  const { theme } = tailwindConfig;
  const primaryColor = theme.extend.colors.primary;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke={theme.extend.colors.border} strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} stroke={theme.extend.colors.textMuted} />
        <YAxis stroke={theme.extend.colors.textMuted} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: theme.extend.colors.surface, 
            borderColor: theme.extend.colors.border 
          }}
          labelStyle={{ color: theme.extend.colors.text }}
        />
        <Legend wrapperStyle={{ color: theme.extend.colors.text }}/>
        <Line type="monotone" dataKey={lineKey} stroke={primaryColor} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DataChart;