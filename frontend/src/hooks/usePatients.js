// MedAstra — usePatients hook
import { useState, useEffect, useCallback } from 'react';
import { getPatients } from '../services/patientService.js';

/**
 * Custom hook to fetch and manage patient list
 * @returns {{ patients: Array, loading: boolean, error: string|null, refetch: Function }}
 */
export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPatients();
      const data = res.data?.patients || res.data || [];
      setPatients(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to load patients.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { patients, loading, error, refetch: fetchPatients };
};
