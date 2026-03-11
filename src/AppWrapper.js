import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';
import { Access } from './pages/Access';
import { useTokenValidation } from './security/interceptors';
import theme from './theme';

const AppWrapper = () => {
  const location = useLocation();
  const { isLoggedIn, isChecking } = useTokenValidation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isChecking) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/access" element={<Access />} />
        <Route path="*" element={isLoggedIn ? <App /> : <Navigate to="/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppWrapper;
