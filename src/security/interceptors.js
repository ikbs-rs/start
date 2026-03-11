import { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../configs/env';

const toAuthHeader = (token) => {
  if (!token) {
    return '';
  }

  const normalized = token.replace(/^Bearer\s+/i, '').trim();
  return normalized ? `Bearer ${normalized}` : '';
};

const readLoginState = () => {
  const token = localStorage.getItem('token');
  const sessionLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  return Boolean(token && sessionLoggedIn);
};

const setLoginSessionState = (loggedIn) => {
  sessionStorage.setItem('isLoggedIn', loggedIn ? 'true' : 'false');
  window.dispatchEvent(new Event('auth-state-change'));
};

const useTokenValidation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(readLoginState);

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(readLoginState());
    };

    syncLoginState();
    window.addEventListener('auth-state-change', syncLoginState);
    window.addEventListener('hashchange', syncLoginState);
    window.addEventListener('storage', syncLoginState);

    return () => {
      window.removeEventListener('auth-state-change', syncLoginState);
      window.removeEventListener('hashchange', syncLoginState);
      window.removeEventListener('storage', syncLoginState);
    };
  }, []);

  return { isLoggedIn, isChecking: false };
};

const usePermission = (objId, par1, par2) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const permission = await checkPermissions(objId, par1, par2);
      setHasPermission(permission);
    };

    fetchData();
  }, [objId, par1, par2]);

  return hasPermission;
};

const checkPermissions = async (objId, par1, par2) => {
  const token = localStorage.getItem('token');

  const data = {
    objId,
    par1: par1 || '1',
    par2: par2 || '1'
  };

  const config = {
    headers: {
      Authorization: toAuthHeader(token)
    }
  };

  try {
    const response = await axios.post(`${env.JWT_BACK_URL}/adm/services/checkPermissions`, data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
  useTokenValidation,
  usePermission,
  checkPermissions,
  setLoginSessionState
};
