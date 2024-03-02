import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colors from "./colors";
import { PlayButton } from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";

const Timer = () => {
  return (
    <div>
      <div>
        <CircularProgressbar
          value={60}
          text={`${60}%`}
          styles={buildStyles({
            trailColor: colors.softWhite,
            textColor: colors.softWhite,
            pathColor: colors.darkGray,
          })}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <PlayButton onClick={() => {}} />
        <PauseButton onClick={() => {}} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default Timer;
