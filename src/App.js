import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { selectStatus } from './features/darkmode/DarkModeSlice'
import { setStatus } from './features/darkmode/DarkModeSlice'
import SigninPage from './pages/SigninPage';
import { firebaseAuth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, removeUser } from './features/user/UserSlice'
import { selectUser } from './features/user/UserSlice'
import HomePage from './pages/HomePage';

function App() {
  const isDarkMode = useSelector(selectStatus)
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#8FB339',
      },
      secondary: {
        main: '#B58DB6'
      },
      type: !isDarkMode ? 'light' : 'dark'
    },
  });

  // theo dõi trạng thái đăng nhập
  const handleChangeStateAccount = () => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        // lấy thông tin người dùng
        const data = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL
        }
        dispatch(getUser(data))
      }
      else {
        dispatch(removeUser())
      }
    })
  }

  useEffect(() => {
    handleChangeStateAccount();
    const initialDarkMode = localStorage.getItem('isDarkMode') ? JSON.parse(localStorage.getItem('isDarkMode')) : false
    dispatch(setStatus(initialDarkMode));
  }, [])

  if (!user) {
    return <SigninPage />
  }
  else {
    return (
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );
  }
}

export default App;
