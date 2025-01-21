import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  FaWallet,
  FaExternalLinkAlt,
  Header_1,
  LuSearch,
  TiSocialVimeo,
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TbCurrencySolana,
  IoMenu,
} from "../Home/SVG/index";

//ICON IMPORT
import {
  MdKeyboardArrowDown,
  MarketHeader_1,
  MarketHeader_2,
  MarketHeader_3,
  MdNetworkWifi,
  TiTick,
} from "../SVG/index";

import { SHORTEN_ADDRESS } from "../../Context/constants";

const MAINNET_PRC_URL = process.env.NEXT_PUBLIC_MAINNET_PRC_URL;

const NotificationCard = ({ item, index }) => (
  <div key={index} className="card-small">
    <div className="author">
      <img
        style={{
          width: "50px",
          height: "60px",
          objectFit: "cover",
        }}
        src={item?.image}
        alt=""
      />
      <div className="info">
        <h6>
          <a href="#">{item?.name.slice(0, 15)}</a>
        </h6>
        <p>
          <a href="#">{item?.message.slice(0, 19)}..</a>
        </p>
      </div>
    </div>
    {/* <span className="date">{item?.time} </span> */}
  </div>
);

const MarketHeader = ({ openSideBar, setOpenSideBar, reCall }) => {
  const {
    connected,
    connect,
    disconnect,
    connecting,
    publicKey,
    wallet,
    wallets,
    select,
  } = useWallet();
  const [desktopNav, setDesktopNav] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [balance, setBalance] = useState();
  const [notifyArray, setNotifyArray] = useState([]);
  const [user, setUser] = useState();
  const [activeNetwork, setActiveNetwork] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const networkActive = localStorage.getItem("NETWORK");
          if (networkActive == null) {
            setActiveNetwork("devnet");
          } else {
            setActiveNetwork(networkActive);
            console.log(networkActive);
          }

          const network =
            networkActive === "mainnet-beta"
              ? MAINNET_PRC_URL
              : clusterApiUrl("devnet");

          const connection = new Connection(network);
          const balance = await connection.getBalance(new PublicKey(publicKey));
          console.log(balance);
          setBalance(balance / 1e9);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      }
    };

    if (connected) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey]);

  const handleClick = async () => {
    try {
      if (connected) {
        await disconnect();
      } else if (wallet && !connecting) {
        await connect();
      } else if (wallets.length > 0) {
        await select(wallets[0].adapter.name);
        await connect();
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  useEffect(() => {
    const notify = localStorage.getItem("NOTIFICATIONS");
    const user = localStorage.getItem("USER_PROFILE");

    if (notify) {
      const parsedNotify = JSON.parse(notify);
      setNotifyArray(parsedNotify.reverse());
    }
    if (user) {
      const parsedProfile = JSON.parse(user);
      setUser(parsedProfile);
    }
  }, [reCall]);

  const CHANGE_NETWORK = (network) => {
    localStorage.setItem("NETWORK", network);
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div id="market-header">
        <div className="market-header flex items-center justify-between">
          <div className="widget-search">
            <div role="search" className="search-form relative">
              <input
                type="search"
                id="search"
                className="search-field style-1"
                placeholder="Search artwork, collection..."
              />
              <button className="search search-submit" title="Search">
                <LuSearch />
              </button>
            </div>
          </div>
          <div className="admin_active" id="header_admin">
            <div className="popup-notification relative">
              <div className="notification">
                <MarketHeader_1 />
              </div>
              <div className="avatar_popup">
                <h5 className="mb-30">Notification</h5>
                <div className="widget-recently">
                  {notifyArray
                    ?.map((item, index) => (
                      <NotificationCard item={item} index={index} />
                    ))
                    .slice(0, 5)}
                </div>
              </div>
            </div>

            <div className="popup-user relative">
              <div className="user">
                <img
                  src={
                    user?.image || "assets/images/avatar/avatar-small-09.png"
                  }
                  alt={user?.name || "name"}
                />
                <span>
                  {user?.name || "Creator"}
                  <MdKeyboardArrowDown />
                </span>
              </div>
              <div className="avatar_popup2">
                <div className="">
                  <div className="links">
                    <a className="block mb-30">
                      <MarketHeader_2 />
                      <span>
                        &nbsp;&nbsp; {SHORTEN_ADDRESS(publicKey?.toString())}
                      </span>
                    </a>
                    <a className="block mb-30">
                      <MarketHeader_3 />
                      <span>
                        {" "}
                        &nbsp;&nbsp;{balance?.toString().slice(0, 4)}&nbsp; Sol
                      </span>
                    </a>
                    <a
                      onClick={() => CHANGE_NETWORK("devnet")}
                      className="block mb-30"
                    >
                      <MdNetworkWifi />
                      <span>&nbsp;&nbsp; Devnet</span> &nbsp;&nbsp;
                      {activeNetwork == "devnet" && <TiTick />}
                    </a>
                    <a
                      onClick={() => CHANGE_NETWORK("mainnet-beta")}
                      className="block mb-30"
                    >
                      <MdNetworkWifi />
                      <span>&nbsp;&nbsp; Mainnet</span> &nbsp;&nbsp;
                      {activeNetwork == "mainnet-beta" && <TiTick />}
                    </a>

                    <a
                      href="#"
                      onClick={() => handleClick()}
                      id="connectbtn"
                      className="tf-button style-1"
                    >
                      <span>{connected ? "Disconnect" : "Connect Wallet"}</span>
                      {!connected && <FaWallet />}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`btn-canvas ${openSideBar ? "" : "active"} `}>
        <div onClick={() => setOpenSideBar(!openSideBar)} className="canvas">
          <span />
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;
