import React from 'react';
import HomePage from './pages/HomePage';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectStatus } from './features/darkmode/DarkModeSlice'

function App() {
  const isDarkMode = useSelector(selectStatus)

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

  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
