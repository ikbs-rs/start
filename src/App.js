import React, { useState, useEffect, useRef } from 'react';

import Header from './components/home/HomeHeader';
import Modules from './components/home/HomeFeatures';
import News from './components/home/HomeNews';
import News1 from './components/home/HomeNewsletterSection';
import Pricing from './components/home/HomePricing';
import Footer from './components/home/HomeFooter';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = () => {
    
    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
      };
    
      return (
        <>

        <div className="landing-body">
          <div className="landing-wrapper">
            <Header scrollToDiv={scrollToDiv} />
            <Modules />
            <News />
            <News1 />              
            <Pricing />
            <Footer />
          </div>
          <script src="./components/home/js/HomeScript.js"></script>      
        </div>
        </>
      );
};

export default App;
