import React, { useEffect, useState } from "react";
import { CiHeart } from "../SVG/index";
import { SHORTEN_ADDRESS } from "../../Context/constants";

const NFTCard3 = ({
  index,
  item,
  elementID,
  handleClick,
  publicKey,
  unlistNFT,
  setRemoveNFT,
  UnElementID,
}) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("USER_PROFILE");

    if (user) {
      const parsedProfile = JSON.parse(user);
      setUser(parsedProfile);
    }
  }, []);
  return (
    <div key={index} className="col-item">
      <div className="tf-card-box style-1">
        <div className="card-media">
          <a>
            <img src={`${item?.nft.image_uri}`} alt="" />
          </a>
          <span className="wishlist-button ">
            <CiHeart />
          </span>
          <div className="button-place-bid">
            {item?.seller_address === publicKey?.toString() ? (
              <a
                style={{
                  color: "black",
                }}
                className="tf-button"
                onClick={() => setRemoveNFT(item)}
                data-toggle="modal"
                data-target={`#${UnElementID}`}
                className="tf-button"
              >
                <span>UnList NFT </span>
              </a>
            ) : (
              <a
                style={{
                  color: "black",
                }}
                onClick={() => handleClick(item)}
                data-toggle="modal"
                data-target={`#${elementID}`}
                className="tf-button"
              >
                <span>Buy </span>
              </a>
            )}
          </div>
        </div>
        <h5 className="name">
          <a>{item?.nft.name}</a>
        </h5>
        <div className="author flex items-center">
          <div className="avatar">
            <img
              src={
                item?.seller_address === publicKey?.toString()
                  ? `${user?.image || "logo-solana.png"}`
                  : "logo-solana.png"
              }
              alt="Image"
            />
          </div>
          <div className="info">
            <span>Created by:</span>
            <h6>
              <a>
                {SHORTEN_ADDRESS(item?.nft.creators[0].address)} {item?.symbol}
              </a>
            </h6>
          </div>
        </div>
        <div className="divider" />
        <div className="meta-info flex items-center justify-between">
          <span className="text-bid">Price </span>
          <h6 className="price gem">
            {item?.price} &nbsp; {item?.currency_symbol}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default NFTCard3;
