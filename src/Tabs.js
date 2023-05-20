import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const NFTTab = () => {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                            toggle("1");
                        }}
                    >
                        Wallet NFTs
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                            toggle("2");
                        }}
                    >
                        Listed NFTs
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                            toggle("3");
                        }}
                    >
                        Total Listed NFTs
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div id="nftid3-wallet"></div>
                </TabPane>
                <TabPane tabId="2">
                    <div id="nftid3-listed"></div>
                </TabPane>
                <TabPane tabId="3">
                    <div id="nftid3-total"></div>
                </TabPane>
            </TabContent>
        </div>
    );
};


export default NFTTab;