import React, { useState, useEffect } from 'react';
import { getPerformanceLeaderboard } from '../api';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const PerformanceLeaderboard = ({ onSelectProfessional }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'performanceScore', direction: 'descending' });

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const data = await getPerformanceLeaderboard({ dateRange: 'last30days', sortBy: sortConfig.key });
      setLeaderboard(data);
      setLoading(false);
    };
    fetchLeaderboard();
  }, [sortConfig]);

  const sortedLeaderboard = React.useMemo(() => {
    let sortableItems = [...leaderboard];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [leaderboard, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="inline ml-1 text-textMuted" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <FaSortUp className="inline ml-1 text-primary" />;
    }
    return <FaSortDown className="inline ml-1 text-primary" />;
  };

  if (loading) {
    return <div className="text-center p-4 text-text">Cargando ranking...</div>;
  }

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-text mb-4">Ranking de Profesionales</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-backgroundSecondary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider cursor-pointer" onClick={() => requestSort('name')}>
                Profesional {getSortIcon('name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider cursor-pointer" onClick={() => requestSort('performanceScore')}>
                Puntuación {getSortIcon('performanceScore')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider cursor-pointer" onClick={() => requestSort('bookings')}>
                Reservas {getSortIcon('bookings')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider cursor-pointer" onClick={() => requestSort('avgRating')}>
                Rating Prom. {getSortIcon('avgRating')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider cursor-pointer" onClick={() => requestSort('rebookingRate')}>
                Tasa Re-reserva {getSortIcon('rebookingRate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {sortedLeaderboard.map((prof) => (
              <tr key={prof.id} className="hover:bg-backgroundSecondary transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text">{prof.name}</div>
                  <div className="text-sm text-textMuted">{prof.specialty}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary text-text">
                    {prof.performanceScore}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textMuted">{prof.bookings}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textMuted">{prof.avgRating.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textMuted">{(prof.rebookingRate * 100).toFixed(0)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => onSelectProfessional(prof.id)} className="text-primary hover:text-primaryLight">
                    Ver Analítica
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceLeaderboard;