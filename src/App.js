import React from "react";
import FeatureList from "./components/FeatureList";
import './App.css';
import WebSocketComponent from "./components/WebSocket/WebSocketComponent";
import useSismicData from "./components/hook/useSismicData";

const App = () => {
  const { features } = useSismicData();

  return (
    <div>
      <h1 className="title">Sismic Data App</h1>
      <FeatureList />
      <WebSocketComponent featureId={features.id} />
    </div>
  );
};

export default App;
