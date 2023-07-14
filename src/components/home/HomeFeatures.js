import React, { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import env from "../../configs/env"
import { translations } from "../../configs/translations";
//import queryString from "query-string"
//import { useSelector } from 'react-redux';
import { usePermission } from '../../security/interceptors';

function HomeFeatures() {
  //const navigate = useNavigate();
  //const queryParams = queryString.parse(window.location)
  const selectedLanguage = localStorage.getItem('sl')||'en' //useSelector((state) => state.selectedLanguage);
  const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage);

  useEffect(() => {
    setCurrentLanguage(selectedLanguage)
  }, [selectedLanguage]);

  const handleBoxClick = (par) => {

    const moduleUrl = par;
    //const currentUrl = window.location.href;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", moduleUrl, true);
    //xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("jwtToken")}`);
    //xhr.setRequestHeader("Referer", currentUrl);
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        window.location.href = moduleUrl;
      } else {
        console.log('***************')
      }
    };
    xhr.send();
  }

  return (
    <div id="features" className="landing-features">
      <div className="features-topic-shadow">
        <div className="features-topic">{translations[currentLanguage].MODULES}</div>
      </div>
      <div className="grid">
        { usePermission('ADMentry') && (
        <div className="col-12 lg:col-4" >
          <a href={`${env.ADM_URL}?sl=${selectedLanguage}`}>
            <div className="feature-box">
              <img src={`assets/layout/images/landing/icon-gorgeous@2x.png`} alt="roma" style={{ cursor: 'pointer' }} />
              <div style={{ cursor: 'pointer' }}>
                <h3>{translations[currentLanguage].systemAdmin}</h3>
                <p>{translations[currentLanguage].systemAdminDescription}</p>
              </div>
            </div>
          </a>
        </div>
        )}
        { usePermission('CMNentry') && (
        <div className="col-12 lg:col-4">
          <a href={`${env.CMN_URL}?sl=${selectedLanguage}`}>
            <div className="feature-box">
              <img src={`assets/layout/images/landing/icon-design@2x.png`} alt="roma" style={{ cursor: 'pointer' }} />
              <div style={{ cursor: 'pointer' }}>
                <h3>{translations[currentLanguage].commonLibrary}</h3>
                <p>{translations[currentLanguage].commonLibraryDescription}</p>
              </div>
            </div>
          </a>
        </div>
        )}
        { usePermission('TICentry') && (
        <div className="col-12 lg:col-4">
          <a href={`${env.TIC_URL}?sl=${selectedLanguage}`}>
            <div className="feature-box">
              <img src={`assets/layout/images/landing/icon-responsive@2x.png`} alt="roma" style={{ cursor: 'pointer' }} />
              <div style={{ cursor: 'pointer' }}>
                <h3>{translations[currentLanguage].ticketlineSystem}</h3>
                <p>{translations[currentLanguage].ticketlineSystemDescription}</p>
              </div>
            </div>
          </a>
        </div>
        )}
        { usePermission('ADMentry') && (
        <div className="col-12 lg:col-4">
          <a href={`${env.ADM_URL}?sl=${selectedLanguage}`}>
            <div className="feature-box">
              <img src={`assets/layout/images/landing/icon-document@2x.png`} alt="roma" style={{ cursor: 'pointer' }} />
              <div style={{ cursor: 'pointer' }}>
                <h3>{translations[currentLanguage].reporting}</h3>
                <p>{translations[currentLanguage].reportingDescription}</p>
              </div>
            </div>
          </a>
        </div>
        )}
        <div className="col-12 lg:col-4">
          <a href="https://www.ticketline.rs/" target="_blank">
            <div className="feature-box">
              <img src={`assets/layout/images/landing/icon-you@2x.png`} alt="roma" style={{ cursor: 'pointer' }} />
              <div style={{ cursor: 'pointer' }}>
                <h3>{translations[currentLanguage].customerSupport}</h3>
                <p>{translations[currentLanguage].customerSupportDescription}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div >
  );
}

export default HomeFeatures;
