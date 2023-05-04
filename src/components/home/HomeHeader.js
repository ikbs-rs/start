import React from "react";
import { Button } from "primereact/button";

const HomeHeader = ({ scrollToDiv }) => {
  return (
    <div id="home" className="landing-header">
      <div className="landing-topbar">
        <span>Ticketline</span>

        <a href="#" id="landing-menu-button">
          <img src="../layout/images/landing/icon-ellipsis-v.svg" alt="Ticketline" />
        </a>

        <ul id="landing-menu">
          <li>
            <a onClick={() => scrollToDiv("home")}>Home</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("features")}>Features</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("news")}>News</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("pricing")}>Pricing</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("multimedia")}>Multimedia</a>
          </li>
        </ul>
      </div>

      <div className="landing-header-content">
        <h1>PrimeReact Presents Roma</h1>
        <p>
          Modern and elegant responsive application template with a premium look
          for PrimeReact components.
        </p>
        <Button
          label="Learn More"
          className="p-button-text-only p-widget p-state-default p-corner-all"
        />
      </div>
    </div>
  );
};

export default HomeHeader;
