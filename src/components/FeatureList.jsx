import React from 'react'
import FeatureItem from './FeatureItem';
import PropTypes from 'prop-types';

const FeatureList = ({ features }) => {
  return (
    <div>
        <h2>Features</h2>
        {features && features.length > 0 ? (
            features.map(feature => (
                <FeatureItem key={feature.id} feature={feature} />
            ))
        ) : (
            <p>No feature available</p>
        )}
    </div>
  );
};

FeatureList.propTypes = {
    features: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default FeatureList;