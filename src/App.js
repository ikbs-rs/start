import React, { useCallback, useEffect } from 'react';

import Header from './components/home/HomeHeader';
import Modules from './components/home/HomeFeatures';
import Footer from './components/home/HomeFooter';
import HomeAIPromptFab from './components/home/HomeAIPromptFab';
import { useDispatch } from 'react-redux';
import { setLanguage } from './store/actions';

import './App.scss';

const RETURN_SECTION_KEY = "start:return-section";


const App =  () => {
    
  const dispatch = useDispatch();

  const scrollToDiv = useCallback((id) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('sl') //urlParams.get('sl');
    if (selectedLanguage) {
      dispatch(setLanguage(selectedLanguage)); // Postavi jezik iz URL-a u globalni store
    }
  }, [dispatch]);

  useEffect(() => {
    const returnSection = localStorage.getItem(RETURN_SECTION_KEY);
    if (!returnSection) {
      return;
    }

    const timerId = setTimeout(() => {
      scrollToDiv(returnSection);
      localStorage.removeItem(RETURN_SECTION_KEY);
    }, 120);

    return () => clearTimeout(timerId);
  }, [scrollToDiv]);
    
      return (
        <>

        <div className="landing-body mui-landing-body">
          <div className="landing-wrapper mui-landing-wrapper">
            <Header scrollToDiv={scrollToDiv} />
            <Modules />
            <Footer />
          </div>
        </div>
        <HomeAIPromptFab />
        </>
      );
};

export default App;
