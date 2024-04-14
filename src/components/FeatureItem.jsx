import React from 'react';
import './Features.css';

const FeatureItem = ({ feature }) => {
    const { external_id, magnitude, place, time, url, tsunami, mag_type, title, longitude, latitude } = feature;

    return (
        <div>
            <div className='title'>
                <h3>{title}</h3>
            </div>
            <p>ID: {external_id}</p>
            <p>Magnitude: {magnitude}</p>
            <p>Place: {place}</p>
            <p>Time: {time}</p>
            <p>Tsunami: {tsunami}</p>
            <p>Mag Type: {mag_type}</p>
            <p>Coordinates: [{longitude}, {latitude}]</p>
            <a href={url}>More info</a>
        </div>
    )
}

export default FeatureItem