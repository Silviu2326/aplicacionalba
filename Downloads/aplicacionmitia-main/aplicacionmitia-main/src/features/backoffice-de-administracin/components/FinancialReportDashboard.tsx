import React, { useState } from 'react';
import DataChart from './DataChart';
import Table from '../../../components/Table';

// Mock data
const mockFinancialData = {
  metrics: {
    totalRevenue: 7650.50,
    successfulTransactions: 123,
    totalCommissions: 765.05,
  },
  dailyRevenue: [
    { date: '2025-07-01', revenue: 300 },
    { date: '2025-07-02', revenue: 450 },
    { date: '2025-07-03', revenue: 280 },
    { date: '2025-07-04', revenue: 600 },
    { date: '2025-07-05', revenue: 500 },
    { date: '2025-07-06', revenue: 720 },
    { date: '2025-07-07', revenue: 890 },
  ],
  transactions: [
    { id: 'txn_1', date: '2025-07-07', professional: 'Dr. Eva Martinez', amount: 150.00, plan: 'Premium', status: 'Completed' },
    { id: 'txn_2', date: '2025-07-07', professional: 'Dr. Juan Perez', amount: 80.00, plan: 'Basic', status: 'Completed' },
    { id: 'txn_3', date: '2025-07-06', professional: 'Dr. Sofia Loren', amount: 200.00, plan: 'Premium', status: 'Completed' },
    { id: 'txn_4', date: '2025-07-05', professional: 'Dr. Carlos Ruiz', amount: 50.00, plan: 'Free Trial', status: 'Completed' },
    { id: 'txn_5', date: '2025-07-04', professional: 'Dr. Ana Gomez', amount: 120.00, plan: 'Basic', status: 'Completed' },
    { id: 'txn_6', date: '2025-07-03', professional: 'Dr. Eva Martinez', amount: 150.00, plan: 'Premium', status: 'Refunded' },
    { id: 'txn_7', date: '2025-07-02', professional: 'Dr. Juan Perez', amount: 80.00, plan: 'Basic', status: 'Completed' },
    { id: 'txn_8', date: '2025-07-01', professional: 'Dr. Sofia Loren', amount: 200.00, plan: 'Premium', status: 'Completed' },
  ],
};

const FinancialReportDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-07-01');
  const [endDate, setEndDate] = useState('2025-07-07');

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Professional', 'Amount', 'Plan', 'Status'];
    const rows = mockFinancialData.transactions.map(t => [t.id, t.date, t.professional, t.amount.toFixed(2), t.plan, t.status].join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const transactionColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Date', accessor: 'date' },
    { header: 'Professional', accessor: 'professional' },
    { header: 'Amount', accessor: 'amount', render: (amount: number) => `${amount.toFixed(2)}` },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="p-6 bg-backgroundSecondary min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text">Financial Report Dashboard</h1>
        <button onClick={handleExportCSV} className="bg-success text-textInverse px-4 py-2 rounded-md hover:bg-successDark transition-colors">
          Export to CSV
        </button>
      </div>

      {/* Date Filters */}
      <div className="mb-8 p-4 bg-surface rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-textSecondary">Start Date</label>
            <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-card border border-border rounded-md shadow-sm text-text focus:outline-none focus:ring-focus focus:border-focus"/>
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-textSecondary">End Date</label>
            <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-card border border-border rounded-md shadow-sm text-text focus:outline-none focus:ring-focus focus:border-focus"/>
          </div>
          <button className="bg-primary text-textInverse px-4 py-2 rounded-md hover:bg-primaryHover transition-colors w-full md:w-auto">
            Filter
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-surface rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-medium text-textMuted">Total Revenue</h3>
          <p className="text-4xl font-bold text-text">${mockFinancialData.metrics.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-surface rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-medium text-textMuted">Successful Transactions</h3>
          <p className="text-4xl font-bold text-text">{mockFinancialData.metrics.successfulTransactions}</p>
        </div>
        <div className="p-6 bg-surface rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-medium text-textMuted">Total Commissions</h3>
          <p className="text-4xl font-bold text-text">${mockFinancialData.metrics.totalCommissions.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8 p-6 bg-surface rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-textSecondary mb-4">Revenue Over Time</h2>
        <DataChart data={mockFinancialData.dailyRevenue} lineKey="revenue" xAxisKey="date" />
      </div>

      {/* Transactions Table */}
      <div className="bg-surface rounded-lg shadow-lg">
         <Table
            columns={transactionColumns}
            data={mockFinancialData.transactions}
            loading={false}
        />
      </div>
    </div>
  );
};

export default FinancialReportDashboard;

