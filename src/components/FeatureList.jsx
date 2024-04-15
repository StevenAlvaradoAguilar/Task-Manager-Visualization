//import { motion } from 'framer-motion';
import './Features.css';
import FeatureItem from './FeatureItem';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react'

const FeatureList = ({ features }) => {
    const [filters, setFilters] = useState({
        magType: [],
        page: 1,
        perPage: 25
    });
    const [filteredFeatures, setFilteredFeatures] = useState([]);
    const [pagination, setPagination] = useState({});

    const handlePageChange = (newPage) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            page: newPage
        }));
    };

    const handlePerPageChange = (e) => {
        const newPerPage = parseInt(e.target.value);
        if (newPerPage <= 1000) {
            setFilters(prevFilters => ({
                ...prevFilters,
                perPage: newPerPage
            }));
        }
    };

    const handleMagTypeChange = (e) => {
        const { value, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            magType: checked ? [...prevFilters.magType, value] : prevFilters.magType.filter(type => type !== value)
        }));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/features?page=${filters.page}&per_page=${filters.perPage}&filters[mag_type]=${filters.magType.join(',')}`);
                const data = await response.json();
                setFilteredFeatures(data.data);
                setPagination(data.pagination);
            } catch (error) {
                console.error('Error fetching features:', error);
            }
        };

        fetchData();
    }, [filters]);

    // Combinar los datos originales con los datos filtrados
    const combinedFeatures = [...features, ...filteredFeatures];

    return (
        <div>
            <h2>Features</h2>
            <div className="feature-list">
                {combinedFeatures.map(feature => (
                    <FeatureItem key={feature.id} feature={feature.attributes} />
                ))}
            </div>
            <div>
                {/* Controles de filtro */}
                <div className="filter-container">
                    <div className="filter-checkbox">
                        <label>
                            <input type="checkbox" value="md" onChange={handleMagTypeChange} /> md
                        </label>
                    </div>
                    <div className="filter-select">
                        <select value={filters.perPage} onChange={handlePerPageChange}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            {/* Otras opciones de perPage */}
                        </select>
                    </div>
                </div>
                {/* Resultados filtrados */}
                <div>
                    {filteredFeatures.map(feature => (
                        <div key={feature.id}>{feature.attributes.title}</div>
                    ))}
                </div>
                {/* Paginación */}
                <div>
                    <button disabled={filters.page === 1} onClick={() => handlePageChange(filters.page - 1)}>Previous</button>
                    <span>{`Page ${filters.page} of ${pagination.total_pages}`}</span>
                    <button disabled={filters.page >= pagination.total_pages} onClick={() => handlePageChange(filters.page + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};

FeatureList.propTypes = {
    features: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default FeatureList;