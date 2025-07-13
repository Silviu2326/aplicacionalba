import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Home, ShieldCheck, Users, MessageSquare, HelpCircle, FileClock, Ticket, List, DollarSign, PieChart, AlertTriangle, TrendingUp, FileText, Star, Activity } from 'lucide-react';

import AdminSidebar from './components/AdminSidebar';
import Dashboard from './components/Dashboard.jsx';
import ReviewModeration from './components/ReviewModeration.jsx';
import { ProfessionalVerificationQueue } from './components/ProfessionalVerificationQueue.jsx';
import UserManagement from './components/UserManagement.jsx';
import AdminUserProfileView from './components/AdminUserProfileView';
import SupportTickets from './components/SupportTickets.jsx';
import AuditLogTable from './components/AuditLogTable';
import CouponManager from './components/CouponManager';
import TaxonomyManager from './components/TaxonomyManager';
import FinancialReportDashboard from './components/FinancialReportDashboard';
import PayoutQueue from './components/PayoutQueue';
import SegmentBuilderUI from './components/SegmentBuilderUI';
import CampaignManager from './components/CampaignManager';
import UserSegmentTable from './components/UserSegmentTable';
import FraudAlertQueue from './components/FraudAlertQueue';
import ProfessionalPerformancePage from './components/ProfessionalPerformancePage';
import CommissionRuleBuilder from './components/CommissionRuleBuilder';
import CommissionRuleList from './components/CommissionRuleList';
import FeeSimulator from './components/FeeSimulator';
import { ArticleEditor } from './components/ArticleEditor';
import { ArticleListTable } from './components/ArticleListTable';
import { useBackofficedeAdministracion } from './hooks/useBackofficedeAdministracion';
import { getArticles, createArticle, updateArticle, deleteArticle, getSystemHealth } from './api';
import FeedbackQueue from './components/FeedbackQueue';
import SystemHealthDashboard from './components/SystemHealthDashboard';


const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
  { to: '/admin/salud-sistema', label: 'Salud del Sistema', icon: <Activity size={20} /> },
  { to: '/admin/rendimiento', label: 'Rendimiento', icon: <TrendingUp size={20} /> },
  { to: '/admin/contenido', label: 'Gestor de Contenido', icon: <FileText size={20} /> },
  { to: '/admin/fraude', label: 'Alertas de Fraude', icon: <AlertTriangle size={20} /> },
  { to: '/admin/validacion', label: 'Validación de Profesionales', icon: <ShieldCheck size={20} /> },
  { to: '/admin/usuarios', label: 'Gestión de Usuarios', icon: <Users size={20} /> },
  { to: '/admin/segmentos', label: 'Segmentos y Campañas', icon: <PieChart size={20} /> },
  { to: '/admin/moderacion', label: 'Moderación', icon: <MessageSquare size={20} /> },
  { to: '/admin/feedback', label: 'Feedback', icon: <Star size={20} /> },
  { to: '/admin/soporte', label: 'Soporte', icon: <HelpCircle size={20} /> },
  { to: '/admin/auditoria', label: 'Auditoría', icon: <FileClock size={20} /> },
  { to: '/admin/cupones', label: 'Cupones', icon: <Ticket size={20} /> },
  { to: '/admin/taxonomia', label: 'Taxonomías', icon: <List size={20} /> },
  { to: '/admin/informes', label: 'Informes Financieros', icon: <DollarSign size={20} /> },
  { to: '/admin/pagos', label: 'Cola de Pagos', icon: <DollarSign size={20} /> },
  { to: '/admin/comisiones', label: 'Comisiones', icon: <DollarSign size={20} /> },
];

const AdminLayout = () => (
  <div className="flex h-screen bg-gradient-to-br from-background via-backgroundSecondary to-surface text-text relative overflow-hidden">
    {/* Elementos decorativos de fondo */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-info/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-success/10 to-warning/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
    
    <AdminSidebar navItems={navItems} />
    <main className="flex-1 p-8 overflow-y-auto relative z-10">
      {/* Header con gradiente */}
      <div className="mb-8 relative">
        <div className="bg-gradient-to-r from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-borderLight/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-2">
              Panel de Administración
            </h1>
            <p className="text-textMuted text-lg">Gestiona y supervisa toda la plataforma desde aquí</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-surface/60 via-card/60 to-surface/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-borderLight/30">
        <Outlet />
      </div>
    </main>
  </div>
);

const BackofficedeAdministracionPage = ({ onImpersonate }) => {
  const {
    stats,
    professionals,
    users,
    pendingReviews,
    tickets,
    auditLogs,
    segments,
    campaigns,
    fraudAlerts,
    isLoading,
    error,
    approveProfessional,
    rejectProfessional,
    searchUsers,
    toggleUserStatus,
    approveReview,
    deleteReview,
    handleTicketSelect,
    handleStatusChange,
    handleReply,
    fetchAuditLogs,
    handleCreateSegment,
    handleCreateCampaign,
    getLiveUserCount,
  } = useBackofficedeAdministracion();

  const [systemHealth, setSystemHealth] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      const data = await getSystemHealth();
      setSystemHealth(data);
    };

    fetchHealthData();
    const intervalId = setInterval(fetchHealthData, 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId);
  }, []);


  if (error) {
    return <div className="text-error">Error: {error.message}</div>;
  }

  // Wrapper component to pass props to the Dashboard
  const DashboardWrapper = () => <Dashboard stats={stats} isLoading={isLoading} />;
  const SystemHealthWrapper = () => <SystemHealthDashboard systemHealth={systemHealth} isLoading={!systemHealth} />;
  const FraudAlertWrapper = () => <FraudAlertQueue alerts={fraudAlerts} isLoading={isLoading} />;
  const AuditLogWrapper = () => <AuditLogTable auditLogs={auditLogs} isLoading={isLoading} onFilter={fetchAuditLogs} />;
  const TaxonomyWrapper = () => (
    <div className="space-y-8">
      <TaxonomyManager taxonomyType="professional" />
      <TaxonomyManager taxonomyType="article" />
    </div>
  );
  const SegmentsAndCampaignsWrapper = () => (
    <div className="space-y-8">
      <SegmentBuilderUI onSave={handleCreateSegment} getLiveUserCount={getLiveUserCount} isLoading={isLoading} />
      <UserSegmentTable segments={segments} isLoading={isLoading} />
      <CampaignManager campaigns={campaigns} segments={segments} onSave={handleCreateCampaign} isLoading={isLoading} />
    </div>
  );
  const CommissionRulesWrapper = () => (
    <div className="space-y-8">
      <CommissionRuleBuilder />
      <CommissionRuleList />
      <FeeSimulator />
    </div>
  );

  const ContentManagerWrapper = () => {
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    useEffect(() => {
      const loadArticles = async () => {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      };
      loadArticles();
    }, []);

    const handleSaveArticle = async (article) => {
      if (article.id) {
        await updateArticle(article.id, article);
      } else {
        await createArticle(article);
      }
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
      setIsEditorOpen(false);
      setEditingArticle(null);
    };

    const handleDeleteArticle = async (articleId) => {
      if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
        await deleteArticle(articleId);
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      }
    };

    const handleEditArticle = (article) => {
      setEditingArticle(article);
      setIsEditorOpen(true);
    };
    
    const handleCreateNew = () => {
        setEditingArticle(null);
        setIsEditorOpen(true);
    }

    const handleCancel = () => {
      setIsEditorOpen(false);
      setEditingArticle(null);
    };

    return (
      <div>
        {!isEditorOpen ? (
          <>
            <div className="flex justify-end mb-4">
                <button onClick={handleCreateNew} className="bg-primary hover:bg-primaryHover text-textInverse font-bold py-2 px-4 rounded-md transition-colors duration-300">
                    Crear Nuevo Artículo
                </button>
            </div>
            <ArticleListTable articles={articles} onEdit={handleEditArticle} onDelete={handleDeleteArticle} />
          </>
        ) : (
          <ArticleEditor article={editingArticle} onSave={handleSaveArticle} onCancel={handleCancel} />
        )}
      </div>
    );
  };


  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardWrapper />} />
        <Route path="salud-sistema" element={<SystemHealthWrapper />} />
        <Route path="rendimiento" element={<ProfessionalPerformancePage />} />
        <Route path="contenido" element={<ContentManagerWrapper />} />
        <Route path="fraude" element={<FraudAlertWrapper />} />
        <Route path="validacion" element={<ProfessionalVerificationQueue professionals={professionals} onApprove={approveProfessional} onReject={rejectProfessional} />} />
        <Route path="usuarios" element={<UserManagement users={users} onSearch={searchUsers} onToggleStatus={toggleUserStatus} onImpersonate={onImpersonate} />} />
        <Route path="usuarios/:id" element={<AdminUserProfileView />} />
        <Route path="segmentos" element={<SegmentsAndCampaignsWrapper />} />
        <Route path="moderacion" element={<ReviewModeration reviews={pendingReviews} onApprove={approveReview} onDelete={deleteReview} />} />
        <Route path="feedback" element={<FeedbackQueue />} />
        <Route path="soporte" element={<SupportTickets tickets={tickets} onTicketSelect={handleTicketSelect} onStatusChange={handleStatusChange} onReply={handleReply} />} />
        <Route path="auditoria" element={<AuditLogWrapper />} />
        <Route path="cupones" element={<CouponManager />} />
        <Route path="taxonomia" element={<TaxonomyWrapper />} />
        <Route path="informes" element={<FinancialReportDashboard />} />
        <Route path="pagos" element={<PayoutQueue />} />
        <Route path="comisiones" element={<CommissionRulesWrapper />} />
      </Route>
    </Routes>
  );
};

export default BackofficedeAdministracionPage;
