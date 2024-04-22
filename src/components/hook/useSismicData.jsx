import { useState } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';

const useSismicData = () => {
  const [features, setFeatures] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 25,
    magType: null,
  });
  // Bandera de estado para indicar si se está cargando
  const [isLoading, setIsLoading] = useState(false); 
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useDeepCompareEffect(() => {
    const fetchData = async () => {
      // Evitar hacer una solicitud si ya está en curso una solicitud para la misma página
      if (isLoading) return;

      // Establecer la bandera isLoading a true antes de hacer la solicitud
      setIsLoading(true);

      const params = new URLSearchParams({
        page: filters.page,
        per_page: filters.perPage,
        mag_types: filters.magType
      });

      const url = `https://task-manager-production-d1ed.up.railway.app/api/features?${params}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data. Status: " + response.status);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Unexpected response type. Expected JSON.");
        }

        const { data, pagination: responseDataPagination } = await response.json();

        setFeatures(data);
        setPagination({
          currentPage: responseDataPagination.current_page,
          totalPages: Math.ceil(responseDataPagination.total / filters.perPage),
          perPage: filters.perPage,
          totalItems: responseDataPagination.total
        });

      } catch (error) {
        setAlertMessage('Error fetching sismic data: ', error);
        setAlertOpen(true);
      } finally {
        // Establecer la bandera isLoading a false después de completar la solicitud
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters, filters.magType]);

  const handleMagTypeChange = (selectedMagType) => {
    // Update el magType seleccionado en los filtros
    setFilters(prevFilters => ({
      ...prevFilters,
      magType: selectedMagType,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value);
    if (newPerPage <= 1000) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        perPage: newPerPage,
      }));
    }
  };

  const createComment = async (featureId, body) => {
    const url = `https://task-manager-production-d1ed.up.railway.app/api/features/${featureId}/create_comment`;
    const payload = {
      comment: {
        body: body
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create comment. Status: ' + response.status);
      }

      // Manejo de la respuesta del servidor, si es necesario
      const data = await response.json();

      // Actualizar la lista de comentarios
      const commentsForFeature = await fetchCommentsForFeature(featureId);
      return { ...data, comments: commentsForFeature };
    } catch (error) {
      setAlertMessage('Error creating comment: ', error);
      setAlertOpen(true);
    }
  }

  const fetchCommentsForFeature = async (featureId) => {
    try {
      const response = await fetch(`https://task-manager-production-d1ed.up.railway.app/api/features/${featureId}/comments`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments. Status: " + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setAlertMessage('Error fetching comments: ', error);
      setAlertOpen(true);
      return []; // Devolver un array vacío en caso de error
    }
  };

  return {
    features, 
    setFeatures, 
    pagination, 
    filters, 
    handleMagTypeChange, 
    handlePageChange, 
    handlePerPageChange, 
    createComment, 
    fetchCommentsForFeature,
    alertOpen,
    setAlertOpen,
    alertMessage
  };
};

export default useSismicData;