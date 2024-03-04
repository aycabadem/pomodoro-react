import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  rounds: number;
  soundFile: string;
}

const initialState: SettingsState = {
  workMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 20,
  rounds: 4,
  soundFile: "./sound.wav",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setWorkMinutes(state, action: PayloadAction<number>) {
      state.workMinutes = action.payload;
    },
    setBreakMinutes(state, action: PayloadAction<number>) {
      state.breakMinutes = action.payload;
    },
    setLongBreakMinutes(state, action: PayloadAction<number>) {
      state.longBreakMinutes = action.payload;
    },
    setRounds(state, action: PayloadAction<number>) {
      state.rounds = action.payload;
    },
    setSoundFile(state, action: PayloadAction<string>) {
      state.soundFile = action.payload;
    },
  },
});

export const {
  setWorkMinutes,
  setBreakMinutes,
  setLongBreakMinutes,
  setRounds,
  setSoundFile,
} = settingsSlice.actions;

export default settingsSlice.reducer;
