import React, { useState } from "react";

import "./App.css";
import Timer from "./Timer";
import Settings from "./Settings";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const handleSettingsButtonClick = () => {
    setShowSettings(!showSettings);
  };

  const handleBackButtonClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="App">
      {showSettings ? (
        <Settings onBackButtonClick={handleBackButtonClick} />
      ) : (
        <Timer onSettingsButtonClick={handleSettingsButtonClick} />
      )}
    </div>
  );
}

export default App;
