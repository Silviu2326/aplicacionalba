
import { useState, useEffect } from 'react';
import { getFaqs } from '../api'; // Assuming getFaqs is in api.ts

interface FaqItem {
  question: string;
  answer: string;
}

export const useFaqs = (context: string) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const data = await getFaqs(context);
        setFaqs(data);
      } catch (err) {
        setError('Failed to fetch FAQs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [context]);

  return { faqs, loading, error };
};
