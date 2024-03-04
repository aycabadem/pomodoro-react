import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colors from "./colors";
import { PlayButton } from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import RestartButton from "./RestartButton";

interface TimerProps {
  onSettingsButtonClick: () => void;
}

const Timer: React.FC<TimerProps> = ({ onSettingsButtonClick }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");
  const [currentRound, setCurrentRound] = useState(1);
  const rounds = useSelector((state: RootState) => state.settings.rounds);
  const workMinutes = useSelector(
    (state: RootState) => state.settings.workMinutes
  );
  const breakMinutes = useSelector(
    (state: RootState) => state.settings.breakMinutes
  );
  const longBreakMinutes = useSelector(
    (state: RootState) => state.settings.longBreakMinutes
  );
  const soundFile = useSelector((state: RootState) => state.settings.soundFile);

  const audio1 = require(`./audio${soundFile.substring(1)}`);
  const audio = new Audio(audio1);

  function switchMode() {
    let nextMode = " short break";
    if (mode === "work") {
      nextMode = currentRound === rounds ? "long break" : "short break";

      setSecondsLeft(
        nextMode === "short break" ? breakMinutes * 60 : longBreakMinutes * 60
      );
      setCurrentRound(currentRound + 1);
    } else if (mode === "short break") {
      nextMode = "work";
      setSecondsLeft(workMinutes * 60);
    } else if (mode === "long break") {
      nextMode = "work";
      setSecondsLeft(workMinutes * 60);
      setCurrentRound(1);
    }
    setMode(nextMode);
    audio.play();
  }

  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes, breakMinutes, longBreakMinutes]);

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
  }, [isPaused, mode, currentRound]);

  const handlePlayButtonClick = () => {
    setIsPaused(false);
  };

  const handlePauseButtonClick = () => {
    setIsPaused(true);
  };

  const handleRestartButton = () => {
    setMode("work");
    setSecondsLeft(workMinutes * 60);
    setCurrentRound(1);
    setIsPaused(true);
  };

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
          value={
            (((mode === "work"
              ? workMinutes
              : mode === "break"
              ? breakMinutes
              : longBreakMinutes) *
              60 -
              secondsLeft) /
              ((mode === "work"
                ? workMinutes
                : mode === "break"
                ? breakMinutes
                : longBreakMinutes) *
                60)) *
            100
          }
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
        <RestartButton onClick={handleRestartButton} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={onSettingsButtonClick} />
      </div>
    </div>
  );
};

export default Timer;
