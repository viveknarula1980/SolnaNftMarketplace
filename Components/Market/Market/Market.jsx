import React, { useEffect, useState } from "react";

import {
  Banner,
  BodySideBar,
  Title,
  Filter,
  NFTCard3,
  InLoader,
} from "../../index";

const Market = ({
  publicKey,
  activeListing,
  setBuy,
  setRemoveNFT,
  marketAPI,
  stopeLoader,
  reCall,
}) => {
  return (
    <div id="market" className="tabcontent active">
      <div className="wrapper-content">
        <div className="inner-content">
          <Banner />

          <Title title={"Marketplace"} />
          <div className="widget-tabs relative">
            <Filter />
            <ul className="widget-menu-tab">
              <li className="item-title active">
                <span className="inner">Marketplace</span>
              </li>
            </ul>
            <div className="widget-content-tab">
              <div className="widget-content-inner active">
                {activeListing?.length == 0 ? (
                  <div className="inloader_container">
                    {stopeLoader ? (
                      <InLoader />
                    ) : (
                      <div className="content">
                        <h1>No NFTs Found</h1>
                        <p>
                          We’re sorry on nft is avalible for sale in the
                          marketplace, be the first to create one
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="wrap-box-card">
                    {activeListing?.map((item, index) => (
                      <NFTCard3
                        item={item}
                        index={index}
                        elementID={"buyNft"}
                        UnElementID={"unlistNFT"}
                        handleClick={setBuy}
                        setRemoveNFT={setRemoveNFT}
                        publicKey={publicKey}
                      />
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

export default Market;
