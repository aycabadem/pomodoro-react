import React from "react";
import ReactSlider from "react-slider";
import "./Slider.css";
import { useDispatch, useSelector } from "react-redux";
import { setWorkMinutes, setBreakMinutes } from "./redux/settingsSlice";
import { RootState } from "./redux/store";

const Settings = () => {
  const dispatch = useDispatch();
  const workMinutes = useSelector(
    (state: RootState) => state.settings.workMinutes
  );
  const breakMinutes = useSelector(
    (state: RootState) => state.settings.breakMinutes
  );
  return (
    <div style={{ textAlign: "center" }}>
      <label>Work min: {workMinutes} </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={workMinutes}
        min={1}
        max={100}
        onChange={(value) => dispatch(setWorkMinutes(value as number))}
      ></ReactSlider>

      <label>Break min: {breakMinutes} </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={breakMinutes}
        min={1}
        max={100}
        onChange={(value) => dispatch(setBreakMinutes(value as number))}
      ></ReactSlider>
    </div>
  );
};

export default Settings;
