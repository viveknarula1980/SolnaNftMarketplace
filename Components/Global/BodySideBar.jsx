import React, { useEffect, useState } from "react";

import { SHORTEN_ADDRESS } from "../../Context/constants";

const NFTCard = ({ nft, index }) => (
  <div key={index} className="card-small">
    <div className="author">
      <img
        src={nft?.image_uri}
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
        }}
        alt=""
      />
      <div className="info">
        <h6>
          <a>{nft?.name}</a>
        </h6>
        <p>
          <a>{SHORTEN_ADDRESS(nft?.mint)}</a>
        </p>
      </div>
    </div>
    <a href={`/nft-details?mint=${nft?.mint}`} target="_blank" className="date">
      View{" "}
    </a>
  </div>
);

const TopCreator = ({ name, index, title, address }) => (
  <div
    className={`widget-creators-item flex items-center ${
      index == 5 ? "" : "mb-20"
    } `}
  >
    <div className="order">{index}.</div>
    <div className="author flex items-center flex-grow">
      <img src={`assets/images/avatar/avatar-small-0${index}.png`} alt="" />
      <div className="info">
        <h6>
          <a>{name}</a>
        </h6>
        <span>
          <a>{title}</a>
        </span>
      </div>
    </div>
    <a href={`/seller?address=${address}`} className="tf-button style-2 h50">
      Profile
    </a>
  </div>
);

const TrendingCoins = ({ name, index, image }) => (
  <div
    className={`widget-coins-item flex items-center ${
      index == 5 ? "" : "mb-20"
    } `}
  >
    <img src={`assets/images/box-icon/${image}`} alt="" />
    <p>
      <a>{name}</a>
    </p>
  </div>
);

const HistoryCard = ({ name, notify, index, image, date }) => (
  <div
    className={`widget-creators-item flex items-center ${
      index == 5 ? "" : "mb-20"
    }`}
  >
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
          <a>{name}</a>
        </h6>
        <span>
          <a>{notify}</a>
        </span>
      </div>
    </div>
    <span className="time">Just now</span>
  </div>
);

const BodySideBar = ({ reCall }) => {
  const [activeSeller, setActiveSeller] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [featureNFt, setFeatureNFt] = useState();

  useEffect(() => {
    const sellers = localStorage.getItem("ACTIVE_SELLERS");
    const historys = localStorage.getItem("ORDER_HISTORY");
    const userNFTs = localStorage.getItem("OWN_NFTS");

    if (sellers) {
      setActiveSeller(JSON.parse(sellers));
    }
    if (historys) {
      setOrderHistory(JSON.parse(historys));
    }
    if (userNFTs) {
      const parsedNFTs = JSON.parse(userNFTs);
      setNfts(parsedNFTs);
      setFeatureNFt(parsedNFTs[0]);
    }
  }, [reCall]);

  return (
    <div className="side-bar">
      {nfts?.length > 0 && (
        <>
          <div className="widget widget-recently">
            <h5 className="title-widget">Your NFTs</h5>
            <div className="card-small-main">
              <img
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
                src={featureNFt?.image_uri}
                alt=""
              />
              <div className="card-bottom">
                <h5>
                  <a href="#">{featureNFt?.name}</a>
                </h5>
                <span className="date">
                  {SHORTEN_ADDRESS(featureNFt?.mint)}
                </span>
              </div>
            </div>
            {nfts
              ?.map((nft, index) => <NFTCard nft={nft} index={index} />)
              .slice(0, 4)}
          </div>
          <div className="widget widget-creators">
            <div className="flex items-center justify-between">
              <h5 className="title-widget">Top Sellers</h5>
              <a className="see-all">See all</a>
            </div>
            {activeSeller
              ?.map((item, index) => (
                <TopCreator
                  name={SHORTEN_ADDRESS(item)}
                  title={"creator"}
                  index={index + 1}
                  address={item}
                />
              ))
              .slice(0, 5)}
          </div>
        </>
      )}

      {/* <div className="widget widget-coins">
        <h5 className="title-widget">Trending coins</h5>
        <TrendingCoins name={"Bitcoin"} index={1} image={"coin-01.png"} />
        <TrendingCoins name={"Ethereum"} index={2} image={"coin-02.png"} />
        <TrendingCoins name={"Cardano"} index={3} image={"coin-03.png"} />
        <TrendingCoins name={"Solana"} index={4} image={"coin-04.png"} />
        <TrendingCoins name={"Litecoin"} index={5} image={"coin-05.png"} />
      </div> */}
      {orderHistory.length > 0 && (
        <div className="widget widget-history">
          <div className="flex items-center justify-between">
            <h5 className="title-widget">Order History</h5>
            <a className="see-all">See all</a>
          </div>
          {orderHistory
            .map((item, index) => (
              <HistoryCard
                key={index}
                name={SHORTEN_ADDRESS(item?.nft_address)}
                notify={`Sold at ${item?.price} SOL`}
              />
            ))
            .slice(0, 5)}
        </div>
      )}
    </div>
  );
};

export default BodySideBar;
