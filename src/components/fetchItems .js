const fetchItems = async (page, perPage) => {
    try {
      const response = await fetch(`http://localhost:3000/api/features?page=${page}&per_page=${perPage}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching items:', error);
      return { items: [], total_pages: 1 }; // Devuelve un objeto vacío en caso de error
    }
  };
  