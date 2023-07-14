import React, { useState, useEffect } from "react";

//const PUBLIC_URL = process.env.PUBLIC_URL
import env from "../../configs/env"
import { translations } from "../../configs/translations";
import { useSelector } from 'react-redux';

const LandingFooter = () => {
  const selectedLanguage = localStorage.getItem('sl')||'en' //useSelector((state) => state.selectedLanguage);
  const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage);

  useEffect(() => {
    setCurrentLanguage(selectedLanguage)
  }, [selectedLanguage]);

  return (
    <div className="landing-footer" >
      <div className="grid">
        <div className="col-12 lg:col-3">
          <img src={`assets/layout/images/logo-beli2.png`} alt="roma" />
        </div>
        <div className="col-12 lg:col-3">
          <h4>{translations[currentLanguage].ABOUTUS}</h4>
          <ul>
            <li>
              <h6>
              <a href="#">{translations[currentLanguage].TICKETINGDOO}</a>
              </h6>
            </li>
            <li>
              <a href="#">{translations[currentLanguage].ticketingDescription}</a>
            </li>
            <li>
              <a href="#">{translations[currentLanguage].testimonials}</a>
            </li>
            <li>
              <a href="#">{translations[currentLanguage].license}</a>
            </li>
          </ul>
        </div>
        <div className="col-12 lg:col-3">
          <h4>{translations[currentLanguage].BASICINFORMATION}</h4>
          <ul>
            <li>
              <a href="#">{translations[currentLanguage].PIB}: 103907543</a>
            </li>
            <li>
              <a href="#">{translations[currentLanguage].Identitynumber}: 20040505</a>
            </li>
            <li>
              <a href="#">{translations[currentLanguage].Activitycode}: 4791</a>
            </li>
          </ul>
        </div>
        <div className="col-12 lg:col-3">
          <h4>{translations[currentLanguage].CONTACT}</h4>
          <ul>
            <li>
              <a href="#">{translations[currentLanguage].Phone}: 011-20-30-570</a>
            </li>
            <li>
              <a href="#">{translations[currentLanguage].EMail}: office@ticketline.rs</a>
            </li>
            <li>
              <a href="#">{translations[currentLanguage].Web}: www.ticketline.rs</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
