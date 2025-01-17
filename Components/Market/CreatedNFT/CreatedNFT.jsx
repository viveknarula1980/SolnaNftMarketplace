import React, { useState, useEffect } from "react";

import { Banner, BodySideBar, Title } from "../../index";
import { SHORTEN_ADDRESS } from "../../../Context/constants";
import { CiHeart } from "../../SVG/index";

const CreatedNFT = ({ publicKey }) => {
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
      setCreatedNFTs(parsedNFTs.reverse());
    }
  }, []);
  return (
    <div id="favorite" className="tabcontent">
      <div className="wrapper-content">
        <div className="inner-content">
          <Banner />

          <Title title={"Created NFTs"} />

          <div className="widget-tabs relative">
            <div className="widget-content-tab">
              <div className="widget-content-inner active">
                <div className="wrap-box-card">
                  {createdNFTs?.map((item, index) => (
                    <div className="col-item">
                      <div className="tf-card-box style-1">
                        <div className="card-media">
                          <a href="#">
                            <img src={item?.image} alt={item?.symbol} />
                          </a>
                          <span className="wishlist-button ">
                            <CiHeart />
                          </span>
                          <div className="featured-countdown">
                            <span className="js-countdown">{item?.symbol}</span>
                          </div>
                        </div>
                        <h5 className="name">
                          <a>{item?.name}</a>
                        </h5>
                        <div className="author flex items-center">
                          <div className="avatar">
                            <img
                              src={
                                user?.image ||
                                "assets/images/avatar/avatar-box-01.jpg"
                              }
                              alt="Image"
                            />
                          </div>
                          <div className="info">
                            <span>Created by:</span>
                            <h6>
                              <a>{SHORTEN_ADDRESS(publicKey?.toString())}</a>
                            </h6>
                          </div>
                        </div>
                        <div className="divider" />
                        <div className="meta-info flex items-center justify-between">
                          <span className="text-bid">{item?.traitTypeOne}</span>
                          <h6 className="price gem">{item?.valueOne}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BodySideBar />
      </div>
    </div>
  );
};

export default CreatedNFT;
