import React from "react";

//const PUBLIC_URL = process.env.PUBLIC_URL
import env from "../../configs/env"

const LandingFooter = () => {
  return (
    <div className="landing-footer">
      <div className="grid">
        <div className="col-12 lg:col-3">
          <img src={`${env.PUBLIC_URL}/assets/layout/images/logo-roma-white.svg`} alt="roma" />
        </div>
        <div className="col-12 lg:col-3">
          <h4>OVERVIEW</h4>
          <ul>
            <li>
              <a href="#">Why Roma</a>
            </li>
            <li>
              <a href="#">Get Started</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
            <li>
              <a href="#">License</a>
            </li>
          </ul>
        </div>
        <div className="col-12 lg:col-3">
          <h4>DEMOS</h4>
          <ul>
            <li>
              <a href="#">PrimeFaces</a>
            </li>
            <li>
              <a href="#">PrimeNG</a>
            </li>
            <li>
              <a href="#">PrimeReact</a>
            </li>
            <li>
              <a href="#">PrimeElements</a>
            </li>
          </ul>
        </div>
        <div className="col-12 lg:col-3">
          <h4>SUPPORT</h4>
          <ul>
            <li>
              <a href="#">Support Options</a>
            </li>
            <li>
              <a href="#">Pro</a>
            </li>
            <li>
              <a href="#">Elite</a>
            </li>
            <li>
              <a href="#">Forum</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
