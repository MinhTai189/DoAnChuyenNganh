import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from '../features/darkmode/DarkModeSlice'

export default configureStore({
  reducer: {
    darkMode: darkModeReducer
  },
});
