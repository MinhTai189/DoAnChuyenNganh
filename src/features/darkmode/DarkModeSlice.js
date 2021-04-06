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
  },
});

export const { changeStatus } = darkModeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectStatus = state => state.darkMode.status;

export default darkModeSlice.reducer;
