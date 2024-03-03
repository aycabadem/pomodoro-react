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
  const [startBreak, setStartBreak] = useState(false);
  const [startWork, setStartWork] = useState(false);

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
            clearInterval(interval);
            setIsPaused(true);
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

  const handlePlayButtonClick = () => {
    if (mode === "break") {
      setStartBreak(true);
      setIsPaused(false);
    } else {
      setStartWork(true);
      setIsPaused(false);
    }
  };

  const handlePauseButtonClick = () => {
    setIsPaused(true);
  };
  useEffect(() => {
    if (startWork) {
      setIsPaused(false);
      setStartWork(false);
    }
  }, [startWork]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return (
    <div>
      <div
        style={{
          fontSize: "36px",
          marginBottom: "20px",
          textTransform: "capitalize",
        }}
      >
        {mode}
      </div>
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
          <PlayButton onClick={handlePlayButtonClick} />
        ) : (
          <PauseButton onClick={handlePauseButtonClick} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={onSettingsButtonClick} />
      </div>
    </div>
  );
};

export default Timer;
