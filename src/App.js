import React, { useEffect, useState } from "react";
import FeatureList from "./components/FeatureList";

const App = () => {
  const [features, setFeatures] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    magType: [],
    page: 1,
    perPage: 10,
  });

  useEffect(() => {
    // Función para obtener los datos del servidor
    const fetchData = async () => {
      const url = `http://localhost:3000/api/features?page=${
        filters.page
      }&per_page=${filters.perPage}&filters[mag_type]=${filters.magType.join(
        ","
      )}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFeatures(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching sismic data:", error);
      }
    };

    fetchData();
  }, [filters]);

  // Función para manejar cambios en los filtros de tipo de magnitud
  const handleMagTypeChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      magType: checked
        ? [...prevFilters.magType, value]
        : prevFilters.magType.filter((type) => type !== value),
    }));
  };

  // Función para manejar cambios en la página
  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  // Función para manejar cambios en la cantidad de resultados por página
  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    if (newPerPage <= 1000) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        perPage: newPerPage,
      }));
    }
  };

  return (
    <div>
      <h1>Sismic Data App</h1>
      {/* Pasar funciones y estados necesarios a FeatureList */}
      <FeatureList
        features={features}
        pagination={pagination}
        filters={filters}
        onMagTypeChange={handleMagTypeChange}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default App;
