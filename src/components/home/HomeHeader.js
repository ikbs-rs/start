import React from "react";
import { Button } from "primereact/button";
//import { useHistory } from "react-router-dom";
import env from "../../configs/env"

const HomeHeader = ({ scrollToDiv }) => {
  //const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    //history.push("/");
  }

  return (
    <div id="home" className="landing-header">
      <div>
      <div className="landing-topbar" style={{ backgroundColor: "#173042" }}>
        <span>
        <img src={`assets/layout/images/logo-beli2.png`} alt="Ticket line" style={{ width: "124.7px", height: "37px" }}/>
        </span>

        <a href="#" id="landing-menu-button">
          <img src={`assets/layout/images/landing/icon-ellipsis-v.svg`} alt="Ticketline" />
        </a>

        <ul className="layout-profile-name" id="landing-menu" >
          <li  className="layout-profile-name">
            <a onClick={() => scrollToDiv("home")}>Home</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("features")}>Modules</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("news")}>News</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("pricing")}>Pricing</a>
          </li>
          <li>
            <a onClick={() => handleLogout()}>Logout</a>
          </li>          
        </ul>
      </div>
      </div>

      <div className="landing-header-content">
        <h1>Ticketline system</h1>
        <p>
          Modern and elegant responsive application with a premium look
          for Pro company.
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
