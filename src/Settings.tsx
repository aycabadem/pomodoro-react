import React, { useState } from "react";
import ReactSlider from "react-slider";
import "./Slider.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setWorkMinutes,
  setBreakMinutes,
  setLongBreakMinutes,
  setRounds,
  setSoundFile,
} from "./redux/settingsSlice";
import { RootState } from "./redux/store";
import BackButton from "./BackButton";
interface SettingsProps {
  onBackButtonClick: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBackButtonClick }) => {
  const dispatch = useDispatch();
  const [selectedSoundFile, setSelectedSoundFile] = useState<string>("");
  const workMinutes = useSelector(
    (state: RootState) => state.settings.workMinutes
  );
  const breakMinutes = useSelector(
    (state: RootState) => state.settings.breakMinutes
  );
  const longBreakMinutes = useSelector(
    (state: RootState) => state.settings.longBreakMinutes
  );
  const rounds = useSelector((state: RootState) => state.settings.rounds);

  const handleSoundFileChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFile = event.target.value;
    setSelectedSoundFile(selectedFile);
    dispatch(setSoundFile(selectedFile));
  };
  const audioFiles = require.context("./audio", false, /\.(wav)$/).keys();
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

      <label>Short Break min: {breakMinutes} </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={breakMinutes}
        min={1}
        max={100}
        onChange={(value) => dispatch(setBreakMinutes(value as number))}
      ></ReactSlider>
      <label>Long Break min: {longBreakMinutes} </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={longBreakMinutes}
        min={1}
        max={100}
        onChange={(value) => dispatch(setLongBreakMinutes(value as number))}
      ></ReactSlider>
      <label>Rounds: {rounds} </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={rounds}
        min={2}
        max={15}
        onChange={(value) => dispatch(setRounds(value as number))}
      ></ReactSlider>
      <div>
        <label>Select Sound File:</label>
        <select value={selectedSoundFile} onChange={handleSoundFileChange}>
          <option value="">Select a sound file</option>
          {audioFiles.map((fileName: string) => (
            <option key={fileName} value={fileName}>
              {fileName}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <BackButton onClick={onBackButtonClick} />
      </div>
    </div>
  );
};

export default Settings;
