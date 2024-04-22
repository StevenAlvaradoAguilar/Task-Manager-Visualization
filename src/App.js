import React from "react";
import FeatureList from "./components/FeatureList";
import './App.css';
import WebSocketComponent from "./components/WebSocket/WebSocketComponent";

const App = () => {

  return (
    <div>
      <h1 className="title">Sismic Data App</h1>
      <FeatureList />
      <WebSocketComponent />
    </div>
  );
};

export default App;
