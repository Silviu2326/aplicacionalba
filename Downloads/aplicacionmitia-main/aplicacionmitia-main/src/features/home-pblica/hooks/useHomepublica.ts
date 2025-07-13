
import { useState, useEffect } from 'react';
import { getFeaturedTestimonials } from '../api';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  avatar: string;
}

export const useHomepublica = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getFeaturedTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, isLoading, error };
};
