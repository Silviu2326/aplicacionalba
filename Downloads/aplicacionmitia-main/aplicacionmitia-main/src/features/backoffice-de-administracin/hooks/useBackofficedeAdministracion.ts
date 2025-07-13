import {
  getAdminStats,
  getPendingProfessionals,
  approveProfessional as approveProf,
  rejectProfessional as rejectProf,
  searchUsers as searchUsersApi,
  updateUserStatus as updateUserStatusApi,
  getPendingReviews,
  approveReview as approveReviewApi,
  deleteReview as deleteReviewApi,
  getTickets,
  updateTicketStatus as updateTicketStatusApi,
  replyToTicket as replyToTicketApi,
  getAuditLog,
  getSegments,
  createSegment,
  getCampaigns,
  createCampaign,
  getUserCountForSegmentRules,
  getFraudAlerts,
  getCommissionRules,
  createCommissionRule,
  updateCommissionRule,
  deleteCommissionRule,
  simulateCommission,
} from '../api';

import { useState, useEffect, useCallback } from 'react';

export const useBackofficedeAdministracion = () => {
  const [stats, setStats] = useState(null);
  const [professionals, setProfessionals] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [segments, setSegments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [commissionRules, setCommissionRules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const data = await getAdminStats();
      setStats(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfessionals = async () => {
    setIsLoading(true);
    try {
      const data = await getPendingProfessionals();
      setProfessionals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPendingReviews();
      setPendingReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAuditLogs = useCallback(async (filters) => {
    setIsLoading(true);
    try {
      const data = await getAuditLog(filters);
      setAuditLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSegments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSegments();
      setSegments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCommissionRules = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCommissionRules();
      setCommissionRules(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFraudAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFraudAlerts();
      setFraudAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchStats();
    fetchProfessionals();
    fetchPendingReviews();
    fetchTickets();
    fetchAuditLogs();
    fetchSegments();
    fetchCampaigns();
    fetchFraudAlerts();
    fetchCommissionRules();
  }, [fetchPendingReviews, fetchTickets, fetchAuditLogs, fetchSegments, fetchCampaigns, fetchFraudAlerts, fetchCommissionRules]);

  const approveProfessional = async (professionalId) => {
    try {
      await approveProf(professionalId);
      fetchProfessionals(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const rejectProfessional = async (professionalId, reason) => {
    try {
      await rejectProf(professionalId, reason);
      fetchProfessionals(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const searchUsers = useCallback(async (searchTerm) => {
    setIsLoading(true);
    try {
      const data = await searchUsersApi(searchTerm);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleUserStatus = async (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const newStatus = user.status === 'active' ? 'inactive' : 'active';

    try {
      await updateUserStatusApi(userId, newStatus);
      setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  const approveReview = async (reviewId) => {
    try {
      await approveReviewApi(reviewId);
      fetchPendingReviews(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await deleteReviewApi(reviewId);
      fetchPendingReviews(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTicketSelect = (ticket) => {
    // Logic to handle ticket selection if needed, for now, it's handled in the component
  };

  const handleStatusChange = async (ticketId, status) => {
    try {
      await updateTicketStatusApi(ticketId, status);
      fetchTickets(); // Refresh tickets
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReply = async (ticketId, reply) => {
    try {
      await replyToTicketApi(ticketId, reply);
      fetchTickets(); // Refresh tickets
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateSegment = async (segmentData) => {
    try {
      await createSegment(segmentData);
      fetchSegments(); // Refresh segments list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateCampaign = async (campaignData) => {
    try {
      await createCampaign(campaignData);
      fetchCampaigns(); // Refresh campaigns list
    } catch (err) {
      setError(err.message);
    }
  };

  const getLiveUserCount = useCallback(async (rules) => {
    try {
      const data = await getUserCountForSegmentRules(rules);
      return data.userCount;
    } catch (err) {
      setError(err.message);
      return 0;
    }
  }, []);

  const handleCreateCommissionRule = async (ruleData) => {
    try {
      await createCommissionRule(ruleData);
      fetchCommissionRules();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCommissionRule = async (ruleId, ruleData) => {
    try {
      await updateCommissionRule(ruleId, ruleData);
      fetchCommissionRules();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCommissionRule = async (ruleId) => {
    try {
      await deleteCommissionRule(ruleId);
      fetchCommissionRules();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSimulateCommission = async (simulationData) => {
    try {
      const result = await simulateCommission(simulationData);
      // Here you might want to display the result in the UI
      console.log('Simulation result:', result);
      return result;
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    stats,
    professionals,
    users,
    pendingReviews,
    tickets,
    auditLogs,
    segments,
    campaigns,
    fraudAlerts,
    commissionRules,
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
    handleCreateCommissionRule,
    handleUpdateCommissionRule,
    handleDeleteCommissionRule,
    handleSimulateCommission,
  };
};

export default useBackofficedeAdministracion;
