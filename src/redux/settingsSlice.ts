import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  rounds: number;
}

const initialState: SettingsState = {
  workMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 20,
  rounds: 4,
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
  },
});

export const {
  setWorkMinutes,
  setBreakMinutes,
  setLongBreakMinutes,
  setRounds,
} = settingsSlice.actions;

export default settingsSlice.reducer;
