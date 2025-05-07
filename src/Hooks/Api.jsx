import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);  // Initialisation à null pour plus de clarté
  const apiPrefix = 'http://127.0.0.1:8000/api';

  const callApi = useCallback(
    async (
      endpoint,
      {
        method = 'GET',
        body = null,
        headers = {},
        ...options
      } = {}
    ) => {
      setLoading(true);
      setError(null);
      setData([]);

      // Ajout du token d'authentification dans les headers si présent
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      try {
        const response = await axios({
          method,
          url: `${apiPrefix}${endpoint}`,
          data: body,
          headers,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'Une erreur est survenue'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, data, callApi };
};

export default useApi;
