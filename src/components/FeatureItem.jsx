import React from 'react';
import './Features.css';

const FeatureItem = ({ feature }) => {
    const { external_id, magnitude, place, time, url, tsunami, mag_type, title, coordinates } = feature;

    // Verificar si coordinates está definido antes de desestructurarlo
    const longitude = coordinates ? coordinates.longitude : null;
    const latitude = coordinates ? coordinates.latitude : null;

    const handleUrlClick = () => {
        window.open(url, '_blank');
    };

    return (
        <div className="item">
            <div className='container'>
                <div className='title'>
                    <h3>{title}</h3>
                </div>
                <p>ID: {external_id}</p>
                <p>Magnitude: {magnitude}</p>
                <p>Place: {place}</p>
                <p>Time: {time}</p>
                <p>Tsunami: {tsunami ? "Yes" : "No"}</p>
                <p>Mag Type: {mag_type}</p>
                <p>Coordinates: [{longitude}, {latitude}]</p>
                <div className="url">
                    <button onClick={handleUrlClick}>More info</button>
                </div>
            </div>
        </div>
    );
};


export default FeatureItem;
