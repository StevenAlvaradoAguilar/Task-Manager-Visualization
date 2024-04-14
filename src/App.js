// import './App.css';
import React, { useEffect, useState } from 'react';
import FeatureList from './components/FeatureList';

const App = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/features')
    .then(response => response.json())
    .then(data => setFeatures(data))
    .catch(error => console.error('Error fetching sismic data:', error));
  }, [])

  return (
    <div>
      <h1>Sismic Data App</h1>
      <FeatureList features={features} />
    </div>
  );
}

export default App;
