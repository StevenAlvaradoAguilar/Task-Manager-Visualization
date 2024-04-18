import './css/Features.css';
import FeatureItem from './FeatureItem';
import React from 'react'
import useSismicData from './hook/useSismicData';

const FeatureList = () => {

    const { features, pagination, filters, handleMagTypeChange, handlePageChange, handlePerPageChange, createComment, fetchCommentsForFeature } = useSismicData();

    return (
        <div>
            <h2 className='information'>Information of the Features</h2>
            {/* Controles de filtro */}
            <div className="filter-container">
                <div className="filter-checkbox">
                    <label className='label-checkbox'>Select Mag Type:</label>
                    <select
                        className='text-filter'
                        value={filters.magType || ''}
                        onChange={(e) => handleMagTypeChange(e.target.value === 'all' ? null : e.target.value)}
                    >
                        <option className='text-filter' value="all">All mag types</option>
                        <option className='text-filter' value="mh">mh</option>
                        <option className='text-filter' value="mb_lg">mb_lg</option>
                        <option className='text-filter' value="mw">mw</option>
                        <option className='text-filter' value="mb">mb</option>
                        <option className='text-filter' value="md">md</option>
                        <option className='text-filter' value="mwr">mwr</option>
                        <option className='text-filter' value="ml">ml</option>
                        <option className='text-filter' value="mww">mww</option>
                    </select>
                </div>
                <div className="filter-select">
                    <select className='text-filter' value={filters.perPage} onChange={handlePerPageChange}>
                        <option className='text-filter' value="25">25</option>
                        <option className='text-filter' value="20">20</option>
                        <option className='text-filter' value="10">10</option>
                    </select>
                </div>
            </div>
            <div className="feature-list">
                {features.map((feature, index) => (
                    <div className="item" key={feature.id}>
                        <FeatureItem
                            id={feature.id}
                            feature={feature.attributes}
                            links={feature.links}
                            createComment={createComment}
                            magType={filters.magType}
                            fetchCommentsForFeature={fetchCommentsForFeature}
                        />
                    </div>
                ))}
            </div>
            <div>
                {/* Paginación */}
                <div className='pagination'>
                    <button disabled={filters.page === 1} onClick={() => handlePageChange(filters.page - 1)}>Previous</button>
                    <span>{`Page ${filters.page} of ${pagination.totalPages}`}</span>
                    <button disabled={filters.page >= pagination.totalPages} onClick={() => handlePageChange(filters.page + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default FeatureList;

