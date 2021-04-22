import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from '../features/darkmode/DarkModeSlice'
import userReducer from '../features/user/UserSlice'

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
    user: userReducer
  },
});
