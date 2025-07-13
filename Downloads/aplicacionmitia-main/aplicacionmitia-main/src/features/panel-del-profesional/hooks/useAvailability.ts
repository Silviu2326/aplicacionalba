import { useState, useEffect } from 'react';
import { getAvailability, updateAvailability } from '../api';

export const useAvailability = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await getAvailability();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const handleUpdateAvailability = async (availability) => {
    try {
      setLoading(true);
      const updatedAvailability = await updateAvailability(availability);
      setEvents(updatedAvailability);
    } catch (error)
 {
      console.error('Error updating availability:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    handleUpdateAvailability,
  };
};