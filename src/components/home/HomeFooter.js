import React from "react";

//const PUBLIC_URL = process.env.PUBLIC_URL
import env from "../../configs/env"

const LandingFooter = () => {
  return (
    <div className="landing-footer" >
      <div className="grid">
        <div className="col-12 lg:col-3">
          <img src={`${env.PUBLIC_URL}/assets/layout/images/logo-beli2.png`} alt="roma" />
        </div>
        <div className="col-12 lg:col-3">
          <h4>ABOUT US</h4>
          <ul>
            <li>
              <h6>
              <a href="#">TICKETING DOO</a>
              </h6>
            </li>
            <li>
              <a href="#">Society for providing ticketing services and selling tickets Ticketing doo Belgrade</a>
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
          <h4>BASIC INFORMATION</h4>
          <ul>
            <li>
              <a href="#">PIB: 103907543</a>
            </li>
            <li>
              <a href="#">Identity number: 20040505</a>
            </li>
            <li>
              <a href="#">Activity code: 4791</a>
            </li>
          </ul>
        </div>
        <div className="col-12 lg:col-3">
          <h4>CONTACT</h4>
          <ul>
            <li>
              <a href="#">Phone: 011-20-30-570</a>
            </li>
            <li>
              <a href="#">E-mail: office@ticketline.rs</a>
            </li>
            <li>
              <a href="#">Web: www.ticketline.rs</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
