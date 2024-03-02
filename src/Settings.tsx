import React from "react";
import ReactSlider from "react-slider";
import "./Slider.css";
const Settings = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <label>Work min:</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={45}
        min={1}
        max={120}
      ></ReactSlider>
      <label>Break min:</label>
    </div>
  );
};

export default Settings;
