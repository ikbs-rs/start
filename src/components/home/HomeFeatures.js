import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from "../../configs/env"

function HomeFeatures() {

  const navigate = useNavigate();

  const handleBoxClick = (par) => {
    const moduleUrl = par;
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
        <div className="features-topic">MODULES</div>
      </div>
      <div className="grid">
        <div className="col-12 lg:col-4" >
          <div className="feature-box" onClick={() => handleBoxClick(`${env.ADM_URL}`)}>
            <img src={`assets/layout/images/landing/icon-gorgeous@2x.png`} alt="roma" style={{ cursor: 'pointer' }}/>
            <div style={{ cursor: 'pointer' }}>
              <h3>System administration</h3>
              <p>Select this option to access System Administration.</p>
            </div>
          </div>
        </div>    
        <div className="col-12 lg:col-4">
          <div className="feature-box" onClick={() => handleBoxClick("app")}>
            <img src={`assets/layout/images/landing/icon-design@2x.png`} alt="roma" style={{ cursor: 'pointer' }}/>
            <div style={{ cursor: 'pointer' }}>
              <h3>Community code books</h3>
              <p>Here you can fill in the main elements of the system.</p>
            </div>
          </div>
        </div>              
        <div className="col-12 lg:col-4">
          <div className="feature-box" onClick={() => handleBoxClick("app")}>
            <img src= {`assets/layout/images/landing/icon-responsive@2x.png`} alt="roma" style={{ cursor: 'pointer' }}/>
            <div style={{ cursor: 'pointer' }}>
              <h3>Ticketline system</h3>
              <p>Here you can choose the administration of the Ticketline system.</p>
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="feature-box">
            <img src={`assets/layout/images/landing/icon-document@2x.png`} alt="roma" style={{ cursor: 'pointer' }}/>
            <div style={{ cursor: 'pointer' }}> 
              <h3>Reporting</h3>
              <p>View reports from the system.</p>
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="feature-box">
            <img src={`assets/layout/images/landing/icon-you@2x.png`} alt="roma" style={{ cursor: 'pointer' }}/>
            <div style={{ cursor: 'pointer' }}>
              <h3>Customer support</h3>
              <p>Handling requests and incidents.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFeatures;
