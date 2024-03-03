import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colors from "./colors";
import { PlayButton } from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

interface TimerProps {
  onSettingsButtonClick: () => void;
}

const Timer: React.FC<TimerProps> = ({ onSettingsButtonClick }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");

  const workMinutes = useSelector(
    (state: RootState) => state.settings.workMinutes
  );
  const breakMinutes = useSelector(
    (state: RootState) => state.settings.breakMinutes
  );

  function switchMode() {
    const nextMode = mode === "work" ? "break" : "work";
    setMode(nextMode);
    setSecondsLeft(nextMode === "work" ? workMinutes * 60 : breakMinutes * 60);
  }

  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes, breakMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!isPaused) {
      interval = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => {
          if (prevSecondsLeft === 0) {
            switchMode();
            return prevSecondsLeft;
          }
          return prevSecondsLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return (
    <div>
      <div>
        <CircularProgressbar
          value={((workMinutes * 60 - secondsLeft) / (workMinutes * 60)) * 100}
          text={formattedTime}
          styles={buildStyles({
            trailColor: colors.softWhite,
            textColor: colors.softWhite,
            pathColor: colors.darkGray,
          })}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton onClick={() => setIsPaused(false)} />
        ) : (
          <PauseButton onClick={() => setIsPaused(true)} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={onSettingsButtonClick} />
      </div>
    </div>
  );
};

export default Timer;
