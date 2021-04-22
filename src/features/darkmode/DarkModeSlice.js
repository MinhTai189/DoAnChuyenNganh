import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
  name: 'darkmode',
  initialState: {
    status: false,
  },
  reducers: {
    changeStatus: state => {
      state.status = !state.status;
    },
    setStatus: (state, action) => {
      state.status = action.payload
    }
  },
});

export const { changeStatus, setStatus } = darkModeSlice.actions;

export const selectStatus = state => state.darkMode.status;

export default darkModeSlice.reducer;
