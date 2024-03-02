import React, { useState } from "react";

import "./App.css";
import Timer from "./Timer";
import Settings from "./Settings";

function App() {
  const [showSettings, setShowSettings] = useState(true);

  return <div className="App">{showSettings ? <Settings /> : <Timer />}</div>;
}

export default App;
