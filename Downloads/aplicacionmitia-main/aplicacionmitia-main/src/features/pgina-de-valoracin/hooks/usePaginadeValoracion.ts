import { useState, useEffect, useCallback } from 'react';
import * as api from '../api';

// Simple debounce utility
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

export const usePaginadeValoracion = (reservationId: string) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftStatus, setDraftStatus] = useState<'unsaved' | 'saving' | 'saved'>('unsaved');

  const localStorageKey = `review-draft-${reservationId}`;

  // Restore from localStorage on initial load
  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(localStorageKey);
      if (savedDraft) {
        const { rating, comment, selectedTags, guidelinesAccepted } = JSON.parse(savedDraft);
        setRating(rating || 0);
        setComment(comment || '');
        setSelectedTags(selectedTags || []);
        setGuidelinesAccepted(guidelinesAccepted || false);
        setDraftStatus('saved');
      }
    } catch (error) {
      console.error("Failed to load draft from localStorage", error);
    }
  }, [localStorageKey]);

  // Debounced function to save to localStorage
  const saveDraft = useCallback(
    debounce((draftData) => {
      try {
        window.localStorage.setItem(localStorageKey, JSON.stringify(draftData));
        setDraftStatus('saved');
      } catch (error) {
        console.error("Failed to save draft to localStorage", error);
        setDraftStatus('unsaved'); // Or some error state
      }
    }, 1000), // 1 second debounce delay
    [localStorageKey]
  );

  // Effect to save draft when form data changes
  useEffect(() => {
    // Don't save the initial empty state as a draft
    if (rating === 0 && comment === '' && selectedTags.length === 0) {
      return;
    }
    setDraftStatus('saving');
    const draftData = { rating, comment, selectedTags, guidelinesAccepted };
    saveDraft(draftData);
  }, [rating, comment, selectedTags, guidelinesAccepted, saveDraft]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guidelinesAccepted) {
      setError('Debes aceptar las directrices de la comunidad para enviar tu valoración.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await api.submitReview({
        rating,
        comment,
        tags: selectedTags,
      });
      
      alert('¡Gracias por tu valoración!');
      
      // Clear draft from localStorage
      window.localStorage.removeItem(localStorageKey);

      // Reset form
      setRating(0);
      setComment('');
      setSelectedTags([]);
      setGuidelinesAccepted(false);
      setDraftStatus('unsaved');

    } catch (error) {
      setError('Hubo un problema al enviar tu valoración. Por favor, inténtalo de nuevo.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const discardDraft = () => {
    window.localStorage.removeItem(localStorageKey);
    setRating(0);
    setComment('');
    setSelectedTags([]);
    setGuidelinesAccepted(false);
    setDraftStatus('unsaved');
    alert('Borrador descartado.');
  };

  return {
    rating,
    setRating,
    comment,
    setComment,
    selectedTags,
    setSelectedTags,
    guidelinesAccepted,
    setGuidelinesAccepted,
    handleSubmit,
    error,
    setError,
    isSubmitting,
    draftStatus,
    discardDraft,
  };
};
