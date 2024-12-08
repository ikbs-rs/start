import React from 'react';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { translations } from "./configs/translations";
import { AdmUserService } from "./service/model/cmn/AdmUserService";
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import env from './configs/env';

const AppTopbar = (props) => {
    const navigate = useNavigate();
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

    return (
        <div className="layout-topbar">
            {/* <button type="button" className="p-link layout-right-panel-button layout-topbar-icon" onClick={props.onRightMenuButtonClick}>
                <i className="pi pi-ellipsis-v"></i>
            </button>

            <button type="button" className="p-link layout-menu-button layout-topbar-icon" onClick={props.onMenuButtonClick}>
                <i className="pi pi-bars"></i>
            </button>

            <button type="button" className="p-link layout-topbar-logo" onClick={() => navigate('/')}>
                <img id="topbar-logo" src="assets/layout/images/logo-roma-white.svg" alt="roma-react" />
            </button>

            <span className="layout-topbar-search">
                <i className="pi pi-search"></i>
                <input type="text" placeholder="Enter your search term" />
            </span>

            <ul className="topbar-menu">
                <li className={classNames('user-profile', { 'active-topmenuitem fadeInDown': props.activeTopbarItem === 'profile' })}>
                    {!props.inlineUser && (
                        <button type="button" className="p-link" onClick={(e) => onTopbarItemClick(e, 'profile')}>
                            <img src="assets/layout/images/avatar.png" alt="roma-layout" />
                            <div className="layout-profile-userinfo">
                                <span className="layout-profile-name">Arlene Welch</span>
                                <span className="layout-profile-role">Design Ops</span>
                            </div>
                        </button>
                    )}

                    <ul className="fadeInDown">
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-user"></i>
                                <span>Profile</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-cog"></i>
                                <span>Settings</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-envelope"></i>
                                <span>Messages</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <i className="pi pi-fw pi-bell"></i>
                                <span>Notifications</span>
                            </button>
                        </li>
                    </ul>
                </li>

                <li className={classNames({ 'active-topmenuitem fadeInDown': props.activeTopbarItem === 'settings' })}>
                    <button type="button" className="p-link layout-topbar-icon" onClick={(e) => onTopbarItemClick(e, 'settings')}>
                        <i className="topbar-icon pi pi-fw pi-bell"></i>
                    </button>
                    <ul className="fadeInDown">
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <img src="assets/layout/images/avatar-1.png" alt="roma-react" />
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Bithika Abhedananda</span>
                                    <span className="topbar-menu-role">User interface review is done.</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <img src="assets/layout/images/avatar-2.png" alt="roma-react" />
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Dai Jiang</span>
                                    <span className="topbar-menu-role">Uh, we have sort of a problem here.</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <img src="assets/layout/images/avatar-3.png" alt="roma-react" />
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Karlien Nijhuis</span>
                                    <span className="topbar-menu-role">You apparently didn’t put the thing</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <img src="assets/layout/images/avatar-4.png" alt="roma-react" />
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Tom Chun</span>
                                    <span className="topbar-menu-role">Please check the files</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button type="button" className="p-link">
                                <img src="assets/layout/images/avatar-5.png" alt="roma-react" />
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Maria Trofimova</span>
                                    <span className="topbar-menu-role">Meeting reports attached.</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </li>
            </ul> */}
        </div>
    );
};

export default AppTopbar;
