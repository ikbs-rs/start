import React from 'react';
import { classNames } from 'primereact/utils';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressBar } from 'primereact/progressbar';
import { rightMenuMessages } from './configs/rightMenuMessages';

const AppRightMenu = (props) => {
    return (
        <div className={classNames('layout-right-panel', { 'layout-right-panel-active': props.rightPanelMenuActive })} onClick={props.onRightMenuClick}>
            <TabView>
                <TabPanel header="Status">
                    <div className="status-title">
                        <span>Datacenter Status</span>
                        <i className="pi pi-download"></i>
                    </div>
                    <div>
                        <ProgressBar value={88} showValue={false} />
                    </div>
                    <div className="status-content">
                        <span className="percentage-1">65</span>
                        <span className="percentage-2">/88</span> Servers Online
                    </div>

                    <div className="status-title">
                        <span>Performance Status</span>
                        <i className="pi pi-clock"></i>
                    </div>
                    <div>
                        <ProgressBar value={65} showValue={false} />
                    </div>
                    <div className=" status-content">
                        <span className=" percentage-1">4</span>
                        <span className=" percentage-2">/5</span>
                        Active Pipeline
                    </div>

                    <div className=" status-title">
                        <span>Drivers on Way</span>
                        <i className="pi pi-cloud"></i>
                    </div>
                    <div>
                        <ProgressBar value={35} showValue={false} />
                    </div>
                    <div className=" status-content">
                        <span className="percentage-1">12</span>
                        <span className="percentage-2">/40</span>
                        Drivers
                    </div>

                    <div className="status-title">
                        <span>Datacenter Status</span>
                        <i className="pi pi-map-marker"></i>
                    </div>
                    <div>
                        <ProgressBar value={85} showValue={false} />
                    </div>
                    <div className="status-content">
                        <span className="percentage-1">65</span>
                        <span className=" percentage-2">/88</span>
                        Servers Online
                    </div>
                </TabPanel>

                <TabPanel header="Messages">
                    {rightMenuMessages.map((group) => (
                        <React.Fragment key={group.date}>
                            <div className="messages-title">
                                <span>{group.date}</span>
                            </div>
                            <div className="messages-content grid col">
                                {group.items.map((item) => (
                                    <React.Fragment key={`${group.date}-${item.time}-${item.text}`}>
                                        <span className="time col-4">{item.time}</span>
                                        <span className={`${item.variant} col-8`}>{item.text}</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                </TabPanel>
            </TabView>
        </div>
    );
};

export default AppRightMenu;
