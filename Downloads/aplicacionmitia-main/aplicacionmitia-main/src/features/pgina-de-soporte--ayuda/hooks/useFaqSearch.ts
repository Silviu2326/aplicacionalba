
import { useState, useMemo } from 'react';
import { FAQ } from '../types';

export const useFaqSearch = (faqs: FAQ[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const groupedFaqs = useMemo(() => {
    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, faq) => {
      const { category } = faq;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);
  }, [faqs, searchTerm]);

  const hasResults = useMemo(() => Object.keys(groupedFaqs).length > 0, [groupedFaqs]);

  return {
    searchTerm,
    setSearchTerm,
    groupedFaqs,
    hasResults,
  };
};
