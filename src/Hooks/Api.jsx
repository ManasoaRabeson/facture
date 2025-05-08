import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);  // Initialisation à null pour plus de clarté
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
      setData([]); // ou null selon ton usage
  
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
        return response.data; // ✅ On retourne les données ici
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Une erreur est survenue';
        setError(message);
        throw err; // ✅ Important pour que l'appelant sache qu'il y a une erreur
      } finally {
        setLoading(false);
      }
    },
    []
  );
  

  return { loading, error, data, callApi };
};

export default useApi;
