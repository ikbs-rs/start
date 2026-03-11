import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuthTranslations } from './authTranslations';
import './Login.css';
import './ForgotPassword.css';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const selectedLanguage = localStorage.getItem('sl') || 'sr_cyr';
  const t = getAuthTranslations(selectedLanguage);
  const [identity, setIdentity] = useState('');
  const [message, setMessage] = useState('');

  const handleConfirm = () => {
    if (!identity.trim()) {
      setMessage(t.forgotRequired);
      return;
    }

    setMessage(t.forgotSuccess);
  };

  return (
    <div className="login-body mui-login-body">
      <div className="card login-panel p-fluid mui-login-panel">
        <div className="login-panel-content">
          <Box sx={{ width: '100%', maxWidth: 420, ml: 'auto', p: { xs: 2, md: 3 } }}>
            <Box className="logo-container">
              <img src="assets/layout/images/ems-logo-novi-1-1.png" alt="EMS" className="auth-logo" />
              <span className="guest-sign-in">{t.resetPasswordTitle}</span>
            </Box>

            <Box sx={{ width: '100%', mt: 2 }}>
              <Typography component="label" htmlFor="forgot-identity">{t.emailOrUsername}</Typography>
              <div className="login-input">
                <TextField
                  id="forgot-identity"
                  type="text"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  fullWidth
                  size="small"
                />
              </div>
            </Box>

            {message ? (
              <Typography className="forgot-message" sx={{ mt: 2 }}>
                {message}
              </Typography>
            ) : null}

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Button variant="outlined" className="auth-action-btn" onClick={() => navigate('/login')}>
                {t.back}
              </Button>
              <Button variant="outlined" className="auth-action-btn" onClick={handleConfirm}>
                {t.confirm}
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
