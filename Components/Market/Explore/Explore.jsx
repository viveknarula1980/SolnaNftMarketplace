import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { Banner, BodySideBar, Title, InLoader } from "../../index";

import { SHORTEN_ADDRESS, ACTIVE_SELLERS } from "../../../Context/constants";
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

const Explore = ({ sellerAPI, reCall, setReCall }) => {
  const { publicKey } = useWallet();

  const [seller, setSeller] = useState([]);
  const [stopeLoader, setStopeLoader] = useState(true);

  useEffect(() => {
    if (publicKey) {
      const getNFTs = async () => {
        const array = await ACTIVE_SELLERS(NETWORK, publicKey);
        console.log(array);

        localStorage.setItem("ACTIVE_SELLERS", JSON.stringify(array));

        setSeller(array);

        setReCall(reCall + 1);
        const timeoutId = setTimeout(() => {
          setStopeLoader(false);
        }, 5000);
      };

      if (sellerAPI && seller.length === 0) {
        getNFTs();
      }
    }
  }, [publicKey, sellerAPI]);
  return (
    <div id="explore" className="tabcontent">
      <div className="wrapper-content">
        <div className="inner-content">
          <Banner />

          <Title title={"Active Sellers"} />
          <div className="widget-tabs relative">
            <div className="widget-content-tab">
              <div className="widget-content-inner active">
                {seller?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No Seller Found</h1>
                        <p>
                          We’re sorry on active seller is found in the
                          marketplace, be the first to create one
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wrap-box-card">
                    {seller?.map((item, index) => (
                      <div key={index} className="col-item">
                        <div className="tf-card-box style-4">
                          <div className="author flex items-center">
                            <div className="avatar">
                              <img
                                src={`assets/images/avatar/avatar-small-0${
                                  index + 1
                                }.png`}
                                alt="Image"
                              />
                            </div>
                            <div className="info">
                              <span>Seller:</span>
                              <h6>
                                <a>{SHORTEN_ADDRESS(item)}</a>
                              </h6>
                            </div>
                          </div>

                          <div className="meta-info flex items-center justify-between">
                            <div>
                              <span className="text-bid">Profile</span>
                            </div>
                            <div className="button-place-bid">
                              <a
                                style={{
                                  color: "black",
                                }}
                                href={`/seller?address=${item}`}
                                className="tf-button"
                              >
                                <span>view</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <BodySideBar reCall={reCall} />
      </div>
    </div>
  );
};

export default Explore;
