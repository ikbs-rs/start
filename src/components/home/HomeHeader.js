import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { translations } from "../../configs/translations";
import { useNavigate } from "react-router-dom";
import './index.css';

const HomeHeader = ({ scrollToDiv }) => {
    const selLen = localStorage.getItem('sl') || 'en';
    const [currentLanguage, setCurrentLanguage] = useState(selLen);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };
    const handleLogout = () => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("isLoggedIn");
      navigate('/login');
    };
    const handleMenuItemClick = (callback) => {
        callback();
        setIsMenuOpen(false);
    };

    return (
        <div id="home" className="landing-header">
            <div>
                <div className="landing-topbar" style={{ backgroundColor: "#750404" }}>
                    <span>
                        <img src={`assets/layout/images/logo-beli2.png`} alt="Ticket line" style={{ width: "124.7px", height: "37px" }} />
                    </span>

                    {/* {isMobile && (
                        <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle Menu">
                            <img src={`assets/layout/images/landing/icon-ellipsis-v.svg`} alt="Menu" />
                        </button>
                    )} */}

                    {!isMobile && (
                        <ul className="layout-profile-name desktop-menu">
                            <li>
                                <a onClick={() => scrollToDiv("home")}>{translations[selLen].home}</a>
                            </li>
                            <li>
                                <a onClick={() => scrollToDiv("features")}>{translations[selLen].modules}</a>
                            </li>
                            <li>
                                <a onClick={handleLogout}>{translations[selLen].logout}</a>
                            </li>
                        </ul>
                    )}

                    {isMobile && (
                        <ul className={`layout-profile-name mobile-menu ${isMenuOpen ? 'menu-open' : ''}`}>
                            <li>
                                <a onClick={() => handleMenuItemClick(() => scrollToDiv("home"))}>{translations[selLen].home}</a>
                            </li>
                            <li>
                                <a onClick={() => handleMenuItemClick(() => scrollToDiv("features"))}>{translations[selLen].modules}</a>
                            </li>
                            <li>
                                <a onClick={() => handleMenuItemClick(handleLogout)}>{translations[selLen].logout}</a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div className="landing-header-content">
                <h1>Ticketline system</h1>
                <p>{translations[selLen].slogan}</p>
                <Button
                    label={translations[selLen].learnMore}
                    className="p-button-text-only p-widget p-state-default p-corner-all"
                />
            </div>
        </div>
    );
};

export default HomeHeader;
