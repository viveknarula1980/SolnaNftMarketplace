import React, { useEffect, useState } from "react";

import { CiHeart } from "../SVG/index";
import { SHORTEN_ADDRESS } from "../../Context/constants";

const NFTCard2 = ({ item, index, handleClick, elementID, name, listed }) => {
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
      <div className="tf-card-box style-4">
        <div className="author flex items-center">
          <div className="avatar">
            <img src={user?.image || `logo-solana.png`} alt={user?.name} />
          </div>
          <div className="info">
            <span>Own by:</span>
            <h6>
              <a href="/">{SHORTEN_ADDRESS(item?.owner)}</a>
            </h6>
          </div>
        </div>
        <div className="card-media">
          <a href="#">
            <img src={`${item?.image_uri}`} alt="" />
          </a>

          <span className="wishlist-button ">
            <CiHeart />
          </span>
        </div>
        <h5 className="name">
          <a href="/">{item?.name}</a>
        </h5>
        <div className="meta-info flex items-center justify-between">
          <div>
            <span className="text-bid">Mint</span>
            <h6 className="price gem">{SHORTEN_ADDRESS(item?.mint)}</h6>
          </div>
          <div className="button-place-bid">
            {listed?.includes(item.mint) ? (
              <a
                style={{
                  color: "black",
                }}
                disabled
                className="tf-button"
              >
                <span>Listed</span>
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
                <span>{name}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard2;
