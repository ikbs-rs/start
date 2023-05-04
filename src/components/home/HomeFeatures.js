import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from "../../configs/env"

function HomeFeatures() {

  const navigate = useNavigate();

  const handleBoxClick = (par) => {
    const moduleUrl = `http://localhost:${par}/`;
    const currentUrl = window.location.href;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", moduleUrl, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("jwtToken")}`);
    xhr.setRequestHeader("Referer", currentUrl);
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        window.location.href = moduleUrl;
      }
    };
    xhr.send();
  }

  return (
    <div id="features" className="landing-features">
      <div className="features-topic-shadow">
        <div className="features-topic">FEATURES</div>
      </div>
      <div className="grid">
        <div className="col-12 lg:col-4">
          <div className="feature-box" onClick={() => handleBoxClick("8352")}>
            <img src={`${env.PUBLIC_URL}/assets/layout/images/landing/icon-design@2x.png`} alt="roma" />
            <div>
              <h3>Administracija sistema</h3>
              <p>Izaberite ovu opciju da biste pristupili Administraciji sistema.</p>
            </div>
          </div>
        </div>    
        <div className="col-12 lg:col-4">
          <div className="feature-box" onClick={() => handleBoxClick("app")}>
            <img src={`${env.PUBLIC_URL}/assets/layout/images/landing/icon-design@2x.png`} alt="roma" />
            <div>
              <h3>Zajedički šifarnici</h3>
              <p>Ovde možete popuniti glavne elemente sistema.</p>
            </div>
          </div>
        </div>              
        <div className="col-12 lg:col-4">
          <div className="feature-box" onClick={() => handleBoxClick("app")}>
            <img src= {`${env.PUBLIC_URL}/assets/layout/images/landing/icon-responsive@2x.png`} alt="roma" />
            <div>
              <h3>Ticketline sistem</h3>
              <p>Ovde možete izabrati administraciju Ticketline sistema.</p>
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="feature-box">
            <img src={`${env.PUBLIC_URL}/assets/layout/images/landing/icon-code@2x.png`} alt="roma" />
            <div>
              <h3>Clean Code</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="feature-box">
            <img src={`${env.PUBLIC_URL}/assets/layout/images/landing/icon-gorgeous@2x.png`} alt="roma" />
            <div>
              <h3>Gorgeous Pages</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="feature-box">
            <img src={`${env.PUBLIC_URL}/assets/layout/images/landing/icon-you@2x.png`} alt="roma" />
            <div>
              <h3>Crafted for You</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFeatures;
