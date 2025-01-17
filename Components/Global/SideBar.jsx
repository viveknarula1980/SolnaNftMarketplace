import React from "react";
import { FaExternalLinkAlt } from "../SVG/index";
import {
  MdCreateNewFolder,
  SideBar_1,
  SideBar_2,
  SideBar_3,
  SideBar_4,
  SideBar_5,
  SideBar_6,
  SideBar_7,
  SideBar_8,
  SideBar_9,
  SideBar_10,
  SideBar_11,
  SideBar_12,
  SideBar_13,
  SideBar_14,
  SideBar_15,
  SideBar_16,
} from "../SVG/index";

const SideBar = ({
  setDashboardAPI,
  setHistoryAPI,
  setSellerAPI,
  setCollectionAPI,
  openSideBar,
}) => {
  return (
    <div className={`section-menu-left ${openSideBar ? "null" : ""} `}>
      <div className="box-logo">
        <a href="/">
          <img
            style={{
              width: "100%",
            }}
            src="logo-br.png"
            alt=""
          />
        </a>
      </div>
      <div className="create menu-tab">
        <a className="tf-button style-1 type-1 tablinks" data-tabs="create">
          <span>Create</span>

          <MdCreateNewFolder />
        </a>
      </div>
      <div className="over-content">
        <div className="content">
          <h6>Marketplace</h6>
          <ul className="menu-tab">
            <li className="tablinks active" data-tabs="market">
              <SideBar_1 />
              <SideBar_2 />
              Market
            </li>
            <li
              onClick={() => setDashboardAPI(true)}
              className="tablinks"
              data-tabs="bid"
            >
              <SideBar_3 />
              <SideBar_4 />
              Dashboard
            </li>
            <li
              onClick={() => setSellerAPI(true)}
              className="tablinks"
              data-tabs="explore"
            >
              <SideBar_5 />
              <SideBar_6 />
              Explore
            </li>
          </ul>
        </div>
        <div className="content mt-30">
          <h6>Account</h6>
          <ul className="menu-tab">
            <li className="tablinks" data-tabs="favorite">
              <SideBar_9 />
              <SideBar_10 />
              Created NFTs
            </li>
            <li
              onClick={() => setHistoryAPI(true)}
              className="tablinks"
              data-tabs="history"
            >
              <SideBar_13 />
              <SideBar_14 />
              History
            </li>
            <li className="tablinks" data-tabs="wallet">
              <SideBar_11 />
              <SideBar_12 />
              Wallet
            </li>

            <li className="tablinks" data-tabs="settings">
              <SideBar_15 />
              <SideBar_16 />
              Settings
            </li>
            <li>
              <a target="_blank" href="/comming">
                <SideBar_15 />
                <FaExternalLinkAlt />
                Comming Soon
              </a>
            </li>
            <li>
              <a target="_blank" href="/maintenance">
                <SideBar_15 />
                <FaExternalLinkAlt />
                Maintenance
              </a>
            </li>
            <li>
              <a target="_blank" href="/contact-us">
                <SideBar_15 />
                <FaExternalLinkAlt />
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom">
        <p>© 2023 Made By</p>
        <p>@theblockchaincoders</p>
      </div>
    </div>
  );
};

export default SideBar;
