import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';
import { Access } from './pages/Access';
import { useTokenValidation } from './security/interceptors';
import axios from 'axios';
import env from "./configs/env"


const AppWrapper = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useTokenValidation();

  // izvrsavanje efekata  komponenti kada se komponenta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  // kada nema drugog argumenta to znaci da se funkcija izvrsava samo `onload`

  useEffect(() => {
    if (isLoggedIn) {
      //TODO idi na pocetnu stranicu
      navigate('/');
    } else {
      //TODO vrati se na login
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  /*
    let location = useLocation();
    const navigate = useNavigate();
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      // proveri da li postoji token i da li je validan
      if (token && token.length > 0) {
        // Provera da li je token validan
        axios
         .post(`${env.JWT_BACK_URL}/adm/services/checkJwt`,
         {
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000, // vreme za koje se očekuje odgovor od udaljenog servera (u milisekundama)
        }
        )
         .then((response) => {
           isLoggedIn = response.status === 200; // Ako je status 200, isLoggedIn će biti true
           if (isLoggedIn) {
             //TODO idi na pocetnu stranicu
             setIsLoggedIn(true);
            navigate('/');
           } else {
             //TODO vrati se na login
             navigate('/login');
           }
         })
         .catch((error) => {
           console.error(error);
           isLoggedIn = false; // Ako se dogodila pogreška, isLoggedIn će biti false
           //TODO vrati se na login
         });        
        
      } else {
        setIsLoggedIn(false);
      }
      window.scrollTo(0, 0);
    }, [location]);
  */
 
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/access" element={<Access />} />
        {isLoggedIn ? (
          <Route path="*" element={<App />} />
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    );
   
  };

export default AppWrapper;
