import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import {
  FaWallet,
  Header_1,
  LuSearch,
  TiSocialVimeo,
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TbCurrencySolana,
  IoMenu,
  CgArrowsExchangeAltV,
} from "../SVG/index";

import { SHORTEN_ADDRESS } from "../../../Context/constants";

const MAINNET_PRC_URL = process.env.NEXT_PUBLIC_MAINNET_PRC_URL;

const Header = ({ nfts }) => {
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
  const router = useRouter();
  const { asPath } = router;
  const [link, setLink] = useState(true);

  const [desktopNav, setDesktopNav] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [balance, setBalance] = useState();
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

  const [createdNFTs, setCreatedNFTs] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const createNft = localStorage.getItem("SOLANA_NFTS");

    const user = localStorage.getItem("USER_PROFILE");

    if (user) {
      const parsedProfile = JSON.parse(user);
      setUser(parsedProfile);
    }

    if (createNft) {
      const parsedNFTs = JSON.parse(createNft);
      const newArray = [...parsedNFTs]?.reverse();
      setCreatedNFTs(newArray);
    }
  }, []);

  useEffect(() => {
    if (asPath === "/") {
      setLink(true);
    } else {
      setLink(false);
    }
  }, [asPath]);

  const CHANGE_NETWORK = (network) => {
    localStorage.setItem("NETWORK", network);
    window.location.reload();
  };

  return (
    <div id="header_main" className="header_1 header-fixed">
      <div className="header_menu">
        <a rel="home" className="main-logo ">
          <img
            id="logo_header"
            src="logo.png"
            style={{
              width: "130px",
            }}
          />
        </a>
        <span
          style={{
            fontSize: "2.5rem",
          }}
          onClick={() => setMobileNav(!mobileNav)}
        >
          <IoMenu />
        </span>
      </div>
      <div className="themesflat-container header_hide_main">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo ">
                  <div id="site-logo-inner ">
                    <a rel="home" className="main-logo ">
                      <img
                        id="logo_header"
                        src="logo.png"
                        style={{
                          width: "130px",
                        }}
                      />
                    </a>
                  </div>
                </div>

                <div className="mobile-button">
                  <span />
                </div>

                <nav id="main-nav" className="main-nav">
                  <ul id="menu-primary-menu" className="menu">
                    <li className="menu-item  current-menu-item">
                      <a href={link ? "#home" : "/"}>Home</a>
                    </li>
                    <li className="menu-item">
                      <a href={link ? "#top" : "/"}>Top NFTs</a>
                    </li>
                    <li className="menu-item ">
                      <a href={link ? "#about" : "/"}>About</a>
                    </li>
                    <li className="menu-item ">
                      <a href={link ? "#popular" : "/"}>Popular</a>
                    </li>
                    <li className="menu-item ">
                      <a href={link ? "#action" : "/"}>Action</a>
                    </li>
                    <li className="menu-item">
                      <a href={link ? "#discover" : "/"}>Discover</a>
                    </li>
                  </ul>
                </nav>

                <div className="flat-wallet flex">
                  <div className="" id="wallet-header">
                    <a
                      href="#"
                      onClick={() => handleClick()}
                      id="connectbtn"
                      className="tf-button style-1"
                    >
                      <span>
                        {connected ? (
                          <span>
                            {SHORTEN_ADDRESS(publicKey.toString())}
                            &nbsp;&nbsp;&nbsp;
                            {balance?.toString().slice(0, 4)}&nbsp;
                            <TbCurrencySolana />
                          </span>
                        ) : (
                          "Connect Wallet"
                        )}
                      </span>
                      {!connected && <FaWallet />}
                    </a>
                  </div>

                  {activeNetwork == "devnet" ? (
                    <a
                      onClick={() => CHANGE_NETWORK("mainnet-beta")}
                      style={{
                        fontSize: "2.5rem",
                      }}
                    >
                      <CgArrowsExchangeAltV />
                    </a>
                  ) : (
                    <a
                      onClick={() => CHANGE_NETWORK("devnet")}
                      style={{
                        fontSize: "2.5rem",
                      }}
                    >
                      <CgArrowsExchangeAltV />
                    </a>
                  )}

                  <div
                    onClick={() => setDesktopNav(!desktopNav)}
                    className="canvas"
                  >
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`canvas-nav-wrap ${desktopNav && "active"} `}>
        <div className="overlay-canvas-nav" />
        <div className="inner-canvas-nav">
          <div className="side-bar">
            <a href="/" rel="home" className="main-logo">
              <img
                id="logo_header"
                src="logo.png"
                style={{
                  width: "150px",
                }}
              />
            </a>

            <div
              className="canvas-nav-close"
              onClick={() => setDesktopNav(!desktopNav)}
            >
              <Header_1 />
            </div>

            <div className="widget-search mt-30">
              <div role="search" className="search-form relative">
                <input
                  type="text"
                  id="search"
                  className="search-field style-1"
                  placeholder={` ${activeNetwork}`}
                />
                <button className="search search-submit" title="Search">
                  <CgArrowsExchangeAltV />
                </button>
              </div>
            </div>

            <div className="widget widget-categories">
              <h5 className="title-widget">Analytics</h5>
              <ul>
                <li>
                  <div className="cate-item">
                    <a>NFT Sale</a>
                  </div>
                  <div className="number">({nfts})</div>
                </li>
                <li>
                  <div className="cate-item">
                    <a>Created NFT</a>
                  </div>
                  <div className="number">({createdNFTs?.length})</div>
                </li>
                <li>
                  <div className="cate-item">
                    <a>Crypto</a>
                  </div>
                  <div className="number">(45)</div>
                </li>
                <li>
                  <div className="cate-item">
                    <a>Technology</a>
                  </div>
                  <div className="number">(728)</div>
                </li>
              </ul>
            </div>
            <div className="widget widget-menu style-4">
              <h5 className="title-widget">Company</h5>
              <ul>
                <li>
                  <a href="#">Help center</a>
                </li>
                <li>
                  <a href="#">Platform status</a>
                </li>
              </ul>
            </div>
            <div className="widget">
              <h5 className="title-widget">Join the community</h5>
              <div className="widget-social">
                <ul className="flex">
                  <li>
                    <a href="#">
                      <TiSocialFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialVimeo />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mobile-nav-wrap ${mobileNav && "active"} `}>
        <div className="overlay-mobile-nav" />
        <div className="inner-mobile-nav">
          <div className="side-bar">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <a href="/" rel="home" className="main-logo">
                <img
                  id="logo_header"
                  src="logo.png"
                  style={{
                    width: "150px",
                  }}
                />
              </a>
              <div
                className="canvas-nav-close"
                onClick={() => setMobileNav(!mobileNav)}
              >
                <Header_1 />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a
                href="#"
                onClick={() => handleClick()}
                id="connectbtn"
                className="tf-button style-1 "
                style={{
                  marginTop: "2rem",
                }}
              >
                <span>
                  {" "}
                  {connected ? (
                    <span>
                      {SHORTEN_ADDRESS(publicKey.toString())}
                      &nbsp;&nbsp;&nbsp;
                      {balance?.toString().slice(0, 4)}&nbsp;
                      <TbCurrencySolana />
                    </span>
                  ) : (
                    "Connect Wallet"
                  )}
                </span>
                {!connected && <FaWallet />}
              </a>

              {activeNetwork == "devnet" ? (
                <a
                  onClick={() => CHANGE_NETWORK("mainnet-beta")}
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  <CgArrowsExchangeAltV />
                </a>
              ) : (
                <a
                  onClick={() => CHANGE_NETWORK("devnet")}
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  <CgArrowsExchangeAltV />
                </a>
              )}
            </div>

            <div className="widget-search mt-30">
              <div role="search" className="search-form relative">
                <input
                  type="search"
                  id="search"
                  className="search-field style-1"
                  placeholder={`${activeNetwork}`}
                />

                <button className="search search-submit" title="Search">
                  <CgArrowsExchangeAltV />
                </button>
              </div>
            </div>

            <div className="widget widget-categories">
              <h5 className="title-widget">Analytics</h5>
              <ul>
                <li>
                  <div className="cate-item">
                    <a>NFTs Sale</a>
                  </div>
                  <div className="number">({nfts})</div>
                </li>
                <li>
                  <div className="cate-item">
                    <a>Created</a>
                  </div>
                  <div className="number">({createdNFTs?.length})</div>
                </li>
                <li>
                  <div className="cate-item">
                    <a>Crypto</a>
                  </div>
                  <div className="number">(45)</div>
                </li>
                <li>
                  <div className="cate-item">
                    <a>Technology</a>
                  </div>
                  <div className="number">(728)</div>
                </li>
              </ul>
            </div>
            <div className="widget widget-menu style-4">
              <h5 className="title-widget">Company</h5>
              <ul>
                <li>
                  <a>Help center</a>
                </li>
                <li>
                  <a>Platform status</a>
                </li>
              </ul>
            </div>
            <div className="widget">
              <h5 className="title-widget">Join the community</h5>
              <div className="widget-social">
                <ul className="flex">
                  <li>
                    <a href="#">
                      <TiSocialFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialVimeo />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
