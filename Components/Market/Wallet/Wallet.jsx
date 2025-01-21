import React from "react";

import { Banner, BodySideBar, Title } from "../../index";
import walletInfo from "../../Home/Data/wallet.json";

const Wallet = () => {
  return (
    <div id="wallet" className="tabcontent">
      <div className="wrapper-content">
        <div className="inner-content">
          <Banner />

          <Title title={"Connect your wallet"} />
          <p>
            If you don't have a wallet, you can select a provider and create one
            now.
            <span className="tf-color button-connect-wallet">Learn more</span>
          </p>
          <div id="connect-wallet-grid">
            <div className="wrap-box-card">
              {walletInfo?.map((item, index) => (
                <div key={item?.name} className="col-item">
                  <div className="box-wallet">
                    <img
                      src={`assets/images/box-icon/wallet-${item?.image}.png`}
                      alt=""
                    />
                    <h6>
                      <a href={item?.link}>{item?.name} </a>
                    </h6>
                    <p>{item?.title} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BodySideBar />
      </div>
    </div>
  );
};

export default Wallet;
