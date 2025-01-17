import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { Banner, BodySideBar, Title, InLoader } from "../../index";

import { SHORTEN_ADDRESS, ORDER_HISTORY } from "../../../Context/constants";
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

const History = ({ historyAPI, reCall, setReCall }) => {
  const { publicKey } = useWallet();

  const [history, setHistory] = useState([]);
  const [notifyArray, setNotifyArray] = useState([]);
  const [createdNFTs, setCreatedNFTs] = useState([]);
  const [stopeLoader, setStopeLoader] = useState(true);

  useEffect(() => {
    if (publicKey) {
      const getNFTs = async () => {
        const order = await ORDER_HISTORY(publicKey);

        localStorage.setItem("ORDER_HISTORY", JSON.stringify(order));

        setHistory(order);

        setReCall(reCall + 1);
        const timeoutId = setTimeout(() => {
          setStopeLoader(false);
        }, 5000);
      };

      const notify = localStorage.getItem("NOTIFICATIONS");
      const createNft = localStorage.getItem("SOLANA_NFTS");

      if (notify) {
        const parsedNotify = JSON.parse(notify);
        setNotifyArray(parsedNotify.reverse());
      }
      if (createNft) {
        const parsedNFTs = JSON.parse(createNft);
        setCreatedNFTs(parsedNFTs.reverse());
      }

      if (historyAPI && history.length === 0) {
        getNFTs();
      }
    }
  }, [publicKey, historyAPI]);

  return (
    <div id="history" className="tabcontent ">
      <div className="wrapper-content">
        <div className="inner-content">
          <Banner />
          <Title title={"Order History"} />
          <div className="widget-tabs relative">
            <ul className="widget-menu-tab">
              <li className="item-title active">
                <span className="inner">Orders</span>
              </li>
              <li className="item-title">
                <span className="inner">Notifications</span>
              </li>
              <li className="item-title">
                <span className="inner">Upload</span>
              </li>
            </ul>
            <div className="widget-content-tab pt-10">
              <div className="widget-content-inner active" style={{}}>
                {history?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No Order Found</h1>
                        <p>
                          We’re sorry on order found is found in the
                          marketplace,
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="widget-history">
                    {history?.map((item, index) => (
                      <div className="widget-creators-item flex items-center">
                        <div className="author flex items-center flex-grow">
                          <img
                            src="logo-solana.png"
                            style={{
                              width: "40px",
                              height: "auto",
                            }}
                            alt=""
                          />
                          <div className="info">
                            <h6>
                              <a>
                                NFT Address:{" "}
                                {SHORTEN_ADDRESS(item?.nft_address)}
                              </a>
                            </h6>
                            <span>
                              <a>Sold at {item?.price} SOL</a>
                            </span>
                          </div>
                        </div>
                        <a
                          href={`/nft-details?mint=${item?.nft_address}`}
                          target="_blank"
                          className="time"
                        >
                          View NFT
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="widget-content-inner" style={{ display: "none" }}>
                <div className="widget-history">
                  {notifyArray?.map((item, index) => (
                    <div className="widget-creators-item flex items-center">
                      <div className="author flex items-center flex-grow">
                        <img src={item?.image} alt="" />
                        <div className="info">
                          <h6>
                            <a>{item?.name}</a>
                          </h6>
                          <span>
                            <a>{item?.message}</a>
                          </span>
                        </div>
                      </div>
                      <span className="time">{item?.date}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="widget-content-inner" style={{ display: "none" }}>
                <div className="widget-history">
                  {createdNFTs.map((item, index) => (
                    <div className="widget-creators-item flex items-center">
                      <div className="author flex items-center flex-grow">
                        <img src={item?.image} alt="" />
                        <div className="info">
                          <h6>
                            <a>{item?.name}</a>
                          </h6>
                          <span>
                            <a>{item?.description}</a>
                          </span>
                        </div>
                      </div>
                      <span className="time">{item?.symbol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BodySideBar reCall={reCall} />
      </div>
    </div>
  );
};

export default History;
