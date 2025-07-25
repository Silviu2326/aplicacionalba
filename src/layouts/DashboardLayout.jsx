import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ErrorBoundary from '../components/ErrorBoundary';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-brand-light/10 via-white to-brand/5">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleCloseSidebar} 
        />

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Navbar */}
          <Navbar 
            onToggleSidebar={handleToggleSidebar}
          />

          {/* Page Content */}
          <main>
              <Outlet />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default DashboardLayout;