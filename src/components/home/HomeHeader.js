import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { translations } from "../../configs/translations";
import { useNavigate } from "react-router-dom";
import './index.css';
import { AdmUserService } from "./AdmUserService";
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import env from '../../configs/env';
import { classNames } from 'primereact/utils';

const HomeHeader = (props, { scrollToDiv }) => {
    const selLen = localStorage.getItem('sl') || 'en';
    const [currentLanguage, setCurrentLanguage] = useState(selLen);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const navigate = useNavigate();
    /*********************************************************** */
    let i = 0
    const b = `${env.DOMEN}/btic/assets/img/zap/1774496601038262272.jpg`
    const selectedLanguage = localStorage.getItem('sl') || 'en'
    const userId = localStorage.getItem('userId') || -1
    const [user, setUser] = useState({});
    const [slika, setSlika] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                ++i
                if (i < 2) {
                    const admUserService = new AdmUserService();
                    const data = await admUserService.getAdmUser(userId);
                    // console.log(data, "/////////////////////////////////////////////////////////////getListaLL////////////////////////////////////////////////////////////////////////")
                    setUser(data);
                    setSlika(`${env.DOMEN}/btic/assets/img/zap/${data.id}.jpg`)
                }
            } catch (error) {
                console.error(error);
                // Obrada greške ako je potrebna
            }
        }
        fetchData();
    }, []);

    const onTopbarItemClick = (event, item) => {
        if (props.onTopbarItemClick) {
            props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    };

    /*********************************************************** */
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        sessionStorage.setItem('isLoggedIn', 'false');
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
                    <>
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
                        <span style={{ color: "#fff", fontSize: 14 }}>
                            {`${user?.firstname} ${user?.lastname || ''}`}
                        </span>

                    </>
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
